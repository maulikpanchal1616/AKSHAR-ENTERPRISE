"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ArrowRight } from 'lucide-react';

const faqs = [
  { q: 'What is the typical lead time for a customized spray dryer plant?', a: 'Standard lead times range from 12 to 16 weeks depending on plant capacity, customization requirements, and specific MOC (Material of Construction) availability.' },
  { q: 'Do you provide on-site installation and commissioning?', a: 'Yes, AXAR Enterprise provides turnkey execution. Our mechanical and electrical engineers handle complete on-site erection, PLC/SCADA integration, and wet commissioning.' },
  { q: 'Can you customize plants for highly corrosive chemicals?', a: 'Absolutely. We regularly engineer evaporators and dryers using advanced alloys such as Hastelloy, Titanium, and Duplex Stainless Steel for processing highly corrosive or abrasive materials.' },
  { q: 'What kind of after-sales maintenance support do you offer?', a: 'We offer 24/7 technical support, annual maintenance contracts (AMC), remote PLC troubleshooting, and a vast inventory of OEM spare parts ensuring minimal downtime.' },
  { q: 'Are your machines suitable for pharmaceutical API manufacturing?', a: 'Yes. Our pharma-grade spray dryers are engineered with sanitary designs, automated Clean-In-Place (CIP) systems, and strict adherence to cGMP and US-FDA guidelines.' },
  { q: 'How do you ensure energy efficiency in your systems?', a: 'We utilize advanced thermal modeling, Mechanical Vapor Recompression (MVR), multi-effect evaporation, and flue gas heat recuperators to reduce overall energy consumption by up to 30%.' }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-16 items-start">
      <div className="lg:sticky lg:top-32">
        <span className="t-section-label">Common Queries</span>
        <h2 className="t-section-heading mb-6">
          FREQUENTLY ASKED <br /> <span className="text-primary">QUESTIONS</span>
        </h2>
        <p className="t-section-subtext mb-8">
          Find answers regarding our engineering processes, installation capabilities, and technical support.
        </p>

        <div className="enterprise-card p-6 bg-accent border-primary/20">
          <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-2">Still have questions?</h3>
          <p className="text-sm font-medium text-muted-foreground mb-4">Our engineering team is ready to assist you with technical details.</p>
          <button 
            onClick={() => {
              const el = document.getElementById('rfq');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn btn-primary w-full"
          >
            Request Consultation <ArrowRight size={16} className="ml-2" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <motion.div
              key={i}
              className={`enterprise-card transition-all duration-300 ${isOpen ? 'ring-2 ring-primary/20 border-primary/50 shadow-sm' : ''}`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full p-6 md:p-8 bg-transparent border-none flex justify-between items-center cursor-pointer text-left focus:outline-none"
              >
                <h3 className={`text-base md:text-lg font-black tracking-tight pr-8 transition-colors ${isOpen ? 'text-primary' : 'text-foreground'}`}>
                  {faq.q}
                </h3>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${isOpen ? 'bg-primary/10 text-primary' : 'bg-accent text-muted-foreground'}`}>
                  {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 md:px-8 pb-6 md:pb-8 pt-2">
                      <p className="text-sm md:text-base font-medium text-muted-foreground leading-relaxed">
                        {faq.a}
                      </p>
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

export default FAQ;
