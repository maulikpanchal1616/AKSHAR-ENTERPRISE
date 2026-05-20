"use client";

import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, PerspectiveCamera, Environment, Float as FloatDrei } from '@react-three/drei';
import * as THREE from 'three';

const IndustrialCore = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <group>
      {/* Central Abstract Machine Core */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh ref={meshRef}>
          <octahedronGeometry args={[2, 0]} />
          <meshStandardMaterial 
            color="#0284c7" 
            metalness={0.9} 
            roughness={0.1} 
            wireframe 
          />
        </mesh>
        
        {/* Glowing inner sphere */}
        <Sphere args={[0.8, 32, 32]}>
          <meshStandardMaterial 
            color="#0ea5e9" 
            emissive="#0ea5e9" 
            emissiveIntensity={2} 
            metalness={1} 
          />
        </Sphere>
      </Float>

      {/* Floating Industrial Particles / Gears (Abstract) */}
      {Array.from({ length: 20 }).map((_, i) => (
        <FloatDrei key={i} speed={1} rotationIntensity={2} floatIntensity={2}>
          <mesh 
            position={[
              (Math.random() - 0.5) * 15,
              (Math.random() - 0.5) * 15,
              (Math.random() - 0.5) * 15
            ]}
            rotation={[Math.random(), Math.random(), Math.random()]}
          >
            <boxGeometry args={[0.2, 0.2, 0.2]} />
            <meshStandardMaterial color="#64748b" metalness={0.8} />
          </mesh>
        </FloatDrei>
      ))}
    </group>
  );
};

const IndustrialThree = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
      <Canvas>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} />
          <Environment preset="city" />
          <ambientLight intensity={0.7} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#0284c7" />
          <pointLight position={[-10, -10, -10]} intensity={0.8} color="#0ea5e9" />
          
          <IndustrialCore />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default IndustrialThree;
