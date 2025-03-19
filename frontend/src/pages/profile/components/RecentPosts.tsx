import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Heart, Clock } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState } from "react"
import AxiosInstance from "@/lib/Axios"
import { formatDistanceToNow } from 'date-fns'
import { Posts } from "@/types/post-types"

interface RecentPostsSidebarProps {
  refreshTrigger?: number
}

export const RecentPostsSidebar = ({ refreshTrigger = 0 }: RecentPostsSidebarProps) => {
  const [recentPosts, setRecentPosts] = useState<Posts[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        setLoading(true)
        const response = await AxiosInstance.get('/posts/')
        
        // Sort posts by created_at in descending order and take the 5 most recent
        const sortedPosts = response.data
          .sort((a: Posts, b: Posts) => new Date(b.created).getTime() - new Date(a.created).getTime())
          .slice(0, 5)

        // Fetch author details for each post
        const postsWithAuthors = await Promise.all(
          sortedPosts.map(async (post: Posts) => {
            try {
              const authorResponse = await AxiosInstance.get(`/api/user-details/${post.author}`)
              return {
                ...post,
                author: {
                  id: post.author,
                  ...authorResponse.data,
                  username: authorResponse.data.username || 'Unknown User'
                }
              }
            } catch (error) {
              console.error(`Error fetching author details for post ${post.id}:`, error)
              return {
                ...post,
                author: {
                  id: post.author,
                  username: 'Unknown User'
                }
              }
            }
          })
        )

        setRecentPosts(postsWithAuthors)
        setError(null)
      } catch (err) {
        console.error('Error fetching recent posts:', err)
        setError('Failed to load recent posts')
      } finally {
        setLoading(false)
      }
    }

    fetchRecentPosts()
    
    // Fetch new posts every 5 minutes
    const interval = setInterval(fetchRecentPosts, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [refreshTrigger])

  if (loading) {
    return (
      <Card className="bg-gray-50 dark:bg-gray-800/95 border-0 shadow-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-primary dark:text-blue-400 text-lg flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Recent Community Posts
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="animate-pulse space-y-4 p-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full" />
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="bg-gray-50 dark:bg-gray-800/95 border-0 shadow-none">
        <CardContent className="p-4">
          <p className="text-red-500 text-sm">{error}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gray-50 dark:bg-gray-800/95 border-0 shadow-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-primary dark:text-blue-400 text-lg flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Recent Community Posts
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {recentPosts.map((post) => (
          <div
            key={post.id}
            className="flex items-start gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors rounded-lg cursor-pointer border-b border-gray-200/10 last:border-0"
          >
            <Avatar className="w-10 h-10 border-2 border-primary/20 dark:border-blue-500/20">
              <AvatarImage src={post.author.avatar || '/placeholder.svg'} alt={post.author.username} />
              <AvatarFallback className="bg-primary/10 dark:bg-blue-500/10 text-primary dark:text-blue-400">
                {post.author.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-primary dark:text-blue-400">
                  @{post.author.username}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatDistanceToNow(new Date(post.created), { addSuffix: true })}
                </span>
              </div>

              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mt-1 line-clamp-2">
                {post.title}
              </h3>

              <div className="flex items-center gap-4 mt-2">
                <span className="px-2 py-0.5 text-xs rounded-full bg-primary/10 dark:bg-blue-500/10 text-primary dark:text-blue-400">
                  {(() => {
                    if (Array.isArray(post.topic) && post.topic.length > 0) {
                      const topic = post.topic[0];
                      return typeof topic === 'object' && topic !== null && 'name' in topic
                        ? String(topic.name)
                        : 'General';
                    }
                    return typeof post.topic === 'object' && post.topic !== null && 'name' in post.topic
                      ? String(post.topic.name)
                      : 'General';
                  })()}
                </span>

                <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1 text-xs">
                    <Heart className="w-3.5 h-3.5" />
                    {post.likes_count || 0}
                  </span>
                  <span className="flex items-center gap-1 text-xs">
                    <MessageSquare className="w-3.5 h-3.5" />
                    {post.comments_count || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default RecentPostsSidebar;