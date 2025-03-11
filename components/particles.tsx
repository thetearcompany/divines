import { useRef } from "react";
import { Points, PointMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Particles() {
  const ref = useRef<THREE.Points>(null!);
  const sphere = new Float32Array(3000);

  for (let i = 0; i < sphere.length; i += 3) {
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = Math.pow(Math.random(), 0.5) * 4.5;
    sphere[i] = r * Math.sin(phi) * Math.cos(theta);
    sphere[i + 1] = r * Math.sin(phi) * Math.sin(theta);
    sphere[i + 2] = r * Math.cos(phi);
  }

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.02;
      ref.current.rotation.x += Math.sin(state.clock.getElapsedTime()) * 0.01; // Subtelny obrót
    }
  });

  return (
    <group>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color={[1, 0.8, 0.2]} // Złoty blask
          size={0.02}
          depthWrite={false}
        />
      </Points>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color={[0.5, 0.1, 0.7]} // Indigo
          size={0.02}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}