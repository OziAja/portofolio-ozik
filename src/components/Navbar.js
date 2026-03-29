"use client";
import { useState, useEffect, useRef, useCallback } from 'react';

const NAV_ITEMS = [
  { href: '#home',    label: 'Home' },
  { href: '#about',   label: 'About' },
  { href: '#skills',  label: 'Skills' },
  { href: '#service', label: 'Services' },
  { href: '#project', label: 'Projects' },
  { href: '#journey', label: 'Journey' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme]       = useState('dark');
  const [activeId, setActiveId] = useState('home');
  const observerRef             = useRef(null);
  const visibilityMap           = useRef(new Map());

  // ── Theme sync ───────────────────────────────────────────────
  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'dark';
    setTheme(saved);
  }, []);

  const toggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.setAttribute('data-theme', next);
  }, [theme]);

  // ── Scrolled (rAF throttled, passive) ───────────────────────
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Active section via IntersectionObserver ──────────────────
  useEffect(() => {
    const sections = NAV_ITEMS
      .map(({ href }) => document.querySelector(href))
      .filter(Boolean);

    if (!sections.length) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => visibilityMap.current.set(e.target.id, e.intersectionRatio));

        let maxRatio = 0;
        let mostVisible = null;
        visibilityMap.current.forEach((ratio, id) => {
          if (ratio > maxRatio) { maxRatio = ratio; mostVisible = id; }
        });
        if (mostVisible && maxRatio > 0) setActiveId(mostVisible);
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin: '-72px 0px 0px 0px',
      }
    );

    sections.forEach((s) => observerRef.current.observe(s));
    return () => observerRef.current?.disconnect();
  }, []);

  // ── Smooth scroll ────────────────────────────────────────────
  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    setIsOpen(false);
    document.body.style.overflow = 'auto';

    const target = document.querySelector(href);
    const header = document.querySelector('header');
    if (!target) return;

    const top = target.getBoundingClientRect().top + window.scrollY - (header?.offsetHeight || 72);
    window.scrollTo({ top, behavior: 'smooth' });
    setActiveId(href.replace('#', ''));
  }, []);

  // ── Mobile menu toggle ───────────────────────────────────────
  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => {
      document.body.style.overflow = !prev ? 'hidden' : 'auto';
      return !prev;
    });
  }, []);

  // ── Close on outside click / ESC / resize ───────────────────
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') { setIsOpen(false); document.body.style.overflow = 'auto'; } };
    const onClick = (e) => {
      const nav = document.querySelector('.nav-menu');
      const burger = document.querySelector('.hamburger');
      if (nav && !nav.contains(e.target) && burger && !burger.contains(e.target)) {
        setIsOpen(false);
        document.body.style.overflow = 'auto';
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 769) { setIsOpen(false); document.body.style.overflow = 'auto'; }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
      window.removeEventListener('resize', onResize);
    };
  }, [isOpen]);

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <nav className="navbar">
        <div className="nav-brand" onClick={(e) => handleNavClick(e, '#home')}>
          Ozik<span className="brand-dot">Dev</span>
        </div>

        <ul className={`nav-menu${isOpen ? ' active' : ''}`}>
          {NAV_ITEMS.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className={`nav-link${activeId === href.slice(1) ? ' active' : ''}`}
                onClick={(e) => handleNavClick(e, href)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-cta">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>

        <button className={`hamburger${isOpen ? ' active' : ''}`} onClick={toggleMenu} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
      </nav>
    </header>
  );
}
