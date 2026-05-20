"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import SubPageHero from '@/components/layout/SubPageHero';

const legalContent = {
  'privacy-policy': {
    title: 'Privacy Policy',
    subtitle: 'Data protection protocols and privacy standards for the AXAR industrial ecosystem.',
    sections: [
      { h: 'Data Collection', p: 'We collect technical plant telemetry and contact information strictly for process optimization and support.' },
      { h: 'Data Security', p: 'All transmitted data is encrypted using industry-standard protocols and stored in secure database environments.' },
      { h: 'Third Parties', p: 'We never sell or distribute your industrial data to third parties. Data remains your sovereign property.' }
    ]
  },
  'terms-of-service': {
    title: 'Terms of Service',
    subtitle: 'Governance and operational frameworks for AXAR engineering services and digital modules.',
    sections: [
      { h: 'Service Usage', p: 'Access to digital plant telemetry dashboards is provided under strict enterprise licensing agreements for authorized plant personnel.' },
      { h: 'Liability', p: 'Engineering calculations are deterministic but must be verified by on-site safety officers before implementation.' },
      { h: 'Intellectual Property', p: 'Proprietary plant designs, mechanical engineering drawings, and software tools remain the exclusive intellectual property of AXAR Enterprise.' }
    ]
  },
  'cookie-policy': {
    title: 'Cookie Policy',
    subtitle: 'How we use digital identifiers to maintain secure telemetry sessions and dashboard stability.',
    sections: [
      { h: 'Essential Cookies', p: 'Used for maintaining secure authentication and session persistence across process monitoring tools.' },
      { h: 'Analytics', p: 'Anonymized usage metrics to improve interface responsiveness and system-wide efficiency.' },
      { h: 'Management', p: 'Users can manage cookie preferences through their standard browser privacy settings.' }
    ]
  }
};

const LegalPage = () => {
  const { slug } = useParams();
  const content = legalContent[slug as keyof typeof legalContent];

  if (!content) return <div style={{ padding: '10rem', textAlign: 'center', color: '#0f172a' }}>Module Not Found</div>;

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      <SubPageHero 
        title={content.title} 
        subtitle={content.subtitle} 
        category="Legal" 
      />
      
      <section className="section-stripe">
        <div className="container" style={{ maxWidth: 800 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
            {content.sections.map((s, i) => (
              <div key={i}>
                <h3 className="t-card" style={{ fontSize: '1.25rem', marginBottom: '1.25rem', color: '#0284c7' }}>{s.h}</h3>
                <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.8 }}>
                  {s.p}
                </p>
              </div>
            ))}
            
            <div className="panel" style={{ padding: '2rem', marginTop: '2rem', background: '#f1f5f9', borderColor: 'rgba(0,0,0,0.06)' }}>
               <p style={{ fontSize: 12, fontWeight: 700, color: '#0284c7', textAlign: 'center' }}>
                 LAST UPDATED: MAY 2026 | VERSION 4.8.0 [STABLE]
               </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LegalPage;
