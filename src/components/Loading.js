"use client";
import { useEffect, useState, useRef } from 'react';

const GREETINGS = [
  { text: 'Halo',       lang: 'Indonesia'  },
  { text: 'Hello',      lang: 'English'    },
  { text: 'Bonjour',    lang: 'Français'   },
  { text: 'こんにちは',  lang: 'Japanese'   },
  { text: 'Hola',       lang: 'Español'    },
  { text: '안녕하세요',  lang: 'Korean'     },
  { text: 'Ciao',       lang: 'Italiano'   },
  { text: 'Merhaba',    lang: 'Turkish'    },
  { text: '你好',        lang: 'Chinese'    },
  { text: 'Olá',        lang: 'Português'  },
];

export default function Loading() {
  const [count,    setCount]    = useState(0);
  const [greetIdx, setGreetIdx] = useState(0);
  const [greetOut, setGreetOut] = useState(false);
  const [done,     setDone]     = useState(false);   // counter selesai
  const [leaving,  setLeaving]  = useState(false);   // animasi keluar
  const [gone,     setGone]     = useState(false);   // unmount
  const rafRef  = useRef(null);
  const startTs = useRef(null);

  // ── Counter 0 → 100 dalam ~4.5s, ease in-out ──────────────
  useEffect(() => {
    const DURATION = 4500;

    const tick = (ts) => {
      if (!startTs.current) startTs.current = ts;
      const elapsed  = ts - startTs.current;
      const p        = Math.min(elapsed / DURATION, 1);
      // ease in-out sine — terasa natural, lambat di ujung
      const eased    = -(Math.cos(Math.PI * p) - 1) / 2;
      setCount(Math.floor(eased * 100));

      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setCount(100);
        setDone(true);
        // Tahan 100% sebentar
        setTimeout(() => {
          setLeaving(true);
          setTimeout(() => {
            setGone(true);
            window.__loadingDone = true;
            window.dispatchEvent(new CustomEvent('loading-done'));
          }, 1000);
        }, 500);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // ── Greeting — ganti tiap 300ms, snappy ──────────────────
  useEffect(() => {
    if (leaving || gone) return;
    const id = setInterval(() => {
      setGreetOut(true);
      setTimeout(() => {
        setGreetIdx((i) => (i + 1) % GREETINGS.length);
        setGreetOut(false);
      }, 120);
    }, 300);
    return () => clearInterval(id);
  }, [leaving, gone]);

  if (gone) return null;

  const g = GREETINGS[greetIdx];

  return (
    <div className={`ld-wrap${leaving ? ' ld-leaving' : ''}`} role="status" aria-label="Loading">

      {/* ── PANEL KIRI ── */}
      <div className="ld-panel ld-l">

        {/* Brand pojok kiri atas */}
        <div className="ld-brand">
          Ozik<span>Dev</span>
        </div>

        {/* Greeting tengah */}
        <div className="ld-greet-box">
          <span className={`ld-greet${greetOut ? ' ld-g-out' : ' ld-g-in'}`}>
            {g.text}
          </span>
          <span className={`ld-lang${greetOut ? ' ld-g-out' : ' ld-g-in'}`}>
            {g.lang}
          </span>
        </div>

        {/* Tagline pojok kiri bawah */}
        <div className="ld-tag">
          Full-Stack Developer &amp; Indonesia
        </div>
      </div>

      {/* ── GARIS TENGAH ── */}
      <div className="ld-mid">
        <div className="ld-mid-line" style={{ height: count + '%' }} />
      </div>

      {/* ── PANEL KANAN ── */}
      <div className="ld-panel ld-r">

        {/* Counter pojok kanan atas */}
        <div className="ld-counter-box">
          <div className="ld-num-row">
            <span className={`ld-num${done ? ' ld-num-done' : ''}`}>
              {String(count).padStart(2, '0')}
            </span>
            <span className="ld-pct">%</span>
          </div>
          <span className="ld-status">
            {done ? 'Selamat Datang ✦' : 'Memuat...'}
          </span>
        </div>

        {/* Progress bar tengah-bawah */}
        <div className="ld-bar-outer">
          <div className="ld-bar-fill" style={{ width: count + '%' }}>
            <div className="ld-bar-dot" />
          </div>
        </div>

        {/* Year pojok kanan bawah */}
        <div className="ld-year">© {new Date().getFullYear()}</div>
      </div>

      <style>{`
        /* ── ROOT ──────────────────────────────────────────────── */
        .ld-wrap {
          position: fixed; inset: 0; z-index: 99999;
          display: flex; overflow: hidden;
          background: #080808;
        }

        /* ── PANELS ────────────────────────────────────────────── */
        .ld-panel {
          flex: 1; display: flex; flex-direction: column;
          justify-content: space-between; padding: 2.5rem;
          position: relative; overflow: hidden;
          transition: transform 1s cubic-bezier(0.87,0,0.13,1);
        }
        .ld-l { background: #080808; }
        .ld-r { background: #0c0c0c; align-items: flex-end; }

        /* Reveal slide */
        .ld-leaving .ld-l { transform: translateY(-100%); }
        .ld-leaving .ld-r { transform: translateY(100%);  transition-delay: 0.07s; }
        .ld-leaving .ld-mid { opacity: 0; transition: opacity 0.2s ease; }

        /* ── BRAND ─────────────────────────────────────────────── */
        .ld-brand {
          font-size: 1rem; font-weight: 800;
          color: rgba(255,255,255,0.2);
          letter-spacing: 0.04em;
        }
        .ld-brand span {
          background: linear-gradient(135deg, #ff2b2b, #cc0000);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ── GREETING ──────────────────────────────────────────── */
        .ld-greet-box {
          display: flex; flex-direction: column; gap: 8px;
        }
        .ld-greet {
          display: block;
          font-size: clamp(3.5rem, 9vw, 7rem);
          font-weight: 900; line-height: 1;
          color: #fff; letter-spacing: -0.04em;
          transition: opacity 0.11s ease, transform 0.11s ease;
        }
        .ld-lang {
          font-size: 0.72rem; font-weight: 500;
          color: rgba(255,255,255,0.28);
          letter-spacing: 0.18em; text-transform: uppercase;
          font-family: 'Courier New', monospace;
          transition: opacity 0.11s ease, transform 0.11s ease;
        }
        .ld-g-in  { opacity: 1; transform: translateY(0); }
        .ld-g-out { opacity: 0; transform: translateY(-10px); }

        /* ── TAG ───────────────────────────────────────────────── */
        .ld-tag {
          font-size: 0.68rem; color: rgba(255,255,255,0.18);
          letter-spacing: 0.1em; text-transform: uppercase;
          font-family: 'Courier New', monospace;
        }

        /* ── GARIS TENGAH ──────────────────────────────────────── */
        .ld-mid {
          width: 1px; background: rgba(255,255,255,0.07);
          position: relative; overflow: hidden; flex-shrink: 0;
          transition: opacity 0.2s;
        }
        .ld-mid-line {
          position: absolute; bottom: 0; left: 0; width: 100%;
          background: linear-gradient(to top, #ff2b2b 0%, rgba(255,43,43,0.05) 100%);
          transition: height 0.12s linear;
          box-shadow: 0 0 14px 2px rgba(255,43,43,0.45);
        }

        /* ── COUNTER ───────────────────────────────────────────── */
        .ld-counter-box {
          display: flex; flex-direction: column; align-items: flex-end; gap: 6px;
        }
        .ld-num-row {
          display: flex; align-items: flex-start; gap: 3px; line-height: 1;
        }
        .ld-num {
          font-size: clamp(4.5rem, 11vw, 9rem);
          font-weight: 900; color: #fff;
          letter-spacing: -0.05em;
          font-family: 'Courier New', monospace;
          line-height: 0.9;
          transition: color 0.4s ease;
        }
        .ld-num-done { color: #ff2b2b; }
        .ld-pct {
          font-size: clamp(1.5rem, 3.5vw, 3.2rem);
          font-weight: 700; color: rgba(255,255,255,0.25);
          padding-top: 0.6rem;
        }
        .ld-status {
          font-size: 0.68rem; font-weight: 600;
          color: rgba(255,255,255,0.22);
          letter-spacing: 0.18em; text-transform: uppercase;
          font-family: 'Courier New', monospace;
          transition: color 0.4s;
        }

        /* ── PROGRESS BAR ──────────────────────────────────────── */
        .ld-bar-outer {
          width: 100%; max-width: 260px; height: 1.5px;
          background: rgba(255,255,255,0.07);
          position: relative; border-radius: 999px; overflow: visible;
        }
        .ld-bar-fill {
          height: 100%; border-radius: 999px; position: relative;
          background: linear-gradient(90deg, rgba(255,43,43,0.25), #ff2b2b);
          transition: width 0.1s linear;
        }
        .ld-bar-dot {
          position: absolute; right: 0; top: 50%;
          transform: translate(50%, -50%);
          width: 7px; height: 7px; border-radius: 50%;
          background: #ff2b2b;
          box-shadow: 0 0 10px 3px rgba(255,43,43,0.7);
        }

        /* ── YEAR ──────────────────────────────────────────────── */
        .ld-year {
          font-size: 0.65rem; color: rgba(255,255,255,0.12);
          font-family: 'Courier New', monospace;
          letter-spacing: 0.08em;
        }

        /* ── MOBILE ────────────────────────────────────────────── */
        @media (max-width: 600px) {
          .ld-wrap { flex-direction: column; }
          .ld-mid  { width: 100%; height: 1px; flex-shrink: 0; }
          .ld-mid-line {
            bottom: auto; top: 0; height: 100% !important;
            width: 0; left: 0;
            background: linear-gradient(to right, #ff2b2b, rgba(255,43,43,0.05));
            transition: width 0.12s linear;
          }
          .ld-leaving .ld-l { transform: translateX(-100%); }
          .ld-leaving .ld-r { transform: translateX(100%);  }
          .ld-r { align-items: flex-start; }
          .ld-counter-box { align-items: flex-start; }
          .ld-bar-outer { max-width: 100%; }
        }
      `}</style>
    </div>
  );
}
