"use client";

import React from 'react';
import TechnicalSupport from "@/components/sections/TechnicalSupport";
import Footer from '@/components/layout/Footer';

export default function ContactPage() {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingTop: '8rem' }}>
      <div className="container" style={{ marginBottom: '6rem' }}>
        <TechnicalSupport />
      </div>
      <Footer />
    </div>
  );
}
