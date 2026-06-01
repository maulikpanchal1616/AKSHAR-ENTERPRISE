"use client";

import React from 'react';
import { Phone, MessageCircle, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import ChatWidget from './ChatWidget';

import WhatsAppWidget from './WhatsAppWidget';

const MobileStickyCTA = () => {
  return (
    <>
      {/* Floating Chat Widget - Desktop (Bottom Right) */}
      <ChatWidget />
      
      {/* Floating WhatsApp - Desktop (Stacked above Chatbot on Right) */}
      <WhatsAppWidget />

      {/* Sticky Bottom Bar - Mobile Only */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border flex p-3 gap-2 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
        <a 
          href="tel:+919099955511"
          className="flex-1 flex flex-col items-center justify-center text-foreground text-[0.7rem] font-bold gap-1 no-underline"
        >
          <Phone size={20} className="text-primary" /> 
          <span>Call Now</span>
        </a>
        
        <div className="w-[1px] bg-border" />
        
        <a 
          href="https://wa.me/919099955511"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center text-foreground text-[0.7rem] font-bold gap-1 no-underline"
        >
          <MessageCircle size={20} className="text-[#25D366]" /> 
          <span>WhatsApp</span>
        </a>
        
        <div className="w-[1px] bg-border" />
        
        <button 
          onClick={() => {
            const el = document.getElementById('rfq');
            if (el) {
              const y = el.getBoundingClientRect().top + window.scrollY - 80;
              window.scrollTo({ top: y, behavior: 'smooth' });
            }
          }}
          className="flex-1 bg-transparent border-none flex flex-col items-center justify-center text-foreground text-[0.7rem] font-bold gap-1 cursor-pointer"
        >
          <FileText size={20} className="text-primary" /> 
          <span>Get Quote</span>
        </button>
      </div>
    </>
  );
};

export default MobileStickyCTA;
