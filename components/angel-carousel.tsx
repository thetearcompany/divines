'use client'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

import {angels} from '@/lib/data'

import useEmblaCarousel from 'embla-carousel-react'
import { useRef } from "react"
import AngelCard from "./angel-card";

import Autoplay from 'embla-carousel-autoplay'

export function AngelCarousel() {

  const [emblaApi, setApi] = useEmblaCarousel();
  const emblaRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="relative">
      <Carousel
      plugins={[Autoplay({ delay: 11720})]}
      opts={{ loop: true, align: "center" }}
      setApi={() => emblaApi}
      ref={emblaRef}
      >
        {/* <div className="absolute inset-y-0 left-0 xs:w md:w-[27px] bg-gradient-to-r from-background to-transparent z-20 pointer-events-none opacity/40" /> */}
        {/* <div className="opacity-70 absolute inset-y-0 left-0 w-48 backdrop-blur-sm bg-gradient-to-r from-indigo-900/40 to-transparent z-10 pointer-events-none opacity/40" /> */}
        {/* <div className="absolute inset-y-0 right-0 md:w-[27px] bg-gradient-to-l from-background to-transparent z-20 pointer-events-none opacity/40" /> */}
        {/* <div className="opacity-70 absolute inset-y-0 right-0 w-48 backdrop-blur-sm bg-gradient-to-l from-indigo-900/40 to-transparent z-10 pointer-events-none opacity/40" /> */}

        <CarouselContent>
          {angels.map((guide, index) => {
            return (
              <CarouselItem
                key={guide.id}
                className="cursor-pointer pl-4 md:basis-1/2 h-full"
              >
                <div
                  className="inset-0 backdrop-blur-2xl flex items-center justify-center p-6"
                >
                  <AngelCard angel={guide} />
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>
    </div>
  )
}