"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Clock, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ChatHistoryItem } from "@/lib/types"
import { formatDistanceToNow } from "date-fns"

interface ConversationHistoryProps {
  onSelectConversation: (conversation: ChatHistoryItem) => void
  onDeleteConversation: (conversationId: string) => void
}

export default function ConversationHistory({ onSelectConversation, onDeleteConversation }: ConversationHistoryProps) {
  const [history, setHistory] = useState<ChatHistoryItem[]>([])

  useEffect(() => {
    // Load conversation history from localStorage
    const savedHistory = localStorage.getItem("chatHistory")
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory))
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-12"
    >
      <h2 className="text-xl font-medium text-indigo-800 mb-4">Past Conversations</h2>
      {history.length === 0 ? (
        <p className="text-indigo-700">No past conversations yet. Start a new one!</p>
      ) : (
        <div className="space-y-3">
          {history.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ x: 5 }}
              className="bg-white rounded-lg shadow-sm border border-indigo-300 p-4 cursor-pointer flex justify-between items-center"
              onClick={() => onSelectConversation(item)}
            >
              <div>
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-200 to-indigo-400 flex items-center justify-center mr-2">
                    {/* <span className="text-sm text-white">{item.angels.map((a => item.a)).split(" ")[0]}</span> */}
                  </div>
                  <div>
                    <h3 className="font-medium text-indigo-900">{item.angels.map(a => a.name).join(',')}</h3>
                  </div>
                  <div className="ml-4 flex items-center text-indigo-600 text-xs">
                    <Clock size={12} className="mr-1" />
                    {formatDistanceToNow(item.timestamp, { addSuffix: true })}
                  </div>
                </div>
                <p className="text-indigo-700 text-sm truncate">{item.preview}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation()
                  onDeleteConversation(item.id)
                }}
                className="text-indigo-500 hover:text-indigo-600 hover:bg-indigo-200"
              >
                <Trash2 size={18} />
              </Button>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}
