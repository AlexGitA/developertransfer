"use client"

import type React from "react"
import { useState } from "react"
import { Message } from "./Message.tsx"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"

interface ChatMessage {
  id: number
  content: string
  isUser: boolean
  timestamp: string
}

const initialMessages: ChatMessage[] = [
  { id: 1, content: "Hey there! How's it going?", isUser: false, timestamp: "10:00 AM" },
  { id: 2, content: "Hi! I'm doing well, thanks for asking. How about you?", isUser: true, timestamp: "10:02 AM" },
  {
    id: 3,
    content: "I'm great! Just working on some new features. Anything exciting on your end?",
    isUser: false,
    timestamp: "10:05 AM",
  },
  {
    id: 4,
    content: "That sounds interesting! I'm actually learning React and Tailwind CSS right now.",
    isUser: true,
    timestamp: "10:07 AM",
  },
  {
    id: 5,
    content: "Oh, that's awesome! React and Tailwind are a great combination. Let me know if you need any help!",
    isUser: false,
    timestamp: "10:10 AM",
  },
]

export const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      const newChatMessage: ChatMessage = {
        id: messages.length + 1,
        content: newMessage,
        isUser: true,
        timestamp: currentTime,
      }
      setMessages([...messages, newChatMessage])
      setNewMessage("")
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-background rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-primary text-primary-foreground">
        <h1 className="text-2xl font-bold text-center">Chat</h1>
      </div>
      <div className="h-[400px] overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <Message key={message.id} content={message.content} isUser={message.isUser} timestamp={message.timestamp} />
        ))}
      </div>
      <div className="p-4 bg-muted">
        <div className="flex space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage()
              }
            }}
          />
          <Button onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

