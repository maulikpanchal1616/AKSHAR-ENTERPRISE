"use client";

import React from 'react';
import Footer from '@/components/layout/Footer';

export default function AISystemPage() {
  return (
    <>
      <div className="bg-background min-h-[70vh] pt-32 pb-20 flex items-center justify-center text-center">
        <div className="container relative z-10">
          <span className="t-section-label justify-center">Process Architect [AX-1]</span>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mt-6">
            <span className="text-primary">AX-1</span> IS NOW ONLINE
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto mt-6 text-lg">
            The Process Architect has been upgraded to a global floating assistant. Click the blue robot icon in the bottom right corner of any page to start your consultation!
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
