import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Comment as CommentType } from "@/types/post-types"

interface CommentProps {
  comment: CommentType
}

export const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div className="flex gap-3">
      <Avatar className="h-6 w-6">
        <AvatarImage src={comment.author.avatar} />
        <AvatarFallback>{comment.author.username[0].toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{comment.author.username}</span>
          <span className="text-xs text-muted-foreground">
            {new Date(comment.created).toLocaleDateString()}
          </span>
        </div>
        <p className="text-sm mt-1">{comment.content}</p>
        
        {/* Nested replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="ml-6 mt-2 space-y-2">
            {comment.replies.map((reply) => (
              <Comment key={reply.id} comment={reply} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
