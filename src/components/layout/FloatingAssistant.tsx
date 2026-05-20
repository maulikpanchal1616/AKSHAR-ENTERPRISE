"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Zap, Cpu, ShieldCheck, Activity, ChevronRight } from 'lucide-react';
import { smoothScrollTo } from '@/components/animations/SmoothScroll';

const FloatingAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);

  const goToConsultant = () => {
    const el = document.getElementById('consultant');
    if (el) smoothScrollTo(el.offsetTop - 80);
    setIsOpen(false);
  };

  return (
    <div className="floating-assistant-container">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 16 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="floating-assistant-panel panel"
            style={{
              background: '#ffffff',
              boxShadow: '0 40px 80px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.08)',
            }}
          >
            {/* Header */}
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: 36, height: 36, borderRadius: '0.6rem', background: 'rgba(2,132,199,0.1)', border: '1px solid rgba(2,132,199,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Bot style={{ width: 18, height: 18, color: '#0284c7' }} />
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 900, color: '#0f172a' }}>AX-1 LITE</div>
                  <div style={{ fontSize: 8, fontWeight: 900, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.3em' }}>Mobile Link</div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} style={{ background: '#f1f5f9', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '0.5rem', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#475569' }}>
                <X style={{ width: 14, height: 14 }} />
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              <div style={{ background: '#f8fafc', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '0.875rem', padding: '1rem' }}>
                <p style={{ fontSize: 12, color: '#475569', lineHeight: 1.75, fontWeight: 600 }}>
                  "System health at 99.8%. No critical anomalies detected. Thermal pathways at peak efficiency."
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
                {[
                  { l: 'System', v: '98.2%', i: Cpu, c: '#0ea5e9' },
                  { l: 'Security', v: 'Active', i: ShieldCheck, c: '#4ade80' },
                  { l: 'Uptime', v: '99.99%', i: Activity, c: '#a78bfa' },
                ].map(m => (
                  <div key={m.l} style={{ padding: '0.75rem 0.5rem', borderRadius: '0.75rem', background: `${m.c}0a`, border: `1px solid ${m.c}20`, textAlign: 'center' }}>
                    <m.i style={{ width: 16, height: 16, color: m.c, margin: '0 auto 4px', display: 'block' }} />
                    <div style={{ fontSize: 10, fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em' }}>{m.v}</div>
                    <div style={{ fontSize: 8, fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{m.l}</div>
                  </div>
                ))}
              </div>

              <button className="btn-primary" onClick={goToConsultant} style={{ width: '100%', justifyContent: 'space-between' }}>
                <span>Open AI Consultant</span>
                <ChevronRight style={{ width: 16, height: 16 }} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: 62, height: 62, borderRadius: '1rem', border: 'none', cursor: 'pointer',
          background: 'linear-gradient(135deg, #0284c7, #0ea5e9)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 16px 48px rgba(2,132,199,0.3)',
          position: 'relative',
        }}
      >
        {/* Ping */}
        <motion.div
          animate={{ scale: [1, 1.7], opacity: [0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
          style={{ position: 'absolute', inset: 0, borderRadius: '1rem', background: '#0284c7', pointerEvents: 'none' }}
        />
        <AnimatePresence mode="wait">
          {isOpen
            ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X style={{ width: 26, height: 26, color: '#fff' }} /></motion.div>
            : <motion.div key="b" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><Bot style={{ width: 26, height: 26, color: '#fff' }} /></motion.div>}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default FloatingAssistant;
