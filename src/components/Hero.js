"use client";
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

const PROFESSIONS = ['Full-Stack Developer', 'Frontend Engineer', 'Backend Developer'];

export default function Hero() {
  const [displayText, setDisplayText] = useState('');
  const timerRef = useRef(null);

  useEffect(() => {
    let i = 0, j = 0, deleting = false;

    const type = () => {
      const curr = PROFESSIONS[i];
      setDisplayText(deleting ? curr.slice(0, j - 1) : curr.slice(0, j + 1));
      j = deleting ? j - 1 : j + 1;

      if (!deleting && j === curr.length) {
        timerRef.current = setTimeout(() => { deleting = true; type(); }, 1500);
        return;
      }
      if (deleting && j === 0) { deleting = false; i = (i + 1) % PROFESSIONS.length; }
      timerRef.current = setTimeout(type, deleting ? 70 : 150);
    };

    timerRef.current = setTimeout(type, 500);
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <section id="home" className="section home">
      <div className="container mx-auto">
        <div className="home-content">

          <div className="home-text">
            <div className="greeting">👋 Hello there!</div>
            <h1 className="hero-title">I'm <span className="accent">Ozik.</span></h1>
            <h2 className="hero-subtitle">
              I'm a <span className="display-text">{displayText}</span>
              <span className="cursor" aria-hidden="true">|</span>
            </h2>
            <p className="hero-value">
              Fullstack Developer yang fokus bikin web <strong>cepat</strong>,{' '}
              <strong>responsif</strong>, dan <strong>gampang dipakai</strong>.
              Spesialis <span className="accent-text">Next.js</span> dan{' '}
              <span className="accent-text">Laravel</span> untuk aplikasi modern.
            </p>
            <p className="hero-desc">
              Aspiring full-stack developer dari Indonesia — aktif belajar dan membangun web app nyata dari nol.
            </p>

            <div className="hero-stats">
              <div className="stat"><span className="stat-number">3+</span><span className="stat-label">Projects</span></div>
              <div className="stat"><span className="stat-number">1+</span><span className="stat-label">Years</span></div>
              <div className="stat"><span className="stat-number">2+</span><span className="stat-label">Clients</span></div>
            </div>

            <div className="social-links">
              <a href="#" aria-label="WhatsApp"  className="social-icon whatsapp"><i className="fab fa-whatsapp" /></a>
              <a href="#" aria-label="LinkedIn"  className="social-icon linkedin"><i className="fab fa-linkedin-in" /></a>
              <a href="#" aria-label="GitHub"    className="social-icon github"><i className="fab fa-github" /></a>
              <a href="#" aria-label="Instagram" className="social-icon instagram"><i className="fab fa-instagram" /></a>
            </div>

            <div className="hero-actions">
              <a href="#project" className="hire-btn primary"><i className="fas fa-eye" /> View Projects</a>
               <a href="#contact" className="hire-btn primary"><i className="fas fa-envelope" /> Let's Talk</a>
              <a href="/cv.pdf" download className="hire-btn secondary"><i className="fas fa-download" /> Download CV</a>
            </div>
          </div>

          <div className="home-image">
            <div className="image-container">
              <Image
                src="/images/profile.webp"
                alt="Ozik Profile"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 300px"
                className="profile-image"
              />
              <div className="floating-card card-1"><i className="fas fa-code" /><span>Clean Code</span></div>
              <div className="floating-card card-2"><i className="fas fa-mobile-alt" /><span>Responsive</span></div>
              <div className="floating-card card-3"><i className="fas fa-rocket" /><span>Fast Loading</span></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
