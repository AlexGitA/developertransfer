import type React from "react"

interface MessageProps {
  content: string
  isUser: boolean
  timestamp: string
}

export const Message: React.FC<MessageProps> = ({ content, isUser, timestamp }) => {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-[70%] rounded-lg p-3 ${
          isUser ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
        } shadow-md`}
      >
        <p className="text-sm">{content}</p>
        <p className={`text-xs mt-1 ${isUser ? "text-primary-foreground/70" : "text-secondary-foreground/70"}`}>
          {timestamp}
        </p>
      </div>
    </div>
  )
}

