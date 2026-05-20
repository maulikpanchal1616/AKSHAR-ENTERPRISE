"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { Thermometer, Wind, Zap, Radio, BarChart3, Activity } from 'lucide-react';

const telemetryData = [
  { time: '00:00', pressure: 400, energy: 240, temp: 120 },
  { time: '04:00', pressure: 300, energy: 139, temp: 110 },
  { time: '08:00', pressure: 900, energy: 980, temp: 180 },
  { time: '12:00', pressure: 500, energy: 390, temp: 150 },
  { time: '16:00', pressure: 700, energy: 480, temp: 170 },
  { time: '20:00', pressure: 800, energy: 380, temp: 165 },
  { time: '23:59', pressure: 600, energy: 430, temp: 155 },
];

type Metric = 'pressure' | 'energy' | 'temp';

const MachineDashboard = () => {
  const [activeMetric, setActiveMetric] = useState<Metric>('pressure');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', width: '100%', overflow: 'hidden' }}>
      {/* Header Area */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-16 items-end">
        <div>
          <span className="t-label" style={{ marginBottom: '1rem' }}>Process Telemetry [AX-SYS-04]</span>
          <h2 className="t-section" style={{ marginTop: '0.5rem' }}>
            REAL-TIME <br />
            <span style={{ color: '#0284c7' }}>PROCESS</span> TELEMETRY.
          </h2>
        </div>
        <div style={{ paddingBottom: '0.5rem' }}>
          <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.7, fontWeight: 500 }}>
            Real-time thermodynamic monitoring of operational drying plants and evaporator cycles.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8" style={{ width: '100%' }}>
        
        {/* Main Chart Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', minWidth: 0 }}>
          <div className="panel" style={{ padding: '2.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3rem' }}>
              <div>
                <span className="t-label" style={{ fontSize: 9, opacity: 0.5, marginBottom: '0.5rem' }}>System Flux Matrix</span>
                <h3 className="t-card">Operational Analytics</h3>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', background: '#f1f5f9', padding: '0.4rem', borderRadius: '0.75rem', border: '1px solid rgba(0,0,0,0.06)', flexWrap: 'wrap' }}>
                {(['pressure', 'energy', 'temp'] as Metric[]).map(m => {
                  const labelMap: Record<Metric, string> = {
                    pressure: 'Chamber Pressure (Pa)',
                    energy: 'Specific Heat (kcal/kg)',
                    temp: 'Inlet Temp (°C)'
                  };
                  return (
                    <button
                      key={m}
                      onClick={() => setActiveMetric(m)}
                      className="btn"
                      style={{
                        padding: '0.5rem 1.25rem',
                        background: activeMetric === m ? '#0284c7' : 'transparent',
                        color: activeMetric === m ? '#fff' : '#64748b',
                        boxShadow: activeMetric === m ? '0 8px 24px rgba(2,132,199,0.2)' : 'none',
                      }}
                    >
                      {labelMap[m]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Chart Container */}
            <div style={{ width: '100%', height: 320, position: 'relative' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={telemetryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0284c7" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#0284c7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
                  <XAxis 
                    dataKey="time" 
                    stroke="#94a3b8" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false} 
                    tick={{ fontWeight: 900 }}
                  />
                  <YAxis 
                    stroke="#94a3b8" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false} 
                    tick={{ fontWeight: 900 }}
                  />
                  <Tooltip
                    contentStyle={{ 
                      background: '#ffffff', 
                      border: '1px solid rgba(2,132,199,0.15)', 
                      borderRadius: '12px', 
                      fontSize: '12px',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.08)'
                    }}
                    labelStyle={{ color: '#64748b', fontWeight: 900 }}
                    itemStyle={{ color: '#0284c7', fontWeight: 900 }}
                  />
                  <Area
                    type="monotone"
                    dataKey={activeMetric}
                    stroke="#0284c7"
                    strokeWidth={3}
                    fill="url(#chartGrad)"
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="quick-metrics-grid">
            {[
              { label: 'Thermal Load', value: '2,500 kcal/kg', icon: Thermometer, color: '#0ea5e9' },
              { label: 'Process Air Flow', value: '45,000 m³/hr', icon: Wind, color: '#4ade80' },
              { label: 'Energy Savings', value: '30% Reduced', icon: Zap, color: '#f59e0b' },
            ].map(card => (
              <div key={card.label} className="panel" style={{ padding: '1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div style={{ 
                    width: 36, height: 36, borderRadius: '0.6rem', 
                    background: `${card.color}10`, border: `1px solid ${card.color}25`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <card.icon style={{ width: 18, height: 18, color: card.color }} />
                  </div>
                  <span style={{ fontSize: 9, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#64748b' }}>{card.label}</span>
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em' }}>{card.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Info Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="panel" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
              <Radio className="anim-pulse" style={{ width: 16, height: 16, color: '#0ea5e9' }} />
              <span className="t-label" style={{ fontSize: 9 }}>AX-1 Process Telemetry</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: 10, fontWeight: 900, color: '#64748b', textTransform: 'uppercase' }}>Recuperation Rate</span>
                  <span style={{ fontSize: 10, fontWeight: 900, color: '#0284c7' }}>98.0%</span>
                </div>
                <div style={{ height: 4, background: 'rgba(0,0,0,0.06)', borderRadius: 2 }}>
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '98%' }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    style={{ height: '100%', background: '#0284c7', borderRadius: 2, boxShadow: '0 0 10px rgba(2,132,199,0.3)' }} 
                  />
                </div>
              </div>

              <div className="panel" style={{ padding: '1.25rem', background: 'rgba(14,165,233,0.04)', borderColor: 'rgba(14,165,233,0.15)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                  <BarChart3 style={{ width: 14, height: 14, color: '#0284c7' }} />
                  <span style={{ fontSize: 9, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#0f172a' }}>Auto Report</span>
                </div>
                <p style={{ fontSize: 11, color: '#475569', lineHeight: 1.6, fontWeight: 600 }}>
                  "Thermal drying loops calibrated. MVR evaporator steam recycle running at 98% thermal efficiency. Exhaust scrubbers active."
                </p>
              </div>

              <button className="btn btn-blue" style={{ width: '100%' }}>Export Telemetry Log</button>
            </div>
          </div>

          <div className="panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ 
              width: 40, height: 40, borderRadius: '50%', background: 'rgba(74,222,128,0.1)', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(74,222,128,0.2)' 
            }}>
              <Activity style={{ width: 20, height: 20, color: '#4ade80' }} />
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 900, color: '#0f172a' }}>System Status</div>
              <div style={{ fontSize: 9, fontWeight: 900, color: '#16a34a', textTransform: 'uppercase' }}>Optimal Operation</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MachineDashboard;
