"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import type { Posts as PostType, CreateCommentData, Comment as CommentType } from "@/types/post-types"
import { Comment } from "./CommentComponent"
import { getUserId } from "@/lib/Axios"
import AxiosInstance from "@/lib/Axios"

interface PostProps {
  post: PostType
  onDelete?: (postId: string) => void
}

export const Post: React.FC<PostProps> = ({ post, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [loadedComments, setLoadedComments] = useState<CommentType[]>([])
  const [isLoadingComments, setIsLoadingComments] = useState(false)
  const [showCommentInput, setShowCommentInput] = useState(false)
  const [newCommentContent, setNewCommentContent] = useState('')
  const [isSubmittingComment, setIsSubmittingComment] = useState(false)
  const [likesCount, setLikesCount] = useState(post.likes_count || 0)
  const [isLiking, setIsLiking] = useState(false)
  const [hasLiked, setHasLiked] = useState(post.has_liked || false)
  const currentUserId = getUserId()

  const fetchComments = async () => {
    try {
      setIsLoadingComments(true);
      const response = await AxiosInstance.get<CommentType[]>(`/api/comments/?post_id=${post.id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setLoadedComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setIsLoadingComments(false);
    }
  };

  const handleCommentsClick = () => {
    setShowComments(!showComments);
    if (!showComments && loadedComments.length === 0) {
      fetchComments();
    }
  };

  const handleCreateComment = async () => {
    if (!newCommentContent.trim()) return;

    try {
      setIsSubmittingComment(true);
      const commentData: CreateCommentData = {
        content: newCommentContent,
        post: Number(post.id)  // Convert string to number
      };

      await AxiosInstance.post('/api/comments/', commentData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      // Refresh comments
      await fetchComments();
      
      // Reset input
      setNewCommentContent('');
      setShowCommentInput(false);
      
    } catch (error) {
      console.error('Error creating comment:', error);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleLike = async () => {
    if (isLiking) return;
    
    try {
      setIsLiking(true);
      await AxiosInstance.post(`/api/posts/${post.id}/like/`, {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      // Update likes count locally and track user's like action
      if (!hasLiked) {
        setLikesCount(prev => prev + 1);
        setHasLiked(true);
      }
    } catch (error) {
      console.error('Error liking post:', error);
    } finally {
      setIsLiking(false);
    }
  };

  const handleUnlike = async () => {
    if (isLiking || !hasLiked) return;
    
    try {
      setIsLiking(true);
      await AxiosInstance.post(`/api/posts/${post.id}/unlike/`, {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      // Update likes count locally and track user's like action
      setLikesCount(prev => Math.max(0, prev - 1)); // Ensure it doesn't go below 0
      setHasLiked(false);
    } catch (error) {
      console.error('Error unliking post:', error);
    } finally {
      setIsLiking(false);
    }
  };

  console.log('Raw post data:', post);  // Log the entire post
  console.log('Topic data:', post.topic);  // Log just the topic data

  // Convert topic to array if it's a single object
  const topics = Array.isArray(post.topic) ? post.topic : [post.topic]
  
  console.log('Processed topics:', topics);  // Log the processed topics

  // Get comments from post data
  const postComments = post.comments || []

  return (
    <Card className="mb-4 hover:shadow-md transition-shadow relative">
      <CardContent className="p-4">
        {post.author.id === currentUserId && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-100"
            onClick={() => onDelete && onDelete(post.id)}
          >
            <i className="fas fa-trash" />
          </Button>
        )}

        <div className="flex items-start gap-4">
          {/* Voting */}
          <div className="flex flex-col items-center gap-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`px-2 ${hasLiked ? 'bg-primary/10' : ''}`}
              onClick={handleLike}
              disabled={isLiking}
            >
              <i className={`fas fa-arrow-up ${hasLiked ? 'text-primary-600' : 'text-primary'}`} />
            </Button>
            <span className="text-sm font-medium">{likesCount}</span>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`px-2 ${hasLiked ? '' : 'opacity-50'}`}
              onClick={handleUnlike}
              disabled={isLiking || !hasLiked}
            >
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
              <span className="text-xs text-muted-foreground">{new Date(post.created).toLocaleDateString()}</span>
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
              {topics.map((topic) => (
                <span key={topic.id} className="px-2 py-1 text-xs rounded-full bg-primary/20 text-primary">
                  {topic.name}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 mt-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleCommentsClick}
              >
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
            {showComments && (
              <div className="mt-4">
                <Separator className="my-4" />
                
                {/* Comment creation */}
                <div className="mb-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowCommentInput(!showCommentInput)}
                    className="mb-2"
                  >
                    <i className="fas fa-plus mr-2" />
                    {showCommentInput ? "Cancel" : "Add Comment"}
                  </Button>
                  
                  {showCommentInput && (
                    <div className="space-y-2">
                      <textarea
                        className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                        rows={3}
                        placeholder="Write your comment..."
                        value={newCommentContent}
                        onChange={(e) => setNewCommentContent(e.target.value)}
                      />
                      <div className="flex justify-end">
                        <Button
                          onClick={handleCreateComment}
                          disabled={isSubmittingComment || !newCommentContent.trim()}
                          className="px-4 py-1.5 rounded-[50px] bg-gradient-to-r from-blue-400 to-blue-500 dark:from-blue-500 dark:to-blue-600 text-white text-xs sm:text-sm font-medium shadow-sm dark:shadow-gray-900/20 hover:from-blue-500 hover:to-blue-600 transition-all duration-200"
                        >
                          {isSubmittingComment ? 'Submitting...' : 'Submit'}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Existing comments */}
                {isLoadingComments ? (
                  <div className="text-center py-4">Loading comments...</div>
                ) : loadedComments.length > 0 ? (
                  <div className="space-y-4">
                    {loadedComments.map((comment) => (
                      <Comment key={comment.id.toString()} comment={comment as any} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">No comments yet</div>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

