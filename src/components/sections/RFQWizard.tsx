"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Zap, CheckCircle2, ClipboardCheck, Settings, Users } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

const RFQWizard = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const searchParams = useSearchParams();
  const productParam = searchParams.get('product') || '';

  // Determine initial process type selection based on search parameters
  let initialProcess = "Spray Dryer";
  const normalized = productParam.toLowerCase().replace(/ /g, '-');
  if (normalized.includes('spray')) {
    initialProcess = "Spray Dryer";
  } else if (normalized.includes('spin') || normalized.includes('flash')) {
    initialProcess = "Spin Flash Dryer";
  } else if (normalized.includes('evaporator') || normalized.includes('mvr')) {
    initialProcess = "MVR Evaporator";
  } else if (normalized.includes('zld') || normalized.includes('zero')) {
    initialProcess = "ZLD Plant";
  } else if (normalized.includes('hot-air') || normalized.includes('generator')) {
    initialProcess = "Hot Air Generator";
  } else if (normalized.includes('pollution') || normalized.includes('scrubber') || normalized.includes('filter') || normalized.includes('bag') || normalized.includes('wet')) {
    initialProcess = "Pollution Control System";
  }

  // Controlled form states
  const [processType, setProcessType]   = useState(initialProcess);
  const [throughput, setThroughput]     = useState('');
  const [materialSpec, setMaterialSpec] = useState('');
  const [inletTemp, setInletTemp]       = useState('250');
  const [heatSource, setHeatSource]     = useState('Natural Gas');
  const [fullname, setFullname]         = useState('');
  const [email, setEmail]               = useState('');
  const [company, setCompany]           = useState('');
  const [submitted, setSubmitted]       = useState(false);

  // Sync state if product parameters change dynamically
  useEffect(() => {
    if (productParam) {
      const norm = productParam.toLowerCase().replace(/ /g, '-');
      if (norm.includes('spray')) setProcessType("Spray Dryer");
      else if (norm.includes('spin') || norm.includes('flash')) setProcessType("Spin Flash Dryer");
      else if (norm.includes('evaporator') || norm.includes('mvr')) setProcessType("MVR Evaporator");
      else if (norm.includes('zld') || norm.includes('zero')) setProcessType("ZLD Plant");
      else if (norm.includes('hot-air') || norm.includes('generator')) setProcessType("Hot Air Generator");
      else if (norm.includes('pollution') || norm.includes('scrubber') || norm.includes('filter') || norm.includes('bag') || norm.includes('wet')) setProcessType("Pollution Control System");
    }
  }, [productParam]);

  const nextStep = () => setStep(s => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const transmitRFQ = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', alignItems: 'center', justifyContent: 'center', minHeight: 480 }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="panel" 
          style={{ maxWidth: 600, width: '100%', padding: 'clamp(1.5rem, 6vw, 4rem)', textAlign: 'center', borderColor: 'rgba(2,132,199,0.2)', boxShadow: '0 24px 64px rgba(2,132,199,0.06)' }}
        >
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
            <CheckCircle2 style={{ width: 32, height: 32, color: '#0284c7' }} />
          </div>
          <h3 className="t-card" style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#0f172a' }}>RFQ Transmitted Successfully</h3>
          <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.7, fontWeight: 500, marginBottom: '2rem' }}>
            Your custom specification log for a **{processType}** system has been saved into AXAR Enterprise process records. An engineering lead will review your data parameters and reach out with a detailed technical proposal within 24 hours.
          </p>
          <div style={{ fontFamily: 'monospace', fontSize: 10, color: '#0284c7', background: 'rgba(14,165,233,0.04)', padding: '1rem', borderRadius: '0.5rem', textAlign: 'left', lineHeight: 1.8 }}>
            <div>[STATUS] PIPELINE CONFIGURATION ARCHIVED</div>
            <div>[TYPE] {processType.toUpperCase()}</div>
            <div>[CAPACITY] {throughput || 'N/A'} KG/DAY</div>
            <div>[REGULATORY] ASME & ISO STAMP ASSURED</div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
      {/* Header Area */}
      <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto' }}>
        <span className="t-label" style={{ marginBottom: '1rem' }}>Custom Plant Specification [RFQ-V1]</span>
        <h2 className="t-section" style={{ marginTop: '0.5rem' }}>
          REQUEST A <br />
          <span style={{ color: '#0284c7' }}>TECHNICAL</span> PROPOSAL.
        </h2>
        <p style={{ fontSize: 16, color: '#475569', marginTop: '1.5rem', lineHeight: 1.7, fontWeight: 500 }}>
          Configure your industrial drying or processing requirements to receive a comprehensive technical proposal & engineering roadmap within 24 hours.
        </p>
      </div>

      {/* Wizard Panel */}
      <div className="panel" style={{ 
        maxWidth: 800, 
        margin: '0 auto', 
        width: '100%',
        boxShadow: '0 40px 100px rgba(0,0,0,0.08)',
        border: '1px solid rgba(0,0,0,0.07)' 
      }}>
        
        {/* Progress Bar */}
        <div style={{ height: 4, background: '#e2e8f0', display: 'flex' }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ 
              flex: 1, 
              background: i <= step ? '#0284c7' : 'transparent',
              transition: 'background 0.4s ease',
              borderRight: i < 3 ? '1px solid rgba(0,0,0,0.05)' : 'none'
            }} />
          ))}
        </div>

        <div style={{ padding: 'clamp(1.5rem, 5vw, 3.5rem)' }}>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: 42, height: 42, borderRadius: '0.75rem', background: 'rgba(14,165,233,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Settings style={{ width: 20, height: 20, color: '#0ea5e9' }} />
                  </div>
                  <h3 className="t-card">Technical Parameters</h3>
                </div>

                <div className="form-row">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <label style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.15em' }}>Process Type</label>
                    <div style={{ position: 'relative' }}>
                      <select 
                        className="input" 
                        style={{ appearance: 'none', width: '100%' }}
                        value={processType}
                        onChange={e => setProcessType(e.target.value)}
                      >
                        <option>Spray Dryer</option>
                        <option>Spin Flash Dryer</option>
                        <option>MVR Evaporator</option>
                        <option>ZLD Plant</option>
                        <option>Hot Air Generator</option>
                        <option>Pollution Control System</option>
                      </select>
                      <div style={{ position: 'absolute', right: '1.2rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderTop: '6px solid #475569' }} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <label style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.15em' }}>Daily Throughput (KG)</label>
                    <input 
                      className="input" 
                      type="number" 
                      placeholder="e.g. 5000" 
                      value={throughput}
                      onChange={e => setThroughput(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <label style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.15em' }}>Material Specification</label>
                  <input 
                    className="input" 
                    type="text" 
                    placeholder="e.g. Liquid Slurry / High Viscosity" 
                    value={materialSpec}
                    onChange={e => setMaterialSpec(e.target.value)}
                  />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: 42, height: 42, borderRadius: '0.75rem', background: 'rgba(14,165,233,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ClipboardCheck style={{ width: 20, height: 20, color: '#0ea5e9' }} />
                  </div>
                  <h3 className="t-card">Operating Conditions</h3>
                </div>

                <div className="form-row">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <label style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.15em' }}>Inlet Temperature (°C)</label>
                    <input 
                      className="input" 
                      type="number" 
                      placeholder="250" 
                      value={inletTemp}
                      onChange={e => setInletTemp(e.target.value)}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <label style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.15em' }}>Heat Source</label>
                    <select 
                      className="input"
                      value={heatSource}
                      onChange={e => setHeatSource(e.target.value)}
                    >
                      <option>Natural Gas</option>
                      <option>Electricity</option>
                      <option>Steam</option>
                      <option>Biomass</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <label style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.15em' }}>Regulatory Requirements</label>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    {['ASME', 'GMP', 'ISO', 'ATEX'].map(tag => (
                      <div key={tag} style={{ 
                        padding: '0.5rem 1rem', borderRadius: '0.5rem', 
                        background: '#e0f2fe', border: '1px solid rgba(2,132,199,0.15)',
                        fontSize: 10, fontWeight: 900, color: '#0284c7'
                      }}>
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: 42, height: 42, borderRadius: '0.75rem', background: 'rgba(14,165,233,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Users style={{ width: 20, height: 20, color: '#0ea5e9' }} />
                  </div>
                  <h3 className="t-card">Contact Integration</h3>
                </div>

                <div className="form-row">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <label style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.15em' }}>Full Name</label>
                    <input 
                      className="input" 
                      type="text" 
                      placeholder="John Doe" 
                      value={fullname}
                      onChange={e => setFullname(e.target.value)}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <label style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.15em' }}>Email Address</label>
                    <input 
                      className="input" 
                      type="email" 
                      placeholder="john@enterprise.com" 
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <label style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.15em' }}>Company Name</label>
                  <input 
                    className="input" 
                    type="text" 
                    placeholder="AXAR Enterprise Ltd." 
                    value={company}
                    onChange={e => setCompany(e.target.value)}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Controls */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            marginTop: '4rem', 
            paddingTop: '2rem', 
            borderTop: '1px solid rgba(0,0,0,0.06)',
            gap: '1rem'
          }}>
            {/* Left Column: Back button */}
            <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
              <button 
                onClick={prevStep}
                className="btn btn-ghost"
                style={{ 
                  padding: '0.65rem 1.25rem',
                  display: step === 1 ? 'none' : 'inline-flex'
                }}
              >
                <ChevronLeft style={{ width: 16, height: 16 }} />
                <span>Back</span>
              </button>
              {step === 1 && <div style={{ height: 38 }} />}
            </div>
            
            {/* Center Column: Progress text */}
            <div style={{ display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ 
                fontSize: 10, 
                fontWeight: 900, 
                color: '#64748b', 
                textTransform: 'uppercase', 
                letterSpacing: '0.15em',
                whiteSpace: 'nowrap'
              }}>
                Step {step} of {totalSteps}
              </span>
            </div>
            
            {/* Right Column: Continue button */}
            <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                onClick={step === totalSteps ? transmitRFQ : nextStep}
                className="btn btn-blue"
                style={{ padding: '0.65rem 1.5rem', gap: '0.5rem' }}
              >
                <span>{step === totalSteps ? 'Transmit RFQ' : 'Continue'}</span>
                {step === totalSteps ? <Zap style={{ width: 14, height: 14 }} /> : <ChevronRight style={{ width: 16, height: 16 }} />}
              </button>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div style={{ padding: '1.25rem clamp(1.5rem, 5vw, 3.5rem)', background: 'rgba(14,165,233,0.04)', borderTop: '1px solid rgba(14,165,233,0.1)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <CheckCircle2 style={{ width: 14, height: 14, color: '#0284c7' }} />
          <span style={{ fontSize: 10, fontWeight: 900, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            ISO 9001:2015 Standards and Engineering Security Assured
          </span>
        </div>
      </div>
    </div>
  );
};

export default RFQWizard;
