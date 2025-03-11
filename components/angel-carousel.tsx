import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Angel } from "@/lib/types"
import { Canvas } from "@react-three/fiber";
import Particles from "@/components/particles";

interface AngelCarouselProps {
  angels: Angel[]
  onSelectAngel: (angel: Angel) => void;
}

import divines from '@/components/divines'
import Image from "next/image"
import useEmblaCarousel from 'embla-carousel-react'
import { Button } from "./ui/button"
import { useRef } from "react"

export function AngelCarousel(props: AngelCarouselProps) {

  const [emblaApi, setApi] = useEmblaCarousel();
  const emblaRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="relative">
      <Carousel
      plugins={[]}
      opts={{ loop: true, align: "center" }}
      setApi={() => emblaApi}
      ref={emblaRef}
      >
        <div className="absolute inset-y-0 left-0 md:w-[27px] bg-gradient-to-r from-background to-transparent z-20 pointer-events-none opacity/40" />
        <div className="opacity-70 absolute inset-y-0 left-0 w-48 backdrop-blur-sm bg-gradient-to-r from-indigo-900/40 to-transparent z-10 pointer-events-none opacity/40" />
        <div className="absolute inset-y-0 right-0 md:w-[27px] bg-gradient-to-l from-background to-transparent z-20 pointer-events-none opacity/40" />
        <div className="opacity-70 absolute inset-y-0 right-0 w-48 backdrop-blur-sm bg-gradient-to-l from-indigo-900/40 to-transparent z-10 pointer-events-none opacity/40" />

        <div className="layout-background-bottom absolute opacity-10" />

        <CarouselContent>
          {divines.map((guide, index) => {
            return (
              <CarouselItem
                key={guide.openai_id}
                className="cursor-pointer pl-4 md:basis-1/2 h-full"
              >
                <div
                  className="inset-0 backdrop-blur-2xl flex items-center justify-center p-6"
                >
                  <div
                    className="bg-white/10 max-w-lg w-full rounded-2xl shadow-2xl border border-indigo-500/30 relative"
                  >
                    {/* Header with Image */}
                    <div className="relative p-6 text-center">
                      <div className="w-24 h-24 overflow-hidden rounded-full mx-auto border-4 border-indigo-300 shadow-md">
                        <Image
                          src={guide.image || "/placeholder.svg"}
                          alt={guide.name}
                          width={101}
                          height={101}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <h3 className="text-2xl font-serif font-bold mt-4 text-indigo-400">{guide.name}</h3>
                      <p className="text-sm opacity-80 mt-2 px-4">{guide.description}</p>
                    </div>


                    <div className="px-6 py-4 bg-indigo-400/30 border-t border-indigo-500/30">
                      <h5 className="font-medium mb-2 text-sm text-indigo-400">How to Connect</h5>
                      <p className="text-xs text-amber-100 opacity-80">{guide.how_to_connect}</p>
                    </div>

                    {/* Attributes & Problems */}
                    <div className="px-6 py-4 bg-indigo-900/10 border-t border-indigo-500/30">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-indigo-400/20 p-4 rounded-lg border border-indigo-500/30">
                          <h5 className="font-medium mb-2 text-sm text-indigo-400">Attributes</h5>
                          {Array.isArray(guide.attributes) && (
                            <ul className="space-y-2">
                              {guide.attributes.map((attr, i) => (
                                <li key={i} className="flex items-center gap-2 text-xs text-amber-100">
                                  <span className="w-1.5 h-1.5 bg-amber-400/80 rounded-full"></span>
                                  <span>{attr}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>

                        <div className="bg-indigo-400/20 p-4 rounded-lg border border-indigo-500/30">
                          <h5 className="font-medium mb-2 text-sm text-indigo-400">Solves Problems</h5>
                          <ul className="space-y-2">
                            {guide.problems?.map((prob, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs text-amber-100">
                                <span className="w-1.5 h-1.5 bg-amber-400/60 rounded-full mt-1"></span>
                                <span>{prob}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Sekcja wpisywania wiadomości */}
                    <div className="flex items-center p-6 border-t border-indigo-500/30">
                      <input
                        type="text"
                        placeholder=""
                        className="flex-1 p-2 bg-indigo-400/30 text-amber-100 border border-indigo-500/30 rounded-lg focus:ring focus:ring-indigo-400"
                      />
                      <Button size="sm" className="ml-3 bg-indigo-600 hover:bg-indigo-700">
                        Send
                      </Button>
                    </div>
                    {/* Dynamic Background Glow */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-950 opacity-30 z-[-1]" />
                  </div>
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>
    </div>
  )
}