"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import SubPageHero from '@/components/layout/SubPageHero';

const techContent = {
  'thermal-engineering': {
    title: 'Thermal Engineering',
    subtitle: 'High-efficiency thermodynamic cycle designs tailored for complex industrial drying & evaporation processes.',
    image: 'neural_core_server_room_1778948449154.png',
    details: [
      'Thermodynamic Mass & Energy Balances',
      'Custom Fluid Dynamics Modeling',
      'High-Capacity Heat Exchangers',
      'Optimized Evaporative Heat Recovery'
    ]
  },
  'process-automation': {
    title: 'Process Automation',
    subtitle: 'Integrated PLC and SCADA automation loops ensuring stable continuous plant operation and safety compliance.',
    image: 'neural_core_server_room_1778948449154.png',
    details: [
      'SCADA Dashboard Integration',
      'Fail-safe Interlock Systems',
      'Continuous Telemetry Reporting',
      'Drift and Flow Rate Stabilization'
    ]
  },
  'energy-optimization': {
    title: 'Energy Optimization',
    subtitle: 'Up to 30% reduction in thermal and electrical utility consumption through advanced heat recovery systems.',
    image: 'neural_core_server_room_1778948449154.png',
    details: [
      'MVR Steam Compression Loops',
      'Condensate Heat Recovery',
      'Flue Gas Economizers',
      'Low-Temperature Drying Optimization'
    ]
  },
  'turnkey-fabrication': {
    title: 'Turnkey Fabrication',
    subtitle: 'End-to-end heavy engineering, precision fabrication, testing, and ISO 9001:2015 compliant plant assembly.',
    image: 'neural_core_server_room_1778948449154.png',
    details: [
      'SS304/SS316 Precision Fabrication',
      'Fatigue & Pressure Testing',
      'Trial Lab Sample Testing',
      'On-Site Assembly & Commissioning'
    ]
  }
};

const TechnologyPage = () => {
  const { slug } = useParams();
  const content = techContent[slug as keyof typeof techContent];

  if (!content) return <div style={{ padding: '10rem', textAlign: 'center', color: '#0f172a' }}>Module Not Found</div>;

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      <SubPageHero 
        title={content.title} 
        subtitle={content.subtitle} 
        category="Technology" 
        image={`/brain/51cec6b6-dc58-419e-ab68-50c263f00e9b/${content.image}`} 
      />
      
      <section className="section-stripe">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
             <div className="panel" style={{ height: 500, background: 'rgba(14,165,233,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', order: 2 }}>
               <div style={{ textAlign: 'center', padding: '3rem' }}>
                 <div style={{ fontSize: 80, fontWeight: 900, color: 'rgba(14,165,233,0.1)', marginBottom: '1rem' }}>THERMO</div>
                 <p style={{ fontSize: 12, fontWeight: 900, color: 'rgba(14,165,233,0.4)', textTransform: 'uppercase', letterSpacing: '0.4em' }}>
                   Industrial Engineering
                 </p>
               </div>
            </div>

            <div style={{ order: 1 }}>
              <span className="t-label" style={{ marginBottom: '1.5rem' }}>Core Stack [TECH-LOG]</span>
              <h2 className="t-section" style={{ marginBottom: '2rem' }}>
                AXAR <br /> <span style={{ color: '#0284c7' }}>DRIVEN.</span>
              </h2>
              <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.8, marginBottom: '3rem' }}>
                The AXAR Technology stack represents the pinnacle of industrial automation, merging advanced thermodynamics with ISO 9001 certified engineering precision.
              </p>
              
              <div style={{ display: 'grid', gap: '1.25rem' }}>
                {content.details.map((detail, i) => (
                  <div key={i} className="panel" style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#0284c7' }} className="anim-pulse" />
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#1e293b' }}>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TechnologyPage;
