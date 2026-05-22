"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Cpu, Menu, X, ChevronRight, Zap } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

const navLinks = [
  { label: 'Platform',   path: '/',           targetId: 'hero' },
  { label: 'AI System',  path: '/ai-system',  targetId: 'consultant' },
  { label: 'Solutions',  path: '/solutions',  targetId: 'solutions' },
  { label: 'Products',   path: '/products',   targetId: 'products' },
  { label: 'Analytics',  path: '/analytics',  targetId: 'dashboard' },
  { label: 'Contact',    path: '/contact',    targetId: 'support' },
];

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [activeLink, setActiveLink]   = useState('/');
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const navRef = useRef<HTMLElement>(null);

  // Scroll detection for background color transition
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll Spy to highlight the active section on scroll (only active on home page '/')
  useEffect(() => {
    if (pathname !== '/') {
      // On subpages, highlight active link based on pathname
      const matched = navLinks.find(link => link.path !== '/' && pathname.startsWith(link.path));
      setActiveLink(matched ? matched.path : '/');
      return;
    }

    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 180; // trigger offset for section highlight

      // Find the section that is currently active in the viewport
      let activeSection = '/'; // fallback to Platform (Hero)
      
      for (const link of navLinks) {
        if (link.targetId) {
          const el = document.getElementById(link.targetId);
          if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY;
            const height = el.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              activeSection = link.path;
              break;
            }
          }
        }
      }
      setActiveLink(activeSection);
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    handleScrollSpy();

    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, [pathname]);

  // 3D mouse tilt effect on navbar
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = navRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    mouseX.set(x * 3);   // max 3deg tilt
    mouseY.set(-y * 1.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const rotateX = useTransform(mouseY, v => `${v}deg`);
  const rotateY = useTransform(mouseX, v => `${v}deg`);

  const navigateTo = (link: { label: string; path: string; targetId: string }) => {
    setMobileOpen(false);
    if (pathname === '/') {
      const el = document.getElementById(link.targetId);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else {
      router.push(`/?to=${link.targetId}`);
    }
  };

  const handleRfqClick = () => {
    setMobileOpen(false);
    if (pathname === '/') {
      const el = document.getElementById('rfq');
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else {
      router.push('/?to=rfq');
    }
  };

  return (
    <>
      {/* ========== DESKTOP NAVBAR ========== */}
      <motion.nav
        ref={navRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 1000,
          padding: scrolled ? '0.75rem clamp(0.75rem, 4vw, 2rem)' : '1.25rem clamp(0.75rem, 4vw, 2rem)',
          transition: 'padding 0.4s ease',
          perspective: '1200px',
        }}
      >
        {/* 3D inner card */}
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
            maxWidth: 1320,
            margin: '0 auto',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderRadius: '1rem',
              padding: '0.875rem 1.75rem',
              background: scrolled
                ? 'rgba(255, 255, 255, 0.95)'
                : 'rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: scrolled
                ? '1px solid rgba(2, 132, 199, 0.2)'
                : '1px solid rgba(0, 0, 0, 0.08)',
              boxShadow: scrolled
                ? '0 20px 60px rgba(0,0,0,0.05), 0 0 0 1px rgba(2,132,199,0.1), inset 0 1px 0 rgba(255,255,255,0.6)'
                : '0 4px 24px rgba(0,0,0,0.03)',
              transition: 'all 0.5s cubic-bezier(0.22,1,0.36,1)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Shimmer sweep on scroll */}
            {scrolled && (
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '300%' }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4, ease: 'linear' }}
                style={{
                  position: 'absolute', top: 0, left: 0, width: '30%', height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(2,132,199,0.1), transparent)',
                  pointerEvents: 'none',
                }}
              />
            )}

            {/* LOGO */}
            <motion.button
              onClick={() => {
                if (pathname === '/') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  router.push('/');
                }
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1 }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#f97316', letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
                  AXAR
                </span>
                <span style={{ fontSize: '0.55rem', fontWeight: 900, color: '#0284c7', letterSpacing: '0.25em', textTransform: 'uppercase', marginTop: '0.1rem' }}>
                  ENTERPRISE
                </span>
              </div>
            </motion.button>

            {/* NAV LINKS — desktop */}
            <nav className="hidden md:flex" style={{ alignItems: 'center', gap: '0.25rem' }}>
              {navLinks.map(link => (
                <div key={link.path} style={{ position: 'relative' }}>
                  <motion.button
                    onClick={() => navigateTo(link)}
                    onMouseEnter={() => setHoveredLink(link.path)}
                    onMouseLeave={() => setHoveredLink(null)}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      padding: '0.5rem 0.875rem',
                      borderRadius: '0.625rem',
                      background: activeLink === link.path ? 'rgba(14,165,233,0.1)' : 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      position: 'relative',
                      transition: 'background 0.25s',
                    }}
                  >
                    {/* 3D hover depth shadow */}
                    <AnimatePresence>
                      {hoveredLink === link.path && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          style={{
                            position: 'absolute', inset: 0, borderRadius: '0.625rem',
                            background: 'rgba(14,165,233,0.08)',
                            boxShadow: '0 0 0 1px rgba(14,165,233,0.2), 0 8px 24px rgba(14,165,233,0.1)',
                          }}
                        />
                      )}
                    </AnimatePresence>
                    <span style={{
                      position: 'relative', zIndex: 1,
                      fontSize: 11, fontWeight: 800,
                      textTransform: 'uppercase', letterSpacing: '0.1em',
                      color: activeLink === link.path ? '#0284c7' : '#475569',
                      transition: 'color 0.25s',
                    }}>
                      {link.label}
                    </span>
                    {/* Active dot */}
                    {activeLink === link.path && (
                      <motion.div
                        layoutId="nav-active"
                        style={{
                          position: 'absolute', bottom: 2, left: '50%', transform: 'translateX(-50%)',
                          width: 4, height: 4, borderRadius: '50%', background: '#0ea5e9',
                          boxShadow: '0 0 8px rgba(14,165,233,0.8)',
                        }}
                      />
                    )}
                  </motion.button>
                </div>
              ))}
            </nav>

            {/* CTA + Mobile toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <motion.button
                className="hidden md:flex btn-primary"
                onClick={handleRfqClick}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                style={{ padding: '0.65rem 1.5rem', gap: '0.5rem' }}
              >
                <Zap style={{ width: 14, height: 14 }} />
                <span>Get RFQ</span>
              </motion.button>

              {/* Mobile hamburger */}
              <motion.button
                className="flex md:hidden"
                onClick={() => setMobileOpen(!mobileOpen)}
                whileTap={{ scale: 0.9 }}
                style={{
                  width: 38, height: 38, borderRadius: '0.6rem', cursor: 'pointer',
                  background: '#ffffff', border: '1px solid rgba(0,0,0,0.1)',
                  alignItems: 'center', justifyContent: 'center', color: '#0f172a',
                }}
              >
                <AnimatePresence mode="wait">
                  {mobileOpen
                    ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X style={{ width: 18, height: 18 }} /></motion.div>
                    : <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><Menu style={{ width: 18, height: 18 }} /></motion.div>}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.nav>

      {/* ========== MOBILE MENU ========== */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              top: 90, left: '1rem', right: '1rem',
              zIndex: 999,
              background: '#ffffff',
              border: '1px solid rgba(0,0,0,0.1)',
              borderRadius: '1.25rem',
              padding: '1.25rem',
              boxShadow: '0 40px 80px rgba(0,0,0,0.1)',
              backdropFilter: 'blur(24px)',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.path}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => navigateTo(link)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  width: '100%', padding: '0.875rem 1rem', borderRadius: '0.75rem',
                  background: activeLink === link.path ? 'rgba(14,165,233,0.1)' : 'transparent',
                  border: 'none', cursor: 'pointer',
                  color: activeLink === link.path ? '#0284c7' : '#475569',
                  fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em',
                  transition: 'all 0.2s',
                  marginBottom: 2,
                }}
              >
                <span>{link.label}</span>
                <ChevronRight style={{ width: 14, height: 14, opacity: 0.4 }} />
              </motion.button>
            ))}
            <div style={{ height: 1, background: 'rgba(0,0,0,0.08)', margin: '0.75rem 0' }} />
            <button
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={handleRfqClick}
            >
              Initialize RFQ Engine
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
