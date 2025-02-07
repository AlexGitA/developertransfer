import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// Sample user data
const users = [
  {
    username: "sarah_dev",
    name: "Sarah Johnson",
    country: "US",
    skills: ["React", "TypeScript", "Node.js"],
    isOnline: true,
    profileImage: "/api/placeholder/100/100"
  },
  {
    username: "mike_code",
    name: "Mike Chen",
    country: "CN",
    skills: ["Python", "Django", "AWS"],
    isOnline: false,
    profileImage: "/api/placeholder/100/100"
  },
  // Add more users as needed
];

const UserCard = ({ user }) => {
  return (
    <Card className="w-72 h-64 transition-all hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.profileImage} alt={user.name} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{user.name}</h3>
              <p className="text-sm text-gray-500">@{user.username}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl">{getCountryFlag(user.country)}</span>
            <div className={`h-3 w-3 rounded-full ${user.isOnline ? 'bg-green-500' : 'bg-gray-300'}`} />
          </div>
        </div>

        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {user.skills.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="secondary" className="px-2 py-1">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <Badge variant="outline" className="px-2 py-1">
            <div className="flex items-center gap-1">
              <span>💼</span>
              <span>12 Projects</span>
            </div>
          </Badge>
          <Badge variant="outline" className="px-2 py-1">
            <div className="flex items-center gap-1">
              <span>⭐</span>
              <span>4.8</span>
            </div>
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper function to convert country code to flag emoji
const getCountryFlag = (countryCode) => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
};

const UserProfileGrid = () => {
  return (
    <div className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {users.map((user) => (
          <UserCard key={user.username} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserProfileGrid;