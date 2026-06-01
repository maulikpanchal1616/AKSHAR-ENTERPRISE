"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, Phone, Mail, MapPin, Moon, Sun, ArrowRight } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';

const navLinks = [
  { label: 'Platform',   path: '/',           targetId: 'hero' },
  { label: 'Solutions',  path: '/solutions',  targetId: 'solutions' },
  { label: 'Products',   path: '/products',   targetId: 'products' },
  { label: 'Showcase',   path: '/showcase',   targetId: 'showcase' },
  { label: 'Contact',    path: '/contact',    targetId: 'rfq' },
];

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLinkState] = useState('/');
  const activeLinkRef = useRef('/');
  const setActiveLink = (val: string) => {
    setActiveLinkState(val);
    activeLinkRef.current = val;
  };
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  // Prevent hydration mismatch for theme
  useEffect(() => {
    setMounted(true);
  }, []);

  // High-performance scroll listener to prevent hanging/jank
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // 1. Update Navbar appearance
          setScrolled(window.scrollY > 40);

          // 2. Handle ScrollSpy (only on home page)
          if (pathname === '/') {
            const scrollPosition = window.scrollY + 180;
            let activeSection = '/';
            let activeTargetId = 'hero';
            
            const sections = navLinks
              .map(link => ({ link, el: document.getElementById(link.targetId) }))
              .filter(item => item.el)
              .map(item => ({
                path: item.link.path,
                targetId: item.link.targetId,
                top: item.el!.getBoundingClientRect().top + window.scrollY
              }))
              .sort((a, b) => a.top - b.top);
              
            for (const section of sections) {
              if (scrollPosition >= section.top) {
                activeSection = section.path;
                activeTargetId = section.targetId;
              }
            }
            
            if (activeSection !== activeLinkRef.current) {
              setActiveLink(activeSection);
              if (activeTargetId === 'hero') {
                window.history.replaceState(null, '', window.location.pathname);
              } else {
                window.history.replaceState(null, '', `/#${activeTargetId}`);
              }
            }
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Initial check
    if (pathname !== '/') {
      const matched = navLinks.find(link => link.path !== '/' && pathname.startsWith(link.path));
      setActiveLink(matched ? matched.path : '/');
    } else {
      onScroll();
    }

    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  const navigateTo = (link: { label: string; path: string; targetId: string }) => {
    setMobileOpen(false);
    if (pathname === '/') {
      const el = document.getElementById(link.targetId);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - (scrolled ? 80 : 120);
        window.scrollTo({ top: y, behavior: 'smooth' });
        
        // Update URL
        if (link.targetId === 'hero') {
          window.history.pushState(null, '', '/');
        } else {
          window.history.pushState(null, '', `/#${link.targetId}`);
        }
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

  const toggleTheme = () => {
    if (theme === 'system') {
      setTheme(systemTheme === 'dark' ? 'light' : 'dark');
    } else {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    }
  };

  return (
    <>
      {/* Top Info Bar */}
      <div className="hidden lg:block bg-slate-900 text-slate-300 py-2 text-xs font-medium border-b border-slate-800">
        <div className="container flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <MapPin size={14} className="text-primary" />
              <span>GIDC Phase IV, Vatva, Ahmedabad, Gujarat</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail size={14} className="text-primary" />
              <span>sales@axarenterprise.com</span>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-white font-bold">
              <Phone size={14} className="text-primary" />
              <span>24/7 Support: +91 90999 55511</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <motion.nav
        className={`sticky top-0 z-50 w-full transition-all duration-300 border-b ${scrolled ? 'bg-background/80 backdrop-blur-md shadow-sm border-border' : 'bg-background border-transparent'}`}
      >
        <div className="container h-20 flex items-center justify-between">
          
          {/* Logo */}
          <button
            onClick={() => {
              if (pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' });
              else router.push('/');
            }}
            className="flex items-center space-x-2"
          >
            <div className="font-black text-xl md:text-2xl tracking-tighter text-foreground">
              AXAR<span className="text-primary">ENTERPRISE</span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div 
            className="hidden md:flex items-center space-x-1 lg:space-x-2 relative"
            onMouseLeave={() => setHoveredLink(null)}
          >
            {navLinks.map(link => (
              <button
                key={link.path}
                onClick={() => navigateTo(link)}
                onMouseEnter={() => setHoveredLink(link.path)}
                className={`relative px-4 py-2 rounded-md text-sm font-bold uppercase tracking-widest transition-colors ${
                  activeLink === link.path 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {hoveredLink === link.path && (
                  <motion.div
                    layoutId="navbar-hover"
                    className="absolute inset-0 bg-accent rounded-md"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {activeLink === link.path && (
                  <motion.div
                    layoutId="navbar-active"
                    className="absolute bottom-0 left-3 right-3 h-[2px] bg-primary rounded-full shadow-[0_0_8px_rgba(2,132,199,0.8)]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-3 lg:space-x-4">
            
            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="w-9 h-9 flex items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' || (theme === 'system' && systemTheme === 'dark') ? (
                  <Sun size={18} />
                ) : (
                  <Moon size={18} />
                )}
              </button>
            )}

            <button
              className="hidden lg:flex btn btn-primary"
              onClick={handleRfqClick}
            >
              Request Quote
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-md border border-border bg-background text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden fixed top-[calc(5rem+1px)] left-0 w-full bg-background border-b border-border shadow-lg z-40"
          >
            <div className="container py-4 flex flex-col space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => navigateTo(link)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-md text-sm font-bold uppercase tracking-widest ${
                    activeLink === link.path ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                  }`}
                >
                  {link.label}
                  <ChevronRight size={16} className="opacity-50" />
                </button>
              ))}
              <div className="pt-4 mt-2 border-t border-border">
                <button
                  className="w-full btn btn-primary"
                  onClick={handleRfqClick}
                >
                  Request Quote <ArrowRight size={16} className="ml-2" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
