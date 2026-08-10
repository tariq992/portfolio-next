"use client";
import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function useWindowPointer() {
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      pointerRef.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointerRef.current.y = -(event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  return pointerRef;
}

function Particles() {
  const meshRef = useRef<THREE.Points>(null);
  const pointerRef = useWindowPointer();
  const count = 2600;

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3;
      const layer = i % 5;
      const radius = 3.2 + Math.random() * 14 + layer * 0.16;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.78;
      positions[i3 + 2] = radius * Math.cos(phi);

      const palette = Math.random();
      if (palette < 0.45) {
        colors[i3] = 0;
        colors[i3 + 1] = 0.83;
        colors[i3 + 2] = 1;
      } else if (palette < 0.78) {
        colors[i3] = 0.66;
        colors[i3 + 1] = 0.33;
        colors[i3 + 2] = 0.97;
      } else {
        colors[i3] = 0.93;
        colors[i3 + 1] = 0.29;
        colors[i3 + 2] = 0.6;
      }
    }

    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      time * 0.035 + pointerRef.current.x * 0.22,
      0.035,
    );
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      Math.sin(time * 0.18) * 0.08 + pointerRef.current.y * 0.12,
      0.035,
    );
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.72}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function ConnectionField() {
  const lineRef = useRef<THREE.LineSegments>(null);
  const pointerRef = useWindowPointer();
  const segments = 170;

  const positions = useMemo(() => {
    const data = new Float32Array(segments * 2 * 3);
    for (let i = 0; i < segments; i += 1) {
      const base = i * 6;
      const angle = Math.random() * Math.PI * 2;
      const radius = 2 + Math.random() * 9;
      const y = (Math.random() - 0.5) * 6;
      const length = 0.4 + Math.random() * 1.7;

      data[base] = Math.cos(angle) * radius;
      data[base + 1] = y;
      data[base + 2] = Math.sin(angle) * radius;
      data[base + 3] = Math.cos(angle + 0.12) * (radius + length);
      data[base + 4] = y + (Math.random() - 0.5) * 0.7;
      data[base + 5] = Math.sin(angle + 0.12) * (radius + length);
    }
    return data;
  }, []);

  useFrame((state) => {
    if (!lineRef.current) return;
    const time = state.clock.getElapsedTime();
    lineRef.current.rotation.y = -time * 0.026 + pointerRef.current.x * 0.1;
    lineRef.current.rotation.x = pointerRef.current.y * 0.08;
  });

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color="#00d4ff" transparent opacity={0.12} blending={THREE.AdditiveBlending} />
    </lineSegments>
  );
}

function FloatingRings() {
  const groupRef = useRef<THREE.Group>(null);
  const pointerRef = useWindowPointer();

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.x = Math.sin(time * 0.16) * 0.25 + pointerRef.current.y * 0.12;
    groupRef.current.rotation.y = time * 0.08 + pointerRef.current.x * 0.15;
  });

  return (
    <group ref={groupRef}>
      <mesh rotation={[0.7, 0.2, 0.1]}>
        <torusGeometry args={[4.1, 0.018, 16, 140]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.23} />
      </mesh>
      <mesh rotation={[1.25, 0.4, 0.6]}>
        <torusGeometry args={[5.65, 0.014, 16, 140]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.17} />
      </mesh>
      <mesh rotation={[0.2, 1.1, 0.9]}>
        <torusGeometry args={[3.1, 0.022, 16, 140]} />
        <meshBasicMaterial color="#ec4899" transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

function WireframeGrid() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.position.z = -7 + Math.sin(time * 0.22) * 0.4;
    meshRef.current.rotation.z = time * 0.018;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -7]} rotation={[0, 0, 0]}>
      <planeGeometry args={[26, 26, 46, 46]} />
      <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.035} />
    </mesh>
  );
}

export default function ParticleBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8.5], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.55} />
        <Particles />
        <ConnectionField />
        <FloatingRings />
        <WireframeGrid />
      </Canvas>
    </div>
  );
}