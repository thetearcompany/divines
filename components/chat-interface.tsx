"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, ArrowLeft, PlusCircle, X, Sparkles, Feather, Moon, Sun } from "lucide-react"
import type { Angel, ChatHistoryItem, DivinationResult, SpiritualPractice } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { useChat } from "ai/react"
import { angels } from "@/lib/data"
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Canvas } from "@react-three/fiber"
import { Text, Stars } from "@react-three/drei"

interface ChatInterfaceProps {
  initialAngel: Angel
  onBack: () => void
  chatHistory: ChatHistoryItem[]
  setChatHistory: React.Dispatch<React.SetStateAction<ChatHistoryItem[]>>
}

const CelestialBackground = () => (
  <Canvas style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
  </Canvas>
)

const AngelicPresence = ({ angel }) => (
  <div className="absolute top-20 right-5 w-40 h-40">
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Text position={[0, 0, 0]} fontSize={1.5} color={angel.associatedColors[0]} anchorX="center" anchorY="middle">
        {angel.symbol.split(" ")[0]}
      </Text>
    </Canvas>
  </div>
)

export default function ChatInterface({ initialAngel, onBack, chatHistory, setChatHistory }: ChatInterfaceProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [activeAngels, setActiveAngels] = useState<Angel[]>([initialAngel])
  const [currentAngel, setCurrentAngel] = useState<Angel>(initialAngel)
  const [showAngelSelector, setShowAngelSelector] = useState(false)
  const [energyLevel, setEnergyLevel] = useState(50)
  const [showDivinationResults, setShowDivinationResults] = useState(false)
  const [divinationResults, setDivinationResults] = useState<DivinationResult[]>([])
  const [showSpiritualPractices, setShowSpiritualPractices] = useState(false)
  const [spiritualPractices, setSpiritualPractices] = useState<SpiritualPractice[]>([])
  const [isDarkMode, setIsDarkMode] = useState(false)

  const { messages, input, handleInputChange, handleSubmit, setMessages } = useChat({
    api: "/api/chat",
    body: { angelIds: activeAngels.map((a) => a.id) },
  })

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1]
      const updatedHistory = chatHistory.map((item) =>
        item.angels.some((a) => a.id === currentAngel.id)
          ? { ...item, preview: lastMessage.content.slice(0, 50) + "...", timestamp: new Date() }
          : item,
      )
      setChatHistory(updatedHistory)
      localStorage.setItem("chatHistory", JSON.stringify(updatedHistory))
      setEnergyLevel((prev) => Math.min(100, prev + Math.random() * 10))
    }
  }, [messages, currentAngel, chatHistory, setChatHistory])

  const handleAddAngel = (angel: Angel) => {
    if (!activeAngels.find((a) => a.id === angel.id)) {
      setActiveAngels([...activeAngels, angel])
    }
    setShowAngelSelector(false)
  }

  const handleRemoveAngel = (angel: Angel) => {
    if (activeAngels.length > 1) {
      setActiveAngels(activeAngels.filter((a) => a.id !== angel.id))
      if (currentAngel.id === angel.id) {
        setCurrentAngel(activeAngels.find((a) => a.id !== angel.id) || activeAngels[0])
      }
    }
  }

  const handleSwitchAngel = (angel: Angel) => {
    setCurrentAngel(angel)
    setMessages([
      ...messages,
      {
        id: Date.now().toString(),
        role: "system",
        content: `${angel.name} has joined the conversation. ${angel.mantra}`,
      },
    ])
  }

  const customHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }
    setMessages([...messages, newMessage])
    handleSubmit(e)
  }

  const performDivination = () => {
    const newDivinationResult: DivinationResult = {
      type: Math.random() > 0.5 ? "tarot" : "runes",
      result: `Card/Rune ${Math.floor(Math.random() * 78) + 1}`,
      interpretation: "This divine message suggests a period of spiritual growth and enlightenment.",
    }
    setDivinationResults([...divinationResults, newDivinationResult])
    setShowDivinationResults(true)
  }

  const getSpiritualPractices = () => {
    const newPractices: SpiritualPractice[] = [
      {
        id: "1",
        name: "Angelic Meditation",
        description: `Connect with ${currentAngel.name} through guided meditation.`,
        duration: 15,
        energyGain: 20,
        associatedAngels: [currentAngel.name],
      },
      {
        id: "2",
        name: "Sacred Geometry Visualization",
        description: `Visualize and connect with the ${currentAngel.sacredGeometry} of ${currentAngel.name}.`,
        duration: 10,
        energyGain: 15,
        associatedAngels: [currentAngel.name],
      },
    ]
    setSpiritualPractices(newPractices)
    setShowSpiritualPractices(true)
  }

  return (
    <TooltipProvider>
      <div
        className={`flex flex-col h-full relative ${isDarkMode ? "bg-gray-900 text-white" : "bg-gradient-to-b from-indigo-50 to-indigo-100"}`}
      >
        <CelestialBackground />
        <div className="flex items-center p-4 border-b border-amber-200 bg-opacity-80 backdrop-blur-sm z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="mr-2 text-amber-700 hover:text-amber-900 hover:bg-amber-100"
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="flex items-center space-x-2 overflow-x-auto">
            {activeAngels.map((angel) => (
              <div
                key={angel.id}
                className={`flex items-center p-2 rounded-full cursor-pointer ${
                  currentAngel.id === angel.id ? "bg-amber-200" : "bg-amber-100"
                }`}
                onClick={() => handleSwitchAngel(angel)}
              >
                <span className="text-xl mr-2">{angel.symbol.split(" ")[0]}</span>
                <span className="text-sm font-semibold">{angel.name}</span>
                {activeAngels.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRemoveAngel(angel)
                    }}
                    className="ml-2 text-amber-700 hover:text-amber-900 hover:bg-amber-200"
                  >
                    <X size={16} />
                  </Button>
                )}
              </div>
            ))}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowAngelSelector(true)}
              className="text-amber-700 hover:text-amber-900 hover:bg-amber-100"
            >
              <PlusCircle size={24} />
            </Button>
          </div>
          <div className="ml-auto flex items-center space-x-2">
            <Tooltip content="Perform Divination">
              <Button variant="ghost" size="icon" onClick={performDivination}>
                <Sparkles size={20} />
              </Button>
            </Tooltip>
            <Tooltip content="Spiritual Practices">
              <Button variant="ghost" size="icon" onClick={getSpiritualPractices}>
                <Feather size={20} />
              </Button>
            </Tooltip>
            <Tooltip content="Toggle Dark Mode">
              <Button variant="ghost" size="icon" onClick={() => setIsDarkMode(!isDarkMode)}>
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </Button>
            </Tooltip>
            <Tooltip content="Energy Level">
              <div className="w-32">
                <Progress value={energyLevel} className="h-2" />
              </div>
            </Tooltip>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 relative">
          <AnimatePresence>
            {messages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center h-full text-center"
              >
                <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                  <span className="text-2xl">{currentAngel.symbol.split(" ")[0]}</span>
                </div>
                <h3 className="text-lg font-medium mb-2">{currentAngel.name}</h3>
                <p className="text-sm max-w-md mb-4">{currentAngel.description}</p>
                <p className="text-sm max-w-md mb-4">{currentAngel.how_to_connect}</p>
                <p className="text-sm font-semibold">Attributes: {currentAngel.attributes.join(", ")}</p>
                <p className="text-sm font-semibold mt-2">Helps with: {currentAngel.problems.join(", ")}</p>
                <p className="text-sm italic mt-4">"{currentAngel.mantra}"</p>
              </motion.div>
            ) : (
              messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`mb-4 flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-amber-500 to-amber-400 text-white"
                        : message.role === "system"
                          ? "bg-gray-200 text-gray-800"
                          : "bg-white border border-amber-200 text-amber-900"
                    }`}
                  >
                    {message.content}
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        <AngelicPresence angel={currentAngel} />

        <div className="p-4 border-t border-amber-200 bg-opacity-80 backdrop-blur-sm z-10">
          <form onSubmit={customHandleSubmit} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder={`Ask ${currentAngel.name} for guidance...`}
              className="flex-1 rounded-full border border-amber-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <Button
              type="submit"
              className="rounded-full bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-600 hover:to-amber-500 text-white"
            >
              <Send size={18} />
            </Button>
          </form>
        </div>

        {showAngelSelector && (
          <Dialog open={showAngelSelector} onOpenChange={setShowAngelSelector}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add an Angel</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                {angels
                  .filter((a) => !activeAngels.find((active) => active.id === a.id))
                  .map((angel) => (
                    <Card
                      key={angel.id}
                      className="cursor-pointer hover:bg-amber-50"
                      onClick={() => handleAddAngel(angel)}
                    >
                      <CardHeader>
                        <CardTitle>{angel.name}</CardTitle>
                        <CardDescription>{angel.attributes.join(", ")}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl text-center">{angel.symbol.split(" ")[0]}</p>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </DialogContent>
          </Dialog>
        )}

        {showDivinationResults && (
          <Dialog open={showDivinationResults} onOpenChange={setShowDivinationResults}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Divine Messages</DialogTitle>
              </DialogHeader>
              <Tabs defaultValue="tarot">
                <TabsList>
                  <TabsTrigger value="tarot">Tarot</TabsTrigger>
                  <TabsTrigger value="runes">Runes</TabsTrigger>
                </TabsList>
                <TabsContent value="tarot">
                  {divinationResults
                    .filter((r) => r.type === "tarot")
                    .map((result, index) => (
                      <Card key={index}>
                        <CardHeader>
                          <CardTitle>{result.result}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>{result.interpretation}</p>
                        </CardContent>
                      </Card>
                    ))}
                </TabsContent>
                <TabsContent value="runes">
                  {divinationResults
                    .filter((r) => r.type === "runes")
                    .map((result, index) => (
                      <Card key={index}>
                        <CardHeader>
                          <CardTitle>{result.result}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>{result.interpretation}</p>
                        </CardContent>
                      </Card>
                    ))}
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        )}

        {showSpiritualPractices && (
          <Dialog open={showSpiritualPractices} onOpenChange={setShowSpiritualPractices}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Sacred Practices</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                {spiritualPractices.map((practice) => (
                  <Card key={practice.id}>
                    <CardHeader>
                      <CardTitle>{practice.name}</CardTitle>
                      <CardDescription>{practice.duration} minutes</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>{practice.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button
                        onClick={() => {
                          setEnergyLevel((prev) => Math.min(100, prev + practice.energyGain))
                          setShowSpiritualPractices(false)
                        }}
                      >
                        Practice (+{practice.energyGain} energy)
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </TooltipProvider>
  )
}

