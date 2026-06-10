const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { dbRun, dbAll, dbGet } = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = 'eduannounce_jwt_secret_key_2026';

app.use(cors());
app.use(express.json());

// ══════════════════════════════════════════
// MIDDLEWARES
// ══════════════════════════════════════════

// Authentication Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token missing' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
}

// Admin Authorization Middleware
function requireAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Admin privileges required' });
  }
}

// ══════════════════════════════════════════
// AUTHENTICATION ENDPOINTS
// ══════════════════════════════════════════

// Login Endpoint
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const user = await dbGet('SELECT * FROM users WHERE email = ?', [email]);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    if (user.status !== 'active') {
      return res.status(403).json({ error: 'Your account is deactivated' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, name: user.name, initials: user.initials },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        initials: user.initials,
        status: user.status
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get Current User Session
app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    const user = await dbGet('SELECT id, name, email, role, initials, status FROM users WHERE id = ?', [req.user.id]);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    console.error('Session restore error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ══════════════════════════════════════════
// ANNOUNCEMENTS ENDPOINTS
// ══════════════════════════════════════════

// List Announcements
app.get('/api/announcements', authenticateToken, async (req, res) => {
  const { type, query } = req.query;
  let sql = 'SELECT * FROM announcements WHERE 1=1';
  const params = [];

  // Filter by Type
  if (type && type !== 'all') {
    sql += ' AND type = ?';
    params.push(type);
  }

  // Filter by Search Query
  if (query) {
    sql += ' AND (title LIKE ? OR excerpt LIKE ?)';
    const searchParam = `%${query}%`;
    params.push(searchParam, searchParam);
  }

  // Pinned announcements first, then descending by date
  sql += ' ORDER BY pinned DESC, date DESC';

  try {
    const announcements = await dbAll(sql, params);
    res.json({ announcements });
  } catch (error) {
    console.error('Error fetching announcements:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get Single Announcement & Increment Views
app.get('/api/announcements/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    // 1. Get Announcement
    const ann = await dbGet('SELECT * FROM announcements WHERE id = ?', [id]);
    if (!ann) {
      return res.status(404).json({ error: 'Announcement not found' });
    }

    // 2. Increment Views Count
    await dbRun('UPDATE announcements SET views = views + 1 WHERE id = ?', [id]);
    ann.views++;

    // 3. Fetch Comments
    const comments = await dbAll('SELECT * FROM comments WHERE announcement_id = ? ORDER BY id ASC', [id]);
    ann.comments = comments;

    res.json({ announcement: ann });
  } catch (error) {
    console.error('Error fetching announcement detail:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create Announcement (Admin Only)
app.post('/api/announcements', authenticateToken, requireAdmin, async (req, res) => {
  const { type, title, excerpt, body, pinned, status } = req.body;

  if (!title || !excerpt) {
    return res.status(400).json({ error: 'Title and short description are required' });
  }

  const dateStr = new Date().toISOString().split('T')[0];
  const pinnedVal = pinned ? 1 : 0;

  try {
    const result = await dbRun(`
      INSERT INTO announcements (type, pinned, title, excerpt, body, author, authorInitials, role, date, views, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      type || 'general',
      pinnedVal,
      title,
      excerpt,
      body || '',
      req.user.name,
      req.user.initials,
      req.user.role,
      dateStr,
      0,
      status || 'published'
    ]);

    const newAnn = await dbGet('SELECT * FROM announcements WHERE id = ?', [result.lastID]);
    newAnn.comments = [];
    res.status(201).json({ announcement: newAnn });
  } catch (error) {
    console.error('Error creating announcement:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update Announcement (Admin Only)
app.put('/api/announcements/:id', authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { type, title, excerpt, body, pinned, status } = req.body;

  if (!title || !excerpt) {
    return res.status(400).json({ error: 'Title and short description are required' });
  }

  const pinnedVal = pinned ? 1 : 0;

  try {
    const ann = await dbGet('SELECT * FROM announcements WHERE id = ?', [id]);
    if (!ann) {
      return res.status(404).json({ error: 'Announcement not found' });
    }

    await dbRun(`
      UPDATE announcements
      SET type = ?, pinned = ?, title = ?, excerpt = ?, body = ?, status = ?
      WHERE id = ?
    `, [
      type || ann.type,
      pinnedVal,
      title,
      excerpt,
      body || '',
      status || ann.status,
      id
    ]);

    const updatedAnn = await dbGet('SELECT * FROM announcements WHERE id = ?', [id]);
    const comments = await dbAll('SELECT * FROM comments WHERE announcement_id = ? ORDER BY id ASC', [id]);
    updatedAnn.comments = comments;

    res.json({ announcement: updatedAnn });
  } catch (error) {
    console.error('Error updating announcement:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete Announcement (Admin Only)
app.delete('/api/announcements/:id', authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const ann = await dbGet('SELECT * FROM announcements WHERE id = ?', [id]);
    if (!ann) {
      return res.status(404).json({ error: 'Announcement not found' });
    }

    await dbRun('DELETE FROM announcements WHERE id = ?', [id]);
    await dbRun('DELETE FROM comments WHERE announcement_id = ?', [id]); // Cascade delete comments manually

    res.json({ success: true, message: 'Announcement deleted successfully' });
  } catch (error) {
    console.error('Error deleting announcement:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ══════════════════════════════════════════
// COMMENTS ENDPOINTS
// ══════════════════════════════════════════

// Post Comment
app.post('/api/announcements/:id/comments', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  if (!text || !text.trim()) {
    return res.status(400).json({ error: 'Comment content cannot be empty' });
  }

  try {
    const ann = await dbGet('SELECT * FROM announcements WHERE id = ?', [id]);
    if (!ann) {
      return res.status(404).json({ error: 'Announcement not found' });
    }

    const timeStr = 'Just now'; // Simulates UI behavior. Alternatively: new Date().toLocaleTimeString();
    const result = await dbRun(`
      INSERT INTO comments (announcement_id, author, initials, text, time)
      VALUES (?, ?, ?, ?, ?)
    `, [id, req.user.name, req.user.initials, text.trim(), timeStr]);

    const newComment = await dbGet('SELECT * FROM comments WHERE id = ?', [result.lastID]);
    res.status(201).json({ comment: newComment });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ══════════════════════════════════════════
// USERS ENDPOINTS (Admin Only)
// ══════════════════════════════════════════

// List Users
app.get('/api/users', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const users = await dbAll('SELECT id, name, email, role, initials, status FROM users');
    res.json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update User Status (Admin Only)
app.put('/api/users/:id', authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { status, role } = req.body;

  try {
    const user = await dbGet('SELECT * FROM users WHERE id = ?', [id]);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.id === req.user.id && status === 'inactive') {
      return res.status(400).json({ error: 'You cannot deactivate your own admin account' });
    }

    await dbRun(`
      UPDATE users
      SET status = COALESCE(?, status), role = COALESCE(?, role)
      WHERE id = ?
    `, [status, role, id]);

    const updatedUser = await dbGet('SELECT id, name, email, role, initials, status FROM users WHERE id = ?', [id]);
    res.json({ user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ══════════════════════════════════════════
// PROFILE & SECURITY ENDPOINTS
// ══════════════════════════════════════════

// Update Profile
app.put('/api/profile', authenticateToken, async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  try {
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

    let query = 'UPDATE users SET name = ?, email = ?, initials = ?';
    const params = [name, email, initials];

    if (password && password.trim() !== '') {
      const hashedPass = await bcrypt.hash(password, 10);
      query += ', password = ?';
      params.push(hashedPass);
    }

    query += ' WHERE id = ?';
    params.push(req.user.id);

    await dbRun(query, params);

    const updatedUser = await dbGet('SELECT id, name, email, role, initials, status FROM users WHERE id = ?', [req.user.id]);
    res.json({ user: updatedUser });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ══════════════════════════════════════════
// START SERVER
// ══════════════════════════════════════════
app.listen(PORT, () => {
  console.log(`EduAnnounce Backend API running on port ${PORT}`);
});
