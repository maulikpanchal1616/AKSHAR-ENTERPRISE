"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ClipboardCheck, PenTool, Factory, Truck, Wrench } from 'lucide-react';

const steps = [
  { title: 'Thermodynamic Analysis', desc: 'Process parameters simulation and heat/mass balance calculations.', icon: ClipboardCheck, colorClass: 'text-blue-500', bgClass: 'bg-blue-500/10' },
  { title: 'P&ID Engineering', desc: 'Detailed CAD design, layout planning, and structural validation.', icon: PenTool, colorClass: 'text-purple-500', bgClass: 'bg-purple-500/10' },
  { title: 'In-House Fabrication', desc: 'ASME compliant manufacturing using SS 304, 316L, or exotic alloys.', icon: Factory, colorClass: 'text-orange-500', bgClass: 'bg-orange-500/10' },
  { title: 'Logistics & Erection', desc: 'Safe site transportation and heavy-lift mechanical installation.', icon: Truck, colorClass: 'text-green-500', bgClass: 'bg-green-500/10' },
  { title: 'Commissioning & FAT', desc: 'Wet runs, PLC/SCADA integration, and operator training.', icon: Wrench, colorClass: 'text-cyan-500', bgClass: 'bg-cyan-500/10' }
];

const ProcessTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="flex flex-col gap-12 lg:gap-16">
      <div className="text-center max-w-3xl mx-auto">
        <span className="t-section-label">Turnkey Execution</span>
        <h2 className="t-section-heading">
          ENGINEERING <span className="text-primary">WORKFLOW</span>
        </h2>
        <p className="t-section-subtext mx-auto">
          A systematic, risk-free project execution methodology from initial thermodynamics calculation to final site commissioning.
        </p>
      </div>

      <div ref={containerRef} className="relative max-w-4xl mx-auto w-full py-8">
        {/* Vertical Line */}
        <div className="absolute left-[38px] md:left-1/2 top-0 bottom-0 w-1 bg-border rounded-full -translate-x-1/2" />
        <motion.div 
          className="absolute left-[38px] md:left-1/2 top-0 bottom-0 w-1 bg-primary origin-top rounded-full -translate-x-1/2" 
          style={{ scaleY: lineHeight }} 
        />

        <div className="flex flex-col gap-12">
          {steps.map((step, i) => {
            const isEven = i % 2 === 0;
            return (
              <div
                key={step.title}
                className={`relative flex items-center w-full ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                
                {/* Animated Node */}
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-150px" }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 15 }}
                  className="absolute left-[38px] md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-background border-4 border-primary z-10 shadow-[0_0_15px_rgba(2,132,199,0.3)]" 
                />

                {/* Animated Content Card */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? -50 : 50, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-150px" }}
                  transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.2 }}
                  className={`w-full pl-20 md:pl-0 md:w-1/2 ${isEven ? 'md:pr-12 lg:pr-16 md:text-right' : 'md:pl-12 lg:pl-16 md:text-left'}`}
                >
                  <div className={`enterprise-card p-6 flex flex-col group ${isEven ? 'md:items-end' : 'md:items-start'} hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300`}>
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${step.bgClass}`}>
                      <step.icon className={`w-6 h-6 ${step.colorClass}`} />
                    </div>
                    <div className="text-[10px] font-black text-primary/70 uppercase tracking-[0.2em] mb-1">
                      Phase 0{i + 1}
                    </div>
                    <h3 className="text-lg md:text-xl font-black text-foreground tracking-tight mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProcessTimeline;
