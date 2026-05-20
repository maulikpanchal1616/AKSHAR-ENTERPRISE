"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import SubPageHero from '@/components/layout/SubPageHero';

const companyContent = {
  'about-us': {
    title: 'About Us',
    subtitle: 'Over 15 years of excellence in building high-performance industrial drying & process plant equipment.',
    image: 'industrial_spray_dryer_plant_1778948466181.png',
    details: [
      '15+ Years Industry Experience',
      '100+ Plant Installations',
      'Custom Engineering Specialists',
      'Trial Lab R&D Support'
    ]
  },
  'manufacturing-facility': {
    title: 'Manufacturing Facility',
    subtitle: 'Our state-of-the-art 15,000 sq.ft heavy engineering workshop in GIDC Vatva, Ahmedabad, Gujarat.',
    image: 'industrial_evaporator_system_1778948482445.png',
    details: [
      '15,000 Sq.Ft Engineering Shop',
      'Modern CNC & Plasma Cutting',
      'Equipped Trial Lab Testing',
      'Safety & Quality Testing Beds'
    ]
  },
  'quality-standards': {
    title: 'Quality Standards',
    subtitle: 'Guaranteeing safety, robustness, and longevity with ISO 9001:2015 and CE certification.',
    image: 'industrial_spray_dryer_plant_1778948466181.png',
    details: [
      'ISO 9001:2015 Certified',
      'CE Marked Equipment Compliance',
      'GMP Compliant Materials (SS316)',
      'Strict ASME Code Design Rules'
    ]
  },
  'contact': {
    title: 'Contact Us',
    subtitle: 'Get in touch with our engineering experts for a consultation or maintenance request.',
    image: 'neural_core_server_room_1778948449154.png',
    details: [
      'Direct Call: +91 90339 58453',
      'Email: info@axarenterprise.com',
      'Address: Vatva GIDC, Ahmedabad',
      'Response Time: < 24 Hours'
    ]
  }
};

const CompanyPage = () => {
  const { slug } = useParams();
  const content = companyContent[slug as keyof typeof companyContent];

  if (!content) return <div style={{ padding: '10rem', textAlign: 'center', color: '#0f172a' }}>Module Not Found</div>;

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      <SubPageHero 
        title={content.title} 
        subtitle={content.subtitle} 
        category="Company" 
        image={`/brain/51cec6b6-dc58-419e-ab68-50c263f00e9b/${content.image}`} 
      />
      
      <section className="section-stripe">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '5rem', alignItems: 'center' }}>
            <div>
              <span className="t-label" style={{ marginBottom: '1.5rem' }}>Enterprise Core [AX-INFO]</span>
              <h2 className="t-section" style={{ marginBottom: '2rem' }}>
                GLOBAL <br /> <span style={{ color: '#0284c7' }}>EXCELLENCE.</span>
              </h2>
              <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.8, marginBottom: '3rem' }}>
                AXAR Enterprise is more than a machinery manufacturer; we are a technology partner dedicated to the future of industrial sustainability and efficiency.
              </p>
              
              <div style={{ gridTemplateColumns: '1fr 1fr', display: 'grid', gap: '1.25rem' }}>
                {content.details.map((detail, i) => (
                   <div key={i} className="panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                     <div style={{ width: 30, height: 30, borderRadius: '0.5rem', background: 'rgba(2,132,199,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                       <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#0284c7' }} className="anim-pulse" />
                     </div>
                     <span style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', lineHeight: 1.4 }}>{detail}</span>
                   </div>
                ))}
              </div>
            </div>

            <div className="panel" style={{ height: 450, background: 'rgba(14,165,233,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
               <div style={{ 
                 position: 'absolute', inset: 0, opacity: 0.1,
                 backgroundImage: 'radial-gradient(circle at center, #0ea5e9 1px, transparent 1px)',
                 backgroundSize: '20px 20px'
               }} />
               <div style={{ textAlign: 'center', padding: '3rem', position: 'relative', zIndex: 1 }}>
                  <div style={{ fontSize: 60, fontWeight: 900, color: '#0f172a', letterSpacing: '-0.05em' }}>EST. 2009</div>
                 <div style={{ fontSize: 10, fontWeight: 900, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.5em', marginTop: '1rem' }}>
                   Engineering The Future
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CompanyPage;
