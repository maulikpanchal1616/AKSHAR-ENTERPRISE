"use client";

import React from 'react';
import { Cpu, Zap, Activity, Globe, ArrowUpRight } from 'lucide-react';
import { smoothScrollTo } from '@/components/animations/SmoothScroll';

const Footer = () => {
  const links = [
    { label: 'Technology', items: ['Thermal Engineering', 'Process Automation', 'Energy Optimization', 'Turnkey Fabrication'] },
    { label: 'Engineering', items: ['Spray Dryers', 'Spin Flash', 'MVR Evaporators', 'ZLD Plants', 'Hot Air Generators', 'Pollution Control'] },
    { label: 'Company', items: ['About Us', 'Manufacturing Facility', 'Quality Standards', 'Contact'] }
  ];

  return (
    <footer style={{ 
      background: '#f1f5f9', 
      borderTop: '1px solid rgba(0,0,0,0.05)',
      padding: '6rem 0 3rem 0',
      position: 'relative',
      zIndex: 10
    }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
        
        {/* Top Row: Logo and Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          
          {/* Brand Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img 
                src="/nameWithoutbg.png" 
                alt="AXAR Enterprise Logo" 
                style={{ height: 42, width: 'auto', objectFit: 'contain' }}
              />
            </div>
            <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.7, fontWeight: 500, maxWidth: 300 }}>
              Pioneering energy-efficient industrial drying, evaporation, and environmental engineering solutions since 2009.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {[Cpu, Zap, Activity].map((Icon, i) => (
                <button key={i} style={{ 
                  width: 38, height: 38, borderRadius: '0.6rem', 
                  background: '#ffffff', border: '1px solid rgba(0,0,0,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569',
                  cursor: 'pointer', transition: 'all 0.3s'
                }}>
                  <Icon style={{ width: 18, height: 18 }} />
                </button>
              ))}
            </div>
          </div>

          {/* Nav Links */}
          {links.map(group => (
            <div key={group.label} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <span className="t-label" style={{ fontSize: 9, color: '#0f172a' }}>{group.label}</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {group.items.map(item => {
                  const slug = item.toLowerCase().replace(/ /g, '-');
                  const category = group.label.toLowerCase();
                  return (
                    <a 
                      key={item} 
                      href={`/${category}/${slug}`}
                      style={{ 
                        background: 'none', border: 'none', padding: 0, 
                        textAlign: 'left', cursor: 'pointer', 
                        fontSize: 13, fontWeight: 600, color: '#475569',
                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                        transition: 'color 0.25s',
                        textDecoration: 'none'
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = '#0284c7'}
                      onMouseLeave={e => e.currentTarget.style.color = '#475569'}
                    >
                      {item}
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Row: Legal and Copyright */}
        <div className="footer-bottom" style={{ 
          paddingTop: '2.5rem', borderTop: '1px solid rgba(0,0,0,0.05)' 
        }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#64748b' }}>
            © {new Date().getFullYear()} AXAR Enterprise Ltd. All Rights Reserved.
          </div>
          <div style={{ display: 'flex', gap: '2rem' }}>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(legal => {
              const slug = legal.toLowerCase().replace(/ /g, '-');
              return (
                <a 
                  key={legal} 
                  href={`/legal/${slug}`}
                  style={{ 
                    background: 'none', border: 'none', padding: 0, 
                    fontSize: 12, fontWeight: 600, color: '#64748b',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    transition: 'color 0.25s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#0284c7'}
                  onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
                >
                  {legal}
                </a>
              );
            })}
          </div>
        </div>

      </div>

      {/* Back to Top */}
      <button 
        onClick={() => smoothScrollTo(0)}
        className="back-to-top"
        style={{ 
          width: 48, height: 48, borderRadius: '0.75rem', 
          background: '#0284c7', color: '#fff', border: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', boxShadow: '0 20px 40px rgba(2,132,199,0.3)'
        }}
      >
        <ArrowUpRight style={{ width: 20, height: 20 }} />
      </button>
    </footer>
  );
};

export default Footer;
