import { useInView } from 'react-intersection-observer';
import {
  FaReact, FaNodeJs, FaPython, FaGitAlt, FaFigma,
  FaHtml5, FaCss3Alt, FaBrain, FaCode,
} from 'react-icons/fa';
import {
  SiTypescript, SiJavascript, SiTailwindcss,
  SiMongodb, SiPostgresql, SiDjango,
} from 'react-icons/si';
import './Skills.css';

const skillCategories = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React', icon: <FaReact />, level: 95, color: '#61dafb' },
      { name: 'TypeScript', icon: <SiTypescript />, level: 88, color: '#3178c6' },
      { name: 'JavaScript', icon: <SiJavascript />, level: 93, color: '#f7df1e' },
      { name: 'Tailwind CSS', icon: <SiTailwindcss />, level: 90, color: '#06b6d4' },
      { name: 'HTML5', icon: <FaHtml5 />, level: 97, color: '#e34f26' },
      { name: 'CSS3', icon: <FaCss3Alt />, level: 95, color: '#1572b6' },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', icon: <FaNodeJs />, level: 88, color: '#339933' },
      { name: 'Python', icon: <FaPython />, level: 82, color: '#3776ab' },
      { name: 'Django', icon: <SiDjango />, level: 75, color: '#092e20' },
      { name: 'Git', icon: <FaGitAlt />, level: 90, color: '#f05032' },
      { name: 'PostgreSQL', icon: <SiPostgresql />, level: 80, color: '#4169e1' },
      { name: 'MongoDB', icon: <SiMongodb />, level: 83, color: '#47a248' },
    ],
  },
  {
    title: 'Tools',
    skills: [
      { name: 'Figma', icon: <FaFigma />, level: 85, color: '#f24e1e' },
      { name: 'PyCharm', icon: <FaCode />, level: 80, color: '#21d789' },
      { name: 'VS Code', icon: <span style={{ fontSize: '0.7rem', fontWeight: 700 }}>VS</span>, level: 95, color: '#007acc' },
      { name: 'AI Tools', icon: <FaBrain />, level: 88, color: '#ff6b9d' },
    ],
  },
];

function SkillBar({ skill, inView, delay }) {
  return (
    <div className="skill-bar">
      <div className="skill-bar__header">
        <div className="skill-bar__name">
          <span className="skill-bar__icon" style={{ color: skill.color }}>{skill.icon}</span>
          {skill.name}
        </div>
        <span className="skill-bar__percent">{skill.level}%</span>
      </div>
      <div className="skill-bar__track">
        <div
          className="skill-bar__fill"
          style={{
            '--target-width': `${skill.level}%`,
            '--fill-color': skill.color,
            animationDelay: `${delay}s`,
          }}
          data-visible={inView}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="skills" className="section skills" ref={ref}>
      <div className="container">
        <div className={`skills__header ${inView ? 'skills__header--visible' : ''}`}>
          <h2 className="section-title">Ko'nikmalar</h2>
          <p className="section-subtitle">
            Ishlatadigan texnologiyalarim va darajalari.
          </p>
        </div>

        <div className="skills__categories">
          {skillCategories.map((category, catIdx) => (
            <div
              key={category.title}
              className={`skills__category glass-card ${inView ? 'skills__category--visible' : ''}`}
              style={{ transitionDelay: `${catIdx * 0.15}s` }}
            >
              <h3 className="skills__category-title">{category.title}</h3>
              <div className="skills__list">
                {category.skills.map((skill, skillIdx) => (
                  <SkillBar
                    key={skill.name}
                    skill={skill}
                    inView={inView}
                    delay={catIdx * 0.15 + skillIdx * 0.1}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
