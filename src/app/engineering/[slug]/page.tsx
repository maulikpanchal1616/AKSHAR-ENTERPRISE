"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import SubPageHero from '@/components/layout/SubPageHero';

const engineeringContent = {
  'spray-dryers': {
    title: 'Spray Dryers',
    subtitle: 'High-performance centrifugal and nozzle atomization systems for precise powder production.',
    image: 'industrial_spray_dryer_plant_1778948466181.png',
    details: [
      'Centrifugal & Nozzle Atomizers',
      'Capacity Range: 50 to 2000 kg/hr',
      'Automatic CIP (Clean-in-Place) Systems',
      'Integrated PLC Process Control'
    ]
  },
  'spin-flash': {
    title: 'Spin Flash Dryers',
    subtitle: 'Rapid continuous drying systems for high-moisture filter cakes, viscous pastes, and cohesive materials.',
    image: 'industrial_spray_dryer_plant_1778948466181.png',
    details: [
      'Instantaneous Hot Air Drying Cycle',
      'Agglomerate Disintegration & Sifting',
      'Uniform Particle Size Distribution',
      'Compact Vertical Installation Space'
    ]
  },
  'mvr-evaporators': {
    title: 'MVR Evaporators',
    subtitle: 'Mechanical Vapor Recompression evaporators designed for maximum thermal economy and minimal steam intake.',
    image: 'industrial_evaporator_system_1778948482445.png',
    details: [
      'MVR (Mechanical Vapor Recompression) Loop',
      'Falling Film & Forced Circulation Options',
      'Over 90% Thermal Steam Energy Recovery',
      'Robust Anti-Scaling Tube Design'
    ]
  },
  'zld-plants': {
    title: 'ZLD Plants (Zero Liquid Discharge)',
    subtitle: 'Complete Zero Liquid Discharge industrial wastewater treatment systems with high recovery.',
    image: 'industrial_evaporator_system_1778948482445.png',
    details: [
      'Integrated MVR and Crystallizer Loops',
      'Over 98% Wastewater Recirculation',
      'Heavy-duty Slurry Handling & Sump Pumps',
      'Full Environmental Regulatory Compliance'
    ]
  },
  'hot-air-generators': {
    title: 'Hot Air Generators',
    subtitle: 'Direct and indirect fired clean air systems utilizing multiple fuel types for process drying.',
    image: 'industrial_spray_dryer_plant_1778948466181.png',
    details: [
      'Clean Air Output up to 600°C',
      'Direct & Indirect Fired Burner Options',
      'Compatible with Gas, Oil, Biomass & Coal',
      'High Thermal Efficiency Construction'
    ]
  },
  'pollution-control': {
    title: 'Pollution Control Systems',
    subtitle: 'Scrubbers, cyclones, bag filters, and dust collectors for industrial flue gas cleaning and emission standards.',
    image: 'industrial_evaporator_system_1778948482445.png',
    details: [
      'Venturi & Packed Bed Gas Scrubbers',
      'High-efficiency Bag Filter Separators',
      'Air Volumetric Capacity up to 50,000 m³/hr',
      'Guaranteed Dust emission < 30 mg/Nm³'
    ]
  }
};

const EngineeringPage = () => {
  const { slug } = useParams();
  const content = engineeringContent[slug as keyof typeof engineeringContent];

  if (!content) return <div style={{ padding: '10rem', textAlign: 'center', color: '#0f172a' }}>Module Not Found</div>;

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      <SubPageHero 
        title={content.title} 
        subtitle={content.subtitle} 
        category="Engineering" 
        image={`/brain/51cec6b6-dc58-419e-ab68-50c263f00e9b/${content.image}`} 
      />
      
      <section className="section-stripe">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
            <div>
              <span className="t-label" style={{ marginBottom: '1.5rem' }}>Technical Specs [SPEC-MTX]</span>
              <h2 className="t-section" style={{ marginBottom: '2rem' }}>
                SYSTEM <br /> <span style={{ color: '#0284c7' }}>CAPABILITIES.</span>
              </h2>
              <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.8, marginBottom: '3rem' }}>
                Our {content.title} are engineered for the most demanding industrial environments, combining thermodynamic excellence with automated PLC loop control.
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

            <div className="panel" style={{ height: 500, background: 'rgba(14,165,233,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <div style={{ textAlign: 'center', padding: '3rem' }}>
                 <div style={{ fontSize: 80, fontWeight: 900, color: 'rgba(14,165,233,0.1)', marginBottom: '1rem' }}>AXAR</div>
                 <p style={{ fontSize: 12, fontWeight: 900, color: 'rgba(14,165,233,0.4)', textTransform: 'uppercase', letterSpacing: '0.4em' }}>
                   Engineering Excellence
                 </p>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EngineeringPage;
