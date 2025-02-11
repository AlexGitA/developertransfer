import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Heart, Share2, Clock } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data for recent posts
const recentPosts = [
  {
    id: 1,
    username: "@techwhiz",
    avatar: "/placeholder.svg?height=32&width=32",
    title: "Learning Path: From Zero to AWS Solutions Architect",
    topic: "Career Growth",
    timeAgo: "2h ago",
    likes: 24,
    comments: 8,
  },
  {
    id: 2,
    username: "@codemaster",
    avatar: "/placeholder.svg?height=32&width=32",
    title: "Tips for Mastering System Design Interviews",
    topic: "Interview Prep",
    timeAgo: "5h ago",
    likes: 42,
    comments: 15,
  },
  {
    id: 3,
    username: "@dbguru",
    avatar: "/placeholder.svg?height=32&width=32",
    title: "Database Optimization Techniques You Should Know",
    topic: "Technical",
    timeAgo: "8h ago",
    likes: 31,
    comments: 12,
  },
  {
    id: 4,
    username: "@cloudninja",
    avatar: "/placeholder.svg?height=32&width=32",
    title: "Transitioning from Developer to DevOps Engineer",
    topic: "Career Growth",
    timeAgo: "12h ago",
    likes: 56,
    comments: 23,
  },
  {
    id: 5,
    username: "@peterpan",
    avatar: "/placeholder.svg?height=32&width=32",
    title: "Building Scalable Microservices with Node.js",
    topic: "Technical",
    timeAgo: "1d ago",
    likes: 38,
    comments: 16,
  },
]

export const RecentPostsSidebar = () => {
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
              <AvatarImage src={post.avatar} alt={post.username} />
              <AvatarFallback className="bg-primary/10 dark:bg-blue-500/10 text-primary dark:text-blue-400">
                {post.username.slice(1, 3).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-primary dark:text-blue-400">
                  {post.username}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.timeAgo}
                </span>
              </div>

              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mt-1 line-clamp-2">
                {post.title}
              </h3>

              <div className="flex items-center gap-4 mt-2">
                <span className="px-2 py-0.5 text-xs rounded-full bg-primary/10 dark:bg-blue-500/10 text-primary dark:text-blue-400">
                  {post.topic}
                </span>

                <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1 text-xs">
                    <Heart className="w-3.5 h-3.5" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1 text-xs">
                    <MessageSquare className="w-3.5 h-3.5" />
                    {post.comments}
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