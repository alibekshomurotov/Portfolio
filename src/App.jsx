import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollTop from './components/ScrollTop';
import { trackVisit, getVisitStats, getSettings } from './utils/storage';

function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('portfolio-theme') || 'dark';
    }
    return 'dark';
  });
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  // ===== VISITOR TRACKING =====
  useEffect(() => {
    trackVisit();
  }, []);

  // Update visitor count for Footer
  useEffect(() => {
    const updateCount = () => {
      const stats = getVisitStats();
      setVisitorCount(stats.total || 0);
    };
    updateCount();
    const interval = setInterval(updateCount, 5000);
    return () => clearInterval(interval);
  }, []);

  // ===== SPLASH INTRO =====
  const [introDone, setIntroDone] = useState(false);
  const [introPhase, setIntroPhase] = useState('idle');

  useEffect(() => {
    window.scrollTo(0, 0);

    setIntroPhase('assembling');
    const t1 = setTimeout(() => setIntroPhase('glow'), 1500);
    const t2 = setTimeout(() => setIntroPhase('fadeout'), 2500);
    const t3 = setTimeout(() => {
      setIntroDone(true);
      setIntroPhase('done');
    }, 3200);
    const t4 = setTimeout(() => {
      setIntroDone(true);
      setIntroPhase('done');
    }, 5000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  const settings = getSettings();

  // ===== MAIN PORTFOLIO =====
  return (
    <>
      {/* ===== SPLASH INTRO ===== */}
      {!introDone && (
        <div className={`hero__splash ${introPhase}`}>
          <div className="hero__splash-bg">
            {[...Array(20)].map((_, i) => (
              <span
                key={i}
                className="hero__splash-particle"
                style={{
                  '--sx': `${Math.random() * 100}%`,
                  '--sy': `${Math.random() * 100}%`,
                  '--sd': `${8 + Math.random() * 12}s`,
                  '--sdelay': `${Math.random() * 5}s`,
                }}
              />
            ))}
          </div>
          <div className="hero__splash-name">
            {['A','L','I','B','E','K'].map((letter, i) => {
              const configs = [
                { fromX: -800, fromY: -400, rotate: -180, scale: 3 },
                { fromX: 900, fromY: -300, rotate: 240, scale: 0.2 },
                { fromX: -600, fromY: 500, rotate: 120, scale: 4 },
                { fromX: 700, fromY: 400, rotate: -90, scale: 0.3 },
                { fromX: -900, fromY: 100, rotate: 200, scale: 2.5 },
                { fromX: 500, fromY: -500, rotate: -150, scale: 0.1 },
              ];
              return (
                <span
                  key={i}
                  className="hero__splash-letter"
                  style={{
                    '--from-x': `${configs[i].fromX}px`,
                    '--from-y': `${configs[i].fromY}px`,
                    '--from-rotate': `${configs[i].rotate}deg`,
                    '--from-scale': configs[i].scale,
                    '--delay': `${0.2 + i * 0.12}s`,
                  }}
                >
                  {letter}
                </span>
              );
            })}
          </div>
          <div className="hero__splash-burst">
            {[...Array(16)].map((_, i) => (
              <span
                key={i}
                className="hero__splash-burst-dot"
                style={{
                  '--b-angle': `${i * 22.5}deg`,
                  '--b-delay': `${1.2 + i * 0.05}s`,
                  '--b-dist': `${80 + Math.random() * 120}px`,
                }}
              />
            ))}
          </div>
          <div className="hero__splash-subtitle">
            <span className="hero__splash-bracket">&lt;</span>
            Creative Developer
            <span className="hero__splash-bracket">/&gt;</span>
          </div>
        </div>
      )}

      {/* Background effects */}
      <div className="bg-glow bg-glow-1" />
      <div className="bg-glow bg-glow-2" />
      <div className="bg-glow bg-glow-3" />

      <div className="bg-particles">
        {[...Array(30)].map((_, i) => (
          <span
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${10 + Math.random() * 20}s`,
              animationDelay: `${Math.random() * 10}s`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
            }}
          />
        ))}
      </div>

      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero introDone={introDone} />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Testimonials />
        <Contact />
      </main>
      <Footer visitorCount={visitorCount} showCounter={settings.showVisitorCounter} />
      <ScrollTop />
    </>
  );
}

export default App;
