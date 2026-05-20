"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Info, Layers, Gauge, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const CATEGORIES = ["All", "Drying Systems", "Air & Thermal", "Filtration & Pollution", "Vessels & Reactors", "Material Handling"];

const products = [
  {
    id: "spray-dryer",
    name: "Spray Dryer",
    type: "Drying Systems",
    capacity: "50–2000 kg/hr",
    efficiency: "GMP Compliant",
    features: ["Rotary Disc Atomization", "Co-Current Air Flow", "PLC Automation", "Clean-In-Place Ready"],
    image: "https://axarenterprise.com/WObg/sprayDryer.png",
    slug: "spray-dryers",
  },
  {
    id: "spin-flash-dryer",
    name: "Spin Flash Dryer",
    type: "Drying Systems",
    capacity: "20–1000 kg/hr",
    efficiency: "Continuous Loop",
    features: ["Viscous Paste Drying", "High-Shear Disperser", "Bag Filter Collection", "Compact Footprint"],
    image: "https://axarenterprise.com/WObg/spinFlashDryer.png",
    slug: "spin-flash",
  },
  {
    id: "flash-dryer",
    name: "Flash Dryer",
    type: "Drying Systems",
    capacity: "100–3000 kg/hr",
    efficiency: "Pneumatic System",
    features: ["Rapid Moisture Removal", "Pneumatic Conveying", "Low Residence Time", "High Throughput"],
    image: "https://axarenterprise.com/WObg/flashDryer.png",
    slug: "flash-dryers",
  },
  {
    id: "vibratory-fluidized-bed",
    name: "Vibratory Fluidized Bed Dryer",
    type: "Drying Systems",
    capacity: "50–5000 kg/hr",
    efficiency: "Gentle Drying",
    features: ["Granule & Crystal Drying", "Even Heat Distribution", "Vibration Cooling", "Low Attrition"],
    image: "https://axarenterprise.com/WObg/vibratory.png",
    slug: "vibratory-bed",
  },
  {
    id: "hot-air-generator",
    name: "Hot Air Generator",
    type: "Air & Thermal",
    capacity: "100k–5M kcal/hr",
    efficiency: "Indirect / Direct",
    features: ["High-Temp Heat Exchange", "Refractory Lining", "Multi-Fuel Burners", "Safety Interlocks"],
    image: "https://axarenterprise.com/WObg/hotAirGen.png",
    slug: "hot-air-generators",
  },
  {
    id: "industrial-blowers",
    name: "Industrial Blowers",
    type: "Air & Thermal",
    capacity: "Up to 50,000 m³/hr",
    efficiency: "High Performance",
    features: ["Centrifugal Design", "Anti-Corrosion Build", "Low Noise Operation", "Custom Impeller"],
    image: "https://axarenterprise.com/WObg/industrialBlower.png",
    slug: "industrial-blowers",
  },
  {
    id: "bag-filter",
    name: "Bag Filter",
    type: "Filtration & Pollution",
    capacity: "Up to 100,000 m³/hr",
    efficiency: "99.9% Efficiency",
    features: ["Pulse-Jet Cleaning", "Multi-Compartment Design", "Low Pressure Drop", "PTFE Filter Bags"],
    image: "https://axarenterprise.com/WObg/bagfilter.png",
    slug: "pollution-control",
  },
  {
    id: "wet-scrubber",
    name: "Wet Scrubber System",
    type: "Filtration & Pollution",
    capacity: "Up to 50,000 m³/hr",
    efficiency: "Emission Compliant",
    features: ["Particle & Gas Removal", "Venturi Scrubbing", "FRP/SS Construction", "Acid Fume Safe"],
    image: "https://axarenterprise.com/WObg/wetScrubber.png",
    slug: "pollution-control",
  },
  {
    id: "reactors",
    name: "Reactors",
    type: "Vessels & Reactors",
    capacity: "100 L–50,000 L",
    efficiency: "GMP SS316L",
    features: ["ASME Certified", "SS304/SS316L Build", "Jacketed Design", "CIP/SIP Compatible"],
    image: "https://axarenterprise.com/WObg/reactor.png",
    slug: "evaporators",
  },
  {
    id: "heat-exchangers",
    name: "Heat Exchangers",
    type: "Vessels & Reactors",
    capacity: "Custom Capacity",
    efficiency: "High Thermal Rate",
    features: ["Shell & Tube Design", "Plate Heat Exchange", "Corrosion Resistant", "TEMA Standards"],
    image: "https://axarenterprise.com/WObg/heatExchanger.png",
    slug: "evaporators",
  },
  {
    id: "pressure-vessels",
    name: "Pressure Vessels",
    type: "Vessels & Reactors",
    capacity: "Custom Design",
    efficiency: "IBR Certified",
    features: ["High-Pressure Storage", "ASME/IBR Certified", "Non-Destructive Testing", "Jacketed Options"],
    image: "https://axarenterprise.com/WObg/pressureVessel.png",
    slug: "evaporators",
  },
  {
    id: "sand-mill",
    name: "Sand Mill",
    type: "Material Handling",
    capacity: "5–500 L/hr",
    efficiency: "Nano Grinding",
    features: ["Wet Grinding & Dispersion", "High Bead Energy", "Jacketed Cooling", "Pharmaceutical Grade"],
    image: "https://axarenterprise.com/WObg/sandMill.png",
    slug: "spray-dryers",
  },
  {
    id: "screw-conveyor",
    name: "Screw Conveyor",
    type: "Material Handling",
    capacity: "Up to 200 t/hr",
    efficiency: "Dust-Free",
    features: ["Dust-Free Transport", "Horizontal / Inclined", "SS / MS Construction", "Variable Speed Drive"],
    image: "https://axarenterprise.com/WObg/screwConveyor.png",
    slug: "spray-dryers",
  },
  {
    id: "ribbon-blender",
    name: "Ribbon Blender",
    type: "Material Handling",
    capacity: "50–10,000 L",
    efficiency: "Uniform Mixing",
    features: ["Dry Powder Blending", "Inner / Outer Ribbon", "Discharge Valve", "Easy to Clean"],
    image: "https://axarenterprise.com/WObg/ribbonBlender.png",
    slug: "spray-dryers",
  },
  {
    id: "strainer",
    name: "Strainer",
    type: "Filtration & Pollution",
    capacity: "Custom Flow Rate",
    efficiency: "Industrial Grade",
    features: ["Y-Type / Basket Type", "SS / Carbon Steel", "High Mesh Options", "Blow-Down Valve"],
    image: "https://axarenterprise.com/WObg/strainer.png",
    slug: "pollution-control",
  },
  {
    id: "expansion-bellows",
    name: "Expansion Bellows",
    type: "Air & Thermal",
    capacity: "Custom Sizing",
    efficiency: "Vibration Proof",
    features: ["Metallic & Silicon Bellows", "Thermal Expansion Absorption", "Multi-Ply Design", "High-Temp Resistant"],
    image: "https://axarenterprise.com/WObg/expansionBellow.png",
    slug: "hot-air-generators",
  },
];

const ProductComparison = () => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = activeCategory === "All"
    ? products
    : products.filter(p => p.type === activeCategory);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
      {/* Header */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-16 items-end">
        <div>
          <span className="t-label" style={{ marginBottom: '1rem' }}>Hardware Catalog [SYS-MATRIX]</span>
          <h2 className="t-section" style={{ marginTop: '0.5rem' }}>
            ENGINEERED <br />
            <span style={{ color: '#0284c7' }}>CORE</span> SYSTEMS.
          </h2>
        </div>
        <div style={{ paddingBottom: '0.5rem' }}>
          <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.7, fontWeight: 500 }}>
            High-performance industrial machinery engineered for efficiency, reliability, and total process control — sourced directly from AXAR Enterprise.
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="btn"
            style={{
              padding: '0.5rem 1.25rem',
              background: activeCategory === cat ? '#0284c7' : 'transparent',
              color: activeCategory === cat ? '#fff' : '#64748b',
              border: activeCategory === cat ? '1px solid #0284c7' : '1px solid rgba(0,0,0,0.1)',
              boxShadow: activeCategory === cat ? '0 8px 24px rgba(2,132,199,0.2)' : 'none',
              fontSize: 12,
              fontWeight: 800,
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filtered.map((p, i) => {
            const isExpanded = expanded === p.id;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="panel"
                style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
              >
                {/* Real Product Image */}
                <div style={{ position: 'relative', height: 200, overflow: 'hidden', background: '#f1f5f9', borderRadius: '0.75rem 0.75rem 0 0' }}>
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    style={{ objectFit: 'contain', padding: '1rem' }}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    background: 'linear-gradient(to top, rgba(15,23,42,0.7), transparent)',
                    padding: '1rem 1rem 0.75rem',
                  }}>
                    <span className="t-label" style={{ fontSize: 8, color: 'rgba(255,255,255,0.75)' }}>{p.type}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <h3 className="t-card" style={{ fontSize: '0.9rem', lineHeight: 1.3 }}>{p.name}</h3>

                  {/* Specs */}
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <div style={{ flex: 1, padding: '0.6rem', background: '#f8fafc', borderRadius: '0.5rem', border: '1px solid rgba(0,0,0,0.06)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.25rem' }}>
                        <Layers style={{ width: 10, height: 10, color: '#0284c7' }} />
                        <span style={{ fontSize: 8, fontWeight: 900, textTransform: 'uppercase', color: '#64748b' }}>Capacity</span>
                      </div>
                      <div style={{ fontSize: 10, fontWeight: 800, color: '#0f172a' }}>{p.capacity}</div>
                    </div>
                    <div style={{ flex: 1, padding: '0.6rem', background: '#f8fafc', borderRadius: '0.5rem', border: '1px solid rgba(0,0,0,0.06)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.25rem' }}>
                        <Gauge style={{ width: 10, height: 10, color: '#16a34a' }} />
                        <span style={{ fontSize: 8, fontWeight: 900, textTransform: 'uppercase', color: '#64748b' }}>Grade</span>
                      </div>
                      <div style={{ fontSize: 10, fontWeight: 800, color: '#0f172a' }}>{p.efficiency}</div>
                    </div>
                  </div>

                  {/* Expandable Features */}
                  <button
                    onClick={() => setExpanded(isExpanded ? null : p.id)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.4rem',
                      background: 'none', border: 'none', cursor: 'pointer',
                      fontSize: 10, fontWeight: 900, color: '#0284c7', padding: 0,
                      textTransform: 'uppercase', letterSpacing: '0.1em',
                    }}
                  >
                    {isExpanded ? <ChevronUp style={{ width: 12, height: 12 }} /> : <ChevronDown style={{ width: 12, height: 12 }} />}
                    {isExpanded ? 'Hide' : 'Show'} Features
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          {p.features.map(f => (
                            <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <div style={{ width: 14, height: 14, borderRadius: '50%', background: 'rgba(2,132,199,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <Check style={{ width: 8, height: 8, color: '#0284c7' }} />
                              </div>
                              <span style={{ fontSize: 11, fontWeight: 600, color: '#334155' }}>{f}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Action Buttons */}
                  <div style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem' }}>
                    <button
                      className="btn btn-blue"
                      style={{ flex: 1, fontSize: 11, padding: '0.65rem' }}
                      onClick={() => { window.location.href = `/products/${p.id}`; }}
                    >
                      Technical Data
                    </button>
                    <button
                      className="btn btn-ghost"
                      style={{ padding: '0.65rem 0.75rem' }}
                      onClick={() => {
                        const el = document.getElementById('rfq');
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth' });
                        } else {
                          router.push('/rfq');
                        }
                      }}
                    >
                      <Info style={{ width: 14, height: 14 }} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ProductComparison;
