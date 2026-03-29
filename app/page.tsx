"use client";
import { useEffect, useCallback } from "react";
import useGSAP from "../src/hooks/useGSAP";
import Navbar   from "../src/components/Navbar";
import Hero     from "../src/components/Hero";
import About    from "../src/components/About";
import Skills   from "../src/components/Skills";
import Services from "../src/components/Services";
import Projects from "../src/components/Projects";
import Journey  from "../src/components/Journey";
import Contact  from "../src/components/Contact";
import Loading  from "../src/components/Loading";
import Footer   from "../src/components/Footer";

export default function Home() {
  useGSAP();

  // Notifikasi toast
  const showToast = useCallback((msg: string) => {
    const el = document.createElement('div');
    el.innerHTML = `<i class="fas fa-info-circle"></i><span>${msg}</span>`;
    Object.assign(el.style, {
      position: 'fixed', top: '20px', right: '20px',
      background: 'var(--accent-primary)', color: '#fff',
      padding: '0.9rem 1.4rem', borderRadius: '12px',
      display: 'flex', alignItems: 'center', gap: '0.5rem',
      zIndex: '9999', transform: 'translateX(120%)',
      transition: 'transform 0.3s ease',
      boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
    });
    document.body.appendChild(el);
    requestAnimationFrame(() => { el.style.transform = 'translateX(0)'; });
    setTimeout(() => {
      el.style.transform = 'translateX(120%)';
      setTimeout(() => el.remove(), 300);
    }, 3000);
  }, []);

  useEffect(() => {
    const hireBtns    = document.querySelectorAll<HTMLElement>('.hire-btn');
    const aboutBtn    = document.querySelector<HTMLElement>('.about-btn');
    const socialIcons = document.querySelectorAll<HTMLElement>('.social-icon');

    const handleBtn = function(this: HTMLElement) {
      const t = this.textContent || '';
      if (t.includes('Download CV')) showToast('CV akan tersedia segera!');
      if (t.includes('Hire Me')) {
        const contact = document.querySelector<HTMLElement>('#contact');
        const header  = document.querySelector<HTMLElement>('header');
        if (contact) window.scrollTo({ top: contact.offsetTop - (header?.offsetHeight || 72), behavior: 'smooth' });
      }
    };

    const onEnter = function(this: HTMLElement) { this.style.transform = 'translateY(-3px) scale(1.1)'; };
    const onLeave = function(this: HTMLElement) { this.style.transform = ''; };

    const btns = [...Array.from(hireBtns), aboutBtn].filter(Boolean) as HTMLElement[];
    btns.forEach((b) => b.addEventListener('click', handleBtn));
    socialIcons.forEach((i) => { i.addEventListener('mouseenter', onEnter); i.addEventListener('mouseleave', onLeave); });

    return () => {
      btns.forEach((b) => b.removeEventListener('click', handleBtn));
      socialIcons.forEach((i) => { i.removeEventListener('mouseenter', onEnter); i.removeEventListener('mouseleave', onLeave); });
    };
  }, [showToast]);

  return (
    <main className="main-wrapper">
      <div className="scroll-progress" aria-hidden="true" />
      <Loading />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Services />
      <Projects />
      <Journey />
      <Contact />
      <Footer />
    </main>
  );
}
