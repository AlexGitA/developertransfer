import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

const SearchBar = () => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center">
        <Input
          type="text"
          placeholder="Search for your Mentor"
          className="w-full h-12 pl-12 pr-4 rounded-full border-2 border-blue-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
        <Search
          className="absolute left-4 w-5 h-5 text-gray-400"
          aria-hidden="true"
        />
      </div>
    </div>
  )
}

export default SearchBar