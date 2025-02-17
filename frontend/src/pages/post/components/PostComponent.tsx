"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import type { Posts as PostType } from "@/types/post-types"
import { Comment } from "./CommentComponent"

interface PostProps {
  post: PostType
}

export const Post: React.FC<PostProps> = ({ post }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          {/* Voting */}
          <div className="flex flex-col items-center gap-1">
            <Button variant="ghost" size="sm" className="px-2">
              <i className="fas fa-arrow-up text-primary" />
            </Button>
            <span className="text-sm font-medium">{post.likes}</span>
            <Button variant="ghost" size="sm" className="px-2">
              <i className="fas fa-arrow-down text-muted-foreground" />
            </Button>
          </div>

          {/* Post content */}
          <div className="flex-grow">
            <div className="flex items-center gap-2 mb-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={post.author.avatar} />
                <AvatarFallback>{post.author.username[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{post.author.username}</span>
              <span className="text-xs text-muted-foreground">{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>

            <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
            <p className="text-sm text-muted-foreground">
              {isExpanded ? post.content : `${post.content.slice(0, 200)}...`}
            </p>
            {post.content.length > 200 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 text-primary"
              >
                {isExpanded ? "Show less" : "Read more"}
              </Button>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-3">
              {post.topic.map((topic) => (
                <span key={topic.id} className="px-2 py-1 text-xs rounded-full bg-primary/20 text-primary">
                  {topic.name}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 mt-4">
              <Button variant="ghost" size="sm">
                <i className="fas fa-comment-alt mr-2" />
                {post.comments_count} Comments
              </Button>
              <Button variant="ghost" size="sm">
                <i className="fas fa-share mr-2" />
                Share
              </Button>
              <Button variant="ghost" size="sm">
                <i className="fas fa-bookmark mr-2" />
                Save
              </Button>
            </div>

            {/* Comments section */}
            {post.comments.length > 0 && (
              <div className="mt-4">
                <Separator className="my-4" />
                <div className="space-y-4">
                  {post.comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

