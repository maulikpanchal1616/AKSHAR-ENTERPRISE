"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Zap, Shield, Cpu, ArrowRight } from 'lucide-react';

const stats = [
  { label: 'Experience', value: '15+ Years', icon: Activity, colorClass: 'text-green-500', bgClass: 'bg-green-500/10' },
  { label: 'Global Plants', value: '100+ Installs', icon: Zap, colorClass: 'text-blue-500', bgClass: 'bg-blue-500/10' },
  { label: 'Satisfied Clients',  value: '500+',  icon: Shield, colorClass: 'text-purple-500', bgClass: 'bg-purple-500/10' },
  { label: 'Standards', value: 'ISO 9001', icon: Cpu, colorClass: 'text-cyan-500', bgClass: 'bg-cyan-500/10' },
];

const PremiumBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    <motion.div
      animate={{ scale: [1, 1.2, 1], x: [0, 80, 0], y: [0, -40, 0] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      className="absolute -top-[10%] right-[5%] w-[600px] h-[600px] rounded-full bg-primary/20 blur-[120px]"
    />
    <motion.div
      animate={{ scale: [1, 1.3, 1], x: [0, -60, 0], y: [0, 60, 0] }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[30%] -left-[10%] w-[500px] h-[500px] rounded-full bg-[#38bdf8]/15 blur-[100px]"
    />
    <div className="absolute top-0 inset-x-0 flex justify-center">
      <div className="w-[80%] h-[300px] bg-gradient-to-b from-primary/10 to-transparent blur-[50px] opacity-60" />
    </div>
  </div>
);

// High-end abstract engineering schematic animation
const AbstractSchematic = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative w-full aspect-square max-w-[500px] mx-auto flex items-center justify-center pointer-events-none"
    >
      {/* Outer Rotating Dashed Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute w-[90%] h-[90%] rounded-full border-2 border-primary/20 border-dashed"
      />
      {/* Inner Rotating Ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute w-[65%] h-[65%] rounded-full border border-[#38bdf8]/40"
      />
      
      {/* Central Power Core */}
      <div className="absolute w-[25%] h-[25%] rounded-full bg-primary/10 backdrop-blur-md flex items-center justify-center shadow-[0_0_40px_rgba(2,132,199,0.4)] border border-primary/30">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-1/2 h-1/2 rounded-full bg-primary shadow-[0_0_20px_rgba(2,132,199,1)]" 
        />
      </div>

      {/* Floating UI Nodes */}
      {[
        { top: '15%', left: '20%', delay: 0 },
        { top: '75%', left: '15%', delay: 1 },
        { top: '25%', left: '75%', delay: 2 },
        { top: '80%', left: '70%', delay: 1.5 }
      ].map((pos, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: pos.delay }}
          className="absolute w-12 h-12 rounded-xl bg-background/60 border border-border/80 backdrop-blur-md flex items-center justify-center shadow-lg"
          style={{ top: pos.top, left: pos.left }}
        >
          <div className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse" />
        </motion.div>
      ))}

      {/* SVG Connecting Data Streams */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
        <motion.path
          d="M 150 150 Q 250 100 350 150 T 400 350"
          stroke="url(#grad1)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
        />
        <motion.path
          d="M 100 350 Q 250 250 350 400"
          stroke="#38bdf8"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
};

const textContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const textItem = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] } 
  }
};

const Hero = () => {
  return (
    <div id="hero" className="relative flex flex-col min-h-screen pt-28 pb-12 overflow-hidden bg-background">
      <PremiumBackground />

      <div className="container relative z-10 flex-1 flex flex-col justify-center gap-12 lg:gap-16">
        
        {/* TOP ROW: Text & Schematic */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* LEFT: Copy */}
          <motion.div 
            className="flex flex-col gap-6 lg:gap-8 pointer-events-auto"
            variants={textContainer}
            initial="hidden"
            animate="visible"
          >
            <h1 className="t-section-heading mb-0 text-[clamp(2.5rem,11vw,3.5rem)] sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[1.05] break-words hyphens-auto">
              <motion.div variants={textItem} className="pb-1">
                <span className="block text-foreground drop-shadow-md">Precision</span>
              </motion.div>
              <motion.div variants={textItem} className="pb-1">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#38bdf8] to-primary bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] drop-shadow-[0_0_20px_rgba(2,132,199,0.3)]">
                  Engineering &
                </span>
              </motion.div>
              <motion.div variants={textItem} className="pb-2">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#38bdf8] to-primary bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] drop-shadow-[0_0_20px_rgba(2,132,199,0.3)]">
                  Processing.
                </span>
              </motion.div>
            </h1>

            <motion.p variants={textItem} className="text-base sm:text-lg text-muted-foreground max-w-lg leading-relaxed font-medium">
              Enterprise-grade drying, evaporation, and environmental engineering solutions. Trusted globally for 15 years by chemical, pharmaceutical, and dairy leaders.
            </motion.p>

            <motion.div variants={textItem} className="flex flex-wrap gap-4 mt-2">
              <button 
                className="btn btn-primary px-8 h-14" 
                onClick={() => {
                  const el = document.getElementById('rfq');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Request Quote <ArrowRight size={18} className="ml-2" />
              </button>
              <button 
                className="btn btn-outline px-8 h-14" 
                onClick={() => {
                  const el = document.getElementById('rfq');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Consult an Engineer
              </button>
            </motion.div>
          </motion.div>

          {/* RIGHT: Abstract Engineering Schematic Animation */}
          <div className="hidden lg:flex w-full items-center justify-center">
            <AbstractSchematic />
          </div>

        </div>
        
        {/* BOTTOM: Full Width Stats Strip */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 pointer-events-auto"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="enterprise-card p-6 flex flex-col justify-between group bg-background/50 backdrop-blur-xl border-border/50 hover:bg-background/80 transition-all duration-300 shadow-xl shadow-primary/5"
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.bgClass}`}>
                  <s.icon className={`w-6 h-6 ${s.colorClass}`} />
                </div>
                <span className="text-xs font-bold text-muted-foreground/30 group-hover:text-primary/50 transition-colors">
                  0{i + 1}
                </span>
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-black text-foreground tracking-tight mb-1">
                  {s.value}
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  {s.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
};

export default Hero;
