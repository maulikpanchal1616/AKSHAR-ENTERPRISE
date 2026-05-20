"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Factory, Droplets, FlaskConical, Zap, ShieldCheck, Cpu } from 'lucide-react';

const industries = [
  {
    title: "Dairy Powder Processing",
    desc: "Precision drying systems for milk powder, whey protein, and infant formula conforming to strict hygienic and clean-in-place (CIP) standards.",
    icon: Droplets,
    color: "#0ea5e9"
  },
  {
    title: "Chemical Evaporation Systems",
    desc: "Robust MVR and multi-effect evaporators for concentrating aggressive, high-solid chemical process streams and crystal recovery.",
    icon: FlaskConical,
    color: "#4ade80"
  },
  {
    title: "Pharmaceutical Spray Drying",
    desc: "High-purity drying plants for active pharmaceutical ingredients (APIs) and excipients with sanitary stainless steel design.",
    icon: ShieldCheck,
    color: "#a78bfa"
  },
  {
    title: "Energy Recovery Systems",
    desc: "High-temperature flue gas heat recuperators, economizers, and air heating loops for maximum thermal efficiency.",
    icon: Zap,
    color: "#f59e0b"
  },
  {
    title: "Industrial Wastewater Solutions",
    desc: "Custom turnkey Zero Liquid Discharge (ZLD) plants designed to process complex effluents, separating clean water from solid salts.",
    icon: Factory,
    color: "#ec4899"
  },
  {
    title: "Agrochemicals Solutions",
    desc: "Advanced processing plants optimized for spray drying herbicides, pesticides, and complex soil nutrient powder blends.",
    icon: Cpu,
    color: "#00f2ff"
  }
];

const IndustriesServed = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
      {/* Header Area */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-16 items-end">
        <div>
          <span className="t-label" style={{ marginBottom: '1rem' }}>Global Impact [SECTOR-MAP]</span>
          <h2 className="t-section" style={{ marginTop: '0.5rem' }}>
            SECTORS <br />
            <span style={{ color: '#0284c7' }}>DRIVING</span> INNOVATION.
          </h2>
        </div>
        <div style={{ paddingBottom: '0.5rem' }}>
          <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.7, fontWeight: 500 }}>
            Our engineering solutions power mission-critical operations across the most demanding industries on the planet.
          </p>
        </div>
      </div>

      {/* Grid Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {industries.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="panel hover-lift"
            style={{ padding: '2rem' }}
          >
            {/* Top row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
              <div style={{ 
                width: 50, 
                height: 50, 
                borderRadius: '0.75rem', 
                background: `${item.color}10`, 
                border: `1px solid ${item.color}25`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <item.icon style={{ width: 22, height: 22, color: item.color }} />
              </div>
              <span style={{ fontSize: 10, fontWeight: 900, color: 'rgba(0,0,0,0.05)' }}>0{i + 1}</span>
            </div>

            {/* Content */}
            <h3 className="t-card" style={{ marginBottom: '1rem', wordBreak: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>{item.title}</h3>
            <p style={{ 
              fontSize: 13, 
              color: '#475569', 
              lineHeight: 1.7, 
              fontWeight: 500,
              marginBottom: '2rem' 
            }}>
              {item.desc}
            </p>

            {/* Status Indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#16a34a' }} className="anim-pulse" />
              <span style={{ fontSize: 9, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#16a34a' }}>
                Systems Deployed
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default IndustriesServed;
