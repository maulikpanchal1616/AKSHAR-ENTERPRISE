"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Activity, Zap, Shield, Cpu } from 'lucide-react';
import dynamic from 'next/dynamic';

const IndustrialThree = dynamic(() => import('@/components/3d/IndustrialThree'), { ssr: false });

const stats = [
  { label: 'Industry Focus', value: '15+ Years', icon: Activity, color: '#4ade80' },
  { label: 'Thermal Efficiency', value: '30% Energy Save', icon: Zap,      color: '#0ea5e9' },
  { label: 'Global Installations',  value: '100+ Plants',  icon: Shield,   color: '#a78bfa' },
  { label: 'Quality Standards', value: 'ISO 9001', icon: Cpu,      color: '#00f2ff' },
];

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.h-badge', { opacity: 0, x: -20, duration: 0.7, delay: 0.4 })
        .from('.h-l1',    { opacity: 0, y: 50,  duration: 0.85 }, '-=0.4')
        .from('.h-l2',    { opacity: 0, y: 50,  duration: 0.85 }, '-=0.7')
        .from('.h-l3',    { opacity: 0, y: 50,  duration: 0.85 }, '-=0.7')
        .from('.h-desc',  { opacity: 0, y: 18,  duration: 0.7  }, '-=0.5')
        .from('.h-cta',   { opacity: 0, y: 14, scale: 0.95, stagger: 0.1, duration: 0.6 }, '-=0.45')
        .from('.h-stat',  { opacity: 0, y: 20, stagger: 0.08, duration: 0.65 }, '-=0.55');
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      id="hero"
      className="relative flex items-start lg:items-center pt-36 pb-16 md:pt-40 md:pb-20"
      style={{
        minHeight: '100vh',
        overflow: 'hidden',
        background: 'transparent',
      }}
    >
      <IndustrialThree />

      {/* Ambient grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.05,
        backgroundImage: 'linear-gradient(rgba(2,132,199,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(2,132,199,0.5) 1px,transparent 1px)',
        backgroundSize: '60px 60px',
      }} />
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 60% at 50% -5%, rgba(2,132,199,0.06) 0%, transparent 65%)',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Two-column layout */}
        <div className="hero-grid">

          {/* LEFT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="h-badge" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
              padding: '0.5rem 1.1rem', borderRadius: 9999,
              background: '#ffffff', border: '1px solid rgba(2,132,199,0.2)',
              width: 'fit-content',
            }}>
              <div className="anim-pulse" style={{ width: 8, height: 8, borderRadius: '50%', background: '#0284c7', boxShadow: '0 0 10px rgba(2,132,199,0.5)' }} />
              <span className="t-label" style={{ letterSpacing: '0.35em' }}>Process Engineering Core: Active</span>
            </div>

            <h1 className="t-hero">
              <div className="h-l1" style={{ overflow: 'hidden', padding: '0.08em 0', margin: '-0.08em 0' }}><span style={{ display: 'block' }}>PRECISION</span></div>
              <div className="h-l2" style={{ overflow: 'hidden', color: '#0284c7', padding: '0.08em 0', margin: '-0.08em 0' }}><span style={{ display: 'block' }}>DRYING</span></div>
              <div className="h-l3" style={{ overflow: 'hidden', padding: '0.08em 0', margin: '-0.08em 0' }}><span style={{ display: 'block' }}>SYSTEMS.</span></div>
            </h1>

            <p className="h-desc" style={{ fontSize: 17, color: '#475569', maxWidth: 480, lineHeight: 1.8, fontWeight: 500 }}>
              AXAR Enterprise is a premier turnkey manufacturer of high-efficiency Spray Dryers, Rotary Dryers, and Industrial Processing Plants. Powered by next-generation intelligent thermal engineering, we deliver ISO-compliant, ASME-certified systems that optimize energy efficiency by 30% for chemical, agrochemical, pharmaceutical, and dairy sectors globally.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button className="h-cta btn btn-blue" onClick={() => {
                const el = document.getElementById('products');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}>Explore Products</button>
              <button className="h-cta btn btn-ghost" onClick={() => {
                const el = document.getElementById('rfq');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}>Book Consultation</button>
            </div>
          </div>

          {/* RIGHT — stat bento */}
          <div className="stats-grid">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className="h-stat panel"
                whileHover={{ y: -4, boxShadow: `0 24px 48px rgba(0,0,0,0.4), 0 0 0 1px ${s.color}28` }}
                style={{ padding: '1.5rem' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
                  <div style={{ width: 38, height: 38, borderRadius: '0.6rem', background: `${s.color}14`, border: `1px solid ${s.color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <s.icon style={{ width: 17, height: 17, color: s.color }} />
                  </div>
                  <span style={{ fontSize: 9, fontWeight: 900, color: 'rgba(0,0,0,0.05)' }}>0{i + 1}</span>
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.04em', color: '#0f172a', marginBottom: 3 }}>{s.value}</div>
                <div style={{ fontSize: 9, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#64748b' }}>{s.label}</div>
              </motion.div>
            ))}
            <div className="panel" style={{ gridColumn: '1/-1', padding: '1.2rem 1.5rem', background: '#ffffff', borderColor: 'rgba(2,132,199,0.15)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span className="t-label">Global Plant Deployments</span>
                <div style={{ display: 'flex', gap: 3 }}>
                  {[1,2,3,4,5].map(i => <div key={i} style={{ width: 4, height: 14, borderRadius: 3, background: '#0284c7' }} />)}
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.95rem', fontWeight: 900, letterSpacing: '-0.03em' }}>Vatva GIDC, Ahmedabad, India</span>
                <span style={{ fontSize: 9, fontWeight: 900, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Exporting Global Standards</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 100, background: 'linear-gradient(to top, #f8fafc, transparent)', pointerEvents: 'none' }} />
    </div>
  );
};

export default Hero;
