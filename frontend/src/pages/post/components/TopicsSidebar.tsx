import { useState } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Hash, ChevronDown, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import TopicsSearchDialog from "@/pages/post/components/TopicSearchDialog.tsx";

// Mock data for topics
const allTopics = [
  { id: 1, name: "Algorithms", postCount: 156 },
  { id: 2, name: "Backend Development", postCount: 243 },
  { id: 3, name: "Career Advice", postCount: 389 },
  { id: 4, name: "Data Structures", postCount: 167 },
  { id: 5, name: "DevOps", postCount: 201 },
  { id: 6, name: "Frontend Development", postCount: 278 },
  { id: 7, name: "Interviews", postCount: 312 },
  { id: 8, name: "Machine Learning", postCount: 145 },
  { id: 9, name: "System Design", postCount: 198 },
  { id: 10, name: "Web Security", postCount: 167 }
].sort((a, b) => a.name.localeCompare(b.name))

export const TopicsSidebar = () => {
  const [expanded, setExpanded] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const displayedTopics = expanded ? allTopics : allTopics.slice(0, 6)

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
                {topic.postCount}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-2 space-y-2 px-3">
          {!expanded && (
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
            topics={allTopics}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default TopicsSidebar