import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { FiBriefcase, FiCalendar } from 'react-icons/fi';
import { getExperiences } from '../utils/storage';
import './Experience.css';

export default function Experience() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [, setTick] = useState(0);

  useEffect(() => {
    const handler = () => setTick(t => t + 1);
    window.addEventListener('experiences-updated', handler);
    return () => window.removeEventListener('experiences-updated', handler);
  }, []);

  const experiences = getExperiences();

  return (
    <section id="experience" className="section experience" ref={ref}>
      <div className="container">
        <div className={`experience__header ${inView ? 'experience__header--visible' : ''}`}>
          <h2 className="section-title">Tajriba</h2>
          <p className="section-subtitle">
            Professional faoliyatim va ish tajribam.
          </p>
        </div>

        <div className="experience__timeline">
          <div className="experience__line"></div>
          {experiences.map((exp, i) => (
            <div
              key={exp.id || exp.title}
              className={`experience__item ${inView ? 'experience__item--visible' : ''} ${i % 2 === 0 ? 'experience__item--left' : 'experience__item--right'}`}
              style={{ transitionDelay: `${i * 0.2}s`, '--accent': exp.color }}
            >
              <div className="experience__dot" style={{ background: exp.color }}></div>
              <div className="experience__card glass-card">
                <div className="experience__card-header">
                  <span className="experience__period">
                    <FiCalendar /> {exp.period}
                  </span>
                  <span className="experience__company" style={{ color: exp.color }}>
                    <FiBriefcase /> {exp.company}
                  </span>
                </div>
                <h3 className="experience__title">{exp.title}</h3>
                <p className="experience__description">{exp.description}</p>
                <div className="experience__tags">
                  {exp.tags.map((tag) => (
                    <span key={tag} className="experience__tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
