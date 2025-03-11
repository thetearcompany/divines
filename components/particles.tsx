"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export function Particles({ count }) {
  const mesh = useRef()
  const light = useRef()

  const particles = useMemo(() => {
    const temp = new THREE.Vector3()
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      temp.set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1)
      temp.normalize().multiplyScalar(Math.random() * 10)
      positions[i3] = temp.x
      positions[i3 + 1] = temp.y
      positions[i3 + 2] = temp.z

      const color = new THREE.Color()
      color.setHSL(Math.random(), 0.7, 0.5)
      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b

      sizes[i] = Math.random() * 0.1
    }

    return { positions, colors, sizes }
  }, [count])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    mesh.current.rotation.x = Math.sin(time / 10)
    mesh.current.rotation.y = Math.cos(time / 10)
    light.current.position.x = Math.sin(time) * 3
    light.current.position.y = Math.cos(time) * 3
  })

  return (
    <group>
      <points ref={mesh}>
        <bufferGeometry>
          <bufferAttribute
            attachObject={["attributes", "position"]}
            count={particles.positions.length / 3}
            array={particles.positions}
            itemSize={3}
          />
          <bufferAttribute
            attachObject={["attributes", "color"]}
            count={particles.colors.length / 3}
            array={particles.colors}
            itemSize={3}
          />
          <bufferAttribute
            attachObject={["attributes", "size"]}
            count={particles.sizes.length}
            array={particles.sizes}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial size={0.1} vertexColors sizeAttenuation />
      </points>
      <pointLight ref={light} distance={40} intensity={8} color="white" />
    </group>
  )
}

