"use client"

import { useState, useEffect, useCallback } from "react"
import { AngelCarousel } from "@/components/angel-carousel"
import { angels } from "@/lib/data"
import type { Angel } from "@/lib/types"
import divines from "@/divines"
import { useStore } from "@/hooks/use-store"

export default function Home() {

  const {currentAngel, setCurrentAngel, message} = useStore();

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-indigo-100">
      <AngelCarousel angels={angels} onSelectAngel={setCurrentAngel} current={currentAngel} message={message} />
      <div className="divine-light size-full fixed top-0 left-0 right-0 bottom-0 z-[-1]" />
    </div>)
}

