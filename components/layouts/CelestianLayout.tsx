'use client'
import React from "react"
import { useState, useEffect } from "react";
import divines from "@/divines"; // Lista aniołów
import { Angel } from "@/lib/types";

const validatedDivines: Angel[] = divines.map(divine => ({
    ...divine,
    id: divine.id || '',
    mantra: divine.mantra || '',
    divineRealm: divine.divineRealm || '',
    celestialHierarchy: divine.celestialHierarchy || '',
    openai_id: divine.openai_id || '',
    image: divine.image || '',
    first_message: divine.first_message || { text: '', associatedHerbs: [] },
}))

const partialMantras = validatedDivines.map(divine => divine.mantra.substring(0, 10));
function getRandomAngels(list: Angel[], count: number): Angel[] {
    const shuffled = [...list].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

import Image from 'next/image';

interface CelestianLayoutProps {
    visitors: React.ReactElement[];
    children: React.ReactElement;
}

export default function CelestianLayout({ children, visitors }: CelestianLayoutProps) {
    const [randomAngels, setRandomAngels] = useState<Angel[]>([]);
    const shuffled = validatedDivines.sort(() => 0.5 - Math.random()).slice(0, 4);

    useEffect(() => {
        setRandomAngels(getRandomAngels(validatedDivines, 4));
    }, []);

    const assignGuardianAngels = (visitorsCount: number): Angel[] => {
        return getRandomAngels(validatedDivines, visitorsCount);
      };
      
      const [guardianAngels, setGuardianAngels] = useState<Angel[]>([]);
      
      useEffect(() => {
        setGuardianAngels(assignGuardianAngels(visitors.length));
      }, [visitors]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50/50 to-indigo-100/50 flex">

            {/* Lewa nawigacja */}
            <aside className="w-16 flex flex-col items-center justify-center space-y-4 p-4">
                <main className="flex-1 flex flex-col space-y-4 p-6 relative">
                </main>
                <nav className="flex flex-col space-y-4 mt-6">
                    {randomAngels.map((_, i) => (
                        <div key={i} className="w-10 h-10 bg-blue-100 rounded-full animate-pulse">
                            <Image alt={_.mantra} src={`/avatars/${_.name}.png`} />
                        </div>
                    ))}
                </nav>
            </aside>

            <main className="flex-1 flex flex-col space-y-4 p-6 relative">
                {visitors.map((visitor, index) => (
                    <div key={index} className="visitor-container w-full flex justify-center p-4">
                    <div className="bg-gradient-to-r from-indigo-600/30 to-indigo-900/50 text-white text-center p-4 rounded-lg shadow-xl w-3/4 animate-fade-in">
                        <p className="text-lg font-semibold drop-shadow-lg">✨ Visitor {index + 1} ✨</p>
                        {visitor}
                    </div>
                    </div>
                ))}
            </main>

            {/* Główna zawartość */}
            <main className="flex-1 flex flex-col space-y-4 p-6 relative">
                {children}
            </main>

            {/* Prawa sekcja */}
            <aside className="w-64 p-6">
                <div className="h-full bg-blue-100 rounded-lg animate-pulse"></div>
            </aside>

            {/* Górny pasek */}
            <div className="absolute top-4 right-4 flex space-x-3">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-10 h-10 bg-blue-100 rounded-full animate-pulse"></div>
                ))}
            </div>
        </div>
    );
}