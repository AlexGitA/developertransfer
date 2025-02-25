// src/pages/chat/components/ChatSidebar.tsx
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AxiosInstance, { getUserId } from "@/lib/Axios";

interface IUser {
    id: number;          // User-ID
    full_name: string;   // z.B. "Max Mustermann"
    image: string;       // URL zum Profilbild
}

interface ChatSidebarProps {
    onSelectUser: (userId: number) => void;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({ onSelectUser }) => {
    const [contacts, setContacts] = useState<IUser[]>([]);
    const [error, setError] = useState<string | null>(null);
    const currentUserId = getUserId();

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                setError(null);
                // Nutzt den Endpoint, der alle anderen Nutzer liefert (AllUsersView)
                const res = await AxiosInstance.get("/chat/all-users/");
                setContacts(res.data);
            } catch (err: any) {
                setError(err.message || "Fehler beim Laden der Kontakte");
            }
        };
        fetchContacts();
    }, [currentUserId]);

    return (
        <Card className="bg-gray-50 dark:bg-gray-800/95 border-0 shadow-none">
            <CardHeader className="pb-2">
                <CardTitle className="text-primary dark:text-blue-400 text-lg">
                    MentorX Users
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                {error && <div className="text-red-500 p-2">{error}</div>}
                {contacts.map((user) => (
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
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

export default ChatSidebar;
