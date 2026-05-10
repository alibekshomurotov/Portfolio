// ============================================================
// STORAGE UTILS - Ma'lumotlar bazasi (localStorage)
// ============================================================

// ===== CONSTANTS =====
const COUNTER_KEY = 'alibek-portfolio-visits';
const MESSAGES_KEY = 'portfolio-messages';
const SETTINGS_KEY = 'portfolio-admin-settings';
const TESTIMONIALS_KEY = 'portfolio-testimonials';
const EXPERIENCES_KEY = 'portfolio-experiences';
const CONTACT_KEY = 'portfolio-contact';

// ===== DEFAULT DATA =====
const DEFAULT_TESTIMONIALS = [
  { id: '1', name: 'Sardor Karimov', role: 'CEO, TechCorp Solutions', text: "Alibek bizning eng yaxshi dasturchimiz. React va Node.js bilan ajoyib platforma yaratdi.", rating: 5, color: '#6c63ff' },
  { id: '2', name: 'Nilufar Xasanova', role: 'Product Manager, Digital Agency', text: "Alibek bilan 3 ta yirik loyihada ishladik. Har safar o'z vaqtida va sifatli natija berdi.", rating: 5, color: '#00d4aa' },
  { id: '3', name: 'Jasur Toshmatov', role: 'Startup Founder', text: "Startup uchun MVP yaratdik — Alibek 2 haftada tayyorlab berdi. Professional yondashuvi juda foydali bo'ldi.", rating: 5, color: '#ff6b9d' },
  { id: '4', name: 'Dilnoza Rahimova', role: "E-Commerce Owner", text: "Onlayn do'konimni Alibek yaratdi. To'lov tizimi, admin panel — hammasi ishlaydi.", rating: 4, color: '#febc2e' },
];

const DEFAULT_EXPERIENCES = [
  { id: '1', title: 'Senior Frontend Developer', company: 'TechCorp Solutions', period: '2023 — Hozirgi', description: 'React va TypeScript asosida yirik SaaS platformani rivojlantirdim.', tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'], color: '#6c63ff' },
  { id: '2', title: 'Full-Stack Developer', company: 'Digital Agency Pro', period: '2022 — 2023', description: "Mijozlar uchun 15+ web loyihalar yaratdim.", tags: ['React', 'Node.js', 'MongoDB', 'Tailwind'], color: '#00d4aa' },
  { id: '3', title: 'Frontend Developer', company: 'StartUp Hub', period: '2021 — 2022', description: "Startup loyihalarda frontend qismini rivojlantirdim.", tags: ['JavaScript', 'HTML/CSS', 'React', 'Figma'], color: '#ff6b9d' },
  { id: '4', title: 'Freelance Developer', company: 'Mustaqil', period: '2020 — 2021', description: "Freelance sifatida kichik bizneslar uchun veb-saytlar yaratdim.", tags: ['React', 'WordPress', 'CSS', 'JavaScript'], color: '#febc2e' },
];

const DEFAULT_CONTACT = [
  { id: '1', icon: 'mail', label: 'Email', value: 'shomurodovalibek5@gmail.com', color: '#6c63ff' },
  { id: '2', icon: 'phone', label: 'Telefon', value: '+998 99 554 85 84', color: '#00d4aa' },
  { id: '3', icon: 'map', label: "Manzil", value: "O'zbekiston, Xorazm", color: '#ff6b9d' },
];

// ===== VISITOR TRACKING =====
function trackVisit() {
  const now = new Date();
  const today = now.toISOString().split('T')[0];
  const userAgent = navigator.userAgent;
  let device = 'Desktop';
  if (/Mobi|Android/i.test(userAgent)) device = 'Mobile';
  else if (/Tablet|iPad/i.test(userAgent)) device = 'Tablet';

  let browser = 'Other';
  if (userAgent.includes('Chrome')) browser = 'Chrome';
  else if (userAgent.includes('Firefox')) browser = 'Firefox';
  else if (userAgent.includes('Safari')) browser = 'Safari';
  else if (userAgent.includes('Edge')) browser = 'Edge';

  let os = 'Other';
  if (userAgent.includes('Windows')) os = 'Windows';
  else if (userAgent.includes('Mac')) os = 'macOS';
  else if (userAgent.includes('Linux')) os = 'Linux';
  else if (userAgent.includes('Android')) os = 'Android';
  else if (userAgent.includes('iPhone') || userAgent.includes('iPad')) os = 'iOS';

  const visitorId = localStorage.getItem('alibek-visitor-id') || null;
  const isNew = !visitorId;

  if (isNew) {
    const id = 'v_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
    localStorage.setItem('alibek-visitor-id', id);
  }

  const log = JSON.parse(localStorage.getItem(COUNTER_KEY) || '{"total":0,"today":0,"date":"","unique":0,"daily":{},"log":[],"devices":{},"browsers":{},"os":{}}');

  if (log.date !== today) {
    log.date = today;
    log.today = 0;
  }

  log.total++;
  log.today++;

  if (isNew) log.unique = (log.unique || 0) + 1;

  if (!log.daily) log.daily = {};
  log.daily[today] = (log.daily[today] || 0) + 1;

  if (!log.devices) log.devices = {};
  log.devices[device] = (log.devices[device] || 0) + 1;

  if (!log.browsers) log.browsers = {};
  log.browsers[browser] = (log.browsers[browser] || 0) + 1;

  if (!log.os) log.os = {};
  log.os[os] = (log.os[os] || 0) + 1;

  log.log.push({
    time: now.toLocaleString('uz-UZ'),
    date: today,
    timestamp: now.getTime(),
    device,
    browser,
    os,
    isNew,
  });

  if (log.log.length > 200) log.log = log.log.slice(-200);

  const thirtyDaysAgo = new Date(Date.now() - 30 * 86400000).toISOString().split('T')[0];
  Object.keys(log.daily || {}).forEach(d => {
    if (d < thirtyDaysAgo) delete log.daily[d];
  });

  localStorage.setItem(COUNTER_KEY, JSON.stringify(log));
}

function getVisitStats() {
  return JSON.parse(localStorage.getItem(COUNTER_KEY) || '{"total":0,"today":0,"date":"","unique":0,"daily":{},"log":[],"devices":{},"browsers":{},"os":{}}');
}

// ===== MESSAGES =====
function getMessages() {
  return JSON.parse(localStorage.getItem(MESSAGES_KEY) || '[]');
}

function saveMessages(msgs) {
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(msgs));
}

// ===== SETTINGS =====
function getSettings() {
  return JSON.parse(localStorage.getItem(SETTINGS_KEY) || JSON.stringify({
    showVisitorCounter: true,
    showOnlineBadge: true,
  }));
}

// ===== TESTIMONIALS =====
function getTestimonials() {
  const stored = localStorage.getItem(TESTIMONIALS_KEY);
  if (stored) return JSON.parse(stored);
  localStorage.setItem(TESTIMONIALS_KEY, JSON.stringify(DEFAULT_TESTIMONIALS));
  return DEFAULT_TESTIMONIALS;
}

// ===== EXPERIENCES =====
function getExperiences() {
  const stored = localStorage.getItem(EXPERIENCES_KEY);
  if (stored) return JSON.parse(stored);
  localStorage.setItem(EXPERIENCES_KEY, JSON.stringify(DEFAULT_EXPERIENCES));
  return DEFAULT_EXPERIENCES;
}

// ===== CONTACT INFO =====
function getContactInfo() {
  const stored = localStorage.getItem(CONTACT_KEY);
  if (stored) return JSON.parse(stored);
  localStorage.setItem(CONTACT_KEY, JSON.stringify(DEFAULT_CONTACT));
  return DEFAULT_CONTACT;
}

// ===== EXPORT ALL =====
export {
  trackVisit,
  getVisitStats,
  getMessages,
  saveMessages,
  getSettings,
  getTestimonials,
  getExperiences,
  getContactInfo,
  COUNTER_KEY,
};
