"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Shield, Zap, Wrench, Users, Clock } from 'lucide-react';

const reasons = [
  { title: 'Experienced Engineers', desc: 'Over a decade of deep thermal engineering and fluid dynamics expertise.', icon: Users, colorClass: 'text-blue-500', bgClass: 'bg-blue-500/10' },
  { title: 'Custom Solutions', desc: 'Every system is tailormade to your exact product parameters and site footprint.', icon: Wrench, colorClass: 'text-purple-500', bgClass: 'bg-purple-500/10' },
  { title: 'Energy Efficient Systems', desc: 'Advanced heat recovery and MVR integration saving up to 30% operational costs.', icon: Zap, colorClass: 'text-orange-500', bgClass: 'bg-orange-500/10' },
  { title: 'Fast Installation', desc: 'Modular skids and pre-wired panels ensure rapid on-site assembly and commissioning.', icon: Clock, colorClass: 'text-green-500', bgClass: 'bg-green-500/10' },
  { title: 'After Sales Support', desc: '24/7 dedicated service hotline and ready availability of OEM spare parts.', icon: CheckCircle2, colorClass: 'text-pink-500', bgClass: 'bg-pink-500/10' },
  { title: 'Quality Assurance', desc: 'Strict adherence to ISO, ASME, and CE standards with multi-point FAT/SAT protocols.', icon: Shield, colorClass: 'text-cyan-500', bgClass: 'bg-cyan-500/10' }
];

const WhyChooseUs = () => {
  return (
    <div className="flex flex-col gap-12 lg:gap-16">
      <div className="text-center max-w-3xl mx-auto">
        <span className="t-section-label">The AXAR Advantage</span>
        <h2 className="t-section-heading">
          WHY CHOOSE <span className="text-primary">AXAR ENTERPRISE</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reasons.map((r, i) => (
          <motion.div
            key={r.title}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="enterprise-card h-full p-6 md:p-8 flex items-start gap-4"
          >
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${r.bgClass}`}>
              <r.icon className={`w-6 h-6 ${r.colorClass}`} />
            </div>
            
            <div>
              <h3 className="text-base md:text-lg font-black text-foreground mb-2 tracking-tight">{r.title}</h3>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                {r.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
