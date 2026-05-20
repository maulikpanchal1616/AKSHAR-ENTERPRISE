"use client";

import React from 'react';
import IndustrialChatbot from "@/components/sections/IndustrialChatbot";
import Footer from '@/components/layout/Footer';

export default function AISystemPage() {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingTop: '8rem' }}>
      <div className="container" style={{ marginBottom: '6rem' }}>
        <IndustrialChatbot />
      </div>
      <Footer />
    </div>
  );
}
