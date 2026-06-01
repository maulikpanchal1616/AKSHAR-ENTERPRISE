"use client";

import React from 'react';
import { FileText, Download, BookOpen, Settings2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const downloads = [
  { title: 'Corporate Brochure', desc: 'Overview of our manufacturing capabilities and company profile.', icon: BookOpen },
  { title: 'Product Catalog 2026', desc: 'Detailed specifications for all dryers and evaporators.', icon: FileText },
  { title: 'Technical Datasheets', desc: 'Engineering drawings, utility requirements, and P&ID samples.', icon: Settings2 }
];

const BrochureDownload = () => {
  return (
    <div className="enterprise-card bg-accent/30 p-8 md:p-12 lg:p-16 flex flex-col items-center text-center">
      <div className="max-w-2xl mb-12">
        <span className="t-section-label mx-auto justify-center">Technical Resources</span>
        <h2 className="t-section-heading mb-4">
          DOWNLOAD TECHNICAL <span className="text-primary">LITERATURE</span>
        </h2>
        <p className="t-section-subtext mx-auto">
          Access comprehensive product specifications, dimensional drawings, and complete corporate catalogs for your engineering evaluation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mb-12">
        {downloads.map((item) => (
          <motion.div
            key={item.title}
            whileHover={{ y: -5 }}
            className="bg-background border border-border p-8 rounded-xl flex flex-col items-center gap-4 cursor-pointer hover:border-primary/50 hover:shadow-md transition-all"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
              <item.icon size={32} />
            </div>
            <h3 className="text-lg font-black text-foreground">{item.title}</h3>
            <p className="text-sm text-muted-foreground font-medium">{item.desc}</p>
            <button className="btn btn-outline w-full mt-4 flex items-center justify-center gap-2">
              <Download size={16} /> Download PDF
            </button>
          </motion.div>
        ))}
      </div>

      {/* Embedded Request Quote CTA */}
      <div className="w-full max-w-5xl bg-primary text-primary-foreground rounded-xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
        <div className="text-left">
          <h3 className="text-xl md:text-2xl font-black mb-2">Ready to discuss your project?</h3>
          <p className="text-primary-foreground/80 font-medium">Get a detailed technical proposal and commercial quotation.</p>
        </div>
        <button 
          onClick={() => {
            const el = document.getElementById('rfq');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="btn bg-background text-foreground hover:bg-background/90 whitespace-nowrap"
        >
          Request Custom Quote <ArrowRight size={16} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default BrochureDownload;
