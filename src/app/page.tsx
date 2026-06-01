"use client";

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Hero from "@/components/sections/Hero";


const IndustriesServed  = dynamic(() => import("@/components/sections/IndustriesServed"),  { ssr: false });
const ProductComparison = dynamic(() => import("@/components/sections/ProductComparison"), { ssr: false });
const MachineDashboard  = dynamic(() => import("@/components/sections/MachineDashboard"),  { ssr: false });
const RFQWizard         = dynamic(() => import("@/components/sections/RFQWizard"),         { ssr: false });
const TechnicalSupport  = dynamic(() => import("@/components/sections/TechnicalSupport"),  { ssr: false });
const Footer            = dynamic(() => import("@/components/layout/Footer"),              { ssr: false });

const TrustedEcosystem  = dynamic(() => import("@/components/sections/TrustedEcosystem"),  { ssr: false });
const MobileStickyCTA   = dynamic(() => import("@/components/layout/MobileStickyCTA"),     { ssr: false });

// New Components
const TrustStats        = dynamic(() => import("@/components/sections/TrustStats"),        { ssr: false });
const ClientLogoWall    = dynamic(() => import("@/components/sections/ClientLogoWall"),    { ssr: false });
const ProcessTimeline   = dynamic(() => import("@/components/sections/ProcessTimeline"),   { ssr: false });
const ProjectShowcase   = dynamic(() => import("@/components/sections/ProjectShowcase"),   { ssr: false });
const WhyChooseUs       = dynamic(() => import("@/components/sections/WhyChooseUs"),       { ssr: false });
const Certifications    = dynamic(() => import("@/components/sections/Certifications"),    { ssr: false });
const CaseStudies       = dynamic(() => import("@/components/sections/CaseStudies"),       { ssr: false });
const TestimonialsSlider= dynamic(() => import("@/components/sections/TestimonialsSlider"),{ ssr: false });
const TechnicalSpecs    = dynamic(() => import("@/components/sections/TechnicalSpecs"),    { ssr: false });
const BrochureDownload  = dynamic(() => import("@/components/sections/BrochureDownload"),  { ssr: false });
const FAQ               = dynamic(() => import("@/components/sections/FAQ"),               { ssr: false });
const ContactSection    = dynamic(() => import("@/components/sections/ContactSection"),    { ssr: false });

export default function Home() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const to = params.get('to');
      if (to) {
        window.history.replaceState(null, '', to === 'hero' ? window.location.pathname : `/#${to}`);
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
    <div className="bg-background text-foreground relative min-h-screen">

      {/* Persistent ambient gradient background */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-5%,rgba(2,132,199,0.05)_0%,transparent_65%)]" />

      <div className="relative z-10 pb-16">
        
        {/* Hero */}
        <Hero />

        {/* 1. Trust Logo Wall (directly below hero) */}
        <ClientLogoWall />

        {/* 2. Trust Stats Section */}
        <section id="trust-stats" className="page-section">
          <div className="container">
            <TrustStats />
          </div>
        </section>

        {/* 3. Why Choose Us */}
        <section id="why-choose-us" className="page-section">
          <div className="container">
            <WhyChooseUs />
          </div>
        </section>

        {/* 4. Process Timeline */}
        <section id="process" className="page-section bg-accent/30">
          <div className="container">
            <ProcessTimeline />
          </div>
        </section>

        {/* 5. Industries Served */}
        <section id="solutions" className="page-section">
          <div className="container">
            <IndustriesServed />
          </div>
        </section>

        {/* 6. Technical Specifications */}
        <section id="tech-specs" className="page-section">
          <div className="container">
            <TechnicalSpecs />
          </div>
        </section>

        {/* Legacy: Product Comparison */}
        <section id="products" className="page-section bg-accent/30">
          <div className="container">
            <ProductComparison />
          </div>
        </section>

        {/* 7. Project Showcase */}
        <section id="showcase" className="page-section">
          <div className="container">
            <ProjectShowcase />
          </div>
        </section>

        {/* Legacy: Machine Dashboard */}
        <section id="dashboard" className="page-section">
          <div className="container">
            <MachineDashboard />
          </div>
        </section>

        {/* 8. Case Studies */}
        <section id="case-studies" className="page-section bg-accent/30">
          <div className="container">
            <CaseStudies />
          </div>
        </section>

        {/* 9. Testimonials */}
        <section id="testimonials" className="page-section">
          <div className="container">
            <TestimonialsSlider />
          </div>
        </section>

        {/* 10. Certifications */}
        <section id="certifications" className="page-section">
          <div className="container">
            <Certifications />
          </div>
        </section>

        {/* 11. FAQ */}
        <section id="faq" className="page-section bg-accent/30">
          <div className="container">
            <FAQ />
          </div>
        </section>


        {/* 12. Brochure Download */}
        <section id="brochures" className="page-section">
          <div className="container">
            <BrochureDownload />
          </div>
        </section>

        {/* 13. Stronger Contact Section */}
        <section id="rfq" className="page-section bg-accent/30 pb-16">
          <div className="container">
            <ContactSection />
            <div className="mt-16">
              <RFQWizard />
            </div>
          </div>
        </section>

        {/* Legacy: Technical Support */}
        <section id="support" className="page-section">
          <div className="container">
            <TechnicalSupport />
          </div>
        </section>

        <Footer />

        <MobileStickyCTA />
      </div>
    </div>
  );
}
