"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Gauge, Cpu, Droplets, Zap, ShieldCheck } from 'lucide-react';

const specs = [
  { label: 'Evaporation Capacity', value: '50 - 5,000 Kg/Hr', icon: Droplets, desc: 'Highly scalable evaporation rates' },
  { label: 'Thermal Efficiency', value: 'Up to 92%', icon: Activity, desc: 'Optimized heat recovery systems' },
  { label: 'Material of Construction', value: 'SS 304 / SS 316L', icon: ShieldCheck, desc: 'Sanitary and corrosion-resistant' },
  { label: 'Power Consumption', value: '< 45 kW/Ton', icon: Zap, desc: 'Industry-leading low energy footprint' },
  { label: 'Operating Temp Range', value: '40°C - 350°C', icon: Gauge, desc: 'Precision controlled environments' },
  { label: 'Automation', value: 'PLC & SCADA', icon: Cpu, desc: 'Fully automated process control' }
];

const TechnicalSpecs = () => {
  return (
    <div className="flex flex-col gap-12 lg:gap-16">
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 items-center">
        <div>
          <span className="t-section-label">Engineered for Performance</span>
          <h2 className="t-section-heading mb-0">
            SYSTEM <span className="text-primary">SPECIFICATIONS</span>
          </h2>
        </div>
        <p className="text-base md:text-lg text-muted-foreground font-medium leading-relaxed">
          Industrial buyers trust hard data. Our systems are designed, simulated, and built to exceed the most stringent operational metrics in the process industry.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 bg-border rounded-xl overflow-hidden border border-border">
        {specs.map((spec, i) => (
          <motion.div
            key={spec.label}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className="group relative bg-background p-8 lg:p-10 flex flex-col justify-between h-full hover:bg-accent/50 transition-colors"
          >
            {/* Left Accent Bar on Hover */}
            <div className="absolute top-0 left-0 w-1 h-0 bg-primary transition-all duration-300 group-hover:h-full" />
            
            <spec.icon className="w-8 h-8 text-primary mb-6 opacity-70 group-hover:opacity-100 transition-opacity" />
            
            <div>
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">
                {spec.label}
              </div>
              <div className="text-xl md:text-2xl font-black text-foreground mb-2 tracking-tight">
                {spec.value}
              </div>
              <div className="text-sm font-semibold text-muted-foreground/80">
                {spec.desc}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TechnicalSpecs;
