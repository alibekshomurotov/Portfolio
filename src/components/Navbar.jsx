import { useState, useEffect } from 'react';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { FiSun, FiMoon } from 'react-icons/fi';
import './Navbar.css';

const navLinks = [
  { name: 'Bosh sahifa', href: '#home' },
  { name: 'Men haqimda', href: '#about' },
  { name: "Ko'nikmalar", href: '#skills' },
  { name: 'Tajriba', href: '#experience' },
  { name: 'Loyihalar', href: '#projects' },
  { name: 'Aloqa', href: '#contact' },
];

export default function Navbar({ theme = 'dark', toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navLinks.map(l => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection('#' + sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__container">
        <a href="#home" className="navbar__logo">
          <span className="navbar__logo-bracket">&lt;</span>
          Alibek
          <span className="navbar__logo-dot">.</span>
          <span className="navbar__logo-bracket">/&gt;</span>
        </a>

        <ul className={`navbar__links ${mobileOpen ? 'navbar__links--open' : ''}`}>
          {navLinks.map((link, i) => (
            <li key={link.name} style={{ animationDelay: `${i * 0.08}s` }}>
              <a
                href={link.href}
                className={`navbar__link ${activeSection === link.href ? 'navbar__link--active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        <div className="navbar__actions">
          <button
            className="navbar__theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            <div className={`navbar__theme-icon ${theme === 'dark' ? 'navbar__theme-icon--dark' : 'navbar__theme-icon--light'}`}>
              <FiSun className="navbar__sun" />
              <FiMoon className="navbar__moon" />
            </div>
          </button>

          <a href="#contact" className="navbar__cta btn-primary">
            Bog'lanish
          </a>
        </div>

        <button
          className="navbar__mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>
    </nav>
  );
}
