import { FiGithub, FiHeart, FiEye, FiUsers } from 'react-icons/fi';
import { FaTelegram, FaInstagram } from 'react-icons/fa';
import './Footer.css';

const socialLinks = [
  { icon: <FiGithub />, href: 'https://github.com/', label: 'GitHub' },
  { icon: <FaTelegram />, href: 'https://t.me/', label: 'Telegram' },
  { icon: <FaInstagram />, href: 'https://instagram.com/', label: 'Instagram' },
];

export default function Footer({ visitorCount = 0, showCounter = true }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__divider"></div>
      <div className="container">
        <div className="footer__content">
          <div className="footer__left">
            <a href="#home" className="footer__logo">
              <span className="footer__logo-bracket">&lt;</span>
              Alibek
              <span className="footer__logo-dot">.</span>
              <span className="footer__logo-bracket">/&gt;</span>
            </a>
            <p className="footer__text">
              Zamonaviy web ilovalar yaratuvchi dasturchi. Sifat va innovatsiya bilan ishlayman.
            </p>
          </div>

          <div className="footer__center">
            <h4 className="footer__heading">Sahifalar</h4>
            <nav className="footer__nav">
              <a href="#home">Bosh sahifa</a>
              <a href="#about">Men haqimda</a>
              <a href="#skills">Ko'nikmalar</a>
              <a href="#experience">Tajriba</a>
              <a href="#projects">Loyihalar</a>
              <a href="#testimonials">Izohlar</a>
              <a href="#contact">Aloqa</a>
            </nav>
          </div>

          <div className="footer__right">
            <h4 className="footer__heading">Ijtimoiy tarmoqlar</h4>
            <div className="footer__socials">
              {socialLinks.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="footer__social" aria-label={link.label}>
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>
            &copy; {currentYear} Alibek Portfolio. Barcha huquqlar himoyalangan.
          </p>
          {showCounter && visitorCount > 0 && (
            <div className="footer__counter">
              <FiEye className="footer__counter-icon" />
              <span className="footer__counter-value">{visitorCount}</span>
              <span className="footer__counter-label">tashrif</span>
            </div>
          )}
          <p className="footer__made-with">
            <FiHeart className="footer__heart" /> bilan yaratilgan
          </p>
        </div>
      </div>
    </footer>
  );
}
