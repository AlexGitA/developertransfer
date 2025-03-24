import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Hash } from "lucide-react"
import AxiosInstance from '@/lib/Axios'

// Define Topic interface to fix TypeScript errors
interface Topic {
  id: string | number;
  name: string;
  postCount?: number; // Optional property
}

export const TopicsSearchDialog = ({
  open,
  onOpenChange,
  onSelectTopic
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectTopic?: (topic: Topic) => void;
}) => {
  // Search states
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Search results with proper typing
  const [searchResults, setSearchResults] = useState<Topic[]>([])

  // Reset search when dialog opens/closes
  useEffect(() => {
    if (!open) {
      setSearchTerm('')
      setSearchResults([])
    }
  }, [open])

  // Live Search (debounced)
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([])
      return
    }

    const delayDebounceFn = setTimeout(() => {
      handleSearch()
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm])

  // API call with name parameter only
  const handleSearch = async () => {
    if (searchTerm.trim() === '') return

    setIsLoading(true)
    try {
      const response = await AxiosInstance.get(`/topic`, {
        params: {
          search: searchTerm
        },
      })
      console.log('Topic search results:', response.data)
      setSearchResults(response.data)
    } catch (err) {
      console.error('Error during topic search:', err)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle topic selection
  const handleSelectTopic = (topic) => {
    if (onSelectTopic) {
      onSelectTopic(topic)
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Search Topics</DialogTitle>
        </DialogHeader>

        <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden">
          {/* Search field */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for topics..."
              className="w-full h-11 pl-10 pr-20 rounded-lg border-2 border-blue-100 dark:border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              autoFocus
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <Button
                onClick={handleSearch}
                className="h-7 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm"
                disabled={isLoading}
              >
                {isLoading ? "Searching..." : "Search"}
              </Button>
            </div>
          </div>
        </div>

        {/* Search results */}
        <div className="mt-4 max-h-[300px] overflow-y-auto">
          {isLoading ? (
            <div className="flex justify-center py-6">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            </div>
          ) : searchResults.length === 0 ? (
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 py-4">
              {searchTerm.trim() !== '' ? "No topics found" : "Type to search for topics"}
            </p>
          ) : (
            <div className="space-y-1">
              {searchResults.map((topic) => (
                <div
                  key={topic.id}
                  className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer"
                  onClick={() => handleSelectTopic(topic)}
                >
                  <div className="flex items-center gap-2">
                    <Hash className="w-4 h-4 text-primary dark:text-blue-400" />
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {topic.name}
                    </span>
                  </div>
                  {/* Show post count if available */}
                  {('postCount' in topic) && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 dark:bg-blue-500/10 text-primary dark:text-blue-400">
                      {topic.postCount}
                    </span>
                  )}
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