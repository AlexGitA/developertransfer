// src/pages/chat/components/ChatList.tsx
import React, { useEffect, useState } from "react";
import AxiosInstance, { getUserId } from "@/lib/Axios";

interface InboxMessage {
    id: number;
    sender: any;    // Kann entweder eine Zahl oder ein Objekt sein
    reciever: any;  // Kann entweder eine Zahl oder ein Objekt sein
    message: string;
    date: string;
}

interface ChatListProps {
    onSelectUser: (userId: number) => void;
}

export const ChatList: React.FC<ChatListProps> = ({ onSelectUser }) => {
    const currentUserId = getUserId();
    const [inbox, setInbox] = useState<InboxMessage[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchInbox();
    }, []);

    const fetchInbox = async () => {
        try {
            setError(null);
            const res = await AxiosInstance.get(`/chat/my-messages/${currentUserId}/`);
            setInbox(res.data);
        } catch (err: any) {
            setError(err.message || "Fehler beim Laden der Nachrichten");
        }
    };

    // Extrahiere die User-ID, falls sender oder reciever Objekte sind
    const extractUserId = (user: any): number => {
        if (user && typeof user === "object" && user.id) {
            return user.id;
        }
        return user;
    };

    const getChatPartnerId = (msg: InboxMessage) => {
        const senderId = extractUserId(msg.sender);
        const recieverId = extractUserId(msg.reciever);
        return senderId === currentUserId ? recieverId : senderId;
    };

    return (
        <div className="p-2 border-r border-gray-200">
            <h2 className="font-bold text-lg mb-2">Meine Chats</h2>
            {error && <div className="text-red-500">{error}</div>}
            {inbox.map((msg) => {
                const partnerId = getChatPartnerId(msg);
                return (
                    <div
                        key={msg.id}
                        className="cursor-pointer hover:bg-gray-100 p-2 rounded"
                        onClick={() => onSelectUser(partnerId)}
                    >
                        <p className="font-semibold">Chat mit User #{partnerId}</p>
                        <p className="text-sm truncate">{msg.message}</p>
                    </div>
                );
            })}
        </div>
    );
};
