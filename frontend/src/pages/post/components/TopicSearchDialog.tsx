import { useState, useEffect, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal} from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Search, Hash} from "lucide-react"

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const TopicsSearchDialog = ({open, onOpenChange, topics}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredTopics, setFilteredTopics] = useState(topics)

  // Reset search when dialog opens/closes
  useEffect(() => {
    if (!open) {
      setSearchQuery('')
      setFilteredTopics(topics)
    }
  }, [open, topics])

  // Filter topics based on search query
  useEffect(() => {
    const filtered = topics.filter((topic: { name: string }) =>
        topic.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredTopics(filtered)
  }, [searchQuery, topics])

  return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Search Topics</DialogTitle>
          </DialogHeader>

          <div className="relative mt-2">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400"/>
            <Input
                placeholder="Search for topics..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
            />
          </div>

          <div className="mt-4 max-h-[300px] overflow-y-auto">
            {filteredTopics.length === 0 ? (
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 py-4">
                  No topics found
                </p>
            ) : (
                <div className="space-y-1">
                  {filteredTopics.map((topic: { id: Key | null | undefined; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; postCount: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined }) => (
                <div
                  key={topic.id}
                  className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Hash className="w-4 h-4 text-primary dark:text-blue-400" />
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {topic.name}
                    </span>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 dark:bg-blue-500/10 text-primary dark:text-blue-400">
                    {topic.postCount}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default TopicsSearchDialog