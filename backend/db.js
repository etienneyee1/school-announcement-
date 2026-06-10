const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = path.resolve(__dirname, 'db.json');

// Memory state matching tables
let state = {
  users: [],
  announcements: [],
  comments: []
};

// Load database from file
function loadDatabase() {
  if (fs.existsSync(dbPath)) {
    try {
      const data = fs.readFileSync(dbPath, 'utf8');
      state = JSON.parse(data);
      console.log('Database loaded successfully from file persistency.');
    } catch (e) {
      console.error('Error loading database file. Initializing fresh state.', e);
      initializeDatabase();
    }
  } else {
    console.log('Database file not found. Seeding initial data...');
    initializeDatabase();
  }
}

// Save database to file
function saveDatabase() {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(state, null, 2), 'utf8');
  } catch (e) {
    console.error('Error saving database to file:', e);
  }
}

// Seed the database with target information
async function initializeDatabase() {
  state = {
    users: [],
    announcements: [],
    comments: []
  };

  try {
    const adminHash = await bcrypt.hash('admin123', 10);
    const teacherHash = await bcrypt.hash('teacher123', 10);
    const studentHash = await bcrypt.hash('student123', 10);

    // Seed Users
    state.users.push(
      { id: 1, name: 'Dr. Habakwizera Etienne', email: 'admin@edubright.rw', role: 'admin', password: adminHash, initials: 'HE', status: 'active' },
      { id: 2, name: 'Jean Bosco Habimana', email: 'jean@edubright.rw', role: 'teacher', password: teacherHash, initials: 'JB', status: 'active' },
      { id: 3, name: 'Amina Keza', email: 'amina@edubright.rw', role: 'student', password: studentHash, initials: 'AK', status: 'active' }
    );

    // Seed Announcements
    const announcementsSeed = [
      {
        id: 1,
        type: 'urgent', pinned: 1,
        title: 'Urgent: School Closure — Heavy Rainfall Warning',
        excerpt: 'Due to severe weather conditions forecast for tomorrow, the school will remain closed on Thursday, June 5th.',
        body: `<p>Dear Students, Parents, and Staff,</p><p>Following advice from the Rwanda Meteorological Agency regarding heavy rainfall and possible flooding in the region, <strong>EduBright Academy will be closed on Thursday, June 5th, 2026.</strong></p><h3>Key Information</h3><ul><li>All scheduled classes, exams, and activities are postponed.</li><li>Online learning materials will be shared via the student portal by 8:00 AM.</li><li>The rescheduled timetable will be communicated by Friday morning.</li></ul><p>We prioritize the safety of our entire school community. Please stay safe and monitor official weather updates.</p>`,
        author: 'Dr. Marie Uwimana', authorInitials: 'MU', role: 'Headmistress',
        date: '2026-06-04', views: 1240, status: 'published'
      },
      {
        id: 2,
        type: 'academic', pinned: 0,
        title: 'End-of-Term Examination Schedule — Term 2, 2026',
        excerpt: 'The complete examination timetable for Term 2 is now available. All students must confirm their registration by June 10.',
        body: `<p>The End-of-Term 2 examinations will run from <strong>June 16 to June 27, 2026</strong>. All students are expected to be present 30 minutes before their scheduled exam.</p><h3>Important Dates</h3><ul><li><strong>June 10</strong> — Registration confirmation deadline</li><li><strong>June 14</strong> — Study day (no classes)</li><li><strong>June 16</strong> — Examinations begin</li><li><strong>June 27</strong> — Last examination day</li></ul><p>Students with special accommodations should contact the academic office by June 8.</p>`,
        author: 'Mr. Patrick Habimana', authorInitials: 'PH', role: 'Academic Registrar',
        date: '2026-05-28', views: 892, status: 'published'
      },
      {
        id: 3,
        type: 'event', pinned: 0,
        title: 'Annual Cultural Day — June 21, 2026',
        excerpt: 'Celebrate Rwanda\'s rich heritage at our Annual Cultural Day. Students are encouraged to wear traditional attire.',
        body: `<p>EduBright Academy's Annual Cultural Day will take place on <strong>Saturday, June 21, 2026</strong> from 9:00 AM to 4:00 PM on the school grounds.</p><h3>Activities Include</h3><ul><li>Traditional dance performances by student groups</li><li>Art exhibition showcasing student artwork</li><li>Traditional food stalls and cooking demonstrations</li><li>Guest speakers on Rwandan history and culture</li></ul>`,
        author: 'Ms. Alice Mukandayisenga', authorInitials: 'AM', role: 'Events Coordinator',
        date: '2026-05-20', views: 654, status: 'published'
      },
      {
        id: 4,
        type: 'holiday', pinned: 0,
        title: 'Liberation Day Holiday — School Closed July 4th',
        excerpt: 'In observance of Liberation Day, EduBright Academy will be closed on Friday, July 4, 2026.',
        body: `<p>EduBright Academy will be closed on <strong>Friday, July 4, 2026</strong> in observance of Rwanda's Liberation Day.</p>`,
        author: 'Dr. Marie Uwimana', authorInitials: 'MU', role: 'Headmistress',
        date: '2026-06-01', views: 421, status: 'published'
      },
      {
        id: 5,
        type: 'general', pinned: 0,
        title: 'Library Hours Extended for Exam Season',
        excerpt: 'The school library will remain open until 8:00 PM on weekdays during the examination period.',
        body: `<p>To support students during the upcoming examination period, the <strong>EduBright Library will extend its hours from June 10 to June 27, 2026</strong>.</p>`,
        author: 'Mrs. Josée Uwera', authorInitials: 'JU', role: 'Head Librarian',
        date: '2026-06-02', views: 308, status: 'published'
      },
      {
        id: 6,
        type: 'academic', pinned: 0,
        title: 'New STEM Laboratory Opens September 2026',
        excerpt: 'A state-of-the-art STEM laboratory funded through a partnership with a technology NGO will open at the start of Term 1.',
        body: `<p>We are thrilled to announce that <strong>EduBright Academy's new STEM Laboratory</strong> will be officially inaugurated at the beginning of Term 1, September 2026.</p>`,
        author: 'Mr. Jean-Claude Nzabanita', authorInitials: 'JN', role: 'Deputy Head (Academics)',
        date: '2026-05-15', views: 755, status: 'published'
      }
    ];

    state.announcements = announcementsSeed;

    // Seed Comments
    state.comments.push(
      { id: 1, announcement_id: 1, author: 'Parent (J. Mugisha)', initials: 'JM', text: 'Thank you for the quick communication! Safety first.', time: '2 hours ago' },
      { id: 2, announcement_id: 1, author: 'Teacher (A. Nkurunziza)', initials: 'AN', text: 'Will there be virtual classes? Students have exams next week.', time: '1 hour ago' },
      { id: 3, announcement_id: 2, author: 'Student (T. Iradukunda)', initials: 'TI', text: 'Will the schedule be posted on the student portal as well?', time: '3 days ago' }
    );

    saveDatabase();
    console.log('Seeded memory-based database successfully.');
  } catch (err) {
    console.error('Error seeding local database state:', err);
  }
}

// ══════════════════════════════════════════
// SQL QUERY SIMULATOR
// ══════════════════════════════════════════

// Simulates INSERT/UPDATE/DELETE (Run)
async function dbRun(query, params = []) {
  query = query.trim().replace(/\s+/g, ' ');

  if (query.startsWith('INSERT INTO users')) {
    const id = state.users.length ? Math.max(...state.users.map(u => u.id)) + 1 : 1;
    const [name, email, role, password, initials, status] = params;
    state.users.push({ id, name, email, role, password, initials, status });
    saveDatabase();
    return { lastID: id };
  }

  if (query.startsWith('INSERT INTO announcements')) {
    const id = state.announcements.length ? Math.max(...state.announcements.map(a => a.id)) + 1 : 1;
    const [type, pinned, title, excerpt, body, author, authorInitials, role, date, views, status] = params;
    state.announcements.push({ id, type, pinned, title, excerpt, body, author, authorInitials, role, date, views, status });
    saveDatabase();
    return { lastID: id };
  }

  if (query.startsWith('INSERT INTO comments')) {
    const id = state.comments.length ? Math.max(...state.comments.map(c => c.id)) + 1 : 1;
    const [announcement_id, author, initials, text, time] = params;
    state.comments.push({ id, announcement_id: Number(announcement_id), author, initials, text, time });
    saveDatabase();
    return { lastID: id };
  }

  if (query.startsWith('UPDATE announcements SET views = views + 1')) {
    const id = Number(params[0]);
    const ann = state.announcements.find(a => a.id === id);
    if (ann) {
      ann.views = (ann.views || 0) + 1;
      saveDatabase();
    }
    return { changes: 1 };
  }

  if (query.startsWith('UPDATE announcements SET type = ?')) {
    // UPDATE announcements SET type = ?, pinned = ?, title = ?, excerpt = ?, body = ?, status = ? WHERE id = ?
    const [type, pinned, title, excerpt, body, status, id] = params;
    const ann = state.announcements.find(a => a.id === Number(id));
    if (ann) {
      ann.type = type;
      ann.pinned = pinned;
      ann.title = title;
      ann.excerpt = excerpt;
      ann.body = body;
      ann.status = status;
      saveDatabase();
    }
    return { changes: 1 };
  }

  if (query.startsWith('DELETE FROM announcements')) {
    const id = Number(params[0]);
    state.announcements = state.announcements.filter(a => a.id !== id);
    saveDatabase();
    return { changes: 1 };
  }

  if (query.startsWith('DELETE FROM comments WHERE announcement_id = ?')) {
    const id = Number(params[0]);
    state.comments = state.comments.filter(c => c.announcement_id !== id);
    saveDatabase();
    return { changes: 1 };
  }

  if (query.startsWith('UPDATE users SET status = COALESCE(?, status)')) {
    const [status, role, id] = params;
    const user = state.users.find(u => u.id === Number(id));
    if (user) {
      if (status !== undefined && status !== null) user.status = status;
      if (role !== undefined && role !== null) user.role = role;
      saveDatabase();
    }
    return { changes: 1 };
  }

  if (query.startsWith('UPDATE users SET name = ?')) {
    // UPDATE users SET name = ?, email = ?, initials = ? ... WHERE id = ?
    const name = params[0];
    const email = params[1];
    const initials = params[2];

    let id;
    let password = null;

    if (params.length === 5) {
      password = params[3];
      id = params[4];
    } else {
      id = params[3];
    }

    const user = state.users.find(u => u.id === Number(id));
    if (user) {
      user.name = name;
      user.email = email;
      user.initials = initials;
      if (password) user.password = password;
      saveDatabase();
    }
    return { changes: 1 };
  }

  return { changes: 0 };
}

// Simulates SELECT multiple (All)
async function dbAll(query, params = []) {
  query = query.trim().replace(/\s+/g, ' ');

  if (query.startsWith('SELECT * FROM announcements WHERE 1=1')) {
    let list = [...state.announcements];

    // Filter type
    const typeIdx = query.indexOf('AND type = ?');
    if (typeIdx !== -1) {
      const typeVal = params[0];
      list = list.filter(a => a.type === typeVal);
    }

    // Filter search query
    const searchIdx = query.indexOf('title LIKE ?');
    if (searchIdx !== -1) {
      // Params has query strings
      const searchVal = params[params.length - 1].replace(/%/g, '').toLowerCase();
      list = list.filter(a => a.title.toLowerCase().includes(searchVal) || a.excerpt.toLowerCase().includes(searchVal));
    }

    // Sort by pinned desc, date desc
    list.sort((a, b) => {
      if (a.pinned !== b.pinned) return b.pinned - a.pinned;
      return new Date(b.date) - new Date(a.date);
    });

    return list;
  }

  if (query.startsWith('SELECT * FROM comments WHERE announcement_id = ?')) {
    const id = Number(params[0]);
    return state.comments.filter(c => c.announcement_id === id).sort((a, b) => a.id - b.id);
  }

  if (query.startsWith('SELECT id, name, email, role, initials, status FROM users')) {
    return state.users.map(u => ({
      id: u.id, name: u.name, email: u.email, role: u.role, initials: u.initials, status: u.status
    }));
  }

  return [];
}

// Simulates SELECT single (Get)
async function dbGet(query, params = []) {
  query = query.trim().replace(/\s+/g, ' ');

  if (query.startsWith('SELECT COUNT(*) as count FROM users')) {
    return { count: state.users.length };
  }

  if (query.startsWith('SELECT * FROM users WHERE email = ?')) {
    const email = params[0];
    const user = state.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    return user || null;
  }

  if (query.startsWith('SELECT id, name, email, role, initials, status FROM users WHERE id = ?')) {
    const id = Number(params[0]);
    const u = state.users.find(x => x.id === id);
    if (!u) return null;
    return { id: u.id, name: u.name, email: u.email, role: u.role, initials: u.initials, status: u.status };
  }

  if (query.startsWith('SELECT * FROM announcements WHERE id = ?')) {
    const id = Number(params[0]);
    const ann = state.announcements.find(a => a.id === id);
    return ann ? { ...ann } : null;
  }

  if (query.startsWith('SELECT * FROM comments WHERE id = ?')) {
    const id = Number(params[0]);
    const com = state.comments.find(c => c.id === id);
    return com || null;
  }

  return null;
}

// Initialize database from disk
loadDatabase();

module.exports = {
  dbRun,
  dbAll,
  dbGet
};
