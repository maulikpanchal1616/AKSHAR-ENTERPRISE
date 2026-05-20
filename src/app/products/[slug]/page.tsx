"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, ArrowRight, MessageCircle, ChevronLeft, ShieldCheck, Cpu, Settings, Activity } from 'lucide-react';
import Image from 'next/image';
import Footer from '@/components/layout/Footer';

const productData = {
  "spray-dryer": {
    name: "Spray Dryer",
    category: "DRYING SYSTEMS",
    image: "https://axarenterprise.com/WObg/sprayDryer.png",
    description: "Our Spray Dryers provide a highly efficient, rapid transformation of liquid feed into premium quality dry powder. Ideal for heat-sensitive materials in food, dairy, chemical, and pharmaceutical industries, this turnkey system ensures consistent particle size distribution and preserves product integrity.",
    features: [
      "Rotary disc and nozzle atomization options",
      "Co-current air flow loop for heat-sensitive materials",
      "Integrated PLC-SCADA process control loop",
      "Clean-In-Place (CIP) ready automated systems",
      "Thermal energy recovery option for optimized utility consumption",
      "GMP sanitization compliant construction"
    ],
    specs: {
      "Capacity Range": "50 to 2000 kg/hr",
      "Atomization Mode": "Centrifugal Rotary / Pressure Nozzle",
      "Material of Construction": "SS316L / SS304 / SS310",
      "Heating Media": "Steam / Gas / Thermic Fluid / Electricity",
      "Control System": "PLC-based Automatic Loop",
      "Efficiency Rate": "Up to 88% Thermal Economy"
    }
  },
  "spin-flash-dryer": {
    name: "Spin Flash Dryer",
    category: "DRYING SYSTEMS",
    image: "https://axarenterprise.com/WObg/spinFlashDryer.png",
    description: "Designed for continuous drying of high-moisture filter cakes, viscous pastes, and highly cohesive materials. By combining high-shear mechanical disintegration with rapid pneumatic transport drying, the Spin Flash Dryer processes tough sludge and pastes into uniform fine powders in a single compact operation.",
    features: [
      "Viscous paste and cohesive cake drying capabilities",
      "High-shear mechanical disintegrator with variable speed drive",
      "Pulse-jet bag filter integration for high product recovery",
      "Extremely compact footprint with vertical orientation",
      "Continuous automated system with instant response time"
    ],
    specs: {
      "Capacity Range": "20 to 1000 kg/hr",
      "Feed Material": "Filter cakes, viscous pastes, wet sludges",
      "Disintegrator Speed": "Variable VFD controlled",
      "Collection System": "Pulse-Jet Bag Filter / Cyclone Separator",
      "Drying Chamber": "Wear-resistant SS316 with hard surfacing",
      "Thermal Source": "Indirect / Direct Hot Air Generator"
    }
  },
  "flash-dryer": {
    name: "Flash Dryer",
    category: "DRYING SYSTEMS",
    image: "https://axarenterprise.com/WObg/flashDryer.png",
    description: "Our Flash Dryers provide an extremely rapid drying solution, often completing the process in a matter of seconds. They are ideal for drying free-flowing, non-cohesive wet materials that can be pneumatically conveyed. The short contact time with heat ensures that the product quality remains uncompromised.",
    features: [
      "Instantaneous drying cycle",
      "Low residence time (seconds)",
      "Simple & reliable operation",
      "Low maintenance",
      "High evaporative capacity",
      "Pneumatic transport integration"
    ],
    specs: {
      "Capacity Range": "100 to 3000 kg/hr",
      "Drying Time": "1 to 5 seconds",
      "Material Handled": "Free-flowing crystals, powders, starches",
      "Conveying Mode": "Pneumatic Blow loop",
      "Thermal Source": "Indirect Fired Hot Air Generator",
      "Air Volumetric Flow": "Custom engineered to material density"
    }
  },
  "vibratory-fluidized-bed": {
    name: "Vibratory Fluidized Bed Dryer",
    category: "DRYING SYSTEMS",
    image: "https://axarenterprise.com/WObg/vibratory.png",
    description: "Ideal for uniform and gentle drying and cooling of granules, crystals, and fragile heat-sensitive products. By utilizing controlled vibration along with hot fluidizing air, this system fluidizes heavy or sticky materials with minimal particle attrition and excellent thermal efficiency.",
    features: [
      "Uniform drying and cooling in a single deck system",
      "Vibrating deck structure to handle wide particle size distribution",
      "Minimized particle attrition / structural damage to fragile products",
      "Multiple temperature zone controls for precise drying profiles",
      "Hygienic CIP-ready design for food and pharma processes"
    ],
    specs: {
      "Capacity Range": "50 to 5000 kg/hr",
      "Fluidization Mode": "Vibrational motor excitation",
      "Deck Material": "Laser-perforated SS316L plate",
      "Safety Systems": "Integrated explosion venting ports",
      "Air Distribution": "Multi-zone modular plenum chamber",
      "Utility Requirement": "Low pressure process air & steam loop"
    }
  },
  "hot-air-generator": {
    name: "Hot Air Generator",
    category: "AIR & THERMAL",
    image: "https://axarenterprise.com/WObg/hotAirGen.png",
    description: "High-performance clean hot air generators designed to supply thermal energy to drying systems, spray dryers, and other industrial processes. Available in direct-fired and high-temperature indirect-fired designs, these systems utilize multiple fuel options with maximum thermal efficiency.",
    features: [
      "Direct and indirect fired heat exchange loops",
      "Multi-fuel combustion technology (Gas, Oil, Biomass, Coal)",
      "Heavy-duty refractory lining with ceramic fiber insulation",
      "Comprehensive burner safety management system (BMS)",
      "Extremely clean hot air output up to 600°C"
    ],
    specs: {
      "Thermal Load": "100k to 5,000,000 kcal/hr",
      "Hot Air Temperature": "Up to 600°C continuous",
      "Combustion Efficiency": "Direct Fired (>95%), Indirect (>80%)",
      "MOC of Heat Exchanger": "SS310 / SS316 / SS321 high alloy",
      "Control Interlock": "Automatic temperature control loop",
      "Insulation Thickness": "150mm ceramic fiber wool packing"
    }
  },
  "industrial-blowers": {
    name: "Industrial Blowers",
    category: "AIR & THERMAL",
    image: "https://axarenterprise.com/WObg/industrialBlower.png",
    description: "Heavy-duty centrifugal and axial process air blowers engineered for pneumatic conveying, combustion, ventilation, and exhaust gas handling. With custom-engineered impeller dynamics, our blowers provide consistent static pressure and flow rates with minimal noise and vibration.",
    features: [
      "Heavy-duty centrifugal design with dynamic balancing",
      "Aerodynamically optimized impeller blades (backward/radial)",
      "Anti-corrosive and high-temperature material selections",
      "Vibration-isolated base frames and drive configurations",
      "Highly energy-efficient motors with VFD compatibility"
    ],
    specs: {
      "Air Flow Capacity": "Up to 50,000 m³/hr",
      "Static Pressure Range": "Up to 1500 mm WC",
      "Impeller Material": "SS316 / SS304 / Hardox / FRP lined",
      "Drive Mechanism": "Direct coupled / V-Belt driven",
      "Design Standard": "AMCA standard compliance",
      "Operating Temperature": "Up to 450°C continuous flue gas"
    }
  },
  "bag-filter": {
    name: "Bag Filter",
    category: "FILTRATION & POLLUTION",
    image: "https://axarenterprise.com/WObg/bagfilter.png",
    description: "Advanced pulse-jet industrial bag house and dust collectors designed to capture fine particulates from flue gases and spray dryer exhaust. With low pressure drop and automatic cleaning sequences, our bag filters guarantee emissions below regulatory standards.",
    features: [
      "High-efficiency automatic pulse-jet purging mechanism",
      "PTFE-membrane laminated premium quality filter media",
      "Explosion-proof construction with rupture discs for organic dusts",
      "Easy top or side bag removal access ports",
      "Continuous pressure drop monitoring with differential transmitters"
    ],
    specs: {
      "Volumetric Capacity": "Up to 100,000 m³/hr",
      "Filtration Efficiency": "99.9% (Emissions < 10 mg/Nm³)",
      "Bag Dimensions": "Ø150mm x 3000mm length (customizable)",
      "Cage Construction": "SS304 / MS Galvanized heavy-duty cage",
      "Purging Control": "Sequential digital microprocessor timer",
      "Operating Temperature": "Up to 260°C continuous duty"
    }
  },
  "wet-scrubber": {
    name: "Wet Scrubber System",
    category: "FILTRATION & POLLUTION",
    image: "https://axarenterprise.com/WObg/wetScrubber.png",
    description: "Highly efficient wet scrubbing and absorption towers engineered to neutralize acidic fumes, hazardous gases, and sticky particulate matter from process exhaust. Ideal for chemical plants, fertilizers, and dryers processing corrosive or hazardous compounds.",
    features: [
      "Venturi and packed tower multi-stage designs",
      "Corrosion-proof PP/FRP/SS316 composite structural builds",
      "High-efficiency polypropylene mist eliminator loops",
      "Integrated chemical dosing and pH automation loops",
      "Zero particulate and gas carryover performance"
    ],
    specs: {
      "Scrubbing Capacity": "Up to 50,000 m³/hr",
      "Scrubber Types": "Venturi / Packed Bed / Spray Tower",
      "Structural Material": "PP / FRP / SS316L high alloy",
      "Neutralizing Efficiency": "Acid gas removal up to 99.5%",
      "Packing Media Type": "PP Tellerettes / Pall Rings / Saddles",
      "Circulation Pump MOC": "PP / PVDF chemical-resistant pump"
    }
  },
  "reactors": {
    name: "Reactors",
    category: "VESSELS & REACTORS",
    image: "https://axarenterprise.com/WObg/reactor.png",
    description: "GMP-compliant process reactors and agitated vessels custom-engineered for synthesis, blending, and crystallization in chemical and pharmaceutical plants. Available in jacketed, half-pipe limpet, and vacuum designs, conforming to ASME Section VIII codes.",
    features: [
      "ASME Section VIII Div 1 design and code stamps",
      "Sanitary SS316L construction with internal electro-polishing",
      "Jacketed and utility half-pipe limpet coils",
      "Custom-engineered agitation systems (Anchor, Turbine, Hydrofoil)",
      "Hygienic mechanical seals with cooling thermosyphon loops"
    ],
    specs: {
      "Vessel Volume": "100 Liters to 50,000 Liters",
      "Design Pressure": "Full vacuum up to 12 bar",
      "Design Temperature": "-20°C to 300°C",
      "Agitator Seal": "Single / Double Mechanical Seal",
      "Agitation Motor": "ATEX explosion-proof standard",
      "CIP Integration": "Dual rotating spray ball arrangement"
    }
  },
  "heat-exchangers": {
    name: "Heat Exchangers",
    category: "VESSELS & REACTORS",
    image: "https://axarenterprise.com/WObg/heatExchanger.png",
    description: "Industrial shell and tube heat exchangers, coolers, and condensers engineered for reliable heat transfer in harsh chemical and processing environments. Optimized thermal design using advanced software ensures maximum heat recovery with minimal pressure drops.",
    features: [
      "Shell & tube and plate type thermal exchangers",
      "Strict compliance with ASME Section VIII and TEMA standards",
      "Corrosion-resistant material options (SS316, Hastelloy, Titanium)",
      "High thermal transfer coefficients with optimized tube patterns",
      "Robust double tube sheet designs to prevent process cross-mixing"
    ],
    specs: {
      "Thermal Duty": "Custom thermal rating based on process parameters",
      "Design Standard": "ASME Section VIII Div 1 / TEMA Class C, B, R",
      "Material Selection": "SS316L / SS304 / Hastelloy C-276 / Duplex",
      "Tube Configuration": "Straight Tube / U-Tube bundle type",
      "Testing Methods": "Hydrostatic, Pneumatic, Helium leak test",
      "Surface Finish": "Acid pickled / Mirror polished option"
    }
  },
  "pressure-vessels": {
    name: "Pressure Vessels",
    category: "VESSELS & REACTORS",
    image: "https://axarenterprise.com/WObg/pressureVessel.png",
    description: "Certified industrial pressure vessels and receivers for high-pressure storage of process gases, chemicals, and steam. Each vessel is designed and manufactured under strict ISO and ASME standard inspection protocols with detailed NDT validation.",
    features: [
      "High-pressure containment up to 50 bar",
      "ASME and IBR (Indian Boiler Regulation) certified engineering",
      "100% Non-Destructive Testing (NDT) including radiography",
      "Jacketed, insulated, or internally lined construction options",
      "Custom support designs (Saddle, Leg, Skirt mountings)"
    ],
    specs: {
      "Storage Volume": "Custom engineered to process volume",
      "Design Pressure": "Up to 50 bar working pressure",
      "Applicable Code": "ASME Sec VIII / IBR / IS2825",
      "NDT Quality Check": "100% Radiography, DP test, Ultrasonic",
      "Material of Construction": "SA516 Gr 70 / SS316L / SS304",
      "External Finish": "Epoxy polyurethane high-durability coat"
    }
  },
  "sand-mill": {
    name: "Sand Mill",
    category: "MATERIAL HANDLING",
    image: "https://axarenterprise.com/WObg/sandMill.png",
    description: "Highly efficient wet grinding and dispersing mills designed for processing sub-micron particles of paints, inks, pigments, cosmetics, and agrochemicals. The double-jacketed grinding chamber ensures optimal temperature regulation during intensive shear operations.",
    features: [
      "Sub-micron wet grinding and homogeneous dispersion",
      "Double-jacketed cooling chamber to prevent heat damage",
      "High-grade wear-resistant polyurethane or ceramic internals",
      "Variable frequency drive (VFD) for adjustable shaft velocity",
      "Dynamic bead separation system with zero media lockup"
    ],
    specs: {
      "Chamber Volume": "5 L to 500 L working capacity",
      "Grinding Media": "Yttrium stabilized Zirconia beads (0.1 - 2mm)",
      "Main Motor Power": "Custom geared up to 75 kW",
      "Internal Liners": "High Alumina Ceramic / Polyurethane / SS316",
      "Grinding Performance": "Sub-micron down to 200 nanometers",
      "Seal Mechanism": "Chilled water flushed double mechanical seal"
    }
  },
  "screw-conveyor": {
    name: "Screw Conveyor",
    category: "MATERIAL HANDLING",
    image: "https://axarenterprise.com/WObg/screwConveyor.png",
    description: "Hygienic dust-free screw conveyors and feeders designed to convey bulk powders, dry solids, and moist filter cakes horizontally or at steep inclines. Featuring heavy-duty helical flights and easy-to-clean split casing troughs.",
    features: [
      "100% dust-free powder transport and metering",
      "Helical, segmented, or variable pitch screw flight options",
      "Split trough casing with quick-release toggle clamps",
      "Self-lubricating bronze or food-grade polymer hanger bearings",
      "Direct coupled gearmotor with VFD rate controller"
    ],
    specs: {
      "Throughput Capacity": "Up to 200 Tons per hour",
      "Screw Flight Diameter": "100mm to 600mm",
      "Conveying Length": "Up to 30 meters single span",
      "MOC of Trough": "SS316L / SS304 / Carbon steel",
      "Flight Thickness": "3mm to 10mm heavy-duty profile",
      "Incline Slope": "Horizontal up to 60 degrees steep angle"
    }
  },
  "ribbon-blender": {
    name: "Ribbon Blender",
    category: "MATERIAL HANDLING",
    image: "https://axarenterprise.com/WObg/ribbonBlender.png",
    description: "High-efficiency double helical ribbon blenders designed for homogeneous mixing of dry powders, granular materials, and viscous pastes. The optimized ribbon orientation provides highly convective, rapid blending with low shear and heat generation.",
    features: [
      "Convective double helical ribbon agitator design",
      "Pneumatically actuated bottom plug discharge valve",
      "Hygienic shaft seals with automatic air purging loops",
      "Integrated liquid spray manifold for uniform atomization",
      "Hinged top cover with safety interlock limit switches"
    ],
    specs: {
      "Working Capacity": "50 Liters to 10,000 Liters",
      "Convective Mix Time": "5 to 15 minutes batch cycle",
      "Drive Motor Configuration": "Heavy-duty helical gearbox with VFD",
      "Internal Surface Finish": "Up to 240 grit mirror sanitary polish",
      "External Jacket Option": "Steam heating / Water cooling jacket loop",
      "Standard Compliance": "FDA / cGMP food-grade certified seals"
    }
  },
  "strainer": {
    name: "Strainer",
    category: "FILTRATION & POLLUTION",
    image: "https://axarenterprise.com/WObg/strainer.png",
    description: "Industrial fluid filtration strainers engineered to capture particulate contamination and protect downstream centrifugal pumps, flow meters, spray nozzles, and control valves. Available in quick-clean Y-type and large capacity basket configurations.",
    features: [
      "Y-type and basket strainer structural options",
      "Quick-release swing bolt covers for instant element cleanout",
      "High area ratio design for minimal line pressure drop",
      "Dual chamber duplex strainers for continuous 24/7 service",
      "Integrated blow-down valves for online purging of solids"
    ],
    specs: {
      "Nominal Line Size": "1 inch to 12 inches ANSI flanged",
      "Filtration Screen Rating": "From 5 microns up to 6mm perforations",
      "Design Working Pressure": "Up to 25 bar",
      "Structural Material MOC": "SS316 / SS304 / Cast Carbon Steel / WCB",
      "Element Mesh Material": "SS316L woven wire cloth / Perforated plate",
      "Gasket Selection": "Viton / Teflon (PTFE) / EPDM high chemical grade"
    }
  },
  "expansion-bellows": {
    name: "Expansion Bellows",
    category: "AIR & THERMAL",
    image: "https://axarenterprise.com/WObg/expansionBellow.png",
    description: "Engineered metallic, fabric, and silicon expansion joints designed to safely absorb axial, lateral, and angular thermal expansion, piping misalignments, and mechanical vibrations in duct lines, reactors, and thermal piping headers.",
    features: [
      "Multi-ply stainless steel bellows with custom convolutions",
      "High elastic recovery silicon and elastomer configurations",
      "Extremely high temperature resistance up to 800°C",
      "Integrated internal guide sleeves to prevent turbulent wear",
      "Engineered tie-rod arrangements to limit design movements"
    ],
    specs: {
      "Joint Nominal Diameter": "50mm up to 2000mm circular ducting",
      "Bellows Construction MOC": "SS321 / SS316L / Inconel 625 / Silicon",
      "Design Temp Range": "-50°C up to 800°C flue gas duty",
      "Pressure Containment": "Full vacuum up to 16 bar",
      "Mechanical Standard": "EJMA (Expansion Joint Manufacturers Assoc)",
      "Movement Types": "Axial compression, Lateral shear, Angular tilt"
    }
  }
};

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const product = productData[slug as keyof typeof productData];

  if (!product) {
    return (
      <div style={{ background: '#f8fafc', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', marginBottom: '1rem' }}>PRODUCT NOT FOUND</h1>
        <p style={{ color: '#64748b', marginBottom: '2rem' }}>The product model you are trying to query does not exist in our systems.</p>
        <button onClick={() => router.push('/products')} className="btn btn-blue">
          Return to Catalog
        </button>
      </div>
    );
  }

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingTop: '7rem' }}>
      
      {/* Dynamic Header */}
      <div className="container" style={{ marginBottom: '3rem' }}>
        <Link 
          href="/products"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: 12, fontWeight: 800, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1.5rem' }}
        >
          <ChevronLeft style={{ width: 16, height: 16 }} />
          Back to Systems Catalog
        </Link>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: '#0284c7', fontSize: 9, fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase' }}>
          <span>HOME</span>
          <span>/</span>
          <span>PRODUCTS</span>
          <span>/</span>
          <span style={{ color: '#64748b' }}>{product.name}</span>
        </div>
      </div>

      <section style={{ paddingBottom: '6rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'start' }}>
            
            {/* Left: Product Image on Industrial Blueprint Grid Background */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div 
                className="panel" 
                style={{ 
                  aspectRatio: '4/3', 
                  background: '#ffffff',
                  backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  padding: '2.5rem',
                  boxShadow: 'inset 0 0 40px rgba(0,0,0,0.02)'
                }}
              >
                <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    fill 
                    style={{ objectFit: 'contain' }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>

              {/* Category Indicator & Quick Actions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'inline-flex', alignSelf: 'flex-start', padding: '0.5rem 1.25rem', background: '#fffbeb', border: '1px solid #fef3c7', borderRadius: '0.50rem' }}>
                  <span style={{ fontSize: 10, fontWeight: 900, color: '#d97706', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                    {product.category}
                  </span>
                </div>

                <button 
                  onClick={() => {
                    router.push(`/rfq?product=${slug}`);
                  }} 
                  className="btn btn-blue animate-pulse" 
                  style={{ width: '100%', padding: '1.1rem', fontSize: '0.75rem', justifyContent: 'center' }}
                >
                  <span>Request Proposal</span>
                  <ArrowRight style={{ width: 16, height: 16 }} />
                </button>

                <a 
                  href={`https://wa.me/919033958453?text=Hi,%20I'm%20interested%20in%20the%20AXAR%20Enterprise%20${encodeURIComponent(product.name)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn"
                  style={{ 
                    width: '100%', 
                    padding: '1.1rem', 
                    fontSize: '0.75rem',
                    justifyContent: 'center', 
                    background: '#e8f5e9', 
                    color: '#2e7d32', 
                    border: '1px solid #c8e6c9' 
                  }}
                >
                  <MessageCircle style={{ width: 18, height: 18 }} />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right: Technical Specs & Information */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              <div>
                <span className="t-label" style={{ marginBottom: '0.75rem' }}>TECHNICAL SPECIFICATIONS</span>
                <h1 className="t-section" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', lineHeight: 1.1, color: '#0f172a' }}>{product.name}</h1>
              </div>

              {/* Description Section */}
              <div className="panel" style={{ padding: '2rem' }}>
                <h3 className="t-card" style={{ fontSize: '0.75rem', color: '#64748b', letterSpacing: '0.15em', marginBottom: '1rem', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '0.75rem' }}>
                  SYSTEM DESCRIPTION
                </h3>
                <p style={{ fontSize: 15, color: '#334155', lineHeight: 1.8, fontWeight: 500 }}>
                  {product.description}
                </p>
              </div>

              {/* Key Features List */}
              <div className="panel" style={{ padding: '2rem' }}>
                <h3 className="t-card" style={{ fontSize: '0.75rem', color: '#64748b', letterSpacing: '0.15em', marginBottom: '1.5rem', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '0.75rem' }}>
                  KEY FEATURES
                </h3>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {product.features.map((feature, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                      <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '0.1rem' }}>
                        <Check style={{ width: 12, height: 12, color: '#0284c7' }} />
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#334155', lineHeight: 1.5 }}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Specifications Table */}
              <div className="panel" style={{ padding: '2rem' }}>
                <h3 className="t-card" style={{ fontSize: '0.75rem', color: '#64748b', letterSpacing: '0.15em', marginBottom: '1.5rem', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '0.75rem' }}>
                  TECHNICAL DATA MATRIX
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid rgba(0,0,0,0.06)', borderRadius: '0.75rem', overflow: 'hidden' }}>
                  {Object.entries(product.specs).map(([key, val], idx) => (
                    <div 
                      key={key} 
                      style={{ 
                        display: 'grid', 
                        gridTemplateColumns: '1fr 1fr', 
                        padding: '1rem 1.25rem', 
                        fontSize: 13, 
                        fontWeight: 600,
                        background: idx % 2 === 0 ? '#f8fafc' : '#ffffff',
                        borderBottom: idx === Object.entries(product.specs).length - 1 ? 'none' : '1px solid rgba(0,0,0,0.04)'
                      }}
                    >
                      <span style={{ color: '#64748b' }}>{key}</span>
                      <span style={{ color: '#0f172a', fontWeight: 700 }}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Trust & Quality Banner */}
      <section style={{ background: '#f1f5f9', borderTop: '1px solid rgba(0,0,0,0.05)', borderBottom: '1px solid rgba(0,0,0,0.05)', padding: '5rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
            {[
              { title: "ASME / IBR CERTIFIED", desc: "All fabrication conforms strictly to ASME Sec VIII and Indian Boiler Regulations codes.", icon: ShieldCheck },
              { title: "PLC LOOP CONTROL", desc: "Turnkey electrical packages with fully integrated automation and SCADA data log systems.", icon: Settings },
              { title: "THERMAL RECOVERY", desc: "High-efficiency designs optimized for maximal waste heat recycle and low fuel load.", icon: Activity }
            ].map((box, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: 44, height: 44, borderRadius: '0.65rem', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <box.icon style={{ width: 22, height: 22, color: '#0284c7' }} />
                </div>
                <div>
                  <h4 style={{ fontSize: 12, fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>{box.title}</h4>
                  <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6, fontWeight: 500 }}>{box.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

    </div>
  );
}
