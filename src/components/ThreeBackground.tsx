import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// A single moving packet along the circuit trace
interface PacketData {
  startNode: THREE.Vector3;
  endNode: THREE.Vector3;
  progress: number;
  speed: number;
}

const CircuitGrid = () => {
  const lineRef = useRef<THREE.LineSegments>(null!);
  const pointsRef = useRef<THREE.Points>(null!);
  const lightRef = useRef<THREE.PointLight>(null!);

  // Generate grid nodes and connection lines
  const { positions, linePositions, nodeCount } = useMemo(() => {
    const size = 5; // Grid size (5x5)
    const spacing = 1.6;
    const tempPositions: number[] = [];
    const tempLinePositions: number[] = [];
    const nodes: THREE.Vector3[] = [];

    // Create a 2D grid in XZ plane, slightly tilted and positioned
    for (let x = -size; x <= size; x++) {
      for (let z = -size; z <= size; z++) {
        // Add some noise to height (Y) to make it look 3D and dynamic
        const y = Math.sin(x * 0.5) * Math.cos(z * 0.5) * 0.4;
        const pos = new THREE.Vector3(x * spacing, y, z * spacing);
        nodes.push(pos);
        tempPositions.push(pos.x, pos.y, pos.z);
      }
    }

    // Connect nodes to form trace lines
    const stride = size * 2 + 1;
    for (let i = 0; i < nodes.length; i++) {
      const xIndex = Math.floor(i / stride);
      const zIndex = i % stride;

      // Connect to right neighbor
      if (zIndex < stride - 1) {
        const n1 = nodes[i];
        const n2 = nodes[i + 1];
        tempLinePositions.push(n1.x, n1.y, n1.z, n2.x, n2.y, n2.z);
      }
      // Connect to bottom neighbor
      if (xIndex < stride - 1) {
        const n1 = nodes[i];
        const n2 = nodes[i + stride];
        tempLinePositions.push(n1.x, n1.y, n1.z, n2.x, n2.y, n2.z);
      }
    }

    return {
      positions: new Float32Array(tempPositions),
      linePositions: new Float32Array(tempLinePositions),
      nodeCount: nodes.length
    };
  }, []);

  // Packets of data pulsing through the network
  const packets = useRef<PacketData[]>([]);

  // Initialize packets
  useMemo(() => {
    const size = 5;
    const stride = size * 2 + 1;
    const spacing = 1.6;
    for (let p = 0; p < 12; p++) {
      // Pick random node index and a neighbor
      const r1 = Math.floor(Math.random() * (nodeCount - stride - 1));
      const r2 = r1 + (Math.random() > 0.5 ? 1 : stride);
      
      const y1 = Math.sin(Math.floor(r1 / stride) * 0.5) * Math.cos((r1 % stride) * 0.5) * 0.4;
      const y2 = Math.sin(Math.floor(r2 / stride) * 0.5) * Math.cos((r2 % stride) * 0.5) * 0.4;

      packets.current.push({
        startNode: new THREE.Vector3(Math.floor(r1 / stride - size) * spacing, y1, (r1 % stride - size) * spacing),
        endNode: new THREE.Vector3(Math.floor(r2 / stride - size) * spacing, y2, (r2 % stride - size) * spacing),
        progress: Math.random(),
        speed: 0.005 + Math.random() * 0.008
      });
    }
  }, [nodeCount]);

  const packetPointsRef = useRef<THREE.Points>(null!);
  const packetGeo = useRef<THREE.BufferGeometry>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Slow ambient rotation of the wafer grid
    lineRef.current.rotation.y = time * 0.015;
    lineRef.current.rotation.x = -0.6 + Math.sin(time * 0.05) * 0.05; // Fixed angle base tilt
    pointsRef.current.rotation.copy(lineRef.current.rotation);
    packetPointsRef.current.rotation.copy(lineRef.current.rotation);

    // Track mouse pointer and cast a glowing copper halo
    const targetX = state.pointer.x * 6;
    const targetY = state.pointer.y * 4;
    lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, targetX, 0.05);
    lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, targetY, 0.05);

    // Animate packets along line traces
    const packetPositions = new Float32Array(packets.current.length * 3);
    packets.current.forEach((packet, idx) => {
      packet.progress += packet.speed;
      if (packet.progress >= 1) {
        packet.progress = 0;
      }
      
      // Interpolate position
      const pos = new THREE.Vector3().lerpVectors(packet.startNode, packet.endNode, packet.progress);
      packetPositions[idx * 3] = pos.x;
      packetPositions[idx * 3 + 1] = pos.y;
      packetPositions[idx * 3 + 2] = pos.z;
    });

    if (packetGeo.current) {
      packetGeo.current.setAttribute(
        'position',
        new THREE.BufferAttribute(packetPositions, 3)
      );
      packetGeo.current.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Dynamic Cursor Light Source (Copper Orange glow behind cards) */}
      <pointLight
        ref={lightRef}
        intensity={2.5}
        distance={8}
        color="#F05206"
        position={[0, 0, 2]}
      />

      {/* Grid Trace Lines */}
      <lineSegments ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#0F1D36" transparent opacity={0.25} linewidth={1} />
      </lineSegments>

      {/* Connection Node Terminals */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          color="#0F1D36"
          transparent
          opacity={0.4}
          sizeAttenuation
        />
      </points>

      {/* Pulsing Data Packet Particles (Copper Orange) */}
      <points ref={packetPointsRef}>
        <bufferGeometry ref={packetGeo}>
          <bufferAttribute
            attach="attributes-position"
            count={packets.current.length}
            array={new Float32Array(packets.current.length * 3)}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.18}
          color="#F05206"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
    </group>
  );
};

const ThreeBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none bg-[#F8FAFC]">
      {/* Background Gradient Layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#E2E8F0] opacity-80" />
      
      {/* Ambient Silicon Glow Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E2E8F0_1px,transparent_1px),linear-gradient(to_bottom,#E2E8F0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />

      <Canvas camera={{ position: [0, 0, 7], fov: 55 }}>
        <ambientLight intensity={0.4} />
        <pointLight intensity={1.5} color="#0F1D36" position={[10, 10, 5]} />
        <pointLight intensity={1.0} color="#F1F5F9" position={[-10, -10, -5]} />
        <CircuitGrid />
      </Canvas>
    </div>
  );
};

export default ThreeBackground;
