"use client";

import React from 'react';
import Image from 'next/image';

const BRANDS = [
  { name: "Aarti Industries",          logo: "https://axarenterprise.com/clients/aarti-logo.svg" },
  { name: "Deepak Nitrite",            logo: "https://axarenterprise.com/clients/deepak_nitrite.png" },
  { name: "Heranba",                   logo: "https://axarenterprise.com/clients/heranba.png" },
  { name: "SML Agriculture",           logo: "https://axarenterprise.com/clients/SML.png" },
  { name: "AksharChem",                logo: "https://axarenterprise.com/clients/aksharchem.png" },
  { name: "Indo Colchem",              logo: "https://axarenterprise.com/clients/indocol.svg" },
  { name: "ACT Quality",               logo: "https://axarenterprise.com/clients/act.png" },
  { name: "Advance Agrolife",          logo: "https://axarenterprise.com/clients/advance-agro.png" },
  { name: "Omnitech",                  logo: "https://axarenterprise.com/clients/omnitech.png" },
  { name: "Solar Chemferts",           logo: "https://axarenterprise.com/clients/solar.jpg" },
  { name: "Par Drugs & Chemicals",     logo: "https://axarenterprise.com/clients/par.png" },
  { name: "Neogen Chemicals",          logo: "https://axarenterprise.com/clients/neogen.png" },
  { name: "Detox Group",               logo: "https://axarenterprise.com/clients/detox.png" },
  { name: "Vapi Green Enviro",         logo: "https://axarenterprise.com/clients/vgel.png" },
  { name: "Saykha Enviro",             logo: "https://axarenterprise.com/clients/saykha.png" },
  { name: "Roop Dyes & Intermediates", logo: "https://axarenterprise.com/clients/roop.png" }
];

const TrustedEcosystem = () => {
  // Duplicate all brands to ensure continuous flow
  const doubleBrands = [...BRANDS, ...BRANDS];
  // Reverse the second array to flow in the opposite direction
  const reversedDouble = [...BRANDS].reverse().concat([...BRANDS].reverse());

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', width: '100%', overflow: 'hidden', padding: '1rem 0' }}>
      
      {/* Title Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em' }}>
          Trusted Ecosystem
        </h2>
        <p style={{ fontSize: 14, color: '#64748b', fontWeight: 500 }}>
          Supporting market leaders with reliable process engineering.
        </p>
      </div>

      {/* Styled Inline Styles for Keyframe Animations */}
      <style>{`
        @keyframes marqueeLeft {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes marqueeRight {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .marquee-container {
          position: relative;
          width: 100vw;
          left: 50%;
          right: 50%;
          margin-left: -50vw;
          margin-right: -50vw;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .marquee-row {
          display: flex;
          width: max-content;
          overflow: hidden;
        }
        .marquee-left-track {
          display: flex;
          gap: 1.25rem;
          animation: marqueeLeft 42s linear infinite;
        }
        .marquee-right-track {
          display: flex;
          gap: 1.25rem;
          animation: marqueeRight 42s linear infinite;
        }
        .marquee-row:hover .marquee-left-track,
        .marquee-row:hover .marquee-right-track {
          animation-play-state: paused;
        }
        .logo-card {
          width: 230px;
          height: 85px;
          background: #ffffff;
          border-radius: 1.15rem;
          display: flex;
          alignItems: center;
          justifyContent: center;
          padding: 1.25rem;
          flex-shrink: 0;
          box-shadow: 0 4px 16px rgba(0,0,0,0.015);
          border: 1px solid rgba(0,0,0,0.035);
          transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
          cursor: default;
        }
        .logo-card img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          filter: grayscale(1);
          opacity: 0.6;
          mix-blend-mode: multiply;
          transition: all 0.35s ease;
        }
        .logo-card:hover {
          transform: translateY(-3px) scale(1.02);
          border-color: rgba(2, 132, 199, 0.15);
          box-shadow: 0 16px 36px rgba(2, 132, 199, 0.05);
        }
        .logo-card:hover img {
          filter: grayscale(0);
          opacity: 1;
        }
        /* Fade edges */
        .marquee-overlay-l {
          position: absolute; top: 0; bottom: 0; left: 0; width: 14%; zIndex: 2; pointer-events: none;
          background: linear-gradient(90deg, #f8fafc 0%, transparent 100%);
        }
        .marquee-overlay-r {
          position: absolute; top: 0; bottom: 0; right: 0; width: 14%; zIndex: 2; pointer-events: none;
          background: linear-gradient(270deg, #f8fafc 0%, transparent 100%);
        }
      `}</style>

      {/* Marquee Wrapper */}
      <div className="marquee-container">
        <div className="marquee-overlay-l" />
        <div className="marquee-overlay-r" />

        {/* Row 1: Flowing Left */}
        <div className="marquee-row">
          <div className="marquee-left-track">
            {doubleBrands.map((brand, idx) => (
              <div key={`row1-${idx}`} className="logo-card">
                <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Flowing Right */}
        <div className="marquee-row">
          <div className="marquee-right-track">
            {reversedDouble.map((brand, idx) => (
              <div key={`row2-${idx}`} className="logo-card">
                <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default TrustedEcosystem;
