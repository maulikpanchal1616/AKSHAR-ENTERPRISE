"use client";

import React from 'react';
import { motion } from 'framer-motion';

// Using local asset paths (placeholders for now).
// Final architecture allows easy replacement with real SVGs/PNGs in /public/logos/
const clients = [
  { name: 'Siemens', logo: '/logos/siemens.svg' },
  { name: 'Schneider Electric', logo: '/logos/schneider.svg' },
  { name: 'ABB', logo: '/logos/abb.svg' },
  { name: 'GEA', logo: '/logos/gea.svg' },
  { name: 'Honeywell', logo: '/logos/honeywell.svg' },
  { name: 'Tata Steel', logo: '/logos/tata.svg' },
  { name: 'Reliance Industries', logo: '/logos/reliance.svg' },
  { name: 'L&T', logo: '/logos/lnt.svg' },
];

const ClientLogoWall = () => {
  return (
    <div className="w-full bg-background border-b border-border py-12 md:py-16 overflow-hidden">
      <div className="container mb-8">
        <h3 className="text-center text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">
          Trusted by Industrial Leaders Worldwide
        </h3>
      </div>
      
      {/* Infinite scrolling container */}
      <div className="relative flex max-w-[100vw] overflow-hidden group">
        
        {/* Left/Right Fade Gradients */}
        <div className="absolute top-0 left-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex whitespace-nowrap items-center gap-12 md:gap-24 pl-12 md:pl-24"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
        >
          {/* Double the array for seamless looping */}
          {[...clients, ...clients].map((client, i) => (
            <div
              key={`${client.name}-${i}`}
              className="flex-shrink-0 flex items-center justify-center opacity-40 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300 w-32 md:w-48 h-16"
            >
              {/* Fallback to text if image is broken/missing during development */}
              <div className="relative w-full h-full flex items-center justify-center">
                {/* 
                  Since we don't have the actual SVG files in /public/logos yet, 
                  we render a professional text placeholder.
                  In production, replace this div with:
                  <img src={client.logo} alt={client.name} className="max-w-full max-h-full object-contain" />
                */}
                <span className="text-xl md:text-2xl font-black text-foreground tracking-tighter uppercase">
                  {client.name}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ClientLogoWall;
