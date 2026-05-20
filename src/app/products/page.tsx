"use client";

import React from 'react';
import ProductComparison from "@/components/sections/ProductComparison";
import Footer from '@/components/layout/Footer';

export default function ProductsPage() {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingTop: '8rem' }}>
      <div className="container" style={{ marginBottom: '6rem' }}>
        <ProductComparison />
      </div>
      <Footer />
    </div>
  );
}
