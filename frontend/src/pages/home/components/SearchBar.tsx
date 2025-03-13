// src/pages/home/components/SearchBar.tsx
import { Search, ChevronDown, ChevronUp, GraduationCap, School } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import countries from 'world-countries'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import React, { useState, useEffect } from 'react'
import AxiosInstance from '@/lib/Axios'
import SearchResultCard from './SearchResultCard'

const SearchBar = () => {
    // Filter & Suchzustände
    const [searchTerm, setSearchTerm] = useState('')
    const [isExpanded, setIsExpanded] = useState(false)

    const [mentorshipMode, setMentorshipMode] = useState('mentee')
    const [field, setField] = useState('')
    const [language, setLanguage] = useState('')
    const [country, setCountry] = useState('')
    const [filters, setFilters] = useState({
        verified: false,
        topRated: false,
        localOnly: false,
    })

    // Suchergebnisse
    const [searchResults, setSearchResults] = useState<any[]>([])

    // Länderoptionen
    const countryOptions = countries.map((c) => ({
        value: c.cca2.toUpperCase(),
        label: c.name.common,
    }))

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
    }, [
        searchTerm,
        mentorshipMode,
        field,
        language,
        country,
        filters.verified,
        filters.topRated,
        filters.localOnly,
    ])

    // API-Aufruf mit allen Filtern
    const handleSearch = async () => {
        try {
            const response = await AxiosInstance.get(`/api/user-details/`, {
                params: {
                    search: searchTerm,
                    mentorshipMode,
                    field,
                    language,
                    country,
                    verified: filters.verified,
                    topRated: filters.topRated,
                    localOnly: filters.localOnly,
                },
            })
            console.log('Search results:', response.data)
            setSearchResults(response.data)
        } catch (err: any) {
            console.error('Error during search:', err)
        }
    }

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
                {/* Suchfeld */}
                <div className="p-3">
                    <div className="relative flex items-center">
                        <Search className="absolute left-4 w-5 h-5 text-gray-400" aria-hidden="true" />
                        <Input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search for your Mentor"
                            className="w-full h-11 pl-12 pr-32 rounded-full border-2 border-blue-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        <div className="absolute right-2 flex items-center gap-1">
                            <Button
                                onClick={handleSearch}
                                className="h-7 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm"
                            >
                                Search
                            </Button>
                            <Button
                                variant="ghost"
                                className="h-7 w-7 p-0 text-gray-400 hover:text-gray-600 rounded-full"
                                onClick={() => setIsExpanded(!isExpanded)}
                            >
                                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Filter-Bereich */}
                {isExpanded && (
                    <div className="px-3 pb-3 space-y-4 border-t border-gray-200 dark:border-gray-700">
                        {/* Mentorship Status */}
                        <div className="pt-3">
                            <h3 className="text-base font-medium text-gray-400 mb-2">Mentorship Status</h3>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    onClick={() => setMentorshipMode('mentee')}
                                    className={`p-2 rounded-lg flex items-center justify-center gap-2 transition-all ${
                                        mentorshipMode === 'mentee'
                                            ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                                    }`}
                                >
                                    <GraduationCap className="h-4 w-4" />
                                    Looking for Mentor
                                </button>
                                <button
                                    onClick={() => setMentorshipMode('mentor')}
                                    className={`p-2 rounded-lg flex items-center justify-center gap-2 transition-all ${
                                        mentorshipMode === 'mentor'
                                            ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                                    }`}
                                >
                                    <School className="h-4 w-4" />
                                    Available as Mentor
                                </button>
                            </div>
                        </div>

                        {/* Haupt-Filter */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Linke Spalte */}
                            <div className="space-y-3">
                                {/* Field Selection */}
                                <div>
                                    <h3 className="text-base font-medium text-gray-400 mb-1.5">Field of Expertise</h3>
                                    <Select value={field} onValueChange={setField}>
                                        <SelectTrigger className="w-full h-9 rounded-lg border border-gray-200 dark:border-gray-700">
                                            <SelectValue placeholder="Select your field" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="frontend">Frontend</SelectItem>
                                            <SelectItem value="backend">Backend</SelectItem>
                                            <SelectItem value="devops">DevOps</SelectItem>
                                            <SelectItem value="mobile">Mobile</SelectItem>
                                            <SelectItem value="testing">Testing</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Language */}
                                <div>
                                    <h3 className="text-base font-medium text-gray-400 mb-1.5">Language</h3>
                                    <Select value={language} onValueChange={setLanguage}>
                                        <SelectTrigger className="w-full h-9 rounded-lg border border-gray-200 dark:border-gray-700">
                                            <SelectValue placeholder="Select language" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="en">English</SelectItem>
                                            <SelectItem value="es">Spanish</SelectItem>
                                            <SelectItem value="fr">French</SelectItem>
                                            <SelectItem value="zh">Chinese</SelectItem>
                                            <SelectItem value="de">German</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Rechte Spalte */}
                            <div className="space-y-3">
                                {/* Country */}
                                <div>
                                    <h3 className="text-base font-medium text-gray-400 mb-1.5">Country</h3>
                                    <Select value={country} onValueChange={setCountry}>
                                        <SelectTrigger className="w-full h-9 rounded-lg border border-gray-200 dark:border-gray-700">
                                            <SelectValue placeholder="Select country" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {countryOptions.map((co) => (
                                                <SelectItem key={co.value} value={co.value}>
                                                    {co.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Additional Filters */}
                                <div>
                                    <h3 className="text-base font-medium text-gray-400 mb-1.5">Additional Filters</h3>
                                    <div className="space-y-1.5">
                                        <div className="flex items-center justify-between py-1.5 px-3 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-750 rounded-lg transition-colors">
                                            <span className="text-sm text-gray-600 dark:text-gray-300">Verified Profile</span>
                                            <Switch
                                                checked={filters.verified}
                                                onCheckedChange={(checked) =>
                                                    setFilters((prev) => ({ ...prev, verified: checked }))
                                                }
                                            />
                                        </div>
                                        <div className="flex items-center justify-between py-1.5 px-3 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-750 rounded-lg transition-colors">
                                            <span className="text-sm text-gray-600 dark:text-gray-300">Top Rated</span>
                                            <Switch
                                                checked={filters.topRated}
                                                onCheckedChange={(checked) =>
                                                    setFilters((prev) => ({ ...prev, topRated: checked }))
                                                }
                                            />
                                        </div>
                                        <div className="flex items-center justify-between py-1.5 px-3 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-750 rounded-lg transition-colors">
                                            <span className="text-sm text-gray-600 dark:text-gray-300">Local Only</span>
                                            <Switch
                                                checked={filters.localOnly}
                                                onCheckedChange={(checked) =>
                                                    setFilters((prev) => ({ ...prev, localOnly: checked }))
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Suchergebnisse */}
            {searchResults.length > 0 && (
                <div className="mt-4">
                    <h2 className="text-xl font-bold mb-4">Search Results</h2>
                    <div className="grid grid-cols-1 gap-4">
                        {searchResults.map((result) => (
                            <SearchResultCard key={result.id} result={result} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default SearchBar
