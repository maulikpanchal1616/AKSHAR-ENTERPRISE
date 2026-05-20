"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, User, Cpu, ShieldCheck, Zap, Terminal, MessageSquare, Phone, MapPin } from 'lucide-react';

type Message = { id: number; role: 'user' | 'assistant'; content: string; ts: string };

const INITIAL: Message = {
  id: 1, role: 'assistant', ts: '14:20:01',
  content: 'AX-1 Architect online. Loaded database for **AXAR Enterprise** engineering products, Vatva manufacturing facility, ASME/IBR compliance codes, and R&D testing trials.\n\nHow can I consult you on your process specifications today?',
};

const getResponse = (input: string): string => {
  const query = input.toLowerCase().trim();

  const rules = [
    {
      keys: ['hello', 'hi', 'hey', 'greetings', 'who are you', 'help', 'menu', 'start', 'online'],
      response: `Hi! I am the **AX-1 Process Architect**, an AI consultant specialized in AXAR Enterprise's high-performance thermal engineering and drying portfolios. I can consult you on:\n- **Drying Systems** (Spray, Spin Flash, Vibratory Fluid Bed, etc.)\n- **Air & Thermal** (Hot Air Generators, Blowers, Bellows)\n- **Filtration & Pollution** (Bag Filters, Wet Scrubbers, Strainers)\n- **Vessels & Reactors** (ASME certified reactors, Heat Exchangers, Pressure Vessels)\n- **Material Handling** (Sand Mills, Screw Conveyors, Ribbon Blenders)\n- **Company Credentials** (Vatva facility, ISO certifications, trial lab, engineering team)\n\nWhat system specification can I calculate or provide for you today?`
    },
    {
      keys: ['spray dryer', 'spray drying', 'centrifugal atomizer', 'nozzle atomizer', 'spray'],
      response: `AXAR's **Spray Dryers** are industry-leading systems designed to rapidly transform liquid slurries into premium powders. Features include:\n- **Capacity:** Standard models from **50 to 2000 kg/hr** evaporation rate.\n- **Atomization:** Centrifugal rotary disc or high-pressure nozzle options.\n- **Design:** Conforms strictly to **cGMP/FDA** standards with fully automated **PLC-SCADA** monitoring.\n- **Applications:** Dairy powder, APIs, food ingredients, and polymers.`
    },
    {
      keys: ['spin flash dryer', 'spin flash', 'filter cake', 'viscous paste', 'cohesive cake', 'paste drying', 'viscous'],
      response: `Our **Spin Flash Dryers** are continuous, vertical systems engineered for sticky, heavy materials:\n- **Process:** Combines a high-shear mechanical rotor to disintegrate cohesive filter cakes with instant hot air flash drying.\n- **Capacity:** Dynamic designs spanning **20 to 1000 kg/hr** feed rates.\n- **Advantages:** Handles pasty sludge in a highly compact vertical footprint, avoiding the need for pre-drying.`
    },
    {
      keys: ['flash dryer', 'pneumatic drying', 'instant drying', 'pneumatic dryer'],
      response: `AXAR's continuous **Flash Dryers** provide instantaneous drying within 1 to 5 seconds:\n- **Operation:** Suspends wet, free-flowing granular materials in a high-velocity heated air stream.\n- **Capacity:** Built up to **3000 kg/hr** output capacity.\n- **Ideal For:** Free-flowing crystals, powders, industrial starches, and chemical solids with minimal product degradation.`
    },
    {
      keys: ['vibratory fluidized bed', 'vibratory bed', 'vfbd', 'fluidized bed', 'fluid bed'],
      response: `The **Vibratory Fluidized Bed Dryer (VFBD)** is built for uniform, gentle processing:\n- **Action:** Utilizes a laser-perforated SS316L vibrating deck to fluidize granules and crystals with lower air velocity.\n- **Capacity:** Scalable from **50 to 5000 kg/hr** process flows.\n- **Controls:** Multi-zone temperature loops with integrated structural vibration motors for safe, low-attrition drying.`
    },
    {
      keys: ['hot air generator', 'hag', 'combustion chamber', 'burner', 'hot air'],
      response: `Our high-temp **Hot Air Generators (HAG)** deliver clean process heat to dryers:\n- **Thermal Load:** Ranging from **100k to 5,000,000 kcal/hr**.\n- **Fuels:** Adaptable burner systems for Natural Gas, LPG, Diesel, Biomass, or Coal.\n- **Output:** Indirect and direct configurations producing clean process air up to **600°C** with robust ceramic fiber insulation.`
    },
    {
      keys: ['industrial blower', 'blower', 'fans', 'centrifugal blower', 'radial blower', 'fan'],
      response: `AXAR's heavy-duty **Industrial Blowers** handle process gases and pneumatic conveying loops:\n- **Volumetric Flow:** Capacities up to **50,000 m³/hr** and high static pressure up to **1500 mm WC**.\n- **Standards:** Dynamic balancing compliant with **AMCA** standards.\n- **MOC:** Carbon steel, SS304, SS316L, or corrosive-proof FRP liners.`
    },
    {
      keys: ['bag filter', 'baghouse', 'dust collector', 'pulse jet', 'filtration'],
      response: `Our high-performance **Bag Filters** are engineered for process dust collection:\n- **Efficiency:** **99.9% particulate collection** (residual dust emissions guaranteed under **10 mg/Nm³**).\n- **Design:** Microprocessor-controlled automatic pulse-jet nitrogen/air purging.\n- **Safety:** Explosion relief rupture panels for handling flammable or organic powders.`
    },
    {
      keys: ['wet scrubber', 'scrubber', 'packed bed', 'absorption tower', 'venturi'],
      response: `The AXAR **Wet Scrubber System** offers complete chemical exhaust gas neutralization:\n- **Configurations:** High-energy Venturi scrubbers and structured packed bed absorption towers.\n- **Efficiency:** Up to **99.5% acid gas absorption** (HCl, Cl2, SOx, NOx).\n- **MOC:** Constructed in highly durable chemical-resistant **FRP / PP / SS316** configurations.`
    },
    {
      keys: ['reactor', 'agitated vessel', 'limpet reactor', 'jacketed reactor', 'vessels'],
      response: `Our pharmaceutical and chemical **Reactors** conform strictly to standard sanitization codes:\n- **Volume:** Manufactured from **100 L to 50,000 L** capacities.\n- **Code Compliance:** Full **ASME Section VIII Div 1** calculations and certifications.\n- **Jacket:** Spiral limpet coils or dimpled utility jackets in SS304/SS316L with double mechanical seals.`
    },
    {
      keys: ['heat exchanger', 'condenser', 'shell and tube', 'cooler', 'thermal transfer'],
      response: `AXAR's high-efficiency **Heat Exchangers** are engineered to strict industrial standards:\n- **Designs:** Shell & tube or compact plate configurations engineered using advanced thermal design software.\n- **Standards:** Conformance with **ASME** and **TEMA (Class C, B, R)** specifications.\n- **Testing:** Hydrostatic, pneumatic, and helium vacuum leak checked for total safety.`
    },
    {
      keys: ['pressure vessel', 'receiver tank', 'air receiver', 'storage tank'],
      response: `We specialize in heavy-duty certified **Pressure Vessels**:\n- **Pressure Limit:** Rated for high containment up to **50 bar working pressure**.\n- **Certifications:** Strict **ASME Section VIII** and **IBR** (Indian Boiler Regulation) approvals.\n- **Testing:** 100% Non-Destructive Testing (NDT) including radiography and dye penetrant tests.`
    },
    {
      keys: ['sand mill', 'grinding mill', 'bead mill', 'wet grinding', 'dispersion'],
      response: `Our **Sand Mills** are engineered for nano-scale wet grinding of pigments, ink, and chemicals:\n- **Capacity:** Grinding chambers ranging from **5 to 500 Liters**.\n- **Media:** Employs high-density Zirconia beads (0.1 to 2mm) for dispersion down to 200 nanometers.\n- **Cooling:** Double-jacketed cooling casing with double mechanical seal configuration.`
    },
    {
      keys: ['screw conveyor', 'screw feeder', 'conveyor', 'feeder', 'material handling'],
      response: `We manufacture high-grade continuous **Screw Conveyors**:\n- **Throughput:** Capable of metering powder up to **200 tons/hr**.\n- **Design:** 100% dust-free bulk powder and filter cake containment.\n- **Materials:** Heavy-duty carbon steel, SS304, or SS316L with easy-clean split trough casings.`
    },
    {
      keys: ['ribbon blender', 'mixer', 'blender', 'powder mixer'],
      response: `Our **Ribbon Blenders** provide rapid convective powder mixing:\n- **Working Capacity:** Convective blending volumes from **50 L to 10,000 L**.\n- **Mechanism:** Double helical inner and outer ribbons with automated air purged shaft seals.\n- **MOC:** Mirror-polished SS316L, fully GMP compliant for food and API blending.`
    },
    {
      keys: ['strainer', 'basket strainer', 'y strainer', 'filter screen'],
      response: `AXAR liquid process **Strainers** protect heavy pumps and valves from pipeline solids:\n- **MOC:** SS304, SS316, or cast carbon steel WCB shells.\n- **Rating:** Strainer elements mesh rated down to **5 microns**.\n- **Designs:** Basket and Y-type configurations up to **12-inch flanged** connections.`
    },
    {
      keys: ['expansion bellow', 'bellow', 'expansion joint', 'silicon bellow'],
      response: `Our engineered **Expansion Bellows** absorb piping system thermal stress and vibrations:\n- **Material:** Multi-ply SS321, SS316L, Inconel, or high-temp silicon elastomers.\n- **Temperature:** Withstands extreme continuous gas loops up to **800°C**.\n- **Compliance:** Engineered in total compliance with structural **EJMA** standards.`
    },
    {
      keys: ['address', 'location', 'where is', 'where are you', 'factory', 'facility', 'office', 'city', 'gujarat', 'ahmedabad', 'vatva', 'gidc'],
      response: `AXAR Enterprise is headquartered in Gujarat, India. Our facilities are located at:\n- **Address:** 5, Sameer Estate, Vatva GIDC, Ahmedabad, Gujarat - 382445.\n- **Facility:** A **15,000 sq.ft. manufacturing shop floor** and dedicated process R&D laboratory. Clients are welcome to visit for pilot test trials.`
    },
    {
      keys: ['contact', 'email', 'phone', 'call', 'number', 'mobile', 'support', 'sales', 'whatsapp', 'inquiry'],
      response: `Get in touch with our plant engineering and estimation leads directly:\n- **Sales & Engineering Phone:** **+91 90339 58453** or **+91 90339 58452**\n- **Email Address:** **info@axarenterprise.com**\n- **Technical Inquiry:** Click the **Request Proposal** button or send us a WhatsApp message via the chat icon!`
    },
    {
      keys: ['trial', 'testing', 'test lab', 'sample', 'r&d', 'laboratory', 'pilot'],
      response: `AXAR Enterprise features an in-house **R&D Test Laboratory** in Vatva, Ahmedabad. We invite prospective clients to send slurry, paste, or filter cake samples to our facility. We will conduct **pilot trial runs** on our spray or flash dryers to determine exact throughput, drying efficiency, and moisture retention metrics before final equipment design.`
    },
    {
      keys: ['asme', 'ibr', 'quality', 'standards', 'iso', 'certification', 'approved', 'compliance'],
      response: `Quality compliance is the core of our fabrication shop:\n- **ASME Sec VIII Div 1:** Designed and stamped vessels for high-pressure loops.\n- **IBR Approvals:** Full compliance with Indian Boiler Regulations for high-pressure steam utility coils.\n- **ISO 9001:2015:** Standardized assembly and testing procedures.\n- **Inspection:** Radiography (NDT), ultrasonic thickness checks, hydrostatic pressure testing, and helium leak tests.`
    },
    {
      keys: ['evaporator', 'mvr', 'crystallizer', 'zld', 'zero liquid discharge', 'wastewater'],
      response: `AXAR specializes in Zero Liquid Discharge (**ZLD**) wastewater plants integrating high-efficiency thermal recovery components:\n- **MVR Evaporators:** Mechanical Vapor Recompression loop recycling up to 98% latent thermal energy, dropping power bills drastically.\n- **Falling Film Evaporators:** Ideal for low-viscous concentrations and high volumes.\n- **Forced Circulation Evaporators:** Perfect for crystallization phases and slurry handling.`
    },
    {
      keys: ['price', 'cost', 'quote', 'quotation', 'rfq', 'proposal'],
      response: `Industrial process equipment pricing is calculated strictly against your raw material specifications (feed concentration, viscosity, moisture index, heat source, and throughput requirements). \n\nTo calculate an exact cost estimate:\n- Use the **Get RFQ / Request Proposal** engine at the bottom of the home page.\n- Email your feed specification sheet to **info@axarenterprise.com**.\n- Speak directly to our estimation engineers at **+91 90339 58453**.`
    },
    {
      keys: ['spares', 'parts', 'spare parts', 'gaskets', 'solenoid', 'valves'],
      response: `We supply high-durability verified replacements and spares for all chemical and thermal plants:\n- **Atomization:** High-speed centrifugal rotary disc spindles and pressure nozzles.\n- **Pneumatics:** Electromagnetic continuous hammers and solenoid valves.\n- **Airlocks:** Rotary air lock valves with adjustable speed controllers.\n- **Filtration:** PTFE & polyester dust collector bags and cages.\n- **Seals:** High-temp silicon rubber gaskets and double mechanical seals.`
    }
  ];

  // Calculate scores for each rule
  let bestResponse = "";
  let highestScore = 0;

  for (const rule of rules) {
    let score = 0;
    for (const key of rule.keys) {
      if (query.includes(key)) {
        // Multi-word matches score significantly higher to prevent false short matches
        score += key.split(' ').length * 2;
      }
    }
    if (score > highestScore) {
      highestScore = score;
      bestResponse = rule.response;
    }
  }

  if (highestScore > 0) {
    return bestResponse;
  }

  // Fallback database introduction
  return `I have initialized my **AXAR Enterprise process database** but could not find a precise match for your query. \n\nI am fully calibrated to consult you on:\n- **Industrial Dryers:** Spray Dryers, Spin Flash Dryers, Vibratory Fluid Beds, and continuous Flash Dryers.\n- **Air & Thermal:** Hot Air Generators, Industrial Blowers, and metallic/silicon Expansion Bellows.\n- **Filtration & Vessels:** Pulse-jet Bag Filters, chemical Wet Scrubbers, ASME certified Reactors, and Duplex Strainers.\n- **Company Credentials:** ISO certifications, Vatva Ahmedabad facilities, and pilot trial testing lab runs.\n\nCould you please rephrase or specify a system category?`;
};

const TS = () => new Date().toLocaleTimeString('en-US', { hour12: false });

const renderMessageContent = (text: string) => {
  const lines = text.split('\n');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
      {lines.map((line, idx) => {
        let isBullet = false;
        let contentStr = line;
        if (line.trim().startsWith('- ')) {
          isBullet = true;
          contentStr = line.trim().substring(2);
        }

        // Process bold text **...**
        const regex = /\*\*(.*?)\*\*/g;
        const elements = [];
        let lastIndex = 0;
        let match;

        while ((match = regex.exec(contentStr)) !== null) {
          const matchIndex = match.index;
          if (matchIndex > lastIndex) {
            elements.push(contentStr.substring(lastIndex, matchIndex));
          }
          elements.push(
            <strong key={matchIndex} style={{ color: '#0284c7', fontWeight: 800 }}>
              {match[1]}
            </strong>
          );
          lastIndex = regex.lastIndex;
        }

        if (lastIndex < contentStr.length) {
          elements.push(contentStr.substring(lastIndex));
        }

        if (isBullet) {
          return (
            <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', paddingLeft: '0.25rem' }}>
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#0284c7', marginTop: '0.45rem', flexShrink: 0 }} />
              <span style={{ fontSize: 13, lineHeight: 1.5, color: '#334155' }}>
                {elements.length > 0 ? elements : contentStr}
              </span>
            </div>
          );
        }

        return (
          <p key={idx} style={{ fontSize: 13, lineHeight: 1.6, margin: 0 }}>
            {elements.length > 0 ? elements : contentStr}
          </p>
        );
      })}
    </div>
  );
};

const IndustrialChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([INITIAL]);
  const [input, setInput]       = useState('');
  const [typing, setTyping]     = useState(false);
  const scrollContainerRef     = useRef<HTMLDivElement>(null);
  const isMounted               = useRef(false);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || typing) return;
    const user: Message = { id: Date.now(), role: 'user', content: input.trim(), ts: TS() };
    setMessages(p => [...p, user]);
    setInput('');
    const container = scrollContainerRef.current;
    if (container) {
      setTimeout(() => {
        container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
      }, 50);
    }
    setTyping(true);
    setTimeout(() => {
      setMessages(p => [...p, { id: Date.now() + 1, role: 'assistant', content: getResponse(user.content), ts: TS() }]);
      setTyping(false);
      if (container) {
        setTimeout(() => {
          container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
        }, 50);
      }
    }, 1000);
  };

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    // Only auto-scroll the messages pane when a user interacts
    if (messages.length > 1 || typing) {
      const container = scrollContainerRef.current;
      if (container) {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: 'smooth'
        });
      }
    }
  }, [messages, typing]);

  const askPredefined = (question: string) => {
    if (typing) return;
    setInput(question);
  };

  return (
    <div className="chatbot-grid">

      {/* LEFT: Info & Quick Action Panel */}
      <div className="flex flex-col justify-between lg:h-full gap-6">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <span className="t-label" style={{ marginBottom: '1rem' }}>Process Architect [AX-1]</span>
            <h2 className="chatbot-sidebar-title" style={{ marginTop: '0.5rem' }}>
              PROCESS<br />
              <span style={{ color: '#0284c7' }}>ARCHITECT.</span>
            </h2>
            <p style={{ fontSize: 13, color: '#475569', marginTop: '1rem', lineHeight: 1.75, fontWeight: 500 }}>
              Intelligent process advisor specialized in AXAR drying systems, ASME/IBR compliance, and thermal engineering.
            </p>
          </div>

          {/* Quick Query Shortcuts */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <span style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#64748b' }}>Quick Consultations</span>
            {[
              { q: 'Spray Dryers Specs', icon: MessageSquare },
              { q: 'Where is Vatva GIDC Facility?', icon: MapPin },
              { q: 'Contact Engineering Leads', icon: Phone },
              { q: 'ASME & IBR Compliance', icon: ShieldCheck }
            ].map((shortcut, i) => (
              <button 
                key={i} 
                onClick={() => askPredefined(shortcut.q.replace(' Specs', '').replace(' Leads', '').replace(' Facility?', ''))}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  padding: '0.85rem 1.1rem', borderRadius: '0.75rem', background: '#ffffff',
                  border: '1px solid rgba(0,0,0,0.06)', cursor: 'pointer', textAlign: 'left',
                  transition: 'all 0.2s', width: '100%'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(2,132,199,0.3)';
                  e.currentTarget.style.background = 'rgba(2,132,199,0.01)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)';
                  e.currentTarget.style.background = '#ffffff';
                }}
              >
                <shortcut.icon style={{ width: 14, height: 14, color: '#0284c7', flexShrink: 0 }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: '#334155' }}>{shortcut.q}</span>
              </button>
            ))}
          </div>

        </div>

        {/* System Diagnostics Terminal */}
        <div className="panel" style={{ padding: '1.25rem', background: 'rgba(14,165,233,0.04)', borderColor: 'rgba(14,165,233,0.15)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.875rem' }}>
            <Terminal style={{ width: 14, height: 14, color: '#0284c7' }} />
            <span style={{ fontSize: 9, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.3em', color: '#0f172a' }}>System Logs</span>
          </div>
          <div style={{ fontFamily: 'monospace', fontSize: 9, color: '#0284c7', lineHeight: 1.9 }}>
            <div>[SYS] AX-1 CLIENT DATABASE ONLINE</div>
            <div>[SYS] DRYING SYSTEMS SPEC-MATRIX ACTIVE</div>
            <div style={{ color: '#16a34a' }}>[SYS] TURNKEY OPERATION AUDITED (ISO 9001)</div>
          </div>
        </div>
      </div>

      {/* RIGHT: Chat Window */}
      <div className="panel" style={{ display: 'flex', flexDirection: 'column', height: 640, borderColor: 'rgba(2,132,199,0.15)', boxShadow: '0 24px 64px rgba(0,0,0,0.06)' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(0,0,0,0.05)', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
            <div style={{ width: 40, height: 40, borderRadius: '0.75rem', background: '#0284c7', boxShadow: '0 0 16px rgba(2,132,199,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Bot style={{ color: '#fff', width: 20, height: 20 }} />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 900, color: '#0f172a', letterSpacing: '0.02em' }}>AX-1 ARCHITECT</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: typing ? '#d97706' : '#16a34a' }} className="anim-pulse" />
                <span style={{ fontSize: 9, fontWeight: 900, color: typing ? '#d97706' : '#16a34a', textTransform: 'uppercase', letterSpacing: '0.25em' }}>
                  {typing ? 'Processing...' : 'Uplink Stable'}
                </span>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 5 }}>
            {[1,2,3].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(14,165,233,0.2)' }} />)}
          </div>
        </div>

        {/* Messages Pane */}
        <div ref={scrollContainerRef} style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {messages.map(msg => (
            <motion.div key={msg.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{ maxWidth: '82%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: 6, flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}>
                  <div style={{ width: 26, height: 26, borderRadius: '0.4rem', background: msg.role === 'user' ? '#f1f5f9' : 'rgba(2,132,199,0.08)', border: '1px solid rgba(0,0,0,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {msg.role === 'user' ? <User style={{ width: 13, height: 13, color: '#64748b' }} /> : <Bot style={{ width: 13, height: 13, color: '#0284c7' }} />}
                  </div>
                  <span style={{ fontSize: 9, fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.15em' }}>{msg.ts}</span>
                </div>
                <div style={{
                  padding: '0.9rem 1.2rem', borderRadius: '1rem',
                  background: msg.role === 'user' ? '#f1f5f9' : '#ffffff',
                  border: `1px solid ${msg.role === 'user' ? 'rgba(0,0,0,0.06)' : 'rgba(2,132,199,0.15)'}`,
                  color: msg.role === 'user' ? '#334155' : '#1e293b',
                  boxShadow: msg.role === 'user' ? 'none' : '0 4px 12px rgba(2,132,199,0.02)'
                }}>
                  {renderMessageContent(msg.content)}
                </div>
              </div>
            </motion.div>
          ))}

          <AnimatePresence>
            {typing && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ padding: '0.875rem 1.1rem', borderRadius: '1rem', background: 'rgba(14,165,233,0.05)', border: '1px solid rgba(14,165,233,0.14)', width: 'fit-content' }}>
                  <div style={{ display: 'flex', gap: 5 }}>
                    {[0,1,2].map(i => <div key={i} className="anim-pulse" style={{ width: 8, height: 8, borderRadius: '50%', background: '#0ea5e9', animationDelay: `${i * 0.18}s` }} />)}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input Form */}
        <form onSubmit={send} style={{ padding: '1rem 1.5rem', borderTop: '1px solid rgba(0,0,0,0.06)', display: 'flex', gap: '0.75rem', flexShrink: 0 }}>
          <input
            className="input"
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask about spray dryers, Vatva GIDC, ASME, or trial testing..."
            disabled={typing}
            style={{ opacity: typing ? 0.5 : 1 }}
          />
          <button type="submit" disabled={!input.trim() || typing} style={{
            width: 48, height: 48, borderRadius: '0.75rem', border: '1px solid rgba(0,0,0,0.08)', flexShrink: 0,
            background: input.trim() && !typing ? '#0284c7' : '#f1f5f9',
            boxShadow: input.trim() && !typing ? '0 0 20px rgba(2,132,199,0.25)' : 'none',
            cursor: input.trim() && !typing ? 'pointer' : 'not-allowed',
            display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.25s',
          }}>
            <Send style={{ width: 18, height: 18, color: input.trim() && !typing ? '#fff' : '#94a3b8' }} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default IndustrialChatbot;
