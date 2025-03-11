"use client"

import { motion } from "framer-motion"
import { Clock } from "lucide-react"
import type { ChatHistoryItem } from "@/lib/types"
import { formatDistanceToNow } from "date-fns"

interface ChatHistoryProps {
  history: ChatHistoryItem[]
  onSelectChat: (chat: ChatHistoryItem) => void
}

export default function ChatHistory({ history, onSelectChat }: ChatHistoryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-12"
    >
      <h2 className="text-xl font-medium text-amber-700 mb-4">Past Conversations</h2>
      <div className="space-y-3">
        {history.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ x: 5 }}
            className="bg-white rounded-lg shadow-sm border border-amber-200 p-4 cursor-pointer"
            onClick={() => onSelectChat(item)}
          >
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-200 to-amber-400 flex items-center justify-center mr-2">
                <span className="text-sm text-white">{item.angel.icon}</span>
              </div>
              <div>
                <h3 className="font-medium text-amber-800">{item.angel.name}</h3>
              </div>
              <div className="ml-auto flex items-center text-amber-500 text-xs">
                <Clock size={12} className="mr-1" />
                {formatDistanceToNow(item.timestamp, { addSuffix: true })}
              </div>
            </div>
            <p className="text-amber-700 text-sm truncate">{item.preview}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

