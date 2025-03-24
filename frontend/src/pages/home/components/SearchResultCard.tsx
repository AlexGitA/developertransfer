// src/pages/home/components/SearchResultCard.tsx
import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import CountryFlag from '@/components/ui/flag'

interface SkillInfo {
    id: number
    name: string
    skill_type: string
    type_display: string
}

interface SearchResult {
    id: number           // entspricht user.id (aus dem Serializer)
    username: string     // aus user.username
    first_name: string   // aus user.first_name
    profile_picture?: string
    preferred_language?: string  // z. B. "en", "de", etc.
    skills_info?: SkillInfo[]
}

interface SearchResultCardProps {
    result: SearchResult
}

const SearchResultCard: React.FC<SearchResultCardProps> = ({ result }) => {
    return (
        <Link to={`/profile/${result.id}`} className="block">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16 border-2 border-primary/20 dark:border-blue-500/20">
                        <AvatarImage
                            src={result.profile_picture || '/images/default-profile.png'}
                            alt={result.username}
                        />
                        <AvatarFallback>
                            {result.first_name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                            @{result.username}
                        </h3>
                        <p className="text-sm text-gray-500">{result.first_name}</p>
                        {result.preferred_language && (
                            <div className="flex items-center gap-1 mt-1">
                                <CountryFlag code={result.preferred_language} text={result.preferred_language} showText={false} />
                            </div>
                        )}
                    </div>
                </div>

                {/* Skills anzeigen, falls vorhanden */}
                {result.skills_info && result.skills_info.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                        {result.skills_info.map((skill) => (
                            <span
                                key={skill.id}
                                className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary dark:bg-blue-500/10 dark:text-blue-400"
                            >
                {skill.name}
              </span>
                        ))}
                    </div>
                )}
            </div>
        </Link>
    )
}

export default SearchResultCard
