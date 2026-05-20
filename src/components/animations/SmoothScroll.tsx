"use client";

import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Force scroll to top on reload and disable browser scroll restoration
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
      
      // Defeat browser reload scroll memory
      window.onbeforeunload = function () {
        window.scrollTo(0, 0);
      };

      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname);
      }
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Reset Lenis internal scroll coordinates immediately
    lenis.scrollTo(0, { immediate: true });

    const bar = document.getElementById('scroll-progress-bar');
    lenis.on('scroll', ({ progress }: { progress: number }) => {
      if (bar) bar.style.width = `${progress * 100}%`;
    });

    function raf(time: number) {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }
    rafRef.current = requestAnimationFrame(raf);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};

export function smoothScrollTo(targetY: number) {
  window.scrollTo({ top: targetY, behavior: 'smooth' });
}
