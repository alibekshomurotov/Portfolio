import { useEffect, useState } from 'react';
import { FiGithub, FiArrowDown } from 'react-icons/fi';
import { FaTelegram, FaInstagram } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import './Hero.css';

const roles = [
  'Full-Stack Developer',
  'UI/UX Designer',
  'Problem Solver',
  'Open Source Contributor',
];

export default function Hero({ introDone = true }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [roleText, setRoleText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [ref, inView] = useInView({ triggerOnce: true });

  // Typewriter
  useEffect(() => {
    if (!introDone) return;
    const currentRole = roles[roleIndex];
    const speed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setRoleText(currentRole.slice(0, roleText.length + 1));
        if (roleText === currentRole) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setRoleText(currentRole.slice(0, roleText.length - 1));
        if (roleText === '') {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [roleText, isDeleting, roleIndex, introDone]);

  return (
    <section id="home" className="hero" ref={ref} style={{ visibility: introDone ? 'visible' : 'hidden' }}>
      <div className="hero__bg">
        <div className="hero__gradient-orb hero__gradient-orb--1"></div>
        <div className="hero__gradient-orb hero__gradient-orb--2"></div>
        <div className="hero__gradient-orb hero__gradient-orb--3"></div>
        <div className="hero__grid-overlay"></div>
      </div>

      <div className="hero__container container">
        <div className={`hero__content ${inView && introDone ? 'hero__content--visible' : ''}`}>
          <div className="hero__badge">
            <span className="hero__badge-dot"></span>
            Ishlashga tayyor
          </div>

          <h1 className="hero__title">
            Salom, men <span className="hero__name-inline">Alibek</span>man
          </h1>

          <div className="hero__role-wrapper">
            <span className="hero__role-prefix">Men —</span>
            <span className="hero__role-text">
              {roleText}
              <span className="hero__role-cursor">|</span>
            </span>
          </div>

          <p className="hero__description">
            Zamonaviy web texnologiyalar bilan chiroyli, tezkor va foydalanuvchilarga qulay ilovalar yarataman. 
            Har bir piksel muhim, har bir kod satri — san'at.
          </p>

          <div className="hero__actions">
            <a href="#projects" className="btn-primary">
              <FiArrowDown />
              Loyihalarim
            </a>
            <a href="#contact" className="btn-outline">
              CV yuklash
            </a>
          </div>

          <div className="hero__socials">
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hero__social" aria-label="GitHub">
              <FiGithub />
            </a>
            <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className="hero__social" aria-label="Telegram">
              <FaTelegram />
            </a>
            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="hero__social" aria-label="Instagram">
              <FaInstagram />
            </a>
          </div>
        </div>

        <div className={`hero__visual ${inView && introDone ? 'hero__visual--visible' : ''}`}>
          <div className="hero__code-window">
            <div className="hero__code-header">
              <span className="hero__code-dot hero__code-dot--red"></span>
              <span className="hero__code-dot hero__code-dot--yellow"></span>
              <span className="hero__code-dot hero__code-dot--green"></span>
              <span className="hero__code-title">alibek.js</span>
            </div>
            <pre className="hero__code-body">
              <code>{`const alibek = {
  name: "Alibek",
  skills: [
    "React", "Node.js",
    "TypeScript", "Python"
  ],
  passion: "Creating beautiful",
  coffee: Infinity,
  
  buildAwesome: () => {
    return "✨ Magic";
  }
};`}</code>
            </pre>
          </div>

          <div className="hero__floating-card hero__floating-card--1">
            <span className="hero__floating-emoji">⚡</span>
            <div>
              <span className="hero__floating-value">3+</span>
              <span className="hero__floating-label">Yillik tajriba</span>
            </div>
          </div>

          <div className="hero__floating-card hero__floating-card--2">
            <span className="hero__floating-emoji">🚀</span>
            <div>
              <span className="hero__floating-value">30+</span>
              <span className="hero__floating-label">Loyihalar</span>
            </div>
          </div>

          <div className="hero__floating-card hero__floating-card--3">
            <span className="hero__floating-emoji">☕</span>
            <div>
              <span className="hero__floating-value">999+</span>
              <span className="hero__floating-label">Qahva finjonlar</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero__scroll-indicator">
        <div className="hero__mouse">
          <div className="hero__mouse-wheel"></div>
        </div>
        <span>Pastga aylantiring</span>
      </div>
    </section>
  );
}
