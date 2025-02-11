import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Star, Code, Database, Cloud } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const topMentors = [
  {
    username: "@peterpan",
    avatar: "/placeholder.svg?height=32&width=32",
    expertise: ["AWS", "Node.js"],
    score: 98,
    icon: Trophy,
  },
  {
    username: "@techwhiz",
    avatar: "/placeholder.svg?height=32&width=32",
    expertise: ["Kubernetes", "Linux"],
    score: 95,
    icon: Star,
  },
  {
    username: "@codemaster",
    avatar: "/placeholder.svg?height=32&width=32",
    expertise: ["MySQL", "Linux"],
    score: 92,
    icon: Code,
  },
  {
    username: "@dbguru",
    avatar: "/placeholder.svg?height=32&width=32",
    expertise: ["MySQL", "AWS"],
    score: 90,
    icon: Database,
  },
  {
    username: "@cloudninja",
    avatar: "/placeholder.svg?height=32&width=32",
    expertise: ["AWS", "Kubernetes"],
    score: 88,
    icon: Cloud,
  },
]

export const TopMentorsSidebar = () => {
  return (
      <Card className="bg-gray-50 dark:bg-gray-800/95 border-0 shadow-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-primary dark:text-blue-400 text-lg">
            Top Mentors This Week
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {topMentors.map((mentor, index) => (
              <div
                  key={mentor.username}
                  className="flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors rounded-lg cursor-pointer"
              >
                <div className="relative">
                  <Avatar className="w-10 h-10 border-2 border-primary/20 dark:border-blue-500/20">
                    <AvatarImage src={mentor.avatar} alt={mentor.username} />
                    <AvatarFallback className="bg-primary/10 dark:bg-blue-500/10 text-primary dark:text-blue-400">
                      {mentor.username.slice(1, 3).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary dark:bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium shadow-sm">
                    {index + 1}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-primary dark:text-blue-400 truncate">
                    {mentor.username}
                  </div>
                  <div className="flex gap-1 mt-1 flex-wrap">
                    {mentor.expertise.map((tech) => (
                        <span
                            key={tech}
                            className="px-2 py-0.5 text-xs rounded-full bg-primary/10 dark:bg-blue-500/10 text-primary dark:text-blue-400"
                        >
                    {tech}
                  </span>
                    ))}
                  </div>
                </div>

                <div className="text-primary/60 dark:text-blue-400/60">
                  <mentor.icon className="w-4 h-4" />
                </div>
              </div>
          ))}
        </CardContent>
      </Card>
  )
}
export default TopMentorsSidebar;
