"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Zap, Tag, ArrowRight } from 'lucide-react';

// Replaced external links with local placeholders as requested
const projects = [
  {
    title: "50 TPD Milk Powder Plant",
    category: "Dairy Processing",
    location: "Anand, Gujarat",
    capacity: "50 Tons Per Day",
    image: "/projects/project-1.png"
  },
  {
    title: "Zero Liquid Discharge System",
    category: "Chemical Effluent",
    location: "Dahej, Gujarat",
    capacity: "100 KLD",
    image: "/projects/project-2.png"
  },
  {
    title: "API Spray Drying Unit",
    category: "Pharmaceuticals",
    location: "Baddi, Himachal Pradesh",
    capacity: "500 Kg/Hr",
    image: "/projects/project-3.png"
  },
  {
    title: "Spin Flash Dryer for Dyes",
    category: "Agro Chemicals",
    location: "Vapi, Gujarat",
    capacity: "2000 Kg/Hr",
    image: "/projects/project-4.png"
  }
];

const ProjectShowcase = () => {
  return (
    <div className="flex flex-col gap-12 lg:gap-16">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div className="max-w-2xl">
          <span className="t-section-label">Global Installations</span>
          <h2 className="t-section-heading mb-0">
            ENGINEERING <span className="text-primary">SHOWCASE</span>
          </h2>
        </div>
        <button className="btn btn-outline flex items-center gap-2">
          View All Projects <ArrowRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {projects.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="enterprise-card group cursor-pointer overflow-hidden flex flex-col h-full"
          >
            {/* Image Container with strict height and fallback color */}
            <div className="relative h-64 md:h-72 w-full overflow-hidden bg-accent">
              <img 
                src={p.image} 
                alt={p.title} 
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                onError={(e) => {
                  // Fallback if image doesn't exist yet
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
              
              {/* Overlay Tags */}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-background bg-foreground/90 backdrop-blur-md px-2.5 py-1 rounded-full uppercase tracking-widest">
                  <Tag size={12} /> {p.category}
                </span>
              </div>
            </div>

            {/* Content Container */}
            <div className="p-6 md:p-8 flex flex-col flex-grow">
              <h3 className="text-xl md:text-2xl font-black text-foreground tracking-tight mb-4 group-hover:text-primary transition-colors">
                {p.title}
              </h3>
              
              <div className="flex flex-wrap gap-4 mt-auto">
                <span className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                  <Zap size={16} className="text-orange-500" /> {p.capacity}
                </span>
                <span className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                  <MapPin size={16} className="text-blue-500" /> {p.location}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectShowcase;
