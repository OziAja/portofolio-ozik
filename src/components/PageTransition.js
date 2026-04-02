"use client";
import { useEffect, useRef, useState } from 'react';

const STRIP_COUNT = 5;

export default function PageTransition() {
  const [visible,  setVisible]  = useState(false);
  const [animCls,  setAnimCls]  = useState('');   // 'pt-enter' | 'pt-exit'
  const targetRef = useRef(null);

  useEffect(() => {
    // ── Entrance: reveal setelah loading selesai ─────────────
    const doEnter = () => {
      setVisible(true);
      setAnimCls('pt-enter');
      setTimeout(() => {
        setVisible(false);
        setAnimCls('');
      }, 1200);
    };

    if (window.__loadingDone) {
      setTimeout(doEnter, 60);
    } else {
      window.addEventListener('loading-done', doEnter, { once: true });
    }

    // ── Exit: tutup layar sebelum navigasi ───────────────────
    const handleClick = (e) => {
      const a = e.target.closest('a[href]');
      if (!a) return;
      const href = a.getAttribute('href');
      if (
        !href ||
        href.startsWith('#') ||
        href.startsWith('http') ||
        href.startsWith('mailto') ||
        a.hasAttribute('download')
      ) return;

      e.preventDefault();
      targetRef.current = href;

      setVisible(true);
      setAnimCls('pt-exit');

      setTimeout(() => {
        window.location.href = href;
      }, 800);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  if (!visible) return null;

  return (
    <div className={`pt-root ${animCls}`} aria-hidden="true">
      {Array.from({ length: STRIP_COUNT }, (_, i) => (
        <div
          key={i}
          className="pt-strip"
          style={{ animationDelay: (i * 0.06) + 's' }}
        />
      ))}

      <style>{`
        /* ── ROOT ──────────────────────────────────────────── */
        .pt-root {
          position: fixed; inset: 0; z-index: 9998;
          display: flex; flex-direction: column;
          pointer-events: none; overflow: hidden;
        }
        .pt-exit { pointer-events: all; }

        /* ── STRIPS ────────────────────────────────────────── */
        .pt-strip {
          flex: 1;
          background: #090909;
          transform-origin: bottom center;
          transform: scaleY(0);
        }

        /* Accent merah di strip pertama */
        .pt-strip:nth-child(1) {
          background: linear-gradient(to bottom, rgba(255,43,43,0.9) 0px, #090909 2px);
        }

        /* ── ENTER — strip muncul dari bawah lalu pergi ke atas */
        .pt-enter .pt-strip {
          animation: pt-wipe-in 1.1s cubic-bezier(0.87, 0, 0.13, 1) forwards;
        }
        @keyframes pt-wipe-in {
          0%   { transform: scaleY(0); transform-origin: bottom center; }
          45%  { transform: scaleY(1); transform-origin: bottom center; }
          46%  { transform: scaleY(1); transform-origin: top center; }
          100% { transform: scaleY(0); transform-origin: top center; }
        }

        /* ── EXIT — strip naik dari bawah menutup layar ─────── */
        .pt-exit .pt-strip {
          animation: pt-cover 0.75s cubic-bezier(0.87, 0, 0.13, 1) forwards;
        }
        @keyframes pt-cover {
          0%   { transform: scaleY(0); transform-origin: bottom center; }
          100% { transform: scaleY(1); transform-origin: bottom center; }
        }

        /* ── MOBILE — horizontal ───────────────────────────── */
        @media (max-width: 580px) {
          .pt-root { flex-direction: row; }

          .pt-enter .pt-strip {
            animation: pt-wipe-in-h 1.1s cubic-bezier(0.87, 0, 0.13, 1) forwards;
          }
          @keyframes pt-wipe-in-h {
            0%   { transform: scaleX(0); transform-origin: right center; }
            45%  { transform: scaleX(1); transform-origin: right center; }
            46%  { transform: scaleX(1); transform-origin: left center; }
            100% { transform: scaleX(0); transform-origin: left center; }
          }

          .pt-exit .pt-strip {
            animation: pt-cover-h 0.75s cubic-bezier(0.87, 0, 0.13, 1) forwards;
          }
          @keyframes pt-cover-h {
            0%   { transform: scaleX(0); transform-origin: right center; }
            100% { transform: scaleX(1); transform-origin: right center; }
          }
        }
      `}</style>
    </div>
  );
}
