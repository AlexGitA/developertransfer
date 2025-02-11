import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Comment as CommentType } from "@/types/post-types"

interface CommentProps {
  comment: CommentType
  level?: number
}

export const Comment: React.FC<CommentProps> = ({ comment, level = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <div className={`ml-${level > 0 ? "4" : "0"} mt-2`}>
      <div className="flex items-start gap-2">
        <div className="flex-shrink-0">
          <Avatar className="h-8 w-8">
            <AvatarImage src={comment.author.avatar} />
            <AvatarFallback>{comment.author.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-grow">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">{comment.author.username}</span>
            <span className="text-xs text-muted-foreground">{new Date(comment.createdAt).toLocaleDateString()}</span>
          </div>
          <p className="text-sm mt-1">{comment.content}</p>
          <div className="flex items-center gap-4 mt-2">
            <Button variant="ghost" size="sm" className="text-xs">
              <i className="fas fa-arrow-up mr-1" />
              {comment.likes}
            </Button>
            <Button variant="ghost" size="sm" className="text-xs">
              <i className="fas fa-reply mr-1" />
              Reply
            </Button>
          </div>
        </div>
      </div>
      {comment.replies?.map((reply) => (
        <Comment key={reply.id} comment={reply} level={level + 1} />
      ))}
    </div>
  )
}
