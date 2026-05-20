"use client";

import React from 'react';
import IndustriesServed from "@/components/sections/IndustriesServed";
import Footer from '@/components/layout/Footer';

export default function SolutionsPage() {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingTop: '8rem' }}>
      <div className="container" style={{ marginBottom: '6rem' }}>
        <IndustriesServed />
      </div>
      <Footer />
    </div>
  );
}
