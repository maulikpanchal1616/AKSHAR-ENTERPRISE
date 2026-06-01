"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, CheckCircle2 } from 'lucide-react';

const certs = [
  {
    title: 'ISO 9001:2015',
    org: 'Quality Management Systems',
    desc: 'Certified for engineering, manufacturing, and installation of process equipment.',
    icon: ShieldCheck,
    image: '/certifications/iso-9001.png'
  },
  {
    title: 'ASME U-Stamp',
    org: 'Pressure Vessel Certification',
    desc: 'Authorized to design and manufacture unfired pressure vessels to global safety standards.',
    icon: Award,
    image: '/certifications/asme-u.png'
  },
  {
    title: 'CE Marking',
    org: 'European Conformity',
    desc: 'Equipment complies with EU safety, health, and environmental protection requirements.',
    icon: CheckCircle2,
    image: '/certifications/ce-mark.png'
  }
];

const Certifications = () => {
  return (
    <div className="flex flex-col gap-12 lg:gap-16">
      <div className="text-center max-w-3xl mx-auto">
        <span className="t-section-label">Global Compliance</span>
        <h2 className="t-section-heading">
          ENGINEERING <span className="text-primary">CERTIFICATIONS</span>
        </h2>
        <p className="t-section-subtext mx-auto">
          We adhere to the highest international standards of manufacturing, ensuring every plant we commission is safe, reliable, and compliant.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certs.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="enterprise-card h-full flex flex-col overflow-hidden"
          >
            {/* Top Image/Pattern Area */}
            <div className="h-32 bg-secondary/50 border-b border-border relative flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary via-background to-background" />
              {/* Fallback icon since images aren't present yet */}
              <c.icon className="w-16 h-16 text-primary relative z-10 opacity-80" />
            </div>
            
            <div className="p-6 md:p-8 flex flex-col flex-grow">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl md:text-2xl font-black text-foreground tracking-tight">{c.title}</h3>
              </div>
              <span className="text-xs font-bold text-primary uppercase tracking-widest mb-4 block">
                {c.org}
              </span>
              <p className="text-sm text-muted-foreground leading-relaxed mt-auto font-medium">
                {c.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Certifications;
