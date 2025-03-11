"use client"

import { useState, useEffect } from "react"
import { AngelCarousel } from "@/components/angel-carousel"
import ChatInterface from "@/components/chat-interface"
import ConversationHistory from "@/components/conversation-history"
import { angels } from "@/lib/data"
import type { Angel, ChatHistoryItem, UserProfile, CelestialEvent } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export default function Home() {
  const [selectedAngel, setSelectedAngel] = useState<Angel | null>(null)
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([])
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [celestialEvents, setCelestialEvents] = useState<CelestialEvent[]>([])

  useEffect(() => {
    const savedHistory = localStorage.getItem("chatHistory")
    if (savedHistory) {
      setChatHistory(JSON.parse(savedHistory))
    }

    setUserProfile({
      id: "1",
      name: "Spiritual Seeker",
      spiritualPath: "Path of Divine Wisdom",
      favoriteAngels: ["SAITEL", "MELOHEL"],
      energyLevel: 75,
      karmaPoints: 150,
      achievements: [
        {
          id: "1",
          name: "Divine Communicator",
          description: "Completed 10 angelic conversations",
          unlockedAt: new Date(),
        },
      ],
    })

    setCelestialEvents([
      {
        id: "1",
        name: "Great Angelic Alignment",
        description: "A powerful alignment enhancing angelic communication across all realms",
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        associatedAngels: ["SAITEL", "ZADKIEL", "URIEL"],
        energyImpact: 30,
      },
    ])
  }, [])

  const handleAngelSelect = (angel: Angel) => {
    setSelectedAngel(angel)
    const newConversation: ChatHistoryItem = {
      id: Date.now().toString(),
      angels: [angel],
      preview: "New divine conversation",
      timestamp: new Date(),
      energyLevel: 50,
      spiritualInsights: [],
      divinationResults: [],
    }
    const updatedHistory = [newConversation, ...chatHistory]
    setChatHistory(updatedHistory)
    localStorage.setItem("chatHistory", JSON.stringify(updatedHistory))
  }

  const handleSelectConversation = (conversation: ChatHistoryItem) => {
    setSelectedAngel(conversation.angels[0])
  }

  const handleDeleteConversation = (conversationId: string) => {
    const updatedHistory = chatHistory.filter((item) => item.id !== conversationId)
    setChatHistory(updatedHistory)
    localStorage.setItem("chatHistory", JSON.stringify(updatedHistory))
  }

  const handleBackToHome = () => {
    setSelectedAngel(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-indigo-100">
      <AngelCarousel angels={angels} onSelectAngel={handleAngelSelect} />
      <div className="divine-light size-full fixed" />
    </div>)
}

