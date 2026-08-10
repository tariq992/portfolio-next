
"use client";
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type CursorMode = 'default' | 'hover' | 'input';

export default function CyberCursor() {
  const [mode, setMode] = useState<CursorMode>('default');
  const [isVisible, setIsVisible] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const ringX = useSpring(mouseX, { stiffness: 220, damping: 24, mass: 0.4 });
  const ringY = useSpring(mouseY, { stiffness: 220, damping: 24, mass: 0.4 });
  const dotX = useSpring(mouseX, { stiffness: 900, damping: 38, mass: 0.2 });
  const dotY = useSpring(mouseY, { stiffness: 900, damping: 38, mass: 0.2 });

  useEffect(() => {
    const interactiveSelector = 'a, button, input, textarea, select, [data-cursor]';

    const handlePointerMove = (event: PointerEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
      setIsVisible(true);
    };

    const handlePointerOver = (event: PointerEvent) => {
      if (!(event.target instanceof Element)) return;
      const target = event.target.closest(interactiveSelector);
      if (!target) return setMode('default');
      setMode(target.matches('input, textarea, select') ? 'input' : 'hover');
    };

    const handlePointerOut = (event: PointerEvent) => {
      if (!(event.target instanceof Element)) return;
      if (!event.relatedTarget || !(event.relatedTarget instanceof Element)) {
        setMode('default');
        return;
      }
      const fromTarget = event.target.closest(interactiveSelector);
      const toTarget = event.relatedTarget.closest(interactiveSelector);
      if (fromTarget && !toTarget) setMode('default');
    };

    const handlePointerLeave = () => setIsVisible(false);

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerover', handlePointerOver, { passive: true });
    window.addEventListener('pointerout', handlePointerOut, { passive: true });
    document.documentElement.addEventListener('mouseleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerover', handlePointerOver);
      window.removeEventListener('pointerout', handlePointerOut);
      document.documentElement.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, [mouseX, mouseY]);

  const cursorSize = mode === 'hover' ? 68 : mode === 'input' ? 52 : 34;

  return (
    <div className="cyber-cursor-root pointer-events-none fixed inset-0 z-[9999]">
      <motion.div
        style={{ x: ringX, y: ringY }}
        animate={{
          width: cursorSize,
          height: cursorSize,
          marginLeft: -cursorSize / 2,
          marginTop: -cursorSize / 2,
          opacity: isVisible ? 1 : 0,
          borderColor:
            mode === 'hover'
              ? 'rgba(0, 212, 255, 0.85)'
              : mode === 'input'
                ? 'rgba(236, 72, 153, 0.8)'
                : 'rgba(255, 255, 255, 0.3)',
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        className="fixed left-0 top-0 rounded-full border mix-blend-screen shadow-[0_0_24px_rgba(0,212,255,0.25)]"
      />
      <motion.div
        style={{ x: dotX, y: dotY }}
        animate={{ opacity: isVisible ? 1 : 0, scale: mode === 'hover' ? 1.8 : 1 }}
        className="fixed left-0 top-0 -ml-1.5 -mt-1.5 h-3 w-3 rounded-full bg-accent-cyan shadow-[0_0_20px_rgba(0,212,255,0.9)]"
      />
      <motion.div
        style={{ x: ringX, y: ringY }}
        animate={{ opacity: mode === 'hover' && isVisible ? 1 : 0 }}
        className="fixed left-0 top-0 -ml-10 -mt-10 h-20 w-20 rounded-full bg-accent-cyan/10 blur-xl"
      />
    </div>
  );
}