import { useInView } from 'react-intersection-observer';
import { useState, useEffect, useRef, useCallback } from 'react';
import { FiAward, FiCoffee, FiUsers, FiCode } from 'react-icons/fi';
import './About.css';

const stats = [
  { icon: <FiCode />, value: '30+', label: 'Loyihalar', color: '#6c63ff' },
  { icon: <FiUsers />, value: '5', label: 'Mijozlar', color: '#00d4aa' },
  { icon: <FiAward />, value: '5+', label: 'Mukofotlar', color: '#ff6b9d' },
  { icon: <FiCoffee />, value: '∞', label: 'Qahva', color: '#febc2e' },
];

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [imgLoaded, setImgLoaded] = useState(false);
  const tiltRef = useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, glare: false });

  // useEffect bilan rasmni tekshirish
  useEffect(() => {
    const img = new Image();
    img.onload = () => setImgLoaded(true);
    img.onerror = () => setImgLoaded(false);
    img.src = '/alibek.jpg';
  }, []);

  // 3D Tilt - mouse follow
  const handleMouseMove = useCallback((e) => {
    const el = tiltRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const maxTilt = 20;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTilt({ rotateX, rotateY, glareX, glareY, glare: true });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, glare: false });
  }, []);

  return (
    <section id="about" className="section about" ref={ref}>
      <div className="container">
        <div className={`about__header ${inView ? 'about__header--visible' : ''}`}>
          <h2 className="section-title">Men haqimda</h2>
          <p className="section-subtitle">
            Keling, tanishamiz! Men nima qilaman va qanday yordam berishim mumkin.
          </p>
        </div>

        <div className="about__grid">
          <div className={`about__image-side ${inView ? 'about__image-side--visible' : ''}`}>
            <div className="about__image-container" ref={tiltRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
              {/* Gradient glow behind photo */}
              <div className="about__image-glow"></div>

              {/* 3D tilt wrapper */}
              <div
                className="about__image-tilt"
                style={{
                  transform: `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                  transition: tilt.glare ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
                }}
              >
                <div className="about__image-border-glow"></div>

                <div className="about__image-box">
                  {imgLoaded ? (
                    <img src="/alibek.jpg" alt="Alibek" className="about__photo" />
                  ) : (
                    <div className="about__image-placeholder-empty">
                      <div className="about__camera-icon">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                          <circle cx="12" cy="13" r="4"/>
                        </svg>
                      </div>
                      <span className="about__upload-text">alibek.jpg</span>
                      <span className="about__upload-hint">public/ papkaga joylashtiring</span>
                    </div>
                  )}

                  {/* Glare / light reflection effect */}
                  <div
                    className="about__image-glare"
                    style={{
                      background: tilt.glare
                        ? `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.25) 0%, transparent 60%)`
                        : 'none',
                    }}
                  />
                </div>
              </div>

              {/* Decorative dots */}
              <div className="about__image-dots">
                {[...Array(20)].map((_, i) => (
                  <span key={i} className="about__dot" />
                ))}
              </div>
            </div>
          </div>

          <div className={`about__text-side ${inView ? 'about__text-side--visible' : ''}`}>
            <h3 className="about__heading">
              Zamonaviy texnologiyalar bilan <span className="gradient-text">kelajak</span> quraman
            </h3>
            <p className="about__text">
              Men professional full-stack dasturchiman. Web-texnologiyalar sohasida 3+ yillik tajribaga 
              ega bo'lib, React, Node.js, TypeScript va boshqa zamonaviy texnologiyalar bilan 
              ishlayman. Har bir loyihani sifat va samaradorlik bilan bajarishga intilaman.
            </p>
            <p className="about__text">
              Frontend va backend sohalarida chuqur bilimga egaman. REST API, 
              ma'lumotlar bazasi dizayni va cloud xizmatlari bilan ishlash tajribam bor. 
              Jamoada ham, yakkaxon ham samarali ishlashga qodirman.
            </p>

            <div className="about__info-grid">
              <div className="about__info-item">
                <span className="about__info-label">Ism:</span>
                <span className="about__info-value">Alibek</span>
              </div>
              <div className="about__info-item">
                <span className="about__info-label">Email:</span>
                <span className="about__info-value">alibek@example.com</span>
              </div>
              <div className="about__info-item">
                <span className="about__info-label">Joylashuv:</span>
                <span className="about__info-value">O'zbekiston</span>
              </div>
              <div className="about__info-item">
                <span className="about__info-label">Holat:</span>
                <span className="about__info-value about__info-value--available">Ishlashga tayyor</span>
              </div>
            </div>

            <a href="#contact" className="btn-primary" style={{ marginTop: '24px' }}>
              Bog'lanish →
            </a>
          </div>
        </div>

        <div className="about__stats">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`about__stat glass-card ${inView ? 'about__stat--visible' : ''}`}
              style={{ animationDelay: `${0.6 + i * 0.15}s` }}
            >
              <div className="about__stat-icon" style={{ color: stat.color }}>
                {stat.icon}
              </div>
              <span className="about__stat-value">{stat.value}</span>
              <span className="about__stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
