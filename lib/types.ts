export interface Angel {
  name: string
  id: string
  attributes: string[]
  problems: string[]
  description: string
  how_to_connect: string
  symbol: string
  divineRealm: string
  celestialHierarchy: string
  sacredGeometry: string
  associatedColors: string[]
  associatedCrystals: string[]
  associatedHerbs: string[]
  mantra: string
}

export interface ChatHistoryItem {
  id: string
  angels: Angel[]
  preview: string
  timestamp: Date
  energyLevel: number
  spiritualInsights: string[]
  divinationResults: DivinationResult[]
}

export interface DivinationResult {
  type: "tarot" | "runes" | "iChing"
  result: string
  interpretation: string
}

export interface UserProfile {
  id: string
  name: string
  spiritualPath: string
  favoriteAngels: string[]
  energyLevel: number
  karmaPoints: number
  achievements: Achievement[]
}

export interface Achievement {
  id: string
  name: string
  description: string
  unlockedAt: Date
}

export interface CelestialEvent {
  id: string
  name: string
  description: string
  date: Date
  associatedAngels: string[]
  energyImpact: number
}

export interface SpiritualPractice {
  id: string
  name: string
  description: string
  duration: number
  energyGain: number
  associatedAngels: string[]
}

