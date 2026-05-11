import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COLORS = ['#7C3AED', '#A78BFA', '#0EA5E9', '#38BDF8', '#C4B5FD'];

const ParticleField = () => {
  const points = useRef<THREE.Points>(null!);
  const count = 1000;

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
      const colorHex = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
      const color = new THREE.Color(colorHex);
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    points.current.rotation.y = time * 0.05;
    points.current.rotation.x = time * 0.02;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
};

const OrbitalRings = () => {
  const group = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    group.current.children.forEach((child, i) => {
      child.rotation.x = time * (0.1 + i * 0.05);
      child.rotation.y = time * (0.15 + i * 0.03);
    });
  });

  return (
    <group ref={group}>
      {[2, 2.8, 3.5].map((radius, i) => (
        <mesh key={i} rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}>
          <ringGeometry args={[radius, radius + 0.01, 64]} />
          <meshBasicMaterial color="#A78BFA" transparent opacity={0.3} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
};

const CentralOrb = () => {
  const mesh = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    mesh.current.scale.setScalar(1 + Math.sin(time) * 0.05);
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[1.2, 32, 32]} />
      <meshStandardMaterial
        color="#7C3AED"
        emissive="#4C1D95"
        emissiveIntensity={0.5}
        transparent
        opacity={0.3}
      />
    </mesh>
  );
};

const ThreeBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <div className="absolute inset-0 bg-[#FAFAFA]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/5 blur-[120px] rounded-full pointer-events-none" />

      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <pointLight intensity={1.8} color="#7C3AED" position={[10, 10, 10]} />
        <pointLight intensity={1.0} color="#0EA5E9" position={[-10, -10, -10]} />
        <ParticleField />
        <OrbitalRings />
        <CentralOrb />
      </Canvas>
    </div>
  );
};

export default ThreeBackground;
