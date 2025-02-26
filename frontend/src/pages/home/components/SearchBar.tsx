import {Search, ChevronDown, ChevronUp, GraduationCap, School} from 'lucide-react'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import {Switch} from '@/components/ui/switch'
import countries from 'world-countries';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import React, {useState} from 'react'

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [isExpanded, setIsExpanded] = useState(false)
    const [mentorshipMode, setMentorshipMode] = useState('mentee')
    const [field, setField] = useState('')
    const [language, setLanguage] = useState('')
    const [country, setCountry] = useState('')
    const [filters, setFilters] = useState({
        verified: false,
        topRated: false,
        localOnly: false
    })

    const countryOptions = countries.map((country) => ({
        value: country.cca2.toUpperCase(), // ISO Alpha-2 code in lowercase
        label: country.name.common,
    }));


    const handleSearch = () => {
        console.log({
            searchTerm,
            mentorshipMode,
            field,
            language,
            country,
            filters
        })
    }

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
                {/* Main Search Bar */}
                <div className="p-3">
                    <div className="relative">
                        <div className="relative flex items-center">
                            <Search
                                className="absolute left-4 w-5 h-5 text-gray-400"
                                aria-hidden="true"
                            />
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
                                    {isExpanded ? <ChevronUp className="h-4 w-4"/> : <ChevronDown className="h-4 w-4"/>}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Expandable Section */}
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
                                    <GraduationCap className="h-4 w-4"/>
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
                                    <School className="h-4 w-4"/>
                                    Available as Mentor
                                </button>
                            </div>
                        </div>

                        {/* Main Filters Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Left Column */}
                            <div className="space-y-3">
                                {/* Field Selection */}
                                <div>
                                    <h3 className="text-base font-medium text-gray-400 mb-1.5">Field of Expertise</h3>
                                    <Select value={field} onValueChange={setField}>
                                        <SelectTrigger
                                            className="w-full h-9 rounded-lg border border-gray-200 dark:border-gray-700">
                                            <SelectValue placeholder="Select your field"/>
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

                                {/* Language Selection */}
                                <div>
                                    <h3 className="text-base font-medium text-gray-400 mb-1.5">Language</h3>
                                    <Select value={language} onValueChange={setLanguage}>
                                        <SelectTrigger
                                            className="w-full h-9 rounded-lg border border-gray-200 dark:border-gray-700">
                                            <SelectValue placeholder="Select language"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                        <SelectItem value="en">
                                            <span className="flex items-center gap-2">
                                                <i className="fas fa-globe-americas"></i>
                                                English
                                            </span>
                                        </SelectItem>
                                        <SelectItem value="es">
                                            <span className="flex items-center gap-2">
                                                <i className="fas fa-globe-europe"></i>
                                                Spanish
                                            </span>
                                        </SelectItem>
                                        <SelectItem value="fr">
                                            <span className="flex items-center gap-2">
                                                <i className="fas fa-globe-europe"></i>
                                                French
                                            </span>
                                        </SelectItem>
                                        <SelectItem value="zh">
                                            <span className="flex items-center gap-2">
                                                <i className="fas fa-globe-europe"></i>
                                                Chinese
                                            </span>
                                        </SelectItem>
                                        <SelectItem value="de">
                                            <span className="flex items-center gap-2">
                                                <i className="fas fa-globe-europe"></i>
                                                German
                                            </span>
                                        </SelectItem>
                                    </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-3">
                                {/* Country Selection */}
                                <div>
                                    <h3 className="text-base font-medium text-gray-400 mb-1.5">Country</h3>
                                    <Select value={country} onValueChange={setCountry}>
                                        <SelectTrigger
                                            className="w-full h-9 rounded-lg border border-gray-200 dark:border-gray-700">
                                            <SelectValue placeholder="Select country"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {countryOptions.map((country) => (
                                                <SelectItem key={country.value} value={country.value}>
                            <span className="flex items-center gap-2">
                                <i className={`fi fi-${country.value}`}></i>
                                {country.label}
                            </span>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Additional Filters */}
                                <div>
                                    <h3 className="text-base font-medium text-gray-400 mb-1.5">Additional Filters</h3>
                                    <div className="space-y-1.5">
                                        <div
                                            className="flex items-center justify-between py-1.5 px-3 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-750 rounded-lg transition-colors group">
                      <span className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                        <i className="fas fa-check-circle text-green-500"></i>
                        Verified Profile
                      </span>
                                            <Switch
                                                checked={filters.verified}
                                                onCheckedChange={(checked) => setFilters(prev => ({
                                                    ...prev,
                                                    verified: checked
                                                }))}
                                                className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-200 dark:data-[state=unchecked]:bg-gray-600"
                                            />
                                        </div>
                                        <div
                                            className="flex items-center justify-between py-1.5 px-3 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-750 rounded-lg transition-colors group">
                      <span className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                        <i className="fas fa-star text-yellow-500"></i>
                        Top Rated
                      </span>
                                            <Switch
                                                checked={filters.topRated}
                                                onCheckedChange={(checked) => setFilters(prev => ({
                                                    ...prev,
                                                    topRated: checked
                                                }))}
                                                className="data-[state=checked]:bg-yellow-500 data-[state=unchecked]:bg-gray-200 dark:data-[state=unchecked]:bg-gray-600"
                                            />
                                        </div>
                                        <div
                                            className="flex items-center justify-between py-1.5 px-3 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-750 rounded-lg transition-colors group">
                      <span className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                        <i className="fas fa-map-marker-alt text-red-500"></i>
                        Local Only
                      </span>
                                            <Switch
                                                checked={filters.localOnly}
                                                onCheckedChange={(checked) => setFilters(prev => ({
                                                    ...prev,
                                                    localOnly: checked
                                                }))}
                                                className="data-[state=checked]:bg-red-500 data-[state=unchecked]:bg-gray-200 dark:data-[state=unchecked]:bg-gray-600"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SearchBar