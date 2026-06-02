"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, User, X, MessageSquare, Phone, MapPin, ShieldCheck } from 'lucide-react';

type Message = { id: number; role: 'user' | 'assistant'; content: string; ts: string };

const INITIAL: Message = {
  id: 1, role: 'assistant', ts: new Date().toLocaleTimeString('en-US', { hour12: false }),
  content: 'AX-1 Architect online. Loaded database for **AXAR Enterprise** engineering products.\n\nHow can I consult you on your process specifications today?',
};

const QUICK_QUERIES = [
  { q: 'Spray Dryers Specs', icon: MessageSquare },
  { q: 'Where is Vatva GIDC?', icon: MapPin },
  { q: 'Contact Engineers', icon: Phone },
  { q: 'ASME & IBR Compliance', icon: ShieldCheck }
];

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

  let bestResponse = "";
  let highestScore = 0;

  for (const rule of rules) {
    let score = 0;
    for (const key of rule.keys) {
      if (query.includes(key)) {
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

  return `I have initialized my **AXAR Enterprise process database** but could not find a precise match for your query. \n\nI am fully calibrated to consult you on:\n- **Industrial Dryers:** Spray Dryers, Spin Flash Dryers, Vibratory Fluid Beds, and continuous Flash Dryers.\n- **Air & Thermal:** Hot Air Generators, Industrial Blowers, and metallic/silicon Expansion Bellows.\n- **Filtration & Vessels:** Pulse-jet Bag Filters, chemical Wet Scrubbers, ASME certified Reactors, and Duplex Strainers.\n- **Company Credentials:** ISO certifications, Vatva Ahmedabad facilities, and pilot trial testing lab runs.\n\nCould you please rephrase or specify a system category?`;
};

const TS = () => new Date().toLocaleTimeString('en-US', { hour12: false });

const renderMessageContent = (text: string) => {
  const lines = text.split('\n');
  return (
    <div className="flex flex-col gap-1.5">
      {lines.map((line, idx) => {
        let isBullet = false;
        let contentStr = line;
        if (line.trim().startsWith('- ')) {
          isBullet = true;
          contentStr = line.trim().substring(2);
        }

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
            <strong key={matchIndex} className="text-primary font-bold">
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
            <div key={idx} className="flex items-start gap-2 pl-1">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <span className="text-xs leading-relaxed text-foreground/90">
                {elements.length > 0 ? elements : contentStr}
              </span>
            </div>
          );
        }

        return (
          <p key={idx} className="text-xs leading-relaxed m-0 text-foreground/90">
            {elements.length > 0 ? elements : contentStr}
          </p>
        );
      })}
    </div>
  );
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || typing) return;
    const user: Message = { id: Date.now(), role: 'user', content: input.trim(), ts: TS() };
    setMessages(p => [...p, user]);
    setInput('');
    
    setTyping(true);
    setTimeout(() => {
      setMessages(p => [...p, { id: Date.now() + 1, role: 'assistant', content: getResponse(user.content), ts: TS() }]);
      setTyping(false);
    }, 1000);
  };

  const askPredefined = (question: string) => {
    if (typing) return;
    const user: Message = { id: Date.now(), role: 'user', content: question, ts: TS() };
    setMessages(p => [...p, user]);
    setTyping(true);
    setTimeout(() => {
      setMessages(p => [...p, { id: Date.now() + 1, role: 'assistant', content: getResponse(user.content), ts: TS() }]);
      setTyping(false);
    }, 1000);
  };

  useEffect(() => {
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

  return (
    <div className="fixed bottom-[80px] md:bottom-6 right-4 md:right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute bottom-[64px] right-0 w-[calc(100vw-32px)] sm:w-[360px] h-[60vh] sm:h-[480px] min-h-[350px] enterprise-card rounded-2xl overflow-hidden flex flex-col shadow-2xl border-primary/20"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-card shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary shadow-[0_0_15px_rgba(2,132,199,0.3)] flex items-center justify-center shrink-0">
                  <Bot className="text-primary-foreground w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-black text-foreground tracking-tight">AX-1 ARCHITECT</div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${typing ? 'bg-amber-500' : 'bg-green-500'} animate-pulse`} />
                    <span className={`text-[10px] font-black uppercase tracking-[0.15em] ${typing ? 'text-amber-500' : 'text-green-500'}`}>
                      {typing ? 'Processing...' : 'Uplink Stable'}
                    </span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-secondary flex items-center justify-center text-muted-foreground transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Quick Actions (only show if no user messages yet to save space) */}
            {messages.length === 1 && !typing && (
              <div className="px-4 pt-4 shrink-0 bg-background/50 border-b border-border">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground block mb-2">Quick Consultations</span>
                <div className="flex flex-wrap gap-2 pb-4">
                  {QUICK_QUERIES.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => askPredefined(q.q)}
                      className="text-[11px] font-bold text-foreground bg-card border border-border hover:border-primary/50 hover:bg-primary/5 px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5"
                    >
                      <q.icon size={12} className="text-primary" />
                      {q.q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat Area */}
            <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-background/50">
              {messages.map(msg => (
                <motion.div key={msg.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className="max-w-[85%]">
                    <div className={`flex items-center gap-2 mb-1.5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 border ${msg.role === 'user' ? 'bg-secondary border-border' : 'bg-primary/10 border-primary/20'}`}>
                        {msg.role === 'user' ? <User className="w-3 h-3 text-muted-foreground" /> : <Bot className="w-3 h-3 text-primary" />}
                      </div>
                      <span className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.1em]">{msg.ts}</span>
                    </div>
                    <div className={`p-3 rounded-2xl ${msg.role === 'user' ? 'bg-secondary text-secondary-foreground rounded-tr-sm' : 'bg-card text-card-foreground border border-border shadow-sm rounded-tl-sm'}`}>
                      {renderMessageContent(msg.content)}
                    </div>
                  </div>
                </motion.div>
              ))}

              <AnimatePresence>
                {typing && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex justify-start">
                    <div className="px-4 py-3 rounded-2xl bg-card border border-border shadow-sm rounded-tl-sm">
                      <div className="flex gap-1.5">
                        {[0,1,2].map(i => (
                          <div key={i} className="w-2 h-2 rounded-full bg-primary/40 animate-pulse" style={{ animationDelay: `${i * 0.15}s` }} />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Input Form */}
            <form onSubmit={send} className="p-3 bg-card border-t border-border shrink-0 flex gap-2">
              <input
                type="text"
                placeholder="Ask about spray dryers, Vatva GIDC..."
                value={input}
                onChange={e => setInput(e.target.value)}
                disabled={typing}
                className="flex-1 bg-background border border-input rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-foreground disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || typing}
                className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-secondary disabled:text-muted-foreground"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-[0_8px_25px_rgba(2,132,199,0.4)] cursor-pointer relative z-50 border border-primary/20 outline-none"
      >
        <motion.div
          animate={{ 
            rotate: isOpen ? 90 : 0, 
            scale: isOpen ? 0.5 : 1, 
            opacity: isOpen ? 0 : 1 
          }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="absolute flex items-center justify-center inset-0"
        >
          <Bot size={28} />
        </motion.div>
        
        <motion.div
          animate={{ 
            rotate: isOpen ? 0 : -90, 
            scale: isOpen ? 1 : 0.5, 
            opacity: isOpen ? 1 : 0 
          }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="absolute flex items-center justify-center inset-0"
        >
          <X size={28} />
        </motion.div>
      </motion.button>
    </div>
  );
};

export default ChatWidget;
