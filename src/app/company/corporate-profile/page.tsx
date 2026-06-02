"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Factory, Globe, ShieldCheck, Award, Zap, HardHat } from 'lucide-react';
import Image from 'next/image';
import Footer from '@/components/layout/Footer';
import SubPageHero from '@/components/layout/SubPageHero';

export default function CorporateProfilePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100 } }
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      <SubPageHero 
        title="Corporate Profile" 
        subtitle="Pioneering industrial excellence in thermal engineering, drying systems, and environmental compliance since 2009." 
        category="COMPANY" 
        image="/logo.png" 
      />

      {/* Trust Badges Strip (Mobile Responsive) */}
      <section className="bg-white border-b border-slate-200 py-6">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 lg:gap-24 opacity-80">
            {[
              { label: 'ISO 9001:2015', icon: ShieldCheck },
              { label: 'ASME Compliant', icon: HardHat },
              { label: 'CE Marked', icon: Award },
              { label: 'Global Export', icon: Globe }
            ].map((badge, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <badge.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                <span className="text-sm md:text-base font-bold text-slate-700">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Legacy & Vision */}
      <section className="page-section bg-slate-50">
        <div className="container">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          >
            {/* Text Content */}
            <div className="flex flex-col gap-6">
              <span className="t-section-label">OUR LEGACY</span>
              <h2 className="t-section-heading">
                ENGINEERING <span className="text-primary">THE FUTURE</span> OF INDUSTRIAL PROCESSES.
              </h2>
              <p className="t-section-subtext">
                Established in 2009 in Ahmedabad, Gujarat, <strong>AXAR Enterprise</strong> has rapidly emerged as a global leader in designing, manufacturing, and commissioning high-performance process plant equipment.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed">
                We specialize in Turnkey Spray Drying Plants, Evaporators, Spin Flash Dryers, and comprehensive Pollution Control Systems. Our core philosophy blends rigorous ASME-standard mechanical engineering with cutting-edge PLC automation to deliver systems that operate with maximum thermal efficiency and absolute reliability.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {[
                  "15+ Years of Proven Industry Expertise",
                  "100+ Turnkey Plant Installations Globally",
                  "15,000 Sq.Ft State-of-the-art Manufacturing Facility",
                  "In-house R&D and Trial Testing Lab"
                ].map((item, idx) => (
                  <motion.div variants={itemVariants} key={idx} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold text-slate-800 leading-snug">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Visual/Image Composition */}
            <motion.div variants={itemVariants} className="relative h-[400px] sm:h-[500px] lg:h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl group border border-slate-200">
              <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <Image 
                src="https://axarenterprise.com/WObg/sprayDryer.png"
                alt="Axar Enterprise Manufacturing Excellence"
                fill
                className="object-contain bg-white p-8 group-hover:scale-105 transition-transform duration-700"
              />
              {/* Floating Stat Card */}
              <div className="absolute bottom-6 left-6 right-6 sm:right-auto sm:w-64 bg-white/90 backdrop-blur-md p-6 rounded-xl border border-slate-200 shadow-xl z-20">
                <div className="text-4xl font-black text-primary mb-1">15+</div>
                <div className="text-sm font-bold text-slate-700 uppercase tracking-wider">Years of Excellence</div>
                <div className="text-xs text-slate-500 mt-2">Delivering robust industrial solutions since 2009.</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Core Values Matrix */}
      <section className="page-section bg-white border-y border-slate-200">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="t-section-label">WHY CHOOSE US</span>
            <h2 className="t-section-heading mt-4">THE AXAR ADVANTAGE</h2>
            <p className="t-section-subtext mx-auto">
              We do not just build machinery; we build long-term partnerships based on operational trust, safety, and continuous innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Uncompromising Quality",
                desc: "Every vessel, weld, and assembly undergoes strict NDT, hydro-testing, and DP checks to guarantee zero-defect manufacturing.",
                icon: ShieldCheck
              },
              {
                title: "Energy Efficiency First",
                desc: "Our thermal engineers optimize heat loops and insulation to reduce your carbon footprint and slash utility operating costs.",
                icon: Zap
              },
              {
                title: "In-House Manufacturing",
                desc: "From CNC plasma cutting to final PLC programming, everything is handled internally at our heavy engineering shop in Vatva.",
                icon: Factory
              }
            ].map((value, idx) => (
              <div key={idx} className="enterprise-card p-8 flex flex-col items-center text-center group hover:bg-primary/5">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facility Highlights Banner */}
      <section className="relative py-24 overflow-hidden bg-slate-900 text-white">
        {/* Abstract Background Blueprint */}
        <div className="absolute inset-0 opacity-10" style={{ 
          backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />
        
        <div className="container relative z-10 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">READY TO SCALE YOUR PRODUCTION?</h2>
          <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed font-medium">
            Whether you need a custom Spin Flash Dryer or a complete automated powder plant, our engineering team is ready to design the perfect solution for your specific application.
          </p>
          <a href="/contact" className="btn btn-primary text-base px-8 py-4 h-auto shadow-[0_0_40px_rgba(2,132,199,0.5)]">
            Schedule a Consultation with our Engineers
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
