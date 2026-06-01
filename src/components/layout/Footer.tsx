"use client";

import React from 'react';
import { MapPin, Mail, Phone, ArrowUpRight, Globe } from 'lucide-react';

const Footer = () => {
  const links = [
    { label: 'Equipment', items: ['Spray Dryers', 'Spin Flash Dryers', 'Rotary Dryers', 'Fluid Bed Dryers', 'Evaporators'] },
    { label: 'Company', items: ['About Us', 'Manufacturing Facility', 'Certifications', 'Contact'] }
  ];

  return (
    <footer className="bg-background border-t border-border pt-24 pb-12 relative z-10">
      <div className="container flex flex-col gap-20">
        
        {/* Top Row: Logo, Info, Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="flex items-center">
              <div className="font-black text-2xl tracking-tighter text-foreground">
                AXAR<span className="text-primary">ENTERPRISE</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md font-medium">
              Pioneering energy-efficient industrial drying, evaporation, and environmental engineering solutions since 2009. ISO 9001:2015 & ASME Certified.
            </p>
            
            <div className="flex flex-col gap-4 mt-4">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-primary mt-1 flex-shrink-0" />
                <span className="text-sm text-foreground leading-relaxed">
                  <strong>Manufacturing Unit:</strong><br/>
                  Plot No. 123, GIDC Phase IV, Vatva,<br/>
                  Ahmedabad, Gujarat 382445, India
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-primary flex-shrink-0" />
                <span className="text-sm text-foreground">+91 90999 55511</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-primary flex-shrink-0" />
                <span className="text-sm text-foreground">sales@axarenterprise.com</span>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-xs font-bold bg-accent text-accent-foreground px-2 py-1 rounded-md border border-border">
                  GSTIN: 24AAACA1234A1Z5
                </span>
              </div>
            </div>
          </div>

          {/* Nav Links */}
          {links.map(group => (
            <div key={group.label} className="flex flex-col gap-6">
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{group.label}</span>
              <div className="flex flex-col gap-4">
                {group.items.map(item => {
                  const slug = item.toLowerCase().replace(/ /g, '-');
                  return (
                    <a 
                      key={item} 
                      href={`/products/${slug}`}
                      className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 no-underline"
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
        <div className="pt-10 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6 md:pr-24 lg:pr-32">
          <div className="text-xs font-semibold text-muted-foreground">
            © {new Date().getFullYear()} AXAR Enterprise. All Rights Reserved.
          </div>
          <div className="flex items-center gap-8">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Globe size={18} />
            </a>
            {['Privacy Policy', 'Terms of Service'].map(legal => {
              const slug = legal.toLowerCase().replace(/ /g, '-');
              return (
                <a 
                  key={legal} 
                  href={`/legal/${slug}`}
                  className="text-xs font-semibold text-muted-foreground hover:text-primary transition-colors no-underline"
                >
                  {legal}
                </a>
              );
            })}
          </div>
        </div>

      </div>

    </footer>
  );
};

export default Footer;
