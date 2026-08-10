"use client";

import { useEffect } from 'react';

export default function MouseGlow() {
  useEffect(() => {
    let frame = 0;

    const handlePointerMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const root = document.documentElement;
        root.style.setProperty('--cursor-x', `${event.clientX}px`);
        root.style.setProperty('--cursor-y', `${event.clientY}px`);
        root.style.setProperty('--cursor-x-percent', `${(event.clientX / window.innerWidth) * 100}%`);
        root.style.setProperty('--cursor-y-percent', `${(event.clientY / window.innerHeight) * 100}%`);
      });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  return (
    <>
      <div className="ambient-cursor-glow" />
      <div className="scan-field" />
    </>
  );
}