const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

const store = {
  get(k, d) { try { const v = localStorage.getItem('mdr_' + k); return v === null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem('mdr_' + k, JSON.stringify(v)); } catch {} }
};

const SCHOOL = { lat: 40.7128, lng: -74.006, name: 'Future Secondary School' };

const NAV = {
  student: [
    { id: 'home', icon: '🏠', label: 'Home' },
    { id: 'community', icon: '💬', label: 'Community' },
    { id: 'qr', icon: '📱', label: 'QR Attendance' },
    { id: 'exams', icon: '📅', label: 'Exam Schedule' },
    { id: 'rating', icon: '⭐', label: 'Rate Courses' },
    { id: 'quizzes', icon: '🧠', label: 'Online Quizzes' },
    { id: 'behavior', icon: '🏅', label: 'Behavior Points' },
    { id: 'complaints', icon: '🤫', label: 'Confidential Complaint' }
  ],
  parent: [
    { id: 'parent', icon: '👨‍👩‍👦', label: 'Parent Dashboard' },
    { id: 'exams', icon: '📅', label: 'Exam Schedule' },
    { id: 'complaints', icon: '🤫', label: 'Confidential Complaint' }
  ]
};

const PAGE_TITLES = {
  home: 'Home', community: 'Student Community', qr: 'QR Attendance',
  exams: 'Exam Schedule', rating: 'Rate Courses', quizzes: 'Online Quizzes', behavior: 'Behavior & Achievement',
  complaints: 'Confidential Complaints', parent: 'Parent Follow-up'
};

const EXAMS = [
  { id: 1, subject: 'Mathematics', date: '2026-08-27', time: '09:00 AM', room: 'Hall A-101', teacher: 'Dr. Sami Fouad' },
  { id: 2, subject: 'Physics', date: '2026-08-29', time: '11:00 AM', room: 'Hall B-204', teacher: 'Dr. Hala Youssef' },
  { id: 3, subject: 'Chemistry', date: '2026-09-01', time: '09:30 AM', room: 'Chem Lab K-1', teacher: 'Dr. Omar Shaker' },
  { id: 4, subject: 'English', date: '2026-09-03', time: '10:00 AM', room: 'Hall C-12', teacher: 'Ms. Mona Adel' },
  { id: 5, subject: 'Computer Science', date: '2026-09-06', time: '08:00 AM', room: 'Computer Lab 2', teacher: 'Eng. Khaled Ramzy' }
];

const COURSES = [
  { id: 1, name: 'Mathematics', teacher: 'Dr. Sami Fouad', icon: '📐', grad: 'linear-gradient(135deg,#667eea,#764ba2)', avg: 4.2, votes: 128 },
  { id: 2, name: 'Physics', teacher: 'Dr. Hala Youssef', icon: '🧪', grad: 'linear-gradient(135deg,#4d9fff,#2a5fd0)', avg: 3.8, votes: 96 },
  { id: 3, name: 'Chemistry', teacher: 'Dr. Omar Shaker', icon: '⚗️', grad: 'linear-gradient(135deg,#11998e,#38ef7d)', avg: 4.5, votes: 110 },
  { id: 4, name: 'Computer Science', teacher: 'Eng. Khaled Ramzy', icon: '💻', grad: 'linear-gradient(135deg,#ff5e7a,#c471ed)', avg: 4.9, votes: 143 },
  { id: 5, name: 'English Literature', teacher: 'Ms. Mona Adel', icon: '📖', grad: 'linear-gradient(135deg,#f7971e,#ffd200)', avg: 4.0, votes: 88 },
  { id: 6, name: 'History', teacher: 'Mr. Youssef Lotfi', icon: '🏛️', grad: 'linear-gradient(135deg,#56ab2f,#a8e063)', avg: 3.6, votes: 64 }
];

const QUIZZES = [
  { id: 'math', subject: 'Mathematics', icon: '📐', grad: 'linear-gradient(135deg,#667eea,#764ba2)', time: 300, questions: [
    { q: 'What is the derivative of x²?', opts: ['2x', 'x', 'x²/2', '2'], a: 0 },
    { q: 'Solve: 2x + 6 = 14', opts: ['x = 2', 'x = 4', 'x = 6', 'x = 10'], a: 1 },
    { q: 'What is sin(90°)?', opts: ['0', '0.5', '1', '-1'], a: 2 },
    { q: 'The sum of interior angles in a triangle is...', opts: ['90°', '180°', '270°', '360°'], a: 1 },
    { q: 'What is 15% of 200?', opts: ['15', '25', '30', '35'], a: 2 }
  ]},
  { id: 'physics', subject: 'Physics', icon: '🧪', grad: 'linear-gradient(135deg,#4d9fff,#2a5fd0)', time: 300, questions: [
    { q: 'What is the SI unit of force?', opts: ['Joule', 'Newton', 'Watt', 'Pascal'], a: 1 },
    { q: 'The speed of light is approximately...', opts: ['3×10⁸ m/s', '3×10⁶ m/s', '3×10⁵ m/s', '3×10¹⁰ m/s'], a: 0 },
    { q: "Newton's first law is also known as the law of...", opts: ['Gravity', 'Inertia', 'Action-Reaction', 'Momentum'], a: 1 },
    { q: 'Which particle has a negative charge?', opts: ['Proton', 'Neutron', 'Electron', 'Photon'], a: 2 },
    { q: 'If the applied force is zero, the work done is...', opts: ['Maximum', 'Zero', 'Negative', 'Infinite'], a: 1 }
  ]},
  { id: 'chem', subject: 'Chemistry', icon: '⚗️', grad: 'linear-gradient(135deg,#11998e,#38ef7d)', time: 300, questions: [
    { q: 'What is the chemical symbol for Gold?', opts: ['Ag', 'Au', 'Fe', 'Gd'], a: 1 },
    { q: 'What is the pH of a neutral solution?', opts: ['0', '5', '7', '14'], a: 2 },
    { q: 'H₂O₂ is commonly known as...', opts: ['Water', 'Heavy water', 'Hydrogen peroxide', 'Hydrazine'], a: 2 },
    { q: 'The smallest unit of an element is...', opts: ['Molecule', 'Atom', 'Ion', 'Electron'], a: 1 },
    { q: 'NaCl is better known as...', opts: ['Baking soda', 'Table salt', 'Bleach', 'Chalk'], a: 1 }
  ]},
  { id: 'eng', subject: 'English', icon: '📖', grad: 'linear-gradient(135deg,#f7971e,#ffd200)', time: 300, questions: [
    { q: 'Choose the correct sentence:', opts: ["She don't like coffee.", "She doesn't likes coffee.", "She doesn't like coffee.", 'She not like coffee.'], a: 2 },
    { q: 'What is a synonym of "rapid"?', opts: ['Slow', 'Quick', 'Lazy', 'Weak'], a: 1 },
    { q: 'What is the past tense of "go"?', opts: ['goed', 'gone', 'went', 'going'], a: 2 },
    { q: '___ you help me, please?', opts: ['Could', 'Must', 'Should', 'Shall'], a: 0 },
    { q: 'What is the plural of "child"?', opts: ['childs', 'children', 'childrens', 'childes'], a: 1 }
  ]},
  { id: 'cs', subject: 'Computer Science', icon: '💻', grad: 'linear-gradient(135deg,#ff5e7a,#c471ed)', time: 300, questions: [
    { q: 'What does CPU stand for?', opts: ['Central Process Unit', 'Central Processing Unit', 'Computer Personal Unit', 'Central Power Unit'], a: 1 },
    { q: '1 Kilobyte equals how many bytes?', opts: ['100', '1000', '1024', '2048'], a: 2 },
    { q: 'Which language runs natively in a web browser?', opts: ['Python', 'C++', 'JavaScript', 'Java'], a: 2 },
    { q: 'HTML is used for...', opts: ['Styling pages', 'Structuring web pages', 'Managing databases', 'Operating systems'], a: 1 },
    { q: 'In programming, a "bug" is...', opts: ['A new feature', 'An error in the code', 'A computer virus', 'A file type'], a: 1 }
  ]}
];

const CHANNELS = [
  { id: 'general', name: 'general', icon: '💬', desc: 'General student chat — students only 🔒', locked: false },
  { id: 'math', name: 'math', icon: '📐', desc: 'Ask about any problem or lesson', locked: false },
  { id: 'physics', name: 'physics', icon: '🧪', desc: 'Experiments, questions & worksheets', locked: false },
  { id: 'code', name: 'coding', icon: '💻', desc: 'Projects, code & experience', locked: false },
  { id: 'announce', name: 'announcements', icon: '📢', desc: 'Official channel — read only', locked: true }
];

const USERS = [
  { name: 'Sara Ali', color: '#e17076' }, { name: 'Omar Hassan', color: '#7bd88f' },
  { name: 'Layla Mahmoud', color: '#f5a623' }, { name: 'Youssef Ahmed', color: '#4d9fff' },
  { name: 'Mariam Khaled', color: '#c471ed' }, { name: 'Karim Sami', color: '#2ed3a3' }
];

const BOT_REPLIES = [
  'Got it, thanks for clarifying 🙏', 'I totally agree with this point', 'Who actually understood problem 5 in the sheet? 😅',
  "Today's explanation was a bit tough", 'Can someone upload the lecture summary?', 'Good luck everyone in the exam 💪',
  'The teacher said the exam is only from the slides', "I'll be in the study room tonight at 8", 'Awesome 🔥'
];

const SEED_MSGS = {
  general: [
    { user: 'Sara Ali', text: 'Good morning everyone ☀️ group study session today?', time: '8:12 AM', reactions: { '👍': 5, '🔥': 2 } },
    { user: 'Omar Hassan', text: "I'm ready after the last period — voice room as usual?", time: '8:15 AM', reactions: { '👍': 3 } },
    { user: 'Layla Mahmoud', text: "Don't forget the Math exam in 3 days 😰", time: '9:02 AM', reactions: { '😂': 7, '❤️': 4 } }
  ],
  math: [
    { user: 'Youssef Ahmed', text: 'Can anyone explain the last calculus rule?', time: 'Yesterday 9:40 PM', reactions: { '🤝': 4 } },
    { user: 'Mariam Khaled', text: 'Uploaded the full worksheet solutions in the files section 📎', time: 'Yesterday 10:05 PM', reactions: { '❤️': 9, '👍': 6 } }
  ],
  physics: [
    { user: 'Karim Sami', text: "Today's electromagnetic induction experiment was epic ⚡", time: '10:31 AM', reactions: { '🔥': 5 } }
  ],
  code: [
    { user: 'Mariam Khaled', text: "Who's joining the school hackathon? 💻", time: 'Yesterday 6:22 PM', reactions: { '🎉': 8 } }
  ],
  announce: [
    { user: 'Administration', text: '📌 Notice: The Math exam is next Thursday at 9:00 AM in Hall A-101. Please arrive 15 minutes early with your student ID.', time: 'Yesterday 12:00 PM', reactions: { '👍': 21 }, pinned: true },
    { user: 'Administration', text: '📌 The QR attendance system is now active — scan your code from the student panel every morning before the first period.', time: 'Sunday 9:00 AM', reactions: { '👍': 14 }, pinned: true }
  ]
};

const BADGES = [
  { id: 'commit', emoji: '🎯', name: 'Committed', desc: '30-day attendance streak', need: 50 },
  { id: 'shine', emoji: '🌟', name: 'Shining', desc: 'Earn 100 points', need: 100 },
  { id: 'helper', emoji: '🤝', name: 'Helper', desc: 'Helped 10 classmates', need: 120 },
  { id: 'ideal', emoji: '📚', name: 'Role Model', desc: 'Average above 90%', need: 140 },
  { id: 'active', emoji: '🔥', name: 'Active', desc: 'Earn 160 points', need: 160 },
  { id: 'legend', emoji: '👑', name: 'Legend', desc: 'Earn 200 points', need: 200 }
];

let state = {
  role: 'student',
  user: null,
  channel: 'general',
  msgs: {},
  points: store.get('points', 142),
  history: [
    { t: 'Great class participation', p: 3, time: 'Today 10:20 AM' },
    { t: 'Physics homework submitted on time', p: 5, time: 'Yesterday 4:45 PM' },
    { t: 'Late to the first period', p: -1, time: 'Yesterday 8:05 AM' },
    { t: 'Helped a classmate on a coding project', p: 2, time: 'Sunday 12:30 PM' },
    { t: 'Helped organize a school activity', p: 4, time: 'Thursday 11:00 AM' }
  ],
  ratings: store.get('ratings', {}),
  bells: store.get('bells', [1, 2]),
  complaints: store.get('complaints', []),
  attendLog: store.get('attend', [
    { day: 'Sunday', date: '2026-08-23', time: '7:42 AM', method: 'QR + GPS', ok: true },
    { day: 'Thursday', date: '2026-08-20', time: '7:51 AM', method: 'QR + GPS', ok: true },
    { day: 'Wednesday', date: '2026-08-19', time: '8:20 AM', method: 'QR + GPS', ok: true }
  ]),
  gps: { ok: false, dist: null },
  offline: false,
  pending: store.get('pending', 0),
  scanned: null,
  qrToken: '',
  qrRemain: 30,
  anonId: Math.floor(1000 + Math.random() * 9000),
  voice: { joined: false, muted: false },
  childIdx: 0,
  cbWelcomed: false
};

let quizState = { running: false, quiz: null, idx: 0, score: 0, answers: [], remain: 0, int: null, locked: false };

const CHILDREN = [
  {
    name: 'Ahmed Mohamed', color: '#7c5cff', attend: 96, grade: 91, points: 142,
    absent: { excused: 1, unexcused: 0 },
    week: [100, 100, 100, 100, 0, 100, 100],
    days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Sun', 'Mon'],
    grades: [
      { s: 'Mathematics', v: 94 }, { s: 'Physics', v: 89 }, { s: 'Chemistry', v: 92 },
      { s: 'English', v: 90 }, { s: 'Computer Science', v: 97 }, { s: 'Arabic', v: 84 }
    ],
    log: [
      { day: 'Mon', date: 'Aug 24', st: 'present' }, { day: 'Sun', date: 'Aug 23', st: 'present' },
      { day: 'Thu', date: 'Aug 20', st: 'excused' }, { day: 'Wed', date: 'Aug 19', st: 'present' },
      { day: 'Tue', date: 'Aug 18', st: 'present' }, { day: 'Mon', date: 'Aug 17', st: 'present' }
    ],
    feed: [
      { i: '✅', t: 'Ahmed checked in today at 7:42 AM', time: 'Today 07:42' },
      { i: '🏅', t: 'Ahmed earned +3 points: great participation', time: 'Today 10:20' },
      { i: '📅', t: 'Reminder: Math exam in 3 days', time: 'Today 08:00' }
    ]
  },
  {
    name: 'Sara Mohamed', color: '#ff5e7a', attend: 88, grade: 84, points: 118,
    absent: { excused: 2, unexcused: 1 },
    week: [100, 100, 0, 100, 0, 100, 100],
    days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Sun', 'Mon'],
    grades: [
      { s: 'Mathematics', v: 81 }, { s: 'Physics', v: 76 }, { s: 'Chemistry', v: 85 },
      { s: 'English', v: 88 }, { s: 'Computer Science', v: 90 }, { s: 'Arabic', v: 83 }
    ],
    log: [
      { day: 'Mon', date: 'Aug 24', st: 'absent' }, { day: 'Sun', date: 'Aug 23', st: 'present' },
      { day: 'Thu', date: 'Aug 20', st: 'excused' }, { day: 'Wed', date: 'Aug 19', st: 'present' },
      { day: 'Tue', date: 'Aug 18', st: 'absent' }, { day: 'Mon', date: 'Aug 17', st: 'present' }
    ],
    feed: [
      { i: '🔴', t: 'Important: Sara is absent today without an excuse — please contact the administration', time: 'Today 08:10', danger: true },
      { i: '📉', t: "Sara's Physics grade dropped: 76%", time: 'Yesterday 14:00' },
      { i: '✅', t: 'Sara attended on Sunday', time: 'Sunday 07:55' }
    ]
  }
];

const NOTIFS = [
  { i: '📅', t: 'Math exam in 3 days — 9:00 AM', time: '1h ago', unread: true },
  { i: '🏅', t: 'You earned +3 points: great participation!', time: '3h ago', unread: true },
  { i: '📢', t: 'New announcement: QR attendance is now live', time: 'Yesterday', unread: true },
  { i: '💬', t: 'Mariam Khaled mentioned you in #coding', time: 'Yesterday' }
];

const AV_COLORS = ['#e17076', '#7bd88f', '#f5a623', '#4d9fff', '#c471ed', '#2ed3a3', '#ff8f5e'];
function avColor(name) { let h = 0; for (const c of name) h = (h * 31 + c.charCodeAt(0)) >>> 0; return AV_COLORS[h % AV_COLORS.length]; }
function now() { return new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }); }
function esc(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
function daysUntil(dateStr) { return Math.ceil((new Date(dateStr + 'T09:00:00') - new Date()) / 86400000); }

function toast(msg, type = 'info') {
  const el = document.createElement('div');
  el.className = 'toast ' + type;
  el.innerHTML = msg;
  $('#toasts').appendChild(el);
  setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 320); }, 4200);
}

function login() {
  const name = $('#loginName').value.trim() || 'Ahmed Mohamed';
  const pass = $('#loginPass').value;
  if (!pass) { toast('⚠️ Please enter your password', 'warn'); $('#loginPass').focus(); return; }
  state.role = $('.role-card.selected').dataset.role;
  state.user = { name, initial: name[0] };
  $('#loginScreen').classList.add('hidden');
  $('#app').classList.remove('hidden');
  $('#sideName').textContent = name;
  $('#sideRole').textContent = state.role === 'student' ? 'Student' : 'Parent';
  $('#sideAvatar').textContent = name[0];
  $('#topAvatar').textContent = name[0];
  $('#sideAvatar').style.background = avColor(name);
  $('#topAvatar').style.background = avColor(name);
  $('#welcomeName').textContent = name.split(' ')[0];
  renderNav();
  renderNotifs();
  renderCommunity();
  navigate(state.role === 'parent' ? 'parent' : 'home');
  setTimeout(() => {
    if (state.role === 'student') toast('🔔 Reminder: <b>Math</b> exam in <b>3 days</b> — 9:00 AM', 'warn');
    else toast('👋 Welcome — follow your children in real time', 'info');
  }, 900);
}

function logout() {
  $('#app').classList.add('hidden');
  $('#loginScreen').classList.remove('hidden');
  $('#sidebar').classList.remove('open');
}

function renderNav() {
  $('#sideNav').innerHTML = NAV[state.role].map(n =>
    `<button class="nav-item" data-page="${n.id}"><span class="nav-icon">${n.icon}</span>${n.label}</button>`
  ).join('');
  $$('#sideNav .nav-item').forEach(b => b.onclick = () => navigate(b.dataset.page));
}

function navigate(id) {
  const prev = $('.page.active');
  const prevId = prev ? prev.id.replace('page-', '') : null;
  if (prevId === 'quizzes' && quizState.running) {
    clearInterval(quizState.int);
    quizState.running = false;
    toast('⏹ Quiz cancelled', 'info');
  }
  if (state.role === 'parent' && (id === 'home' || id === 'community' || id === 'qr' || id === 'rating' || id === 'behavior' || id === 'quizzes')) id = 'parent';
  $$('.page').forEach(p => p.classList.remove('active'));
  const page = $('#page-' + id);
  if (page) page.classList.add('active');
  $$('#sideNav .nav-item').forEach(b => b.classList.toggle('active', b.dataset.page === id));
  $('#pageTitle').textContent = PAGE_TITLES[id] || '';
  $('#sidebar').classList.remove('open');
  if (id === 'qr') { drawQR(state.qrToken || newToken()); }
  if (id === 'home') renderHome();
  if (id === 'exams') renderExams();
  if (id === 'rating') renderRating();
  if (id === 'quizzes') renderQuizList();
  if (id === 'behavior') renderBehavior();
  if (id === 'complaints') renderComplaints();
  if (id === 'parent') renderParent();
}

function renderHome() {
  const next = [...EXAMS].sort((a, b) => a.date.localeCompare(b.date))[0];
  $('#statNextExam').textContent = daysUntil(next.date) + ' days';
  $('#statPoints').textContent = state.points;
  $('#statAttend').textContent = '96%';
  $('#miniExams').innerHTML = EXAMS.slice(0, 4).map(e => {
    const d = daysUntil(e.date);
    const dt = new Date(e.date + 'T00:00:00');
    return `<li>
      <div class="me-date">${dt.getDate()}<small>${dt.toLocaleDateString('en-US', { month: 'short' })}</small></div>
      <div style="flex:1"><b>${e.subject}</b><br><small class="muted">${e.time} — ${e.room}</small></div>
      <span class="days-chip ${d <= 3 ? 'soon' : ''}">in ${d} days</span>
    </li>`;
  }).join('');
}

function renderNotifs() {
  const unread = NOTIFS.filter(n => n.unread).length;
  $('#notifBadge').textContent = unread;
  $('#notifBadge').classList.toggle('hidden', unread === 0);
  $('#notifPanel').innerHTML = `
    <div class="notif-head"><b>Notifications</b><button id="markRead">Mark all as read</button></div>
    ${NOTIFS.map(n => `<div class="notif-item ${n.unread ? 'unread' : ''}">
      <span class="n-icon">${n.i}</span>
      <div>${n.t}<small>${n.time}</small></div>
    </div>`).join('')}`;
  $('#markRead').onclick = () => { NOTIFS.forEach(n => n.unread = false); renderNotifs(); };
}

function renderCommunity() {
  $('#channelList').innerHTML = CHANNELS.map(c =>
    `<li><button class="chan ${c.id === state.channel ? 'active' : ''} ${c.locked ? 'locked' : ''}" data-ch="${c.id}">
      ${c.icon} ${c.name} ${c.locked ? '<span class="lock">🔒</span>' : ''}
    </button></li>`).join('');
  $$('#channelList .chan').forEach(b => b.onclick = () => {
    state.channel = b.dataset.ch;
    renderChannel();
  });
  const online = USERS.slice(0, 5);
  $('#onlineCount').textContent = 13 + online.length;
  $('#onlineList').innerHTML = online.map(u =>
    `<li class="online-user"><div class="avatar sm" style="background:${u.color}">${u.name[0]}</div>${u.name}<span class="online-dot"></span></li>`).join('');
  renderVoice();
  renderEmoji();
  renderChannel();
}

function renderChannel() {
  const ch = CHANNELS.find(c => c.id === state.channel);
  $('#chatTitle').textContent = `# ${ch.name}`;
  $('#chatDesc').textContent = ch.desc;
  if (!state.msgs[ch.id]) state.msgs[ch.id] = [...SEED_MSGS[ch.id]];
  renderMsgs();
  const input = $('#msgInput');
  input.disabled = ch.locked;
  input.placeholder = ch.locked ? 'This channel is read-only 🔒' : 'Type a message...';
  $('#sendBtn').disabled = ch.locked;
}

function renderMsgs() {
  const box = $('#chatMsgs');
  const myName = state.user ? state.user.name : '';
  box.innerHTML = state.msgs[state.channel].map((m, i) => {
    const mine = m.user === myName;
    const color = m.user === 'Administration' ? 'var(--amber)' : avColor(m.user);
    const reacts = Object.entries(m.reactions || {}).map(([e, c]) =>
      `<button class="react ${m.myReact === e ? 'active' : ''}" data-i="${i}" data-e="${e}">${e} ${c}</button>`).join('');
    return `<div class="msg ${mine ? 'mine' : ''} ${m.pinned ? 'announce' : ''}">
      <div class="avatar" style="background:${color}">${m.user[0]}</div>
      <div class="msg-body">
        <div class="msg-head"><b>${esc(m.user)}</b>${m.pinned ? '<span class="chip">📌 Pinned</span>' : ''}<time>${m.time}</time></div>
        <p>${esc(m.text)}</p>
        ${m.pinned ? '' : `<div class="reactions">${reacts}<button class="react-add" data-i="${i}">😊+</button></div>`}
      </div>
    </div>`;
  }).join('');
  box.scrollTop = box.scrollHeight;
  $$('#chatMsgs .react').forEach(b => b.onclick = () => toggleReact(+b.dataset.i, b.dataset.e));
  $$('#chatMsgs .react-add').forEach(b => b.onclick = () => {
    const pool = ['👍', '❤️', '😂', '🔥', '🎉', '😮'];
    toggleReact(+b.dataset.i, pool[Math.floor(Math.random() * pool.length)]);
  });
}

function toggleReact(i, e) {
  const m = state.msgs[state.channel][i];
  m.reactions = m.reactions || {};
  if (m.myReact === e) { m.reactions[e]--; if (m.reactions[e] <= 0) delete m.reactions[e]; m.myReact = null; }
  else {
    if (m.myReact && m.reactions[m.myReact]) { m.reactions[m.myReact]--; if (m.reactions[m.myReact] <= 0) delete m.reactions[m.myReact]; }
    m.reactions[e] = (m.reactions[e] || 0) + 1;
    m.myReact = e;
  }
  renderMsgs();
}

function sendMsg() {
  const ch = CHANNELS.find(c => c.id === state.channel);
  if (ch.locked) return;
  const input = $('#msgInput');
  const text = input.value.trim();
  if (!text) return;
  state.msgs[state.channel].push({ user: state.user.name, text, time: now(), reactions: {} });
  input.value = '';
  renderMsgs();
  const reply = BOT_REPLIES[Math.floor(Math.random() * BOT_REPLIES.length)];
  const who = USERS[Math.floor(Math.random() * USERS.length)].name;
  setTimeout(() => {
    state.msgs[state.channel].push({ user: who, text: reply, time: now(), reactions: {} });
    if ($('#page-community').classList.contains('active')) renderMsgs();
  }, 1200 + Math.random() * 1800);
}

function renderVoice() {
  const users = USERS.slice(0, 4);
  if (state.voice.joined) users.push({ name: state.user.name, color: avColor(state.user.name), me: true });
  $('#voiceCount').textContent = users.length;
  $('#voiceUsers').innerHTML = users.map((u, i) =>
    `<div class="voice-user ${!state.voice.muted && i % 2 === 0 ? 'speaking' : ''}" title="${esc(u.name)}">
      <div class="avatar" style="background:${u.color}">${u.name[0]}</div>
    </div>`).join('');
  $('#voiceBtn').textContent = state.voice.joined ? '🚪 Leave Room' : '🎙️ Join Room';
  $('#muteBtn').classList.toggle('hidden', !state.voice.joined);
  $('#muteBtn').textContent = state.voice.muted ? '🔇 Muted — Unmute' : '🎙️ Mute Mic';
}

function renderEmoji() {
  const emojis = ['😀', '😂', '😍', '👍', '🔥', '🎉', '😮', '😢', '🤔', '💪', '❤️', '📚'];
  $('#emojiBar').innerHTML = emojis.map(e => `<button data-e="${e}">${e}</button>`).join('');
  $$('#emojiBar button').forEach(b => b.onclick = () => {
    const input = $('#msgInput');
    input.value += b.dataset.e;
    input.focus();
  });
}

function newToken() {
  const seg = () => Math.random().toString(36).slice(2, 6).toUpperCase();
  state.qrToken = `ATT-${seg()}-${seg()}`;
  state.qrRemain = 30;
  state.scanned = null;
  $('#qrToken').textContent = state.qrToken;
  drawQR(state.qrToken);
  setQrStatus('Code refreshed — scan it from the school app', '');
  return state.qrToken;
}

function seededRand(seed) {
  let s = 2166136261;
  for (let i = 0; i < seed.length; i++) { s ^= seed.charCodeAt(i); s = Math.imul(s, 16777619) >>> 0; }
  return () => { s ^= s << 13; s >>>= 0; s ^= s >> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; };
}

function drawQR(token) {
  const c = $('#qrCanvas');
  if (!c || !c.getContext) return;
  const ctx = c.getContext('2d');
  if (!ctx) return;
  const n = 25, cell = c.width / n;
  const rnd = seededRand(token || 'x');
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.fillStyle = '#111';
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++)
    if (rnd() > 0.52) ctx.fillRect(x * cell, y * cell, cell - 0.6, cell - 0.6);
  const finder = (fx, fy) => {
    ctx.fillStyle = '#111'; ctx.fillRect(fx * cell, fy * cell, 7 * cell, 7 * cell);
    ctx.fillStyle = '#fff'; ctx.fillRect((fx + 1) * cell, (fy + 1) * cell, 5 * cell, 5 * cell);
    ctx.fillStyle = '#111'; ctx.fillRect((fx + 2) * cell, (fy + 2) * cell, 3 * cell, 3 * cell);
  };
  finder(0, 0); finder(n - 7, 0); finder(0, n - 7);
}

function tickQR() {
  if (!state.user) return;
  state.qrRemain--;
  if (state.qrRemain <= 0) { newToken(); }
  $('#qrCount').textContent = state.qrRemain;
  const ring = $('#ringFg');
  const C = 351.86;
  ring.style.strokeDashoffset = C * (1 - state.qrRemain / 30);
  ring.classList.toggle('warn', state.qrRemain <= 10 && state.qrRemain > 5);
  ring.classList.toggle('crit', state.qrRemain <= 5);
}

function setQrStatus(msg, cls) {
  const el = $('#qrStatus');
  el.textContent = msg;
  el.className = 'qr-status ' + cls;
}

function haversine(lat1, lng1, lat2, lng2) {
  const R = 6371000, toR = x => x * Math.PI / 180;
  const dLat = toR(lat2 - lat1), dLng = toR(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toR(lat1)) * Math.cos(toR(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function setGps(ok, dist, note) {
  state.gps = { ok, dist };
  const box = $('#gpsBox');
  box.className = 'gps-box ' + (ok ? 'ok' : 'err');
  box.innerHTML = note;
}

function requestGps() {
  setGps(false, null, '⏳ Detecting your location...');
  if (!navigator.geolocation) { setGps(false, null, 'Geolocation is not supported by this browser'); return; }
  navigator.geolocation.getCurrentPosition(pos => {
    const d = haversine(pos.coords.latitude, pos.coords.longitude, SCHOOL.lat, SCHOOL.lng);
    if (d <= 200) setGps(true, d, `✅ You are inside the school geofence<br>Distance: ~${Math.round(d)} m`);
    else setGps(false, d, `❌ You are outside the school geofence<br>~${d > 1000 ? (d / 1000).toFixed(1) + ' km' : Math.round(d) + ' m'} away from ${SCHOOL.name}`);
  }, () => {
    setGps(false, null, '⚠️ Location permission denied — use the simulate button to try it');
  }, { timeout: 8000 });
}

function simulateGps() {
  const d = Math.round(20 + Math.random() * 120);
  setGps(true, d, `✅ Inside the school geofence (simulated)<br>Distance: ~${d} m from ${SCHOOL.name}`);
  toast('📍 Location verified: inside the geofence ✓', 'success');
}

function scanQR() {
  state.scanned = state.qrToken;
  setQrStatus(`📷 Scanned code ${state.scanned} — now press "Check In"`, 'ok');
}

function checkin() {
  if (!state.gps.ok) { setQrStatus('⚠️ Verify your GPS location first', 'err'); toast('📍 Verify your location first (anti-cheating)', 'warn'); return; }
  if (!state.scanned) { setQrStatus('⚠️ Scan the QR code first', 'err'); return; }
  if (state.scanned !== state.qrToken) { setQrStatus('⛔ Code expired! A new one was already generated — scan again (anti-fraud system)', 'err'); state.scanned = null; return; }
  const rec = { day: new Date().toLocaleDateString('en-US', { weekday: 'long' }), date: new Date().toISOString().slice(0, 10), time: now(), method: state.offline ? 'QR (offline)' : 'QR + GPS', ok: true };
  state.attendLog.unshift(rec);
  store.set('attend', state.attendLog.slice(0, 30));
  if (state.offline) {
    state.pending++;
    store.set('pending', state.pending);
    updatePending();
    toast('📴 Checked in locally — records will sync when you are back online', 'warn');
  } else {
    toast('✅ Checked in successfully at ' + rec.time, 'success');
  }
  setQrStatus('✅ You are checked in for today — have a great day!', 'ok');
  state.scanned = null;
  renderAttend();
}

function updatePending() {
  $('#pendingSync').classList.toggle('hidden', state.pending === 0);
  $('#pendingCount').textContent = state.pending;
}

function renderAttend() {
  $('#attendTable').innerHTML = state.attendLog.slice(0, 8).map(r =>
    `<tr><td>${r.day}</td><td>${r.date}</td><td>${r.time}</td><td>${r.method}</td><td><span class="chip" style="color:var(--green)">✅ Present</span></td></tr>`).join('')
    || '<tr><td colspan="5" class="muted">No records yet</td></tr>';
}

function renderExams() {
  const bells = store.get('bells', state.bells);
  $('#examsGrid').innerHTML = EXAMS.map(e => {
    const d = daysUntil(e.date);
    const dt = new Date(e.date + 'T00:00:00');
    const on = bells.includes(e.id);
    return `<div class="exam-card">
      <div class="exam-top">
        <div><div class="exam-subject">${e.subject}</div><div class="exam-teacher">${e.teacher}</div></div>
        <button class="bell ${on ? 'on' : ''}" data-exam="${e.id}" title="Remind me before this exam">${on ? '🔔' : '🔕'}</button>
      </div>
      <div class="exam-meta">
        <span>🕐 ${e.time}</span>
        <span>📍 ${e.room}</span>
        <span>🗓️ ${dt.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
      </div>
      <div class="exam-date"><span>Countdown</span><span class="days-chip ${d <= 3 ? 'soon' : ''}">${d === 0 ? 'Today!' : 'in ' + d + ' days'}</span></div>
    </div>`;
  }).join('');
  $$('#examsGrid .bell').forEach(b => b.onclick = () => {
    const id = +b.dataset.exam;
    let bells = store.get('bells', state.bells);
    if (bells.includes(id)) { bells = bells.filter(x => x !== id); toast('🔕 Reminder cancelled for ' + EXAMS.find(e => e.id === id).subject, 'info'); }
    else { bells.push(id); toast('🔔 You will get a reminder before ' + EXAMS.find(e => e.id === id).subject, 'success'); askNotifPermission(false); }
    store.set('bells', bells);
    state.bells = bells;
    b.classList.toggle('on');
    b.textContent = bells.includes(id) ? '🔔' : '🔕';
  });
}

function enableAllNotifs() {
  store.set('bells', EXAMS.map(e => e.id));
  state.bells = EXAMS.map(e => e.id);
  renderExams();
  askNotifPermission(true);
}

function askNotifPermission(announce) {
  if (!('Notification' in window)) { toast('Your browser does not support notifications — in-app alerts will be used 🔔', 'info'); return; }
  Notification.requestPermission().then(p => {
    if (p === 'granted') {
      new Notification('MySchool 🎓', { body: announce ? 'You will be notified before every exam and about absences ✅' : 'Reminders enabled successfully ✅' });
      toast('🔔 Notifications enabled successfully', 'success');
    } else toast('ℹ️ Notifications are blocked in the browser — you will still get in-app alerts', 'info');
  });
}

function downloadPDF() {
  const w = window.open('', '_blank');
  if (!w) { toast('⚠️ Allow pop-ups to export the PDF', 'warn'); return; }
  const rows = EXAMS.map(e => {
    const dt = new Date(e.date + 'T00:00:00');
    return `<tr><td>${e.subject}</td><td>${dt.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</td><td>${e.time}</td><td>${e.room}</td><td>${e.teacher}</td></tr>`;
  }).join('');
  w.document.write(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Exam Schedule</title>
  <style>body{font-family:'Segoe UI',Tahoma,sans-serif;padding:34px;color:#1a1a2e}
  h1{text-align:center;color:#5b3cc4}p{text-align:center;color:#777}
  table{width:100%;border-collapse:collapse;margin-top:24px}
  th,td{border:1px solid #ccc;padding:11px;text-align:center}
  th{background:#5b3cc4;color:#fff}.foot{margin-top:30px;font-size:.8rem;color:#999;text-align:center}</style>
  </head><body>
  <h1>🎓 Term Exam Schedule</h1>
  <p>${SCHOOL.name} — Grade 11 (Science)</p>
  <table><thead><tr><th>Subject</th><th>Date</th><th>Time</th><th>Room</th><th>Teacher</th></tr></thead><tbody>${rows}</tbody></table>
  <p class="foot">Please arrive 15 minutes before the exam — MySchool Platform</p>
  <script>window.onload=()=>window.print()<\/script>
  </body></html>`);
  w.document.close();
  toast('⬇️ Choose "Save as PDF" in the print dialog', 'info');
}

function renderRating() {
  $('#coursesGrid').innerHTML = COURSES.map(c => {
    const my = state.ratings[c.id] || 0;
    const avg = my ? ((c.avg * c.votes + my) / (c.votes + 1)).toFixed(1) : c.avg.toFixed(1);
    return `<div class="course-card">
      <div class="course-poster" style="background:${c.grad}">
        ${c.icon}<span class="avg">⭐ ${avg}</span>
      </div>
      <div class="course-info">
        <b>${c.name}</b>
        <small>${c.teacher} — ${c.votes + (my ? 1 : 0)} ratings</small>
        <div class="stars">
          ${[1, 2, 3, 4, 5].map(s => `<button class="star ${s <= my ? 'on' : ''}" data-course="${c.id}" data-star="${s}">★</button>`).join('')}
        </div>
        <div class="my-rating">${my ? `Your rating: ${my}/5 — thanks! ✅` : 'Tap the stars to rate'}</div>
      </div>
    </div>`;
  }).join('');
  $$('#coursesGrid .star').forEach(b => b.onclick = () => {
    const id = +b.dataset.course, star = +b.dataset.star;
    state.ratings[id] = star;
    store.set('ratings', state.ratings);
    renderRating();
    toast(`⭐ Thanks! You rated "${COURSES.find(c => c.id === id).name}" ${star}/5`, 'success');
  });
}

function fmtTime(s) { return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); }

function renderQuizList() {
  const best = store.get('quizBest', {});
  $('#quizList').classList.remove('hidden');
  $('#quizRunner').classList.add('hidden');
  $('#quizRunner').innerHTML = '';
  $('#quizList').innerHTML = QUIZZES.map(q => {
    const b = best[q.id];
    return `<div class="quiz-card">
      <div class="quiz-poster" style="background:${q.grad}">${q.icon}<span class="quiz-best">${b ? '🏆 ' + b + '/' + q.questions.length : 'New'}</span></div>
      <div class="quiz-info">
        <b>${q.subject}</b>
        <div class="quiz-meta"><span>❓ ${q.questions.length} questions</span><span>⏱️ ${Math.round(q.time / 60)} min</span></div>
        <button class="btn btn-primary btn-sm" data-quiz="${q.id}">▶ Start Quiz</button>
      </div>
    </div>`;
  }).join('');
  $$('#quizList [data-quiz]').forEach(b => b.onclick = () => startQuiz(b.dataset.quiz));
}

function startQuiz(id) {
  const q = QUIZZES.find(x => x.id === id);
  quizState = { running: true, quiz: q, idx: 0, score: 0, answers: [], remain: q.time, int: null, locked: false };
  $('#quizList').classList.add('hidden');
  $('#quizRunner').classList.remove('hidden');
  renderQuestion();
  quizState.int = setInterval(() => {
    quizState.remain--;
    const t = $('#qTimer');
    if (t) { t.textContent = fmtTime(quizState.remain); t.classList.toggle('crit', quizState.remain <= 15); }
    if (quizState.remain <= 0 && quizState.running) finishQuiz(true);
  }, 1000);
}

function renderQuestion() {
  const qz = quizState.quiz, q = qz.questions[quizState.idx];
  $('#quizRunner').innerHTML = `
    <div class="card quiz-runner">
      <div class="qr-head">
        <b>${qz.icon} ${qz.subject}</b>
        <span class="qr-timer-chip" id="qTimer">${fmtTime(quizState.remain)}</span>
      </div>
      <div class="q-progress"><div style="width:${(quizState.idx / qz.questions.length) * 100}%"></div></div>
      <small class="q-count">Question ${quizState.idx + 1} of ${qz.questions.length}</small>
      <div class="q-question">${q.q}</div>
      <div class="q-opts">
        ${q.opts.map((o, i) => `<button class="q-opt" data-i="${i}"><span class="q-letter">${'ABCD'[i]}</span>${esc(o)}</button>`).join('')}
      </div>
      <div class="q-foot"><span class="q-feedback" id="qFb"></span><button class="btn btn-primary btn-sm hidden" id="qNext">Next →</button></div>
    </div>`;
  $$('#quizRunner .q-opt').forEach(b => b.onclick = () => selectOpt(+b.dataset.i));
  $('#qNext').onclick = () => {
    quizState.idx++;
    if (quizState.idx >= quizState.quiz.questions.length) finishQuiz(false);
    else renderQuestion();
  };
}

function selectOpt(i) {
  if (quizState.locked) return;
  quizState.locked = true;
  const q = quizState.quiz.questions[quizState.idx];
  const opts = $$('#quizRunner .q-opt');
  opts.forEach(b => b.disabled = true);
  opts[q.a].classList.add('correct');
  const fb = $('#qFb');
  if (i === q.a) { quizState.score++; fb.textContent = '✅ Correct!'; fb.className = 'q-feedback ok'; }
  else { opts[i].classList.add('wrong'); fb.textContent = '❌ Wrong — correct: ' + q.opts[q.a]; fb.className = 'q-feedback no'; }
  quizState.answers.push(i);
  const next = $('#qNext');
  next.classList.remove('hidden');
  next.textContent = quizState.idx === quizState.quiz.questions.length - 1 ? 'See Results 🏁' : 'Next →';
}

function finishQuiz(timeout) {
  clearInterval(quizState.int);
  quizState.running = false;
  const qz = quizState.quiz;
  const best = store.get('quizBest', {});
  const isBest = !best[qz.id] || quizState.score > best[qz.id];
  if (isBest) { best[qz.id] = quizState.score; store.set('quizBest', best); }
  const pct = Math.round(quizState.score / qz.questions.length * 100);
  const msg = pct >= 80 ? 'Excellent work! 🌟' : pct >= 60 ? 'Good job — keep practicing! 👍' : 'Keep studying, you can do it! 💪';
  $('#quizRunner').innerHTML = `
    <div class="card quiz-result">
      <h3>${timeout ? '⏰ Time is up!' : '🏁 Quiz Complete!'}</h3>
      <div class="score-circle" style="background:conic-gradient(${pct >= 60 ? 'var(--green)' : 'var(--red)'} ${pct * 3.6}deg, var(--bg2) 0)"><b>${quizState.score}/${qz.questions.length}</b></div>
      <p class="muted">${msg} ${isBest ? '— 🏆 New best score!' : ''}</p>
      <div class="q-review">
        ${qz.questions.map((q, i) => {
          const ok = quizState.answers[i] === q.a;
          return `<div class="q-review-item ${ok ? 'ok' : 'no'}">
            <div class="r-q">${ok ? '✅' : '❌'} ${q.q}</div>
            <div class="r-a">Your answer: ${quizState.answers[i] != null ? esc(q.opts[quizState.answers[i]]) : '—'}${ok ? '' : ' · Correct: ' + esc(q.opts[q.a])}</div>
          </div>`;
        }).join('')}
      </div>
      <div style="display:flex;gap:10px;justify-content:center;margin-top:18px">
        <button class="btn btn-ghost" id="qBack">← All Quizzes</button>
        <button class="btn btn-primary" id="qRetry">🔄 Retry</button>
      </div>
    </div>`;
  $('#qBack').onclick = renderQuizList;
  $('#qRetry').onclick = () => startQuiz(qz.id);
  toast(`🧠 ${qz.subject}: you scored ${quizState.score}/${qz.questions.length}${isBest ? ' — new best! 🏆' : ''}`, pct >= 60 ? 'success' : 'warn');
}

function levelInfo(p) {
  const per = 40;
  const level = Math.floor(p / per) + 1;
  const inLevel = p % per;
  return { level, inLevel, pct: (inLevel / per) * 100, need: per - inLevel };
}

function renderBehavior() {
  const p = state.points;
  const li = levelInfo(p);
  $('#pointsBig').textContent = p;
  $('#levelFill').style.width = li.pct + '%';
  $('#levelLabel').textContent = `Level ${li.level} — ${li.need} points to Level ${li.level + 1}`;
  $('#badgesGrid').innerHTML = BADGES.map(b => {
    const un = p >= b.need;
    return `<div class="badge-card ${un ? 'unlocked' : 'locked'}">
      <span class="b-emoji">${b.emoji}</span><b>${b.name}</b><small>${un ? 'Unlocked ✓' : b.desc}</small>
    </div>`;
  }).join('');
  $('#pointsHistory').innerHTML = state.history.slice(0, 7).map(h =>
    `<li class="ph-item">
      <span>${h.p > 0 ? '➕' : '➖'}</span>
      <div style="flex:1">${h.t}<small>${h.time}</small></div>
      <span class="ph-pts ${h.p > 0 ? 'pos' : 'neg'}">${h.p > 0 ? '+' : ''}${h.p}</span>
    </li>`).join('');
  const board = [
    { n: 'Sara Ali', p: 186 }, { n: 'Omar Hassan', p: 165 }, { n: state.user ? state.user.name : 'Ahmed Mohamed', p: state.points, me: true },
    { n: 'Layla Mahmoud', p: 138 }, { n: 'Youssef Ahmed', p: 120 }
  ].sort((a, b) => b.p - a.p);
  $('#leaderboard').innerHTML = board.map(u =>
    `<li class="${u.me ? 'lb-me' : ''}"><span style="flex:1">${esc(u.n)} ${u.me ? '<span class="chip">You</span>' : ''}</span><span class="lb-pts">${u.p} pts</span></li>`).join('');
}

function addPoints(amount, reason) {
  const before = BADGES.filter(b => state.points >= b.need).length;
  state.points += amount;
  store.set('points', state.points);
  state.history.unshift({ t: reason, p: amount, time: 'Just now — ' + now() });
  renderBehavior();
  renderHome();
  toast(`${amount > 0 ? '🏅 +' + amount : '➖ ' + amount} pts: ${reason}`, amount > 0 ? 'success' : 'warn');
  const after = BADGES.filter(b => state.points >= b.need).length;
  if (after > before) {
    const b = BADGES[after - 1];
    setTimeout(() => toast(`🎉 Congrats! You unlocked the <b>${b.name}</b> badge ${b.emoji}`, 'success'), 900);
  }
}

function renderComplaints() {
  $('#anonId').textContent = state.anonId;
  const types = { teacher: '👨‍🏫 Against a Teacher', student: '🧑‍🎓 Against a Student', other: '📝 Other' };
  const sev = { 'Urgent': 'var(--red)', 'Important': 'var(--amber)', 'Normal': 'var(--green)' };
  $('#myComplaints').innerHTML = state.complaints.length ? state.complaints.map(c =>
    `<li class="cmp-item">
      <div class="cmp-head">${types[c.type]} — ${esc(c.title)}<span class="status-chip">${c.status}</span></div>
      <small><span>🎟️ ${c.ticket}</span><span>🗓️ ${c.date}</span><span style="color:${sev[c.sev]}">⚡ ${c.sev}</span></small>
      <p>${esc(c.desc)}</p>
    </li>`).join('') : '<p class="muted">No complaints submitted yet — every submission gets a private ticket number.</p>';
}

function submitComplaint(e) {
  e.preventDefault();
  const type = $('#complaintType .active').dataset.v;
  const title = $('#cmpTitle').value.trim();
  const desc = $('#cmpDesc').value.trim();
  const sev = $('#cmpSeverity').value;
  if (!title || !desc) return;
  const bar = $('#cmpProgress');
  bar.classList.remove('hidden');
  const btn = $('#complaintForm .btn-block');
  btn.disabled = true;
  btn.textContent = '🔐 Encrypting & sending securely...';
  setTimeout(() => {
    const ticket = 'CMP-' + Math.floor(1000 + Math.random() * 9000);
    state.complaints.unshift({ type, title, desc, sev, ticket, status: 'Under Review', date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) });
    store.set('complaints', state.complaints);
    bar.classList.add('hidden');
    btn.disabled = false;
    btn.textContent = '🔐 Send Encrypted';
    $('#complaintForm').reset();
    renderComplaints();
    toast(`✅ Complaint sent — fully encrypted & anonymous<br>🎟️ Ticket: <b>${ticket}</b>`, 'success');
  }, 1700);
}

function renderParent() {
  const c = CHILDREN[state.childIdx];
  $('#childTabs').innerHTML = CHILDREN.map((ch, i) =>
    `<button class="${i === state.childIdx ? 'active' : ''}" data-i="${i}">
      <span class="avatar" style="background:${ch.color}">${ch.name[0]}</span>${ch.name}
    </button>`).join('');
  $$('#childTabs button').forEach(b => b.onclick = () => { state.childIdx = +b.dataset.i; renderParent(); });
  $('#parentStats').innerHTML = `
    <div class="stat-card"><span class="stat-icon">✅</span><div><b>${c.attend}%</b><small>Attendance rate</small></div></div>
    <div class="stat-card"><span class="stat-icon">📈</span><div><b>${c.grade}%</b><small>Overall average</small></div></div>
    <div class="stat-card"><span class="stat-icon">🏅</span><div><b>${c.points}</b><small>Behavior points</small></div></div>
    <div class="stat-card"><span class="stat-icon">🚫</span><div><b>${c.absent.excused + c.absent.unexcused}</b><small>Absent days (${c.absent.excused} excused / ${c.absent.unexcused} unexcused)</small></div></div>`;
  $('#attendChart').innerHTML = c.week.map((v, i) =>
    `<div class="bar ${v === 0 ? 'zero' : ''}" style="height:${Math.max(v, 4)}%" title="${c.days[i]}: ${v}%"><span>${v}%</span></div>`).join('');
  $('#chartDays').innerHTML = c.days.map(d => `<span>${d}</span>`).join('');
  const gcolors = ['var(--green)', 'var(--primary2)', 'var(--amber)', 'var(--red)'];
  $('#gradesBars').innerHTML = c.grades.map(g => {
    const col = g.v >= 90 ? gcolors[0] : g.v >= 80 ? gcolors[1] : g.v >= 70 ? gcolors[2] : gcolors[3];
    return `<div class="grade-row">
      <div class="g-head"><b>${g.s}</b><span>${g.v}%</span></div>
      <div class="g-bar"><div class="g-fill" style="width:${g.v}%;background:${col}"></div></div>
    </div>`;
  }).join('');
  const stMap = { present: '<span class="chip" style="color:var(--green)">✅ Present</span>', excused: '<span class="chip" style="color:var(--amber)">🟡 Absent (Excused)</span>', absent: '<span class="chip" style="color:var(--red)">🔴 Absent (Unexcused)</span>' };
  $('#parentAttendTable').innerHTML = c.log.map(l =>
    `<tr><td>${l.day}</td><td>${l.date}</td><td>${stMap[l.st]}</td></tr>`).join('');
  $('#parentFeed').innerHTML = c.feed.map(f =>
    `<li class="feed-item ${f.danger ? 'danger' : ''}"><span class="f-icon">${f.i}</span><div>${f.t}<small>${f.time}</small></div></li>`).join('');
}

function initChatbot() {
  $('#cbToggle').onclick = () => {
    const p = $('#cbPanel');
    p.classList.toggle('hidden');
    if (!p.classList.contains('hidden') && !state.cbWelcomed) {
      state.cbWelcomed = true;
      const name = state.user ? state.user.name.split(' ')[0] : 'there';
      botSay(`Hi ${name}! 👋 I'm your school assistant.<br>Ask me about <b>exams, attendance, points, quizzes, complaints</b> — or tap a quick question below.`, null, true);
    }
    renderChips();
    $('#cbInput').focus();
  };
  $('#cbClose').onclick = () => $('#cbPanel').classList.add('hidden');
  $('#cbSend').onclick = cbSend;
  $('#cbInput').addEventListener('keydown', e => { if (e.key === 'Enter') cbSend(); });
}

function renderChips() {
  const chips = ['📅 Next exam', '✅ My attendance', '🏅 My points', '🧠 Practice quiz', '❓ Help'];
  $('#cbChips').innerHTML = chips.map(c => `<button data-c="${c}">${c}</button>`).join('');
  $$('#cbChips button').forEach(b => b.onclick = () => { addUserMsg(b.dataset.c); handleBot(b.dataset.c); });
}

function addUserMsg(text) {
  const d = document.createElement('div');
  d.className = 'cb-msg user';
  d.innerHTML = esc(text);
  $('#cbMsgs').appendChild(d);
  $('#cbMsgs').scrollTop = $('#cbMsgs').scrollHeight;
}

function botSay(html, action, instant) {
  if (instant) { appendBot(html, action); return; }
  const t = document.createElement('div');
  t.className = 'cb-msg bot cb-typing';
  t.innerHTML = '<span></span><span></span><span></span>';
  $('#cbMsgs').appendChild(t);
  $('#cbMsgs').scrollTop = $('#cbMsgs').scrollHeight;
  setTimeout(() => { t.remove(); appendBot(html, action); }, 700 + Math.random() * 600);
}

function appendBot(html, action) {
  const d = document.createElement('div');
  d.className = 'cb-msg bot';
  d.innerHTML = html + ' ';
  if (action) {
    const b = document.createElement('button');
    b.className = 'cb-action';
    b.textContent = action.label;
    b.onclick = () => { $('#cbPanel').classList.add('hidden'); navigate(action.page); };
    d.appendChild(document.createElement('br'));
    d.appendChild(b);
  }
  $('#cbMsgs').appendChild(d);
  $('#cbMsgs').scrollTop = $('#cbMsgs').scrollHeight;
}

function cbSend() {
  const inp = $('#cbInput');
  const text = inp.value.trim();
  if (!text) return;
  inp.value = '';
  addUserMsg(text);
  handleBot(text);
}

function handleBot(text) {
  const t = text.toLowerCase();
  const name = state.user ? state.user.name.split(' ')[0] : 'there';

  if (/\b(hi|hello|hey|yo|salam|good morning|good evening|good afternoon)\b/.test(t))
    return botSay(`Hey ${name}! 👋 How can I help you today?`);

  if (/thank/.test(t))
    return botSay("You're always welcome! 😊 Anything else?");

  if (/help|what can you do|features|options/.test(t))
    return botSay(`I can help you with:<br>📅 <b>Exam schedule</b> & reminders<br>✅ <b>Attendance</b> & QR check-in<br>🏅 <b>Behavior points</b> & badges<br>🧠 <b>Quizzes</b> & practice<br>🤫 <b>Confidential complaints</b><br>👨‍👩‍👦 <b>Parent dashboard</b><br>Just ask!`);

  if (/quiz|exercise|practice|mcq|question/.test(t)) {
    const best = store.get('quizBest', {});
    const done = Object.keys(best).length;
    return botSay(`🧠 There are <b>${QUIZZES.length} practice quizzes</b> (MCQ) with a timer, instant feedback and answer review.${done ? ` You already tried ${done} of them — best scores are saved.` : " You haven't tried any yet — start now!"}`, { label: '🧠 Open Quizzes', page: 'quizzes' });
  }

  if (/exam|test/.test(t)) {
    const ex = EXAMS.find(e => t.includes(e.subject.toLowerCase().split(' ')[0])) || [...EXAMS].sort((a, b) => a.date.localeCompare(b.date))[0];
    const d = daysUntil(ex.date);
    return botSay(`📅 <b>${ex.subject}</b> exam: <b>${new Date(ex.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })}</b> at <b>${ex.time}</b> in <b>${ex.room}</b>.<br>⏳ ${d === 0 ? "It's today — good luck!" : 'Only ' + d + ' days left — you got this!'}`, { label: '📅 Open Exam Schedule', page: 'exams' });
  }

  if (/attend|absent|absence|check ?in|\bqr\b/.test(t)) {
    const today = state.attendLog[0];
    return botSay(`✅ Your attendance rate is <b>96%</b>.${today ? ` Last check-in: <b>${today.day} at ${today.time}</b> via ${today.method}.` : ''}<br>To check in: verify your GPS → scan the dynamic QR → press Check In.`, { label: '📱 Go to QR Attendance', page: 'qr' });
  }

  if (/point|behavior|badge|level|rank|leaderboard/.test(t)) {
    const li = levelInfo(state.points);
    return botSay(`🏅 You have <b>${state.points} points</b> — Level ${li.level}, just <b>${li.need} points</b> to Level ${li.level + 1}. Keep it up! 🔥`, { label: '🏅 View My Points', page: 'behavior' });
  }

  if (/complain|report|bully|harass|secret|confidential/.test(t))
    return botSay(`🤫 Complaints are <b>100% confidential</b> — you submit as an <b>anonymous user</b> with full encryption. The reported teacher or student can never know who reported them. You get a private ticket number to follow up.`, { label: '🤫 Submit a Complaint', page: 'complaints' });

  if (/parent|guardian|mom|dad|family/.test(t))
    return botSay(`👨‍👩‍👦 Parents get a private dashboard with: attendance reports, grades, absences (excused/unexcused) and instant alerts for important events like absences or exam dates.`, { label: '👨‍👩‍👦 Parent Dashboard', page: 'parent' });

  if (/rate|rating|review|feedback/.test(t))
    return botSay(`⭐ You can rate every course with 1–5 stars — Netflix style, right inside the platform. Your rating updates the course average instantly.`, { label: '⭐ Rate Courses', page: 'rating' });

  if (/pdf|download|schedule file/.test(t))
    return botSay(`⬇️ Open the <b>Exam Schedule</b> page and press "Download PDF" — then choose "Save as PDF" in the print dialog.`, { label: '📅 Open Exam Schedule', page: 'exams' });

  if (/offline|internet|wifi|connection/.test(t))
    return botSay(`📴 No internet? No problem — enable <b>Offline Mode</b> on the QR Attendance page. Your check-in is saved locally and syncs automatically once you're back online.`);

  if (/who are you|your name|about you|\bbot\b/.test(t))
    return botSay(`🤖 I'm the MySchool assistant — a friendly bot living inside your school platform. I never sleep, I never give homework, and I know all about your school life 😄`);

  if (/bye|goodbye|see you|good night/.test(t))
    return botSay(`Goodbye ${name}! 👋 Study hard, and ping me anytime!`);

  return botSay(`Hmm, I'm not sure I got that 🤔<br>Try asking about: <b>exams</b>, <b>attendance</b>, <b>points</b>, <b>quizzes</b>, <b>complaints</b> — or type <b>help</b>.`);
}

function init() {
  $$('.role-card').forEach(b => b.onclick = () => {
    $$('.role-card').forEach(x => x.classList.remove('selected'));
    b.classList.add('selected');
    $('#loginName').value = b.dataset.role === 'parent' ? 'Waleed Adel' : 'Ahmed Mohamed';
  });
  $('#loginBtn').onclick = login;
  $('#loginName').addEventListener('keydown', e => { if (e.key === 'Enter') login(); });
  $('#loginPass').addEventListener('keydown', e => { if (e.key === 'Enter') login(); });
  $('#passToggle').onclick = () => {
    const inp = $('#loginPass');
    inp.type = inp.type === 'password' ? 'text' : 'password';
    $('#passToggle').textContent = inp.type === 'password' ? '👁' : '🙈';
  };
  $('#logoutBtn').onclick = logout;
  $('#menuBtn').onclick = () => $('#sidebar').classList.toggle('open');
  $('#notifBtn').onclick = e => { e.stopPropagation(); $('#notifPanel').classList.toggle('hidden'); };
  document.addEventListener('click', e => {
    if (!e.target.closest('.notif-wrap')) $('#notifPanel').classList.add('hidden');
  });
  $$('[data-goto]').forEach(b => b.onclick = () => navigate(b.dataset.goto));

  renderCommunity();
  newToken();
  renderAttend();
  updatePending();
  setInterval(tickQR, 1000);

  $('#sendBtn').onclick = sendMsg;
  $('#msgInput').addEventListener('keydown', e => { if (e.key === 'Enter') sendMsg(); });

  $('#voiceBtn').onclick = () => {
    state.voice.joined = !state.voice.joined;
    if (state.voice.joined) toast('🎙️ You joined the group study room — mic is on', 'success');
    else { state.voice.muted = false; toast('🚪 You left the voice room', 'info'); }
    renderVoice();
  };
  $('#muteBtn').onclick = () => { state.voice.muted = !state.voice.muted; renderVoice(); };

  $('#scanBtn').onclick = scanQR;
  $('#checkinBtn').onclick = checkin;
  $('#gpsBtn').onclick = requestGps;
  $('#gpsSimBtn').onclick = simulateGps;
  $('#offlineToggle').onchange = e => {
    state.offline = e.target.checked;
    if (!state.offline && state.pending > 0) {
      toast('🔄 Syncing ' + state.pending + ' pending record(s)...', 'info');
      setTimeout(() => {
        state.pending = 0;
        store.set('pending', 0);
        updatePending();
        toast('✅ Attendance records synced successfully', 'success');
      }, 1800);
    } else if (state.offline) toast('📴 Offline mode enabled — attendance will be saved locally', 'warn');
  };

  $('#enableAllNotifs').onclick = enableAllNotifs;
  $('#pdfBtn').onclick = downloadPDF;

  $('#simPointsBtn').onclick = () => addPoints(3, 'Great class participation');

  $$('#complaintType button').forEach(b => b.onclick = () => {
    $$('#complaintType button').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
  });
  $('#complaintForm').addEventListener('submit', submitComplaint);

  $('#parentNotifBtn').onclick = () => askNotifPermission(true);

  initChatbot();
}

init();
