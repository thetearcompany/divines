'use client'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

import divines from '@/divines'
import useEmblaCarousel from 'embla-carousel-react'
import { useEffect, useRef } from "react"
import AngelCard from "./angel-card";

import { useState } from "react";

const auraOptions = [
  "Seeker of Truth",
  "Wanderer of Light",
  "Guardian of Secrets",
  "Bearer of Hope",
  "Echo of Eternity",
  "Disciple of Stars",
  "Voice of Silence",
  "Architect of Destiny"
];

export function AngelCarousel() {
  const [visitorName, setVisitorName] = useState("Visitor");
  const [visitorAura, setVisitorAura] = useState(auraOptions[Math.floor(Math.random() * auraOptions.length)]);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisitorAura(auraOptions[Math.floor(Math.random() * auraOptions.length)]);
    }, 9000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      
      {/* Visitor Container */}
      <div className="bg-gradient-to-r from-indigo-600/30 to-indigo-900/50 text-center p-4 rounded-lg">
  <p className="text-lg font-semibold drop-shadow-lg">✨ {visitorName} ✨</p>
  <p className="text-sm opacity-100 drop-shadow-lg">{visitorAura}</p>
</div>

      {/* Input do zmiany imienia */}
      <div className="w-full flex justify-center mt-4">
        <input
          type="text"
          className="p-2 rounded-md border border-indigo-400 focus:outline-none text-center"
          placeholder="Enter your celestial name..."
          onChange={(e) => setVisitorName(e.target.value)}
        />
      </div>

      {/* Dropdown do zmiany aury */}
      <div className="w-full flex justify-center mt-4">
        <select
          className="p-2 rounded-md border border-indigo-400 focus:outline-none"
          onChange={(e) => setVisitorAura(e.target.value)}
          value={visitorAura}
        >
          {auraOptions.map((aura) => (
            <option key={aura} value={aura}>
              {aura}
            </option>
          ))}
        </select>
      </div>

      {/* Karuzela */}
      <Carousel>
        <CarouselContent>
          {divines.map((guide, index) => (
            <CarouselItem key={guide.openai_id} className="cursor-pointer pl-4 md:basis-1/3 h-full">
              <div className="inset-0 backdrop-blur-2xl flex items-center justify-center p-6">
                <AngelCard angel={guide} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}