import React, { Suspense } from 'react';
import RFQWizard from "@/components/sections/RFQWizard";
import Footer from '@/components/layout/Footer';

export default function RFQPage() {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingTop: '8rem' }}>
      <div className="container" style={{ marginBottom: '6rem' }}>
        <Suspense fallback={
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400, fontSize: 13, fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            Initializing RFQ Engine...
          </div>
        }>
          <RFQWizard />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
