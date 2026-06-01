"use client";

import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, PresentationControls, Float } from '@react-three/drei';
import * as THREE from 'three';

// Premium 3D Spray Dryer Machine Model
const SprayDryerModel = () => {
  const groupRef = useRef<THREE.Group>(null);
  const fanRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Generate particles for the drying effect
  const [particles] = useState(() => {
    const geometry = new THREE.BufferGeometry();
    const count = 200;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 1.2;     // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2;   // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 1.2; // z
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  });

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Majestic slow rotation of the whole machine
      groupRef.current.rotation.y += delta * 0.15;
    }
    if (fanRef.current) {
      // High speed blower rotation
      fanRef.current.rotation.y -= delta * 8;
    }
    if (glowRef.current) {
      // Pulsing thermal glow
      const material = glowRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.6;
    }
    if (particlesRef.current) {
      // Swirling particles inside
      particlesRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef} position={[0, -0.5, 0]}>
        
        {/* Main Drying Chamber (Glass/Metallic hybrid) */}
        <mesh position={[0, 1.5, 0]}>
          <cylinderGeometry args={[1.6, 1.6, 3, 32]} />
          <meshStandardMaterial 
            color="#0f172a" 
            metalness={0.9} 
            roughness={0.1} 
            envMapIntensity={2} 
            transparent 
            opacity={0.8}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Inner Swirling Particles */}
        <points ref={particlesRef} position={[0, 1.5, 0]}>
          <primitive object={particles} attach="geometry" />
          <pointsMaterial color="#0ea5e9" size={0.04} sizeAttenuation transparent opacity={0.6} />
        </points>

        {/* Conical Bottom Discharge */}
        <mesh position={[0, -0.75, 0]}>
          <cylinderGeometry args={[1.6, 0.2, 1.5, 32]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.3} envMapIntensity={1.5} />
        </mesh>

        {/* Top Cap */}
        <mesh position={[0, 3.1, 0]}>
          <cylinderGeometry args={[1.6, 1.6, 0.2, 32]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Blower / Motor Housing */}
        <mesh position={[0, 3.5, 0]}>
          <boxGeometry args={[1.2, 0.8, 1.2]} />
          <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Top Exhaust Pipe */}
        <mesh position={[0.8, 3.5, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.2, 0.2, 1, 16]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Rotating Internal Blower Fan */}
        <group position={[0, 3.3, 0]}>
          <mesh ref={fanRef}>
            <cylinderGeometry args={[0.8, 0.8, 0.05, 6]} />
            <meshStandardMaterial color="#0284c7" metalness={0.5} roughness={0.2} />
          </mesh>
        </group>
        
        {/* Structural Legs */}
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} position={[
            Math.cos((i * Math.PI) / 2) * 1.7,
            0.5,
            Math.sin((i * Math.PI) / 2) * 1.7
          ]}>
            <cylinderGeometry args={[0.06, 0.06, 4.5, 16]} />
            <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.2} />
          </mesh>
        ))}

        {/* Glowing Control Panel / Inspection Window */}
        <mesh ref={glowRef} position={[0, 1.5, 1.61]} rotation={[0, 0, 0]}>
          <circleGeometry args={[0.4, 32]} />
          <meshStandardMaterial 
            color="#0284c7" 
            emissive="#0ea5e9" 
            emissiveIntensity={1} 
            metalness={0.2} 
            roughness={0.2} 
          />
        </mesh>
        {/* Window Ring */}
        <mesh position={[0, 1.5, 1.62]}>
          <ringGeometry args={[0.4, 0.45, 32]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
    </Float>
  );
};

const ResponsiveWrapper = ({ children }: { children: React.ReactNode }) => {
  const { viewport } = useThree();
  const isMobile = viewport.width < 5;
  // Position it nicely on the right side for desktop, center for mobile
  return (
    <group position={[isMobile ? 0 : 3.5, isMobile ? -1.5 : -0.5, 0]} scale={isMobile ? 0.9 : 1.1}>
      {children}
    </group>
  );
};

const IndustrialThree = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-auto cursor-grab active:cursor-grabbing">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 12], fov: 45 }}>
        <Suspense fallback={null}>
          <Environment preset="city" />
          
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 20, 10]} intensity={2} color="#ffffff" />
          <directionalLight position={[-10, -10, -10]} intensity={1} color="#0ea5e9" />
          <pointLight position={[0, 2, 2]} intensity={2} color="#0ea5e9" distance={10} />
          
          <ResponsiveWrapper>
            <PresentationControls 
              global 
              config={{ mass: 2, tension: 500 }} 
              snap={true} 
              rotation={[0.1, -0.3, 0]} 
              polar={[-Math.PI / 4, Math.PI / 4]} 
              azimuth={[-Math.PI / 1.4, Math.PI / 2]}
            >
              <SprayDryerModel />
            </PresentationControls>
          </ResponsiveWrapper>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default IndustrialThree;
