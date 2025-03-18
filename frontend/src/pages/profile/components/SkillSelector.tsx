import React, { useState, useEffect, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AxiosInstance from "@/lib/Axios";
import SkillBadges from "@/pages/profile/components/SkillBadges";

interface Skill {
  id: number;
  name: string;
  skill_type: string;
  type_display?: string;
}

interface SkillSelectorProps {
  selectedSkills: Skill[];
  onChange: (skills: Skill[]) => void;
}

const SkillSelector: React.FC<SkillSelectorProps> = ({ selectedSkills, onChange }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Skill[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch skills matching the search term
  useEffect(() => {
    const searchSkills = async () => {
      if (searchTerm.length < 2) {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      try {
        // Using the endpoint shown in your API documentation
        const token = localStorage.getItem("access_token");
        const response = await AxiosInstance.get(`/api/skills/?search=${searchTerm}`, {
          headers: {
            'Authorization': `Token ${token}`
          }
        });

        // Filter out skills that are already selected
        const filteredResults = response.data.filter(
          (skill: Skill) => !selectedSkills.some(selected => selected.id === skill.id)
        );
        setSearchResults(filteredResults);
      } catch (error) {
        console.error("Error searching skills:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchSkills, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm, selectedSkills]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSkillSelect = (skill: Skill) => {
    const updatedSkills = [...selectedSkills, skill];
    onChange(updatedSkills);
    setSearchTerm('');
    setSearchResults([]);
  };

  const handleSkillRemove = (skillId: number) => {
    const updatedSkills = selectedSkills.filter(skill => skill.id !== skillId);
    onChange(updatedSkills);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="skill-search" className="flex items-center gap-2">
          <i className="fas fa-search text-gray-400"></i>
          Search Skills
        </Label>
        <div className="relative" ref={dropdownRef}>
          <Input
            id="skill-search"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsDropdownOpen(e.target.value.length >= 2);
            }}
            onFocus={() => searchTerm.length >= 2 && setIsDropdownOpen(true)}
            placeholder="Type to search for skills..."
            className="w-full"
          />

          {/* Dropdown for search results */}
          {isDropdownOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-md shadow-lg border dark:border-gray-700 max-h-60 overflow-auto">
              {isLoading ? (
                <div className="p-3 text-center text-gray-500 dark:text-gray-400">
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Searching...
                </div>
              ) : searchResults.length > 0 ? (
                <ul>
                  {searchResults.map((skill) => (
                    <li
                      key={skill.id}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center justify-between"
                      onClick={() => handleSkillSelect(skill)}
                    >
                      <span>{skill.name}</span>
                      <span className={`text-xs px-2 py-1 rounded ${getBadgeColor(skill.skill_type)}`}>
                        {skill.type_display || skill.skill_type}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-3 text-center text-gray-500 dark:text-gray-400">
                  {searchTerm.length >= 2 ? 'No matching skills found' : 'Type at least 2 characters'}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Selected Skills Section */}
      <div>
        <Label className="block mb-2">
          <span className="flex items-center gap-2">
            <i className="fas fa-tags text-gray-400"></i>
            Selected Skills
          </span>
        </Label>

        {selectedSkills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {selectedSkills.map((skill) => (
              <span
                key={skill.id}
                className={`${getBadgeColor(skill.skill_type)} px-3 py-1 rounded-lg text-sm font-medium transition duration-200 flex items-center`}
              >
                {skill.name}
                <button
                  onClick={() => handleSkillRemove(skill.id)}
                  className="ml-2 hover:text-red-600 focus:outline-none"
                  aria-label={`Remove skill ${skill.name}`}
                >
                  <i className="fas fa-times"></i>
                </button>
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-sm italic">
            No skills selected. Search and add skills above.
          </p>
        )}
      </div>
    </div>
  );
};

// Reusing the badge color function you provided
const getBadgeColor = (skillType: string) => {
  switch (skillType) {
    case "MOBILE":
      return "bg-blue-200 text-blue-800 border border-blue-400";
    case "FRONT":
      return "bg-green-200 text-green-800 border border-green-400";
    case "BACK":
      return "bg-yellow-200 text-yellow-800 border border-yellow-400";
    case "DEVOPS":
      return "bg-purple-200 text-purple-800 border border-purple-400";
    case "DATA":
      return "bg-orange-200 text-orange-800 border border-orange-400";
    default:
      return "bg-gray-200 text-gray-800 border border-gray-400";
  }
};

export default SkillSelector;