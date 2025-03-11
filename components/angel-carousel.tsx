"use client"

import { useState, useEffect, useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Text } from "@react-three/drei"
import { Particles } from "./particles"
import type { Angel } from "@/lib/types"
import { Button } from "@/components/ui/button"
import * as THREE from "three"

interface AngelCarouselProps {
  angels: Angel[]
  onSelectAngel: (angel: Angel) => void
}

interface AngelCardProps {
  angel: Angel
  isActive: boolean
  onClick: () => void
  position: [number, number, number]
}
const AngelCard = ({ angel, isActive, onClick, position }: AngelCardProps) => {

  const meshRef = useRef<THREE.Mesh>(null)
  const color = new THREE.Color(angel.associatedColors[0] || "#ffffff")

  useFrame((state) => {
    if (isActive) {
      if (meshRef.current) {
        meshRef.current.rotation.y += 0.01
      }
    }
  })

  return (
    <group position={position} onClick={onClick}>
      <mesh ref={meshRef}>
        <boxGeometry args={[3, 4, 0.2]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <Text position={[0, 0, 0.11]} fontSize={0.5} color="#000000" anchorX="center" anchorY="middle">
        {angel.symbol.split(" ")[0]}
      </Text>
    </group>
  )
}

interface CarouselSceneProps {
  angels: Angel[]
  activeIndex: number
  setActiveIndex: (index: number) => void
  onSelectAngel: (angel: Angel) => void
}

const CarouselScene = ({ angels, activeIndex, setActiveIndex, onSelectAngel }: CarouselSceneProps) => {
  const groupRef = useRef<THREE.Group>(null)
  const { viewport } = useThree()

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, -activeIndex * 4, 0.1)
    }
  })

  const handleWheel = (event: WheelEvent) => {
    if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
      const direction = event.deltaX > 0 ? 1 : -1
      setActiveIndex((prev: number) => (prev + direction + angels.length) % angels.length)
    }
  }

  useEffect(() => {
    window.addEventListener("wheel", handleWheel)
    return () => window.removeEventListener("wheel", handleWheel)
  }, [])

  return (
    <group ref={groupRef}>
      {angels.map((angel: Angel, index: number) => (
        <AngelCard
          key={angel.id}
          angel={angel}
          isActive={index === activeIndex}
          onClick={() => onSelectAngel(angel)}
          position={[index * 4, 0, 0]}
        />
      ))}
    </group>
  )
}

export default function AngelCarousel({ angels, onSelectAngel }: AngelCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="h-[70vh] w-full relative">
      <Canvas camera={{ position: [0, 0, 10] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Particles count={1000} />
        <CarouselScene
          angels={angels}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          onSelectAngel={onSelectAngel}
        />
      </Canvas>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {angels.map((_, index) => (
          <Button
            key={index}
            variant={index === activeIndex ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}

