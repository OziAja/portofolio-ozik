"use client";
import { useEffect, useState } from 'react';

export default function Loading() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      window.__loadingDone = true;
      window.dispatchEvent(new CustomEvent('loading-done'));
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="loading-overlay" role="status" aria-label="Loading">
      <div className="loading-logo">Ozik<span>Dev</span></div>
      <div className="loading-spinner" aria-hidden="true" />
    </div>
  );
}
