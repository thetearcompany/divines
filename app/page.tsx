"use client"

import { useState, useEffect, useCallback } from "react"
import { AngelCarousel } from "@/components/angel-carousel"
import { angels } from "@/lib/data"
import type { Angel, ChatHistoryItem, UserProfile, CelestialEvent } from "@/lib/types"
import divines from "@/divines"

export default function Home() {
  const [angel, setSelectedAngel] = useState<Angel>(divines[0] as unknown as Angel)
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([])

  const handleAngelSelect = useCallback((angel: Angel) => {
    
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-indigo-100">
      <AngelCarousel angels={angels} onSelectAngel={handleAngelSelect} />
      <div className="divine-light size-full fixed top-0 left-0 right-0 bottom-0 z-[-1]" />
    </div>)
}

