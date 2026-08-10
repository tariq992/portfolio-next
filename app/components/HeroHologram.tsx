"use client";

import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useState } from 'react';
// Hook to detect theme
function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(isDark ? 'dark' : 'light');
    };

    checkTheme();

    // Observer for theme changes
    const observer = new MutationObserver(() => {
      checkTheme();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return theme;
}

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

function CircuitOrbit({ radius, color, speed, offset, opacity = 0.45 }: { 
  radius: number; 
  color: string; 
  speed: number; 
  offset: number;
  opacity?: number;
}) {
  const lineRef = useRef<THREE.Line>(null);
  const points = useMemo(() => {
    const curvePoints: THREE.Vector3[] = [];
    for (let i = 0; i <= 180; i += 1) {
      const t = (i / 180) * Math.PI * 2;
      curvePoints.push(
        new THREE.Vector3(
          Math.cos(t) * radius,
          Math.sin(t * 2 + offset) * 0.18,
          Math.sin(t) * radius,
        ),
      );
    }
    return curvePoints;
  }, [offset, radius]);

  const line = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ 
      color, 
      transparent: true, 
      opacity 
    });
    return new THREE.Line(geometry, material);
  }, [color, points, opacity]);

  useFrame((state) => {
    if (!lineRef.current) return;
    const time = state.clock.getElapsedTime();
    lineRef.current.rotation.y = time * speed + offset;
    lineRef.current.rotation.x = Math.sin(time * 0.42 + offset) * 0.42;
  });

  return (
    <primitive ref={lineRef} object={line} />
  );
}

function HeroSparkles({ theme }: { theme: 'light' | 'dark' }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 130;

  const positions = useMemo(() => {
    const data = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const base = i * 3;
      data[base] = (Math.random() - 0.5) * 6.2;
      data[base + 1] = (Math.random() - 0.5) * 4.8;
      data[base + 2] = (Math.random() - 0.5) * 4.8;
    }
    return data;
  }, []);

  // Theme-aware colors
  const sparkleColor = useMemo(() => {
    return theme === 'dark' ? '#00d4ff' : '#0066cc';
  }, [theme]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = time * 0.045;
    pointsRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial 
        color={sparkleColor} 
        size={0.035} 
        transparent 
        opacity={theme === 'dark' ? 0.45 : 0.25} 
        sizeAttenuation 
        depthWrite={false} 
      />
    </points>
  );
}

function OrbitingNodes({ theme }: { theme: 'light' | 'dark' }) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Theme-aware node colors
  const nodeColors = useMemo(() => {
    if (theme === 'dark') {
      return ['#00d4ff', '#a855f7', '#ec4899'];
    } else {
      return ['#0066cc', '#7c3aed', '#db2777'];
    }
  }, [theme]);

  const nodes = useMemo(
    () =>
      Array.from({ length: 12 }, (_, index) => {
        const angle = (index / 12) * Math.PI * 2;
        const radius = 2.2 + (index % 3) * 0.34;
        return {
          position: [Math.cos(angle) * radius, Math.sin(index * 1.7) * 0.8, Math.sin(angle) * radius] as [number, number, number],
          size: 0.045 + (index % 4) * 0.012,
          color: nodeColors[index % 3],
          opacity: theme === 'dark' ? 0.95 : 0.7,
        };
      }),
    [nodeColors, theme],
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.y = time * 0.34;
    groupRef.current.rotation.z = Math.sin(time * 0.5) * 0.18;
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, index) => (
        <mesh key={index} position={node.position}>
          <sphereGeometry args={[node.size, 16, 16]} />
          <meshBasicMaterial color={node.color} transparent opacity={node.opacity} />
        </mesh>
      ))}
    </group>
  );
}

function HolographicCore({ theme }: { theme: 'light' | 'dark' }) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const pointerRef = useWindowPointer();

  // Theme-aware colors
  const colors = useMemo(() => {
    if (theme === 'dark') {
      return {
        primary: '#00d4ff',
        secondary: '#a855f7',
        accent: '#ec4899',
        primaryEmissive: '#00d4ff',
        secondaryEmissive: '#a855f7',
        accentEmissive: '#ec4899',
        coreOpacity: 0.66,
        ringOpacity: 0.85,
        wireframeOpacity: 0.28,
        torusOpacity: 0.32,
        energyOpacity: 0.065,
      };
    } else {
      return {
        primary: '#0066cc',
        secondary: '#7c3aed',
        accent: '#db2777',
        primaryEmissive: '#0066cc',
        secondaryEmissive: '#7c3aed',
        accentEmissive: '#db2777',
        coreOpacity: 0.4,
        ringOpacity: 0.6,
        wireframeOpacity: 0.2,
        torusOpacity: 0.25,
        energyOpacity: 0.05,
      };
    }
  }, [theme]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointerRef.current.x * 0.45 + time * 0.12,
        0.045,
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        pointerRef.current.y * 0.28,
        0.045,
      );
    }
    if (coreRef.current) {
      coreRef.current.rotation.x = time * 0.48;
      coreRef.current.rotation.z = time * 0.28;
      const pulse = 1 + Math.sin(time * 2.4) * 0.035;
      coreRef.current.scale.setScalar(pulse);
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 2 + Math.sin(time * 0.7) * 0.18;
      ringRef.current.rotation.z = time * 0.62;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.08, 2]} />
        <meshStandardMaterial
          color={colors.primary}
          emissive={colors.primaryEmissive}
          emissiveIntensity={theme === 'dark' ? 1.2 : 0.6}
          wireframe
          transparent
          opacity={colors.coreOpacity}
        />
      </mesh>

      <mesh ref={ringRef}>
        <torusGeometry args={[1.72, 0.012, 12, 180]} />
        <meshBasicMaterial color={colors.secondary} transparent opacity={colors.ringOpacity} />
      </mesh>

      <mesh rotation={[0.4, 0.8, 0.1]}>
        <octahedronGeometry args={[1.58, 0]} />
        <meshBasicMaterial color={colors.accent} wireframe transparent opacity={colors.wireframeOpacity} />
      </mesh>

      <mesh rotation={[0.2, 0.4, 0.9]}>
        <torusKnotGeometry args={[2.05, 0.012, 240, 8]} />
        <meshBasicMaterial color={colors.primary} transparent opacity={colors.torusOpacity} />
      </mesh>

      <CircuitOrbit 
        radius={2.45} 
        color={colors.primary} 
        speed={0.3} 
        offset={0} 
        opacity={theme === 'dark' ? 0.45 : 0.3}
      />
      <CircuitOrbit 
        radius={2.82} 
        color={colors.secondary} 
        speed={-0.22} 
        offset={1.9}
        opacity={theme === 'dark' ? 0.45 : 0.3}
      />
      <CircuitOrbit 
        radius={3.15} 
        color={colors.accent} 
        speed={0.18} 
        offset={3.2}
        opacity={theme === 'dark' ? 0.45 : 0.3}
      />
      <OrbitingNodes theme={theme} />
    </group>
  );
}

function EnergyFloor({ theme }: { theme: 'light' | 'dark' }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const color = useMemo(() => {
    return theme === 'dark' ? '#00d4ff' : '#0066cc';
  }, [theme]);

  const opacity = useMemo(() => {
    return theme === 'dark' ? 0.065 : 0.04;
  }, [theme]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.position.z = -2.5 + Math.sin(time * 0.35) * 0.2;
    meshRef.current.rotation.z = time * 0.035;
  });

  return (
    <mesh ref={meshRef} position={[0, -2.2, -2.5]} rotation={[Math.PI / 2, 0, 0]}>
      <planeGeometry args={[16, 16, 36, 36]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={opacity} />
    </mesh>
  );
}

export default function HeroHologram() {
  const theme = useTheme();

  return (
    <div className="absolute inset-0 z-0 opacity-70 lg:opacity-100">
      <Canvas
        camera={{ position: [0, 0, 6.8], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        className="pointer-events-none"
      >
        <ambientLight intensity={theme === 'dark' ? 0.7 : 0.4} />
        <pointLight 
          position={[3, 4, 4]} 
          intensity={theme === 'dark' ? 2.5 : 1.5} 
          color={theme === 'dark' ? '#00d4ff' : '#0066cc'} 
        />
        <pointLight 
          position={[-4, -2, 3]} 
          intensity={theme === 'dark' ? 1.8 : 1.0} 
          color={theme === 'dark' ? '#a855f7' : '#7c3aed'} 
        />
        <HolographicCore theme={theme} />
        <EnergyFloor theme={theme} />
        <HeroSparkles theme={theme} />
      </Canvas>
      
      {/* Theme-aware gradient overlay */}
      <div 
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: theme === 'dark' 
            ? 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(10,10,15,0.18) 42%, rgba(10,10,15,0.88) 100%)'
            : 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(255,255,255,0.2) 42%, rgba(255,255,255,0.6) 100%)'
        }}
      />
    </div>
  );
}