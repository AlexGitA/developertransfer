import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AxiosInstance, { getUserId } from "@/lib/Axios";

interface IMentorshipUser {
    id: number;
    full_name: string;
    image: string;
    status: 'pending' | 'accepted' | 'rejected';
    role: 'mentor' | 'mentee';
}

interface ChatSidebarProps {
    onSelectUser: (userId: number) => void;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({ onSelectUser }) => {
    const [connections, setConnections] = useState<IMentorshipUser[]>([]);
    const [error, setError] = useState<string | null>(null);
    const currentUserId = getUserId();

    useEffect(() => {
        const fetchMentorships = async () => {
            try {
                setError(null);
                const res = await AxiosInstance.get("/mentorship/mentorships/");

                // Transform mentorship data to connection format
                const transformed = res.data.map((mentorship: any) => ({
                    id: currentUserId === mentorship.mentee.id ? mentorship.mentor.id : mentorship.mentee.id,
                    full_name: currentUserId === mentorship.mentee.id
                        ? mentorship.mentor.full_name
                        : mentorship.mentee.full_name,
                    image: currentUserId === mentorship.mentee.id
                        ? mentorship.mentor.image
                        : mentorship.mentee.image,
                    status: mentorship.status,
                    role: currentUserId === mentorship.mentee.id ? 'mentor' : 'mentee'
                }));

                // Filter unique connections and accepted status
                const uniqueConnections = transformed.filter(
                    (v: any, i: number, a: any[]) => a.findIndex(t => t.id === v.id) === i
                ).filter((conn: IMentorshipUser) => conn.status === 'accepted');

                setConnections(uniqueConnections);
            } catch (err: any) {
                setError(err.response?.data?.detail || "Error loading mentorship connections");
            }
        };
        fetchMentorships();
    }, [currentUserId]);

    return (
        <Card className="bg-gray-50 dark:bg-gray-800/95 border-0 shadow-none">
            <CardHeader className="pb-2">
                <CardTitle className="text-primary dark:text-blue-400 text-lg">
                    Mentorship Connections
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                {error && <div className="text-red-500 p-2">{error}</div>}
                {connections.map((user) => (
                    <div
                        key={user.id}
                        className="flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors rounded-lg cursor-pointer"
                        onClick={() => onSelectUser(user.id)}
                    >
                        <Avatar className="w-10 h-10 border-2 border-primary/20 dark:border-blue-500/20">
                            <AvatarImage src={user.image} alt={user.full_name} />
                            <AvatarFallback className="bg-primary/10 dark:bg-blue-500/10 text-primary dark:text-blue-400">
                                {user.full_name.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-primary dark:text-blue-400 truncate">
                                {user.full_name}
                            </div>
                            <div className="text-xs text-muted-foreground capitalize">
                                {user.role} • {user.status}
                            </div>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

export default ChatSidebar;