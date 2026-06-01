"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, TrendingUp, Leaf } from 'lucide-react';

const cases = [
  {
    id: 'cs1',
    title: 'High-Volume Dairy Plant Upgrade',
    client: 'Leading Regional Dairy Co-op',
    problem: 'Existing spray dryers were consuming excessive steam, leading to high operational costs and inconsistent powder quality during peak seasons.',
    solution: 'Engineered and installed a customized 50 TPD Spray Dryer with an integrated fines return system and advanced thermal recuperator.',
    results: 'Achieved a 28% reduction in steam consumption and improved powder bulk density consistency by 95%.',
    icon: TrendingUp,
    colorClass: 'text-blue-500',
    bgClass: 'bg-blue-500/10'
  },
  {
    id: 'cs2',
    title: 'ZLD Implementation for API Manufacturer',
    client: 'Global Pharma Corp',
    problem: 'Stringent environmental regulations required the client to achieve Zero Liquid Discharge (ZLD) for a highly complex chemical effluent stream.',
    solution: 'Deployed a multi-stage Agitated Thin Film Evaporator (ATFE) paired with an MVR system for high-solid concentration.',
    results: 'Successfully separated 98% of clean water for reuse, completely eliminating liquid discharge and recovering valuable mixed salts.',
    icon: Leaf,
    colorClass: 'text-green-500',
    bgClass: 'bg-green-500/10'
  }
];

const CaseStudies = () => {
  const [expandedId, setExpandedId] = useState<string | null>(cases[0].id);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-16 items-start">
      <div className="lg:sticky lg:top-32">
        <span className="t-section-label">Proven Results</span>
        <h2 className="t-section-heading">
          ENGINEERING <br /> <span className="text-primary">CASE STUDIES</span>
        </h2>
        <p className="t-section-subtext">
          Discover how AXAR Enterprise solves complex industrial challenges, delivering measurable improvements in efficiency, yield, and compliance.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {cases.map((c) => {
          const isExpanded = expandedId === c.id;
          return (
            <motion.div
              key={c.id}
              className={`enterprise-card transition-all duration-300 ${isExpanded ? 'ring-2 ring-primary/20 border-primary/50 shadow-md' : ''}`}
            >
              <button 
                onClick={() => setExpandedId(isExpanded ? null : c.id)}
                className="w-full p-6 md:p-8 bg-transparent border-none flex justify-between items-center cursor-pointer text-left focus:outline-none"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${c.bgClass}`}>
                    <c.icon className={`w-6 h-6 ${c.colorClass}`} />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-black text-foreground tracking-tight mb-1">{c.title}</h3>
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{c.client}</span>
                  </div>
                </div>
                <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                  <ChevronDown className="w-6 h-6 text-muted-foreground" />
                </motion.div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 md:px-8 pb-6 md:pb-8">
                      <div className="pt-6 border-t border-border flex flex-col gap-6">
                        
                        <div>
                          <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-2">The Challenge</h4>
                          <p className="text-sm text-foreground font-medium leading-relaxed">{c.problem}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-2">The AXAR Solution</h4>
                          <p className="text-sm text-foreground font-medium leading-relaxed">{c.solution}</p>
                        </div>
                        
                        <div className="bg-primary/5 p-4 md:p-5 rounded-lg border-l-4 border-primary">
                          <h4 className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-2">Measurable Results</h4>
                          <p className="text-sm font-bold text-foreground leading-relaxed">{c.results}</p>
                        </div>

                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default CaseStudies;
