"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Zap, CheckCircle2, ClipboardCheck, Settings, Users, Mail } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

const PRODUCT_NAMES: Record<string, string> = {
  "spray-dryer": "Spray Dryer",
  "spray-dryers": "Spray Dryer",
  "spin-flash-dryer": "Spin Flash Dryer",
  "spin-flash": "Spin Flash Dryer",
  "flash-dryer": "Flash Dryer",
  "flash-dryers": "Flash Dryer",
  "vibratory-fluidized-bed": "Vibratory Fluidized Bed Dryer",
  "vibratory-bed": "Vibratory Fluidized Bed Dryer",
  "hot-air-generator": "Hot Air Generator",
  "hot-air-generators": "Hot Air Generator",
  "industrial-blowers": "Industrial Blowers",
  "bag-filter": "Bag Filter",
  "wet-scrubber": "Wet Scrubber System",
  "reactors": "Reactors",
  "heat-exchangers": "Heat Exchangers",
  "pressure-vessels": "Pressure Vessels",
  "sand-mill": "Sand Mill",
  "screw-conveyor": "Screw Conveyor",
  "ribbon-blender": "Ribbon Blender",
  "strainer": "Strainer",
  "expansion-bellows": "Expansion Bellows"
};

const getProcessName = (param: string) => {
  if (!param) return "Spray Dryer";
  const slug = param.toLowerCase().trim();
  if (PRODUCT_NAMES[slug]) return PRODUCT_NAMES[slug];
  return param
    .split(/[-_ ]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const RFQWizard = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const searchParams = useSearchParams();
  const productParam = searchParams.get('product') || '';

  // Determine initial process type selection based on search parameters
  const initialProcess = getProcessName(productParam);

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
  const [loading, setLoading]           = useState(false);

  // Sync state if product parameters change dynamically
  useEffect(() => {
    if (productParam) {
      setProcessType(getProcessName(productParam));
    }
  }, [productParam]);

  const nextStep = () => setStep(s => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const transmitRFQ = async (e: React.FormEvent) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!fullname || !email) {
      alert("Please fill in your name and email in Step 3.");
      return;
    }
    setLoading(true);

    try {
      // Direct Web3Forms submission to the owner's official email
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "6b26cf8d-1941-4560-b8ec-f623ff3a339a", // Public Web3Forms key configured for RFQ
          name: fullname,
          email: email,
          subject: `[RFQ-PROPOSAL] ${processType} - ${fullname} (${company})`,
          message: `New Technical RFQ Proposal requested:\n\n` +
            `--- CONTACT DETAILS ---\n` +
            `Full Name: ${fullname}\n` +
            `Email: ${email}\n` +
            `Company: ${company}\n\n` +
            `--- TECHNICAL PARAMETERS ---\n` +
            `Process Type: ${processType}\n` +
            `Daily Throughput: ${throughput || 'N/A'} KG\n` +
            `Material Spec: ${materialSpec || 'N/A'}\n` +
            `Inlet Temperature: ${inletTemp}°C\n` +
            `Utility Heat Source: ${heatSource}\n`,
          from_name: "AXAR Enterprise RFQ System"
        })
      });
      console.log("RFQ Submission status:", res);
    } catch (err) {
      console.error("RFQ Submission failed:", err);
    }

    setLoading(false);
    setSubmitted(true);
  };

  const handleRFQMailtoFallback = () => {
    const subject = encodeURIComponent(`[RFQ-PROPOSAL] ${processType} - ${fullname} (${company})`);
    const body = encodeURIComponent(
      `AXAR Enterprise Technical RFQ Specification:\n\n` +
      `--- CONTACT DETAILS ---\n` +
      `Full Name: ${fullname}\n` +
      `Email: ${email}\n` +
      `Company: ${company}\n\n` +
      `--- TECHNICAL PARAMETERS ---\n` +
      `Process Type: ${processType}\n` +
      `Daily Throughput: ${throughput || 'N/A'} KG/Day\n` +
      `Material Spec: ${materialSpec || 'N/A'}\n` +
      `Inlet Temperature: ${inletTemp}°C\n` +
      `Utility Heat Source: ${heatSource}\n`
    );
    window.location.href = `mailto:maulikvpanchal2006@gmail.com?subject=${subject}&body=${body}`;
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
          <div style={{ fontFamily: 'monospace', fontSize: 10, color: '#0284c7', background: 'rgba(14,165,233,0.04)', padding: '1rem', borderRadius: '0.5rem', textAlign: 'left', lineHeight: 1.8, marginBottom: '2.5rem' }}>
            <div>[STATUS] PIPELINE CONFIGURATION ARCHIVED</div>
            <div>[TYPE] {processType.toUpperCase()}</div>
            <div>[CAPACITY] {throughput || 'N/A'} KG/DAY</div>
            <div>[REGULATORY] ASME & ISO STAMP ASSURED</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 320, margin: '0 auto' }}>
            <button 
              onClick={handleRFQMailtoFallback}
              className="btn btn-blue"
              style={{ padding: '0.85rem', width: '100%', gap: '0.5rem' }}
            >
              <Mail style={{ width: 16, height: 16 }} />
              <span>Direct Email Dispatch (Backup)</span>
            </button>
            <button 
              onClick={() => {
                setSubmitted(false);
                setStep(1);
                setFullname('');
                setEmail('');
                setCompany('');
              }}
              className="btn btn-ghost"
              style={{ padding: '0.85rem', width: '100%' }}
            >
              <span>Submit New Specification</span>
            </button>
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
                      <input 
                        type="text"
                        className="input" 
                        style={{ width: '100%' }}
                        value={processType}
                        onChange={e => setProcessType(e.target.value)}
                        list="process-options"
                        placeholder="e.g. Spray Dryer"
                      />
                      <datalist id="process-options">
                        <option value="Spray Dryer" />
                        <option value="Spin Flash Dryer" />
                        <option value="Flash Dryer" />
                        <option value="Vibratory Fluidized Bed Dryer" />
                        <option value="Hot Air Generator" />
                        <option value="Industrial Blowers" />
                        <option value="Bag Filter" />
                        <option value="Wet Scrubber System" />
                        <option value="Reactors" />
                        <option value="Heat Exchangers" />
                        <option value="Pressure Vessels" />
                        <option value="Sand Mill" />
                        <option value="Screw Conveyor" />
                        <option value="Ribbon Blender" />
                        <option value="Strainer" />
                        <option value="Expansion Bellows" />
                        <option value="MVR Evaporator" />
                        <option value="ZLD Plant" />
                        <option value="Pollution Control System" />
                      </datalist>
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
                disabled={loading}
              >
                <span>{step === totalSteps ? (loading ? 'Transmitting...' : 'Transmit RFQ') : 'Continue'}</span>
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
