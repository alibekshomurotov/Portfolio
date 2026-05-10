import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { FiMail, FiMapPin, FiPhone, FiSend, FiCheck, FiAlertCircle, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';
import { saveMessages, getMessages, getContactInfo } from '../utils/storage';
import contactConfig from '../config/contactConfig';
import './Contact.css';

// ===== TELEGRAM XABAR YUBORISH =====
async function sendToTelegram({ name, email, subject, message }) {
  const { botToken, chatId } = contactConfig.telegram;

  if (!botToken || !chatId) {
    throw new Error('Telegram sozlamalari to\'ldirilmagan');
  }

  const text = [
    '📬 <b>Portfolio dan yangi xabar!</b>',
    '',
    `<b>Ism:</b> ${name}`,
    `<b>Email:</b> ${email}`,
    `<b>Mavzu:</b> ${subject}`,
    '',
    `<b>Xabar:</b>`,
    message,
    '',
    `🕐 ${new Date().toLocaleString('uz-UZ')}`,
  ].join('\n');

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
    }),
  });

  const data = await res.json();
  if (!data.ok) {
    throw new Error(data.description || 'Telegram xato');
  }
  return data;
}

// ===== EMAILJS YUBORISH =====
async function sendToEmailJS({ name, email, subject, message }) {
  const { serviceId, templateId, publicKey } = contactConfig.emailjs;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error('EmailJS sozlamalari to\'ldirilmagan');
  }

  // EmailJS ni dinamik import qilamiz (faqat kerak bo'lganda)
  const emailjs = await import('@emailjs/browser');

  const templateParams = {
    from_name: name,
    from_email: email,
    subject: subject,
    message: message,
    to_name: 'Alibek', // o'zgartiring
  };

  const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
  return result;
}

// ===== ASOSIY XABAR YUBORISH FUNKSIYASI =====
async function sendContactMessage(formData) {
  const results = { telegram: null, emailjs: null, errors: [] };

  // Telegram ga yuborish
  if (contactConfig.telegram.enabled) {
    try {
      results.telegram = await sendToTelegram(formData);
    } catch (err) {
      results.errors.push(`Telegram: ${err.message}`);
    }
  }

  // EmailJS ga yuborish
  if (contactConfig.emailjs.enabled) {
    try {
      results.emailjs = await sendToEmailJS(formData);
    } catch (err) {
      results.errors.push(`Email: ${err.message}`);
    }
  }

  // Hech qaysi xizmat yoqilmagan bo'lsa
  if (!contactConfig.telegram.enabled && !contactConfig.emailjs.enabled) {
    results.errors.push('Hech qanday xabar xizmati yoqilmagan. contactConfig.js ni sozlang.');
  }

  return results;
}

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formState, setFormState] = useState('idle'); // idle | sending | success | error | partial
  const [statusMessage, setStatusMessage] = useState('');
  const [contactInfo, setContactInfo] = useState(getContactInfo);

  useEffect(() => {
    const handler = () => setContactInfo(getContactInfo());
    window.addEventListener('contact-updated', handler);
    return () => window.removeEventListener('contact-updated', handler);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState('sending');
    setStatusMessage('');

    try {
      // Haqiqiy xabar yuborish
      const results = await sendContactMessage(formData);

      // localStorage ga saqlash (admin panel uchun)
      const now = new Date();
      const newMessage = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        date: now.toISOString().split('T')[0],
        time: now.toLocaleString('uz-UZ'),
        read: false,
        createdAt: now.getTime(),
        deliveryStatus: {
          telegram: results.telegram ? 'sent' : (contactConfig.telegram.enabled ? 'failed' : 'disabled'),
          emailjs: results.emailjs ? 'sent' : (contactConfig.emailjs.enabled ? 'failed' : 'disabled'),
        },
      };

      const existingMessages = getMessages();
      saveMessages([newMessage, ...existingMessages]);
      window.dispatchEvent(new Event('messages-updated'));

      // Natijani ko'rsatish
      const sentCount = (results.telegram ? 1 : 0) + (results.emailjs ? 1 : 0);
      const enabledCount = (contactConfig.telegram.enabled ? 1 : 0) + (contactConfig.emailjs.enabled ? 1 : 0);

      if (sentCount === enabledCount && enabledCount > 0) {
        // Hamma joyga muvaffaqiyatli yuborildi
        setFormState('success');
        setStatusMessage('Xabar muvaffaqiyatli yuborildi! Tez orada javob beraman.');
      } else if (sentCount > 0) {
        // Qisman yuborildi
        setFormState('partial');
        setStatusMessage(`Xabar qisman yuborildi. Xatolar: ${results.errors.join(', ')}`);
      } else if (enabledCount === 0) {
        // Hech qaysi xizmat yoqilmagan
        setFormState('success');
        setStatusMessage('Xabar saqlandi! (Xabar xizmatlari hali sozlanmagan, lekin xabar admin panelda ko\'rinadi)');
      } else {
        // Hamma joyda xato
        setFormState('error');
        setStatusMessage(`Xabar yuborilmadi: ${results.errors.join(', ')}`);
      }

      setFormData({ name: '', email: '', subject: '', message: '' });

      // 6 soniyadan keyin holatni tiklash
      setTimeout(() => {
        setFormState('idle');
        setStatusMessage('');
      }, 6000);

    } catch (err) {
      setFormState('error');
      setStatusMessage(`Xatolik yuz berdi: ${err.message}`);
      setTimeout(() => {
        setFormState('idle');
        setStatusMessage('');
      }, 6000);
    }
  };

  const iconMap = {
    mail: <FiMail />,
    phone: <FiPhone />,
    map: <FiMapPin />,
  };

  // Status bar ko'rinishi
  const statusConfig = {
    success: { icon: <FiCheckCircle />, className: 'contact__status--success', label: 'Muvaffaqiyat' },
    error: { icon: <FiAlertCircle />, className: 'contact__status--error', label: 'Xatolik' },
    partial: { icon: <FiAlertTriangle />, className: 'contact__status--partial', label: 'Qisman' },
    sending: { icon: <span className="contact__spinner" />, className: 'contact__status--sending', label: 'Yuborilmoqda...' },
  };

  return (
    <section id="contact" className="section contact" ref={ref}>
      <div className="container">
        <div className={`contact__header ${inView ? 'contact__header--visible' : ''}`}>
          <h2 className="section-title">Aloqa</h2>
          <p className="section-subtitle">
            Loyihangiz bo'yicha bog'laning — birga ajoyib narsalar yaratamiz!
          </p>
        </div>

        {/* Xizmat holati */}
        {!contactConfig.telegram.enabled && !contactConfig.emailjs.enabled && (
          <div className="contact__notice">
            <FiAlertTriangle />
            <span>Xabar xizmatlari hali sozlanmagan. <code>src/config/contactConfig.js</code> faylida Telegram yoki EmailJS ni yoqing.</span>
          </div>
        )}

        <div className="contact__grid">
          <div className={`contact__info ${inView ? 'contact__info--visible' : ''}`}>
            <h3 className="contact__info-title">Bog'lanish</h3>
            <p className="contact__info-text">
              Istalgan savollaringiz yoki loyiha takliflaringiz bo'lsa, men bilan bog'laning.
              Xabaringiz to'g'ridan-to'g'ri menga yuboriladi va tez orada javob berishga harakat qilaman!
            </p>

            {/* Faol xizmatlar */}
            <div className="contact__channels">
              <h4 className="contact__channels-title">Xabar yetkazish kanallari:</h4>
              <div className="contact__channel-list">
                <div className={`contact__channel ${contactConfig.telegram.enabled ? 'contact__channel--active' : 'contact__channel--inactive'}`}>
                  <span className="contact__channel-dot" />
                  <span className="contact__channel-name">Telegram</span>
                  <span className="contact__channel-status">
                    {contactConfig.telegram.enabled ? 'Faol' : 'O\'chirilgan'}
                  </span>
                </div>
                <div className={`contact__channel ${contactConfig.emailjs.enabled ? 'contact__channel--active' : 'contact__channel--inactive'}`}>
                  <span className="contact__channel-dot" />
                  <span className="contact__channel-name">Email (Gmail)</span>
                  <span className="contact__channel-status">
                    {contactConfig.emailjs.enabled ? 'Faol' : 'O\'chirilgan'}
                  </span>
                </div>
              </div>
            </div>

            <div className="contact__info-items">
              {contactInfo.map((item) => (
                <div key={item.id || item.label} className="contact__info-item">
                  <div className="contact__info-icon" style={{ background: `${item.color}15`, color: item.color }}>
                    {iconMap[item.icon] || <FiMail />}
                  </div>
                  <div>
                    <span className="contact__info-label">{item.label}</span>
                    <span className="contact__info-value">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="contact__social-proof">
              <div className="contact__social-proof-avatars">
                <span>👤</span>
                <span>👩‍💻</span>
                <span>👨‍💼</span>
              </div>
              <p>
                <strong>30+</strong> mamnun mijozlar bilan hamkorlik qildim
              </p>
            </div>
          </div>

          <div className={`contact__form-wrapper ${inView ? 'contact__form-wrapper--visible' : ''}`}>
            <form className="contact__form glass-card" onSubmit={handleSubmit}>
              {/* Status xabar */}
              {formState !== 'idle' && (
                <div className={`contact__status ${statusConfig[formState].className}`}>
                  {statusConfig[formState].icon}
                  <div className="contact__status-text">
                    <strong>{statusConfig[formState].label}</strong>
                    <p>{statusMessage}</p>
                  </div>
                </div>
              )}

              <div className="contact__form-row">
                <div className="contact__form-group">
                  <label htmlFor="name">Ism</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Ismingizni kiriting"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={formState === 'sending'}
                  />
                </div>
                <div className="contact__form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email manzilingiz"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={formState === 'sending'}
                  />
                </div>
              </div>

              <div className="contact__form-group">
                <label htmlFor="subject">Mavzu</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Xabaringiz mavzusi"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  disabled={formState === 'sending'}
                />
              </div>

              <div className="contact__form-group">
                <label htmlFor="message">Xabar</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Xabaringizni yozing..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={formState === 'sending'}
                />
              </div>

              <button
                type="submit"
                className="contact__submit btn-primary"
                disabled={formState === 'sending'}
              >
                {formState === 'sending' ? (
                  <span className="contact__sending">
                    <span className="contact__spinner" /> Yuborilmoqda...
                  </span>
                ) : formState === 'success' ? (
                  <><FiCheck /> Yuborildi!</>
                ) : (
                  <>
                    <FiSend />
                    Xabar yuborish
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
