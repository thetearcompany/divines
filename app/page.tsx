'use client'
import { AngelCarousel } from "@/components/angel-carousel"
import { angels } from "@/lib/data"
import { useStore } from "@/hooks/use-store"

export default function Home() {

  const {currentAngel, setCurrentAngel, message} = useStore();

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-indigo-100">
      <AngelCarousel angels={angels} onSelectAngel={setCurrentAngel} current={currentAngel} message={message} />
    </div>)
}

