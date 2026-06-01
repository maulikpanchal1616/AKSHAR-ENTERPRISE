"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Droplets, TestTube, Zap, Wheat, Beaker } from 'lucide-react';

const industries = [
  { title: 'Pharmaceutical & API', icon: TestTube, colorClass: 'text-blue-500', bgClass: 'bg-blue-500/10', desc: 'Sanitary design dryers (cGMP/US-FDA compliant) for antibiotics, vitamins, and complex API powders.' },
  { title: 'Chemical & Dyes', icon: Beaker, colorClass: 'text-purple-500', bgClass: 'bg-purple-500/10', desc: 'Heavy-duty Spin Flash and Rotary dryers built with exotic alloys (Hastelloy/Titanium) for corrosive chemicals.' },
  { title: 'Food & Dairy', icon: Wheat, colorClass: 'text-orange-500', bgClass: 'bg-orange-500/10', desc: 'Multi-stage spray dryers engineered for milk powder, coffee, flavors, and heat-sensitive food ingredients.' },
  { title: 'Zero Liquid Discharge', icon: Leaf, colorClass: 'text-green-500', bgClass: 'bg-green-500/10', desc: 'Advanced Agitated Thin Film Evaporators (ATFE) to achieve 100% effluent recovery for sustainable operations.' },
  { title: 'Petrochemicals', icon: Droplets, colorClass: 'text-cyan-500', bgClass: 'bg-cyan-500/10', desc: 'High-capacity thermal processing systems for polymers, resins, and hazardous materials.' },
  { title: 'Energy & Power', icon: Zap, colorClass: 'text-yellow-500', bgClass: 'bg-yellow-500/10', desc: 'Waste heat recovery systems and hot air generators optimizing overall plant thermal efficiency.' }
];

const IndustriesServed = () => {
  return (
    <div className="flex flex-col gap-12 lg:gap-16">
      <div className="text-center max-w-3xl mx-auto">
        <span className="t-section-label">Sector Expertise</span>
        <h2 className="t-section-heading">
          INDUSTRIES <span className="text-primary">SERVED</span>
        </h2>
        <p className="t-section-subtext mx-auto">
          We engineer specialized thermal processing systems tailored to the exact thermodynamic and metallurgical requirements of diverse industrial sectors.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {industries.map((ind, i) => (
          <motion.div
            key={ind.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="enterprise-card h-full flex flex-col p-6 md:p-8"
          >
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${ind.bgClass}`}>
              <ind.icon className={`w-7 h-7 ${ind.colorClass}`} />
            </div>
            
            <h3 className="text-lg md:text-xl font-black text-foreground mb-3 tracking-tight">{ind.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed font-medium mt-auto">
              {ind.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default IndustriesServed;
