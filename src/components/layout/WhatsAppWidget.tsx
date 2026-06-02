"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, User } from 'lucide-react';

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const WHATSAPP_NUMBER = "919099955511";

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    setMessage('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-[144px] md:bottom-[88px] right-4 md:right-6 z-40 flex flex-col items-end">
      <motion.div
        initial={false}
        animate={{ 
          opacity: isOpen ? 1 : 0, 
          scale: isOpen ? 1 : 0.9, 
          y: isOpen ? 0 : 20,
          pointerEvents: isOpen ? "auto" : "none"
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "bottom right" }}
        className="absolute bottom-[72px] right-0 w-[calc(100vw-32px)] sm:w-[340px] glass-panel rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-border/50"
      >
            {/* Header */}
            <div className="bg-[#25D366] p-4 flex items-center justify-between relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.5)_0%,transparent_50%)]" />
              
              <div className="flex items-center gap-3 relative z-10">
                <div className="relative">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <User className="text-white w-6 h-6" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-white border-2 border-[#25D366] rounded-full" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">AXAR Support</h3>
                  <p className="text-white/90 text-xs">Usually replies instantly</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="relative z-10 text-white/80 hover:text-white transition-colors p-1 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="p-4 bg-background h-[250px] overflow-y-auto flex flex-col gap-4">
              <div className="text-center">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold bg-muted px-2 py-1 rounded-full">
                  Today
                </span>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-start gap-2"
              >
                <div className="w-8 h-8 bg-[#25D366]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <User size={16} className="text-[#25D366]" />
                </div>
                <div className="bg-muted p-3 rounded-2xl rounded-tl-none text-sm text-foreground shadow-sm">
                  Hi there! 👋 How can our engineering team assist you today via WhatsApp?
                </div>
              </motion.div>
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-3 bg-background border-t border-border flex gap-2">
              <input
                type="text"
                placeholder="Type your WhatsApp message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 bg-muted border-none rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366]/50 text-foreground"
                autoFocus
              />
              <button
                type="submit"
                disabled={!message.trim()}
                className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white transition-all hover:bg-[#25D366]/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} className="ml-1" />
              </button>
            </form>
      </motion.div>

      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_8px_25px_rgba(37,211,102,0.4)] cursor-pointer relative z-50 border-none outline-none overflow-hidden"
      >
        <motion.div
          animate={{ 
            rotate: isOpen ? 180 : 0, 
            scale: isOpen ? 0 : 1, 
            opacity: isOpen ? 0 : 1 
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="absolute flex items-center justify-center inset-0"
        >
          <MessageCircle size={28} />
        </motion.div>
        
        <motion.div
          animate={{ 
            rotate: isOpen ? 0 : -180, 
            scale: isOpen ? 1 : 0, 
            opacity: isOpen ? 1 : 0 
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="absolute flex items-center justify-center inset-0"
        >
          <X size={28} />
        </motion.div>
      </motion.button>
    </div>
  );
};

export default WhatsAppWidget;
