"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface SubPageHeroProps {
  title: string;
  subtitle: string;
  category: string;
  image?: string;
}

const SubPageHero = ({ title, subtitle, category, image }: SubPageHeroProps) => {
  return (
    <div style={{ 
      position: 'relative', 
      minHeight: '60vh', 
      display: 'flex', 
      alignItems: 'center', 
      overflow: 'hidden',
      background: '#f8fafc',
      paddingTop: '8rem',
      paddingBottom: '5rem'
    }}>
      {/* Background Image */}
      {image && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img 
            src={image} 
            alt={title} 
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }}
          />
          <div style={{ 
            position: 'absolute', inset: 0, 
            background: 'linear-gradient(to bottom, rgba(248,250,252,0.4), #f8fafc)' 
          }} />
        </div>
      )}

      {/* Grid Overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.04,
        backgroundImage: 'linear-gradient(rgba(2,132,199,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(2,132,199,0.5) 1px,transparent 1px)',
        backgroundSize: '60px 60px',
        zIndex: 1
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ maxWidth: 800 }}
        >
          <span className="t-label" style={{ marginBottom: '1.5rem', color: '#0284c7' }}>{category} [PRTCL-01]</span>
          <h1 className="t-hero" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.1, marginBottom: '2rem' }}>
            {title.split(' ').map((word, i) => (
              <span key={i} style={{ color: i === 1 ? '#0284c7' : '#0f172a' }}>{word} </span>
            ))}
          </h1>
          <p style={{ 
            fontSize: 18, 
            color: '#475569', 
            lineHeight: 1.8, 
            fontWeight: 500,
            maxWidth: 600
          }}>
            {subtitle}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SubPageHero;
