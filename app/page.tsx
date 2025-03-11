'use client'
import { AngelCarousel } from "@/components/angel-carousel"
import { angels } from "@/lib/data"
import { useStore } from "@/hooks/use-store"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50/50 to-indigo-100/50">
      <AngelCarousel />
    </div>)
}

