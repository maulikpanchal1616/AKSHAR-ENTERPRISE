"use client";

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Hero from "@/components/sections/Hero";

const IndustrialChatbot = dynamic(() => import("@/components/sections/IndustrialChatbot"), { ssr: false });
const IndustriesServed  = dynamic(() => import("@/components/sections/IndustriesServed"),  { ssr: false });
const ProductComparison = dynamic(() => import("@/components/sections/ProductComparison"), { ssr: false });
const MachineDashboard  = dynamic(() => import("@/components/sections/MachineDashboard"),  { ssr: false });
const RFQWizard         = dynamic(() => import("@/components/sections/RFQWizard"),         { ssr: false });
const TechnicalSupport  = dynamic(() => import("@/components/sections/TechnicalSupport"),  { ssr: false });
const Footer            = dynamic(() => import("@/components/layout/Footer"),              { ssr: false });
const FloatingAssistant = dynamic(() => import("@/components/layout/FloatingAssistant"),   { ssr: false });
const TrustedEcosystem  = dynamic(() => import("@/components/sections/TrustedEcosystem"),  { ssr: false });

export default function Home() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const to = params.get('to');
      if (to) {
        window.history.replaceState(null, '', '/');
        setTimeout(() => {
          const el = document.getElementById(to);
          if (el) {
            const y = el.getBoundingClientRect().top + window.scrollY - 90;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }, 400);
      }
    }
  }, []);

  return (
    <div className="bg-[#f8fafc] text-slate-900" style={{ position: 'relative' }}>

      {/* Persistent ambient gradient background */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(ellipse 70% 50% at 50% -5%, rgba(2,132,199,0.05) 0%, transparent 65%)',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Hero — full width, no section padding */}
        <div id="hero">
          <Hero />
        </div>

        <section id="consultant" className="page-section">
          <div className="container">
            <IndustrialChatbot />
          </div>
        </section>

        <section id="solutions" className="page-section">
          <div className="container">
            <IndustriesServed />
          </div>
        </section>

        <section id="products" className="page-section">
          <div className="container">
            <ProductComparison />
          </div>
        </section>

        <section id="dashboard" className="page-section">
          <div className="container">
            <MachineDashboard />
          </div>
        </section>

        <section id="rfq" className="page-section">
          <div className="container">
            <RFQWizard />
          </div>
        </section>

        <section id="ecosystem" className="page-section">
          <div className="container">
            <TrustedEcosystem />
          </div>
        </section>

        <section id="support" className="page-section" style={{ borderBottom: 'none' }}>
          <div className="container">
            <TechnicalSupport />
          </div>
        </section>

        <Footer />
        <FloatingAssistant />
      </div>
    </div>
  );
}
