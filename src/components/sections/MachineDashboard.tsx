"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Thermometer, Wind, Zap, Radio, BarChart3, Activity, ArrowRight } from 'lucide-react';

const MachineDashboard = () => {
  return (
    <div className="flex flex-col gap-12 w-full overflow-hidden">
      {/* Header Area */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-16 items-end">
        <div>
          <span className="t-section-label mb-4">Process Telemetry [AX-SYS-04]</span>
          <h2 className="t-section-heading mt-2 mb-0">
            REAL-TIME <br />
            <span className="text-primary">PROCESS</span> TELEMETRY.
          </h2>
        </div>
        <div className="pb-2">
          <p className="text-lg text-muted-foreground leading-relaxed font-medium">
            Real-time thermodynamic monitoring of operational drying plants and evaporator cycles. Fully integrated with AX-1 AI for predictive maintenance.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 w-full">
        
        {/* Main Telemetry Metrics */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="enterprise-card p-8 flex flex-col justify-between">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-[#0ea5e9]/10 border border-[#0ea5e9]/20 flex items-center justify-center">
                <Thermometer className="w-6 h-6 text-[#0ea5e9]" />
              </div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Thermal Load</span>
            </div>
            <div>
              <div className="text-4xl font-black text-foreground tracking-tight mb-2">2,500 <span className="text-xl text-muted-foreground">kcal/kg</span></div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Optimal Range</span>
              </div>
            </div>
          </div>

          <div className="enterprise-card p-8 flex flex-col justify-between">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-[#4ade80]/10 border border-[#4ade80]/20 flex items-center justify-center">
                <Wind className="w-6 h-6 text-[#4ade80]" />
              </div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Process Air Flow</span>
            </div>
            <div>
              <div className="text-4xl font-black text-foreground tracking-tight mb-2">45,000 <span className="text-xl text-muted-foreground">m³/hr</span></div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Draft Stable</span>
              </div>
            </div>
          </div>

          <div className="enterprise-card p-8 flex flex-col justify-between sm:col-span-2">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-[#f59e0b]/10 border border-[#f59e0b]/20 flex items-center justify-center">
                <Zap className="w-6 h-6 text-[#f59e0b]" />
              </div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Energy Recovery (MVR)</span>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div>
                <div className="text-4xl font-black text-foreground tracking-tight mb-2">30% <span className="text-xl text-muted-foreground">Reduced</span></div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">Active Recuperation</span>
                </div>
              </div>
              
              <div className="w-full md:w-1/2">
                <div className="flex justify-between mb-2">
                  <span className="text-[10px] font-black text-muted-foreground uppercase">Recuperation Rate</span>
                  <span className="text-[10px] font-black text-primary">98.0%</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '98%' }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-primary rounded-full shadow-[0_0_10px_rgba(2,132,199,0.5)]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Info Area */}
        <div className="flex flex-col gap-6">
          <div className="enterprise-card p-8 h-full flex flex-col">
            <div className="flex items-center gap-3 mb-8">
              <Radio className="animate-pulse w-5 h-5 text-primary" />
              <span className="text-xs font-black uppercase tracking-widest text-primary">AX-1 AI Log</span>
            </div>

            <div className="enterprise-card border-primary/20 bg-primary/5 p-5 mb-8 flex-1">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground">Auto Report</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed font-semibold italic">
                "Thermal drying loops calibrated. MVR evaporator steam recycle running at 98% thermal efficiency. Exhaust scrubbers active and within compliance limits."
              </p>
            </div>

            <div className="enterprise-card p-5 flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0">
                <Activity className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <div className="text-sm font-black text-foreground">System Status</div>
                <div className="text-[10px] font-black text-green-600 uppercase tracking-widest mt-1">Optimal Operation</div>
              </div>
            </div>

            <button className="btn btn-primary w-full flex items-center justify-center gap-2">
              Export Log <ArrowRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MachineDashboard;
