"use client";

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const rafRef = useRef<number | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

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
    lenisRef.current = lenis;

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

    // Native ResizeObserver to dynamically update Lenis bounds whenever DOM height changes (dynamic mounts, image loading, etc.)
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
    });
    if (document.body) {
      resizeObserver.observe(document.body);
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      resizeObserver.disconnect();
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Reset scroll and force Lenis to recalculate height bounds on route change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }

    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
      lenisRef.current.resize();

      // Multi-stage delayed resize scheduler to accommodate lazy-loading dynamic page elements
      const delays = [100, 300, 600, 1000, 1800];
      const timers = delays.map(delay => 
        setTimeout(() => {
          if (lenisRef.current) {
            lenisRef.current.resize();
          }
        }, delay)
      );

      return () => timers.forEach(clearTimeout);
    }
  }, [pathname]);

  return <>{children}</>;
};

export function smoothScrollTo(targetY: number) {
  window.scrollTo({ top: targetY, behavior: 'smooth' });
}
