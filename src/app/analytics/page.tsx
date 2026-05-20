"use client";

import React from 'react';
import MachineDashboard from "@/components/sections/MachineDashboard";
import Footer from '@/components/layout/Footer';

export default function AnalyticsPage() {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingTop: '8rem' }}>
      <div className="container" style={{ marginBottom: '6rem' }}>
        <MachineDashboard />
      </div>
      <Footer />
    </div>
  );
}
