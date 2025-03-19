import { useState, useEffect } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Hash, ChevronDown, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import TopicsSearchDialog from "@/pages/post/components/TopicSearchDialog.tsx";
import AxiosInstance from "@/lib/Axios"

interface Topic {
  id: number
  name: string
  created_at: Date
}

interface TopicCount {
  id: number
  name: string
  posts_count: number
}

interface Post {
  id: string
  topic: number  // Topic ID directly
}

export const TopicsSidebar = () => {
  const [expanded, setExpanded] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [topics, setTopics] = useState<TopicCount[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTopicsAndPosts = async () => {
      try {
        setIsLoading(true)
        
        // Fetch topics and posts in parallel
        const [topicsResponse, postsResponse] = await Promise.all([
          AxiosInstance.get<Topic[]>('/topic/'),
          AxiosInstance.get<Post[]>('/posts/')
        ])

        console.log('Topics response:', topicsResponse.data)
        console.log('Posts response:', postsResponse.data)

        // Create a map to store post counts for each topic
        const topicCounts = new Map<number, number>()

        // Initialize counts for all topics to 0
        topicsResponse.data.forEach(topic => {
          topicCounts.set(topic.id, 0)
        })

        // Count posts for each topic
        postsResponse.data.forEach(post => {
          // Since topic is now just an ID, we can increment directly
          if (post.topic) {
            topicCounts.set(post.topic, (topicCounts.get(post.topic) || 0) + 1)
          }
        })

        console.log('Topic counts:', Object.fromEntries(topicCounts))

        // Create TopicCount objects with counts
        const topicsWithCounts: TopicCount[] = topicsResponse.data.map(topic => ({
          id: topic.id,
          name: topic.name,
          posts_count: topicCounts.get(topic.id) || 0
        }))

        // Sort topics by name and by post count (most posts first)
        const sortedTopics = topicsWithCounts
          .sort((a, b) => b.posts_count - a.posts_count)
          .sort((a, b) => a.name.localeCompare(b.name))
        
        setTopics(sortedTopics)
      } catch (err) {
        console.error('Error fetching data:', err)
        setError('Failed to load topics')
      } finally {
        setIsLoading(false)
      }
    }

    fetchTopicsAndPosts()
  }, [])

  const displayedTopics = expanded ? topics : topics.slice(0, 6)

  if (isLoading) {
    return (
      <Card className="bg-gray-50 dark:bg-gray-800/95 border-0 shadow-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-primary dark:text-blue-400 text-lg flex items-center gap-2">
            <Hash className="w-5 h-5" />
            Popular Topics
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-2 px-3 py-2">
            <div className="animate-pulse">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg mb-2"></div>
              ))}
            </div>
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
          <Hash className="w-5 h-5" />
          Popular Topics
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-1">
          {displayedTopics.map((topic) => (
            <div
              key={topic.id}
              className="flex items-center justify-between px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors rounded-lg cursor-pointer"
            >
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {topic.name}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 dark:bg-blue-500/10 text-primary dark:text-blue-400">
                {topic.posts_count}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-2 space-y-2 px-3">
          {!expanded && topics.length > 6 && (
            <Button
              variant="ghost"
              className="w-full justify-between text-sm font-medium text-primary dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700/50"
              onClick={() => setExpanded(true)}
            >
              Show More Topics
              <ChevronDown className="w-4 h-4" />
            </Button>
          )}

          <Button
            variant="outline"
            className="w-full justify-between text-sm border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700/50"
            onClick={() => setSearchOpen(true)}
          >
            Search All Topics
            <Search className="w-4 h-4" />
          </Button>

          <TopicsSearchDialog
            open={searchOpen}
            onOpenChange={setSearchOpen}
            topics={topics}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default TopicsSidebar