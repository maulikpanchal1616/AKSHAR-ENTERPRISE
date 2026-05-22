"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe, CheckCircle2, AlertCircle } from 'lucide-react';

const TechnicalSupport = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail]       = useState('');
  const [reqType, setReqType]   = useState('System Malfunction');
  const [desc, setDesc]         = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullname || !email || !desc) {
      alert("Please fill in all required fields.");
      return;
    }
    setLoading(true);

    try {
      // Direct Web3Forms submission to the owner's official email
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: "6b26cf8d-1941-4560-b8ec-f623ff3a339a", // Public Web3Forms key configured for support forms
          name: fullname,
          email: email,
          subject: `[SUPPORT-HUB] ${reqType} - ${fullname}`,
          message: `Technical support request submitted:\n\nName: ${fullname}\nEmail: ${email}\nRequest Type: ${reqType}\n\nDescription:\n${desc}`,
          from_name: "AXAR Enterprise Support Hub"
        })
      });
      console.log("Support response:", res);
    } catch (err) {
      console.error("Support API failed:", err);
    }

    setLoading(false);
    setSubmitted(true);
  };

  const handleMailtoFallback = () => {
    const subject = encodeURIComponent(`[SUPPORT-HUB] ${reqType} - ${fullname}`);
    const body = encodeURIComponent(
      `AXAR Enterprise Support Request:\n\n` +
      `Full Name: ${fullname}\n` +
      `Email: ${email}\n` +
      `Request Type: ${reqType}\n\n` +
      `Description:\n${desc}\n`
    );
    window.location.href = `mailto:maulikvpanchal2006@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
      {/* Header Area */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-16 items-end">
        <div>
          <span className="t-label" style={{ marginBottom: '1rem' }}>Support Core [HELP-SYS]</span>
          <h2 className="t-section" style={{ marginTop: '0.5rem' }}>
            TECHNICAL <br />
            <span style={{ color: '#0284c7' }}>SUPPORT</span> HUB.
          </h2>
        </div>
        <div style={{ paddingBottom: '0.5rem' }}>
          <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.7, fontWeight: 500 }}>
            Direct access to our senior engineering team for maintenance, troubleshooting, and plant optimization.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
        
        {/* Support Form / Success Panel */}
        <div className="panel" style={{ padding: 'clamp(1.5rem, 5vw, 3.5rem)', minHeight: 450, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="form-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
                  <div style={{ width: 42, height: 42, borderRadius: '0.75rem', background: 'rgba(2,132,199,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MessageSquare style={{ width: 20, height: 20, color: '#0284c7' }} />
                  </div>
                  <h3 className="t-card">Engineer Request</h3>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
                      <label style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.15em' }}>Full Name</label>
                      <input 
                        className="input" 
                        type="text" 
                        required
                        placeholder="Engineering Manager" 
                        value={fullname}
                        onChange={e => setFullname(e.target.value)}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
                      <label style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.15em' }}>Email</label>
                      <input 
                        className="input" 
                        type="email" 
                        required
                        placeholder="manager@plant.com" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <label style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.15em' }}>Request Type</label>
                    <select 
                      className="input"
                      value={reqType}
                      onChange={e => setReqType(e.target.value)}
                    >
                      <option>System Malfunction</option>
                      <option>Maintenance Schedule</option>
                      <option>Performance Audit</option>
                      <option>Spare Parts Inquiry</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <label style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.15em' }}>Description</label>
                    <textarea 
                      className="input" 
                      rows={5} 
                      required
                      placeholder="Describe your technical requirements in detail..."
                      style={{ resize: 'none' }}
                      value={desc}
                      onChange={e => setDesc(e.target.value)}
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-blue" 
                    style={{ padding: '1.1rem', gap: '0.5rem' }}
                    disabled={loading}
                  >
                    <Send style={{ width: 16, height: 16 }} />
                    <span>{loading ? 'Transmitting Inquiries...' : 'Transmit Request'}</span>
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success-view"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                style={{ textAlign: 'center', padding: '2rem 0' }}
              >
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                  <CheckCircle2 style={{ width: 32, height: 32, color: '#0284c7' }} />
                </div>
                <h3 className="t-card" style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#0f172a' }}>Support Inquiries Transmitted</h3>
                <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.7, fontWeight: 500, marginBottom: '2.5rem', maxWidth: 500, margin: '0 auto 2.5rem' }}>
                  Your support request for **{reqType}** has been successfully dispatched to the AXAR Enterprise service team. We will review your diagnostics logs and contact you within 24 hours.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 320, margin: '0 auto' }}>
                  <button 
                    onClick={handleMailtoFallback}
                    className="btn btn-blue"
                    style={{ padding: '0.85rem', width: '100%' }}
                  >
                    <Mail style={{ width: 16, height: 16 }} />
                    <span>Direct Email Dispatch (Backup)</span>
                  </button>
                  <button 
                    onClick={() => {
                      setSubmitted(false);
                      setFullname('');
                      setEmail('');
                      setDesc('');
                    }}
                    className="btn btn-ghost"
                    style={{ padding: '0.85rem', width: '100%' }}
                  >
                    <span>Submit New Ticket</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Contact Info Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="panel" style={{ padding: '2.5rem' }}>
            <h3 className="t-card" style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>Global Contact</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {[
                { icon: Mail, label: 'Email', value: 'info@axarenterprise.com', color: '#0ea5e9' },
                { icon: Phone, label: 'Direct Line', value: '+91 90339 58453', color: '#4ade80' },
                { icon: Clock, label: 'Response Time', value: '< 24 Hours [Engineering Lead]', color: '#f59e0b' },
                { icon: Globe, label: 'Regional HQ', value: 'Ahmedabad, India', color: '#a78bfa' }
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', gap: '1.25rem' }}>
                  <div style={{ 
                    width: 40, height: 40, borderRadius: '0.75rem', 
                    background: `${item.color}10`, border: `1px solid ${item.color}25`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                  }}>
                    <item.icon style={{ width: 18, height: 18, color: item.color }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 9, fontWeight: 900, textTransform: 'uppercase', color: '#64748b', marginBottom: '0.25rem' }}>{item.label}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel" style={{ padding: '2rem', display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#f1f5f9', border: '1px solid rgba(0,0,0,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MapPin style={{ width: 20, height: 20, color: '#64748b' }} />
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 900, color: '#0f172a' }}>Manufacturing HQ</div>
              <div style={{ fontSize: 10, fontWeight: 600, color: '#475569', marginTop: 2 }}>5, Sameer Estate, Vatva GIDC, Ahmedabad, Gujarat - 382445</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TechnicalSupport;
