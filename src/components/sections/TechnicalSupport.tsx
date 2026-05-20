"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe } from 'lucide-react';

const TechnicalSupport = () => {
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
        
        {/* Support Form */}
        <div className="panel" style={{ padding: 'clamp(1.5rem, 5vw, 3.5rem)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
            <div style={{ width: 42, height: 42, borderRadius: '0.75rem', background: 'rgba(2,132,199,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MessageSquare style={{ width: 20, height: 20, color: '#0284c7' }} />
            </div>
            <h3 className="t-card">Engineer Request</h3>
          </div>

          <form style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="flex flex-col md:flex-row gap-6">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
                <label style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.15em' }}>Full Name</label>
                <input className="input" type="text" placeholder="Engineering Manager" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
                <label style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.15em' }}>Email</label>
                <input className="input" type="email" placeholder="manager@plant.com" />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <label style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.15em' }}>Request Type</label>
              <select className="input">
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
                placeholder="Describe your technical requirements in detail..."
                style={{ resize: 'none' }}
              />
            </div>

            <button className="btn btn-blue" style={{ padding: '1.1rem' }}>
              <Send style={{ width: 16, height: 16 }} />
              Transmit Request
            </button>
          </form>
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
