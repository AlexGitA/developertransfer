import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Star, Code, Database, Cloud } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useState, useEffect } from 'react';
import { UserDetails } from '../types/user';

export const TopMentorsSidebar = () => {
  const [topUsers, setTopUsers] = useState<UserDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Icons for the top 5 users
  const icons = [Trophy, Star, Code, Database, Cloud];

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        // Fetch users data from your API
        const response = await fetch('http://localhost:8000/api/user-details/', {
          headers: {
            'accept': 'application/json',
            'X-CSRFTOKEN': 'c3AKO77FgkdjXG6QnZ5Ow1O2C6AnSUK7'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data: UserDetails[] = await response.json();

        // Sort users by likes_count in descending order and take the top 5
        const sortedUsers = [...data]
          .sort((a, b) => b.likes_count - a.likes_count)
          .slice(0, 5);

        setTopUsers(sortedUsers);
        setLoading(false);
      } catch (err) {
        setError('Error fetching user data');
        setLoading(false);
        console.error('Error fetching users:', err);
      }
    };

    fetchTopUsers();
  }, []);

  // Function to get the primary skill for a user
  const getPrimarySkill = (user: UserDetails) => {
    return user.skills_info?.length > 0 ? user.skills_info[0].name : "N/A";
  };

  // Function to get the secondary skill for a user
  const getSecondarySkill = (user: UserDetails) => {
    return user.skills_info?.length > 1 ? user.skills_info[1].name : null;
  };

  if (loading) {
    return (
      <Card className="bg-gray-50 dark:bg-gray-800/95 border-0 shadow-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-primary dark:text-blue-400 text-lg">
            Top Users This Week
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 text-center">
          Loading top users...
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-gray-50 dark:bg-gray-800/95 border-0 shadow-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-primary dark:text-blue-400 text-lg">
            Top Users This Week
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 text-center text-red-500">
          {error}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-50 dark:bg-gray-800/95 border-0 shadow-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-primary dark:text-blue-400 text-lg">
          Top Users This Week
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {topUsers.map((user, index) => {
          const Icon = icons[index];
          const primarySkill = getPrimarySkill(user);
          const secondarySkill = getSecondarySkill(user);

          return (
            <div
              key={user.id}
              className="flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors rounded-lg cursor-pointer"
            >
              <div className="relative">
                <Avatar className="w-10 h-10 border-2 border-primary/20 dark:border-blue-500/20">
                  <AvatarImage
                    src={user.profile_picture || "/placeholder.svg?height=32&width=32"}
                    alt={user.username}
                  />
                  <AvatarFallback className="bg-primary/10 dark:bg-blue-500/10 text-primary dark:text-blue-400">
                    {user.username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary dark:bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium shadow-sm">
                  {index + 1}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-primary dark:text-blue-400 truncate">
                  @{user.username}
                </div>
                <div className="flex gap-1 mt-1 flex-wrap">
                  {primarySkill && (
                    <span
                      className="px-2 py-0.5 text-xs rounded-full bg-primary/10 dark:bg-blue-500/10 text-primary dark:text-blue-400"
                    >
                      {primarySkill}
                    </span>
                  )}
                  {secondarySkill && (
                    <span
                      className="px-2 py-0.5 text-xs rounded-full bg-primary/10 dark:bg-blue-500/10 text-primary dark:text-blue-400"
                    >
                      {secondarySkill}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-end">
                <div className="text-primary/60 dark:text-blue-400/60">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-xs text-primary/60 dark:text-blue-400/60 mt-1">
                  {user.likes_count} likes
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default TopMentorsSidebar;