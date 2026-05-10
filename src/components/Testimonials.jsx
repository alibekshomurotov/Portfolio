import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';
import { getTestimonials } from '../utils/storage';
import './Testimonials.css';

export default function Testimonials() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [current, setCurrent] = useState(0);
  const [, setTick] = useState(0);

  useEffect(() => {
    const handler = () => setTick(t => t + 1);
    window.addEventListener('testimonials-updated', handler);
    return () => window.removeEventListener('testimonials-updated', handler);
  }, []);

  const testimonials = getTestimonials();

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="section testimonials" ref={ref}>
      <div className="container">
        <div className={`testimonials__header ${inView ? 'testimonials__header--visible' : ''}`}>
          <h2 className="section-title">Mijozlar izohlari</h2>
          <p className="section-subtitle">
            Men bilan ishlagan mijozlar nima deydi.
          </p>
        </div>

        <div className={`testimonials__slider ${inView ? 'testimonials__slider--visible' : ''}`}>
          <div className="testimonials__track">
            {testimonials.map((t, i) => (
              <div
                key={t.id || t.name}
                className={`testimonials__card glass-card ${i === current ? 'testimonials__card--active' : ''}`}
                style={{ '--accent': t.color }}
              >
                <div className="testimonials__quote-icon">❝</div>
                <p className="testimonials__text">{t.text}</p>
                <div className="testimonials__stars">
                  {[...Array(5)].map((_, si) => (
                    <FiStar
                      key={si}
                      className={`testimonials__star ${si < t.rating ? 'testimonials__star--filled' : ''}`}
                      style={si < t.rating ? { color: t.color } : {}}
                    />
                  ))}
                </div>
                <div className="testimonials__author">
                  <div className="testimonials__avatar" style={{ background: `${t.color}20`, color: t.color }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <span className="testimonials__name">{t.name}</span>
                    <span className="testimonials__role">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="testimonials__controls">
            <button className="testimonials__btn" onClick={prev} aria-label="Oldingi">
              <FiChevronLeft />
            </button>
            <div className="testimonials__dots">
              {testimonials.map((_, i) => (
                <span
                  key={i}
                  className={`testimonials__dot ${i === current ? 'testimonials__dot--active' : ''}`}
                  onClick={() => setCurrent(i)}
                />
              ))}
            </div>
            <button className="testimonials__btn" onClick={next} aria-label="Keyingi">
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
