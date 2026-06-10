import { reactive, computed } from 'vue';

const SAMPLE_ANNOUNCEMENTS = [
  {
    id: 1, type: 'urgent', pinned: true,
    title: 'Urgent: School Closure — Heavy Rainfall Warning',
    excerpt: 'Due to severe weather conditions forecast for tomorrow, the school will remain closed on Thursday, June 5th.',
    body: `<p>Dear Students, Parents, and Staff,</p><p>Following advice from the Rwanda Meteorological Agency regarding heavy rainfall and possible flooding in the region, <strong>EduBright Academy will be closed on Thursday, June 5th, 2025.</strong></p><h3>Key Information</h3><ul><li>All scheduled classes, exams, and activities are postponed.</li><li>Online learning materials will be shared via the student portal by 8:00 AM.</li><li>The rescheduled timetable will be communicated by Friday morning.</li></ul><p>We prioritize the safety of our entire school community. Please stay safe and monitor official weather updates.</p>`,
    author: 'Dr. Marie Uwimana', authorInitials: 'MU', role: 'Headmistress',
    date: '2025-06-04', views: 1240, status: 'published',
    comments: [
      { id: 1, author: 'Parent (J. Mugisha)', initials: 'JM', text: 'Thank you for the quick communication! Safety first.', time: '2 hours ago' },
      { id: 2, author: 'Teacher (A. Nkurunziza)', initials: 'AN', text: 'Will there be virtual classes? Students have exams next week.', time: '1 hour ago' }
    ]
  },
  {
    id: 2, type: 'academic', pinned: false,
    title: 'End-of-Term Examination Schedule — Term 2, 2025',
    excerpt: 'The complete examination timetable for Term 2 is now available. All students must confirm their registration by June 10.',
    body: `<p>The End-of-Term 2 examinations will run from <strong>June 16 to June 27, 2025</strong>. All students are expected to be present 30 minutes before their scheduled exam.</p><h3>Important Dates</h3><ul><li><strong>June 10</strong> — Registration confirmation deadline</li><li><strong>June 14</strong> — Study day (no classes)</li><li><strong>June 16</strong> — Examinations begin</li><li><strong>June 27</strong> — Last examination day</li></ul><p>Students with special accommodations should contact the academic office by June 8.</p>`,
    author: 'Mr. Patrick Habimana', authorInitials: 'PH', role: 'Academic Registrar',
    date: '2025-05-28', views: 892, status: 'published',
    comments: [{ id: 1, author: 'Student (T. Iradukunda)', initials: 'TI', text: 'Will the schedule be posted on the student portal as well?', time: '3 days ago' }]
  },
  {
    id: 3, type: 'event', pinned: false,
    title: 'Annual Cultural Day — June 21, 2025',
    excerpt: "Celebrate Rwanda's rich heritage at our Annual Cultural Day. Students are encouraged to wear traditional attire.",
    body: `<p>EduBright Academy's Annual Cultural Day will take place on <strong>Saturday, June 21, 2025</strong> from 9:00 AM to 4:00 PM on the school grounds.</p><h3>Activities Include</h3><ul><li>Traditional dance performances by student groups</li><li>Art exhibition showcasing student artwork</li><li>Traditional food stalls and cooking demonstrations</li><li>Guest speakers on Rwandan history and culture</li></ul>`,
    author: 'Ms. Alice Mukandayisenga', authorInitials: 'AM', role: 'Events Coordinator',
    date: '2025-05-20', views: 654, status: 'published', comments: []
  },
  {
    id: 4, type: 'holiday', pinned: false,
    title: 'Liberation Day Holiday — School Closed July 4th',
    excerpt: 'In observance of Liberation Day, EduBright Academy will be closed on Friday, July 4, 2025.',
    body: `<p>EduBright Academy will be closed on <strong>Friday, July 4, 2025</strong> in observance of Rwanda's Liberation Day.</p>`,
    author: 'Dr. Marie Uwimana', authorInitials: 'MU', role: 'Headmistress',
    date: '2025-06-01', views: 421, status: 'published', comments: []
  },
  {
    id: 5, type: 'general', pinned: false,
    title: 'Library Hours Extended for Exam Season',
    excerpt: 'The school library will remain open until 8:00 PM on weekdays during the examination period.',
    body: `<p>To support students during the upcoming examination period, the <strong>EduBright Library will extend its hours from June 10 to June 27, 2025</strong>.</p>`,
    author: 'Mrs. Josée Uwera', authorInitials: 'JU', role: 'Head Librarian',
    date: '2025-06-02', views: 308, status: 'published', comments: []
  },
  {
    id: 6, type: 'academic', pinned: false,
    title: 'New STEM Laboratory Opens September 2025',
    excerpt: 'A state-of-the-art STEM laboratory funded through a partnership with a technology NGO will open at the start of Term 1.',
    body: `<p>We are thrilled to announce that <strong>EduBright Academy's new STEM Laboratory</strong> will be officially inaugurated at the beginning of Term 1, September 2025.</p>`,
    author: 'Mr. Jean-Claude Nzabanita', authorInitials: 'JN', role: 'Deputy Head (Academics)',
    date: '2025-05-15', views: 755, status: 'published', comments: []
  }
];

const USERS = [
  { id: 1, name: 'Dr. Habakwizera Etienne', email: 'kwizeraetienne.rw', role: 'admin', password: 'admin123', initials: 'HE', status: 'active' },
  { id: 2, name: 'Jean Bosco Habimana', email: 'jean@edubright.rw', role: 'teacher', password: 'teacher123', initials: 'JB', status: 'active' },
  { id: 3, name: 'Amina Keza', email: 'amina@edubright.rw', role: 'student', password: 'student123', initials: 'AK', status: 'active' },
];

export const store = reactive({
  currentUser: null,
  announcements: [...SAMPLE_ANNOUNCEMENTS],
  users: [...USERS],
  toasts: [],
  settings: { notifEmail: true, notifSMS: false, notifPush: true, darkMode: false, compactView: false, autoRead: true, showAuthor: true, allowComments: true }
});

export const isAdmin = computed(() => store.currentUser?.role === 'admin');

export function login(email, password) {
  const user = store.users.find(u => u.email === email && u.password === password);
  if (user) {
    store.currentUser = user;
    toast('Welcome back, ' + user.name.split(' ')[0] + '!');
    return true;
  }
  return false;
}

export function logout() {
  store.currentUser = null;
}

export function toast(msg, type = 'info') {
  const id = Date.now();
  store.toasts.push({ id, msg, type });
  setTimeout(() => { 
    store.toasts = store.toasts.filter(t => t.id !== id); 
  }, 3000);
}

export function saveAnnouncement(announcementData, isEdit) {
  if (isEdit) {
    const idx = store.announcements.findIndex(a => a.id === announcementData.id);
    if (idx !== -1) {
      store.announcements[idx] = { ...store.announcements[idx], ...announcementData };
    }
    toast('Announcement updated!', 'success');
  } else {
    store.announcements.unshift({ 
      ...announcementData, 
      id: Date.now(), 
      author: store.currentUser.name, 
      authorInitials: store.currentUser.initials, 
      role: store.currentUser.role, 
      date: new Date().toISOString().split('T')[0], 
      views: 0, 
      comments: [] 
    });
    toast('Announcement published!', 'success');
  }
}

export function deleteAnnouncement(annId) {
  store.announcements = store.announcements.filter(a => a.id !== annId);
  toast('Announcement deleted.', 'error');
}

export function addComment(annId, text) {
  const ann = store.announcements.find(a => a.id === annId);
  if (ann) {
    ann.comments.push({ 
      id: Date.now(), 
      author: store.currentUser.name, 
      initials: store.currentUser.initials, 
      text, 
      time: 'Just now' 
    });
    toast('Comment posted!', 'success');
  }
}
