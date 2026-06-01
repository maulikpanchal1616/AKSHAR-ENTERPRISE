"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, Calendar, ArrowRight } from 'lucide-react';

const ContactSection = () => {
  return (
    <div className="flex flex-col items-center text-center max-w-4xl mx-auto py-12">
      <span className="t-section-label justify-center">Let's Build Together</span>
      <h2 className="t-section-heading mb-6">
        GET ENGINEERING <br /> <span className="text-primary">CONSULTATION</span>
      </h2>
      <p className="t-section-subtext mb-12">
        Connect directly with our senior thermal engineers to discuss your project requirements, request a quotation, or schedule a technical deep-dive session.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        <motion.button 
          whileHover={{ y: -2 }}
          className="btn btn-primary h-14 text-base"
          onClick={() => {
            const el = document.getElementById('rfq');
            if (el) {
              const y = el.getBoundingClientRect().top + window.scrollY + 250;
              window.scrollTo({ top: y, behavior: 'smooth' });
            } else {
              window.scrollBy({ top: 400, behavior: 'smooth' });
            }
          }}
        >
          Request Custom Quote <ArrowRight size={18} className="ml-2" />
        </motion.button>
        
        <motion.a 
          href="https://wa.me/919099955511"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ y: -2 }}
          className="btn h-14 text-base bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 no-underline"
        >
          <MessageCircle size={18} className="mr-2" /> Chat on WhatsApp
        </motion.a>
        
        <motion.a 
          href="tel:+919099955511"
          whileHover={{ y: -2 }}
          className="btn btn-outline h-14 text-base no-underline"
        >
          <Phone size={18} className="mr-2 text-primary" /> Call Now
        </motion.a>
        
        <motion.a 
          href="mailto:sales@axarenterprise.com?subject=Schedule%20a%20Technical%20Meeting"
          whileHover={{ y: -2 }}
          className="btn btn-outline h-14 text-base no-underline flex items-center justify-center"
        >
          <Calendar size={18} className="mr-2 text-primary" /> Schedule Meeting
        </motion.a>
      </div>
    </div>
  );
};

export default ContactSection;
