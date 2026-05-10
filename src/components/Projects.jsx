import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { FiExternalLink, FiGithub, FiStar } from 'react-icons/fi';
import './Projects.css';

function getStoredProjects() {
  const stored = localStorage.getItem('portfolio-projects');
  if (stored) return JSON.parse(stored);
  return null;
}

function ProjectCard({ project, index, inView }) {
  return (
    <div
      className={`project-card glass-card ${project.featured ? 'project-card--featured' : ''} ${
        inView ? 'project-card--visible' : ''
      }`}
      style={{ animationDelay: `${index * 0.12}s`, '--accent': project.color }}
    >
      <div className="project-card__image">
        <img src={project.image} alt={project.title} loading="lazy" />
        <div className="project-card__overlay">
          <a href={project.github} className="project-card__link" aria-label="GitHub">
            <FiGithub />
          </a>
          <a href={project.live} className="project-card__link" aria-label="Live demo">
            <FiExternalLink />
          </a>
        </div>
      </div>

      <div className="project-card__content">
        <div className="project-card__top">
          <h3 className="project-card__title">{project.title}</h3>
          {project.featured && (
            <span className="project-card__badge">
              <FiStar />
              Featured
            </span>
          )}
        </div>
        <p className="project-card__description">{project.description}</p>
        <div className="project-card__tags">
          {project.tags.map((tag) => (
            <span key={tag} className="project-card__tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [projects, setProjects] = useState(getStoredProjects);

  useEffect(() => {
    // localStorage dan loyihalarni o'qish
    const updateProjects = () => {
      setProjects(getStoredProjects());
    };
    updateProjects();
    window.addEventListener('projects-updated', updateProjects);
    // Har 2 soniyada tekshirish (admin o'zgartirsa)
    const interval = setInterval(updateProjects, 2000);
    return () => {
      window.removeEventListener('projects-updated', updateProjects);
      clearInterval(interval);
    };
  }, []);

  if (!projects || projects.length === 0) {
    return (
      <section id="projects" className="section projects" ref={ref}>
        <div className="container">
          <div className={`projects__header ${inView ? 'projects__header--visible' : ''}`}>
            <h2 className="section-title">Loyihalar</h2>
            <p className="section-subtitle">Hali loyiha yo'q.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="section projects" ref={ref}>
      <div className="container">
        <div className={`projects__header ${inView ? 'projects__header--visible' : ''}`}>
          <h2 className="section-title">Loyihalar</h2>
          <p className="section-subtitle">
            Yaqinda bajarilgan eng yaxshi loyihalarim.
          </p>
        </div>

        <div className="projects__grid">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
