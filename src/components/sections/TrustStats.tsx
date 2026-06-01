"use client";

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Users, Building2, Globe2, Award } from 'lucide-react';

const stats = [
  { value: 15, suffix: '+', label: 'Years Experience', icon: Award },
  { value: 100, suffix: '+', label: 'Installations', icon: Building2 },
  { value: 500, suffix: '+', label: 'Clients Globally', icon: Globe2 },
  { value: 24, suffix: '/7', label: 'Technical Support', icon: Users },
];

const AnimatedCounter = ({ from = 0, to, duration = 2 }: { from?: number, to: number, duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (inView) {
      let start: number | null = null;
      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / (duration * 1000), 1);
        setCount(Math.floor(progress * (to - from) + from));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [inView, from, to, duration]);

  return <span ref={ref}>{count}</span>;
};

const TrustStats = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          className="enterprise-card p-6 md:p-8 flex flex-col items-center justify-center text-center group"
        >
          <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            <stat.icon className="w-6 h-6" />
          </div>
          
          <div className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground tracking-tighter mb-2">
            <AnimatedCounter to={stat.value} />
            <span className="text-primary">{stat.suffix}</span>
          </div>
          
          <div className="text-xs md:text-sm font-bold uppercase tracking-widest text-muted-foreground">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TrustStats;
