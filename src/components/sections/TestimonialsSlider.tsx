"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    text: "The 50 TPD Spray Dryer installed by AXAR exceeded our performance expectations. Their engineering team demonstrated exceptional knowledge in thermal dynamics, reducing our overall steam consumption by 15%.",
    author: "Rakesh Sharma",
    role: "Plant Head",
    company: "Amul Dairy",
    rating: 5,
    industry: "Dairy Processing"
  },
  {
    text: "Implementing their ZLD (Zero Liquid Discharge) system was a critical milestone for our facility. The ATFE operates flawlessly with highly viscous effluent, helping us meet strict environmental compliance.",
    author: "Dr. Anil Desai",
    role: "VP Operations",
    company: "Sun Pharma",
    rating: 5,
    industry: "Pharmaceuticals"
  },
  {
    text: "From P&ID design to final commissioning, AXAR's turnkey approach saved us months of project delays. Their Spin Flash Dryer handles our cohesive pigments perfectly without choking.",
    author: "Vikram Patel",
    role: "Managing Director",
    company: "Meghmani Organics",
    rating: 5,
    industry: "Agro Chemicals"
  }
];

const TestimonialsSlider = () => {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [autoplay]);

  const next = () => {
    setAutoplay(false);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setAutoplay(false);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="flex flex-col gap-12 lg:gap-16">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div className="max-w-2xl">
          <span className="t-section-label">Client Feedback</span>
          <h2 className="t-section-heading mb-0">
            ENGINEERING <span className="text-primary">EXCELLENCE</span>
          </h2>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={prev}
            className="w-12 h-12 rounded-lg border border-border bg-background text-foreground flex items-center justify-center hover:bg-accent transition-colors"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={next}
            className="w-12 h-12 rounded-lg border border-border bg-background text-foreground flex items-center justify-center hover:bg-accent transition-colors"
            aria-label="Next Testimonial"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="relative enterprise-card p-8 md:p-12 lg:p-16 overflow-hidden">
        <Quote className="absolute top-8 right-8 w-32 h-32 text-primary/5 -rotate-12 pointer-events-none" />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative z-10"
          >
            <div className="flex gap-1 mb-6">
              {[...Array(testimonials[current].rating)].map((_, i) => (
                <Star key={i} size={18} className="text-yellow-500 fill-yellow-500" />
              ))}
            </div>
            
            <p className="text-lg md:text-xl lg:text-2xl text-foreground font-medium leading-relaxed mb-10 max-w-4xl">
              "{testimonials[current].text}"
            </p>
            
            <div className="flex items-center justify-between flex-wrap gap-4 pt-8 border-t border-border">
              <div>
                <h4 className="text-base md:text-lg font-black text-foreground">{testimonials[current].author}</h4>
                <div className="text-sm font-semibold text-muted-foreground mt-1">
                  {testimonials[current].role} <span className="mx-2 text-border">|</span> <span className="text-primary">{testimonials[current].company}</span>
                </div>
              </div>
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest bg-accent px-3 py-1.5 rounded-full">
                {testimonials[current].industry}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center gap-3">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setAutoplay(false);
              setCurrent(i);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              current === i ? 'w-10 bg-primary' : 'w-2 bg-border hover:bg-muted-foreground'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSlider;
