import React from 'react'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { Comment as CommentType } from "@/types/post-types"
import { Button } from "@/components/ui/button"
import { getUserId } from "@/lib/Axios"

interface CommentProps {
  comment: CommentType
  onDelete?: (commentId: number) => void
}

export const Comment: React.FC<CommentProps> = ({ comment, onDelete }) => {
  const currentUserId = getUserId();
  const isAuthor = currentUserId && comment.author.id.toString() === currentUserId.toString();

  return (
    <div className="flex gap-3">
      <Avatar className="h-6 w-6">
        <AvatarFallback>{comment.author.username[0].toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{comment.author.username}</span>
          <span className="text-xs text-muted-foreground">
            {new Date(comment.created).toLocaleDateString()}
          </span>
          
          {isAuthor && onDelete && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="ml-auto text-red-500 hover:text-red-700 hover:bg-red-100 p-1 h-auto"
              onClick={() => onDelete(comment.id)}
            >
              <i className="fas fa-trash text-xs" />
            </Button>
          )}
        </div>
        <p className="text-sm mt-1 break-all whitespace-normal overflow-hidden">{comment.content}</p>
      </div>
    </div>
  )
}
