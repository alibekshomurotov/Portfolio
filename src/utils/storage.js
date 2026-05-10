const COUNTER_KEY = 'alibek-portfolio-visits';
const MESSAGES_KEY = 'portfolio-messages';
const SETTINGS_KEY = 'portfolio-admin-settings';
const TESTIMONIALS_KEY = 'portfolio-testimonials';
const EXPERIENCES_KEY = 'portfolio-experiences';
const CONTACT_KEY = 'portfolio-contact';
const PROJECTS_KEY = 'portfolio-projects';

// ===== DEFAULT DATA =====
const DEFAULT_PROJECTS = [
  {
    id: '1', title: 'E-Commerce Platform',
    description: "Zamonaviy onlayn do'kon — React va Node.js bilan yaratilgan. To'lov sistemasini integratsiya qilgan, real-time buyurtma kuzatish va admin panel mavjud.",
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    github: '#', live: '#', featured: true, color: '#6c63ff', createdAt: Date.now() - 86400000 * 5,
  },
  {
    id: '2', title: 'AI Chat Application',
    description: "Sun'iy intellekt asosidagi chat ilovasi. Real-time xabar almashish, fayl yuborish va AI javob berish funksiyalari bor.",
    tags: ['Next.js', 'OpenAI', 'WebSocket', 'Prisma'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
    github: '#', live: '#', featured: true, color: '#00d4aa', createdAt: Date.now() - 86400000 * 4,
  },
  {
    id: '3', title: 'Dashboard Analytics',
    description: "Biznes uchun analitik dashboard. Ma'lumotlarni vizualizatsiya qilish, hisobot yaratish va real-time statistika ko'rish.",
    tags: ['React', 'D3.js', 'Python', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    github: '#', live: '#', featured: true, color: '#ff6b9d', createdAt: Date.now() - 86400000 * 3,
  },
  {
    id: '4', title: 'Social Media App',
    description: "Mobil qurilmalar uchun ijtimoiy tarmoq ilovasi. Post yaratish, commenting, va real-time notifications.",
    tags: ['React Native', 'Firebase', 'Redux'],
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&h=400&fit=crop',
    github: '#', live: '#', featured: false, color: '#febc2e', createdAt: Date.now() - 86400000 * 2,
  },
  {
    id: '5', title: 'Portfolio Generator',
    description: "Portfolio saytlar avtomatik yaratuvchi. Slayder bilan sozlash, bir nechta tema tanlash imkoniyati.",
    tags: ['Next.js', 'Tailwind', 'Supabase'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    github: '#', live: '#', featured: false, color: '#6c63ff', createdAt: Date.now() - 86400000,
  },
  {
    id: '6', title: 'Task Management Tool',
    description: "Jamoa uchun vazifalar boshqaruvi ilovasi. Kanban board, deadline tracking va jamoa bilan hamkorlik.",
    tags: ['Vue.js', 'Express', 'MongoDB'],
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
    github: '#', live: '#', featured: false, color: '#00d4aa', createdAt: Date.now(),
  },
];

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
  { id: '1', icon: 'mail', label: 'Email', value: 'dev@example.com', color: '#6c63ff' },
  { id: '2', icon: 'phone', label: 'Telefon', value: '+998 90 123 45 67', color: '#00d4aa' },
  { id: '3', icon: 'map', label: "Manzil", value: "O'zbekiston, Toshkent", color: '#ff6b9d' },
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

// ===== PROJECTS =====
function getProjects() {
  const stored = localStorage.getItem(PROJECTS_KEY);
  if (stored) return JSON.parse(stored);
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(DEFAULT_PROJECTS));
  return DEFAULT_PROJECTS;
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
  getProjects,
  getMessages,
  saveMessages,
  getSettings,
  getTestimonials,
  getExperiences,
  getContactInfo,
  COUNTER_KEY,
  PROJECTS_KEY,
};
