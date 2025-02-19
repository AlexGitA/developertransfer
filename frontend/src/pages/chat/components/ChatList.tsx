import React, { useEffect, useState } from "react";
import AxiosInstance, { getUserId } from "@/lib/Axios";

interface InboxMessage {
    id: number;
    sender: number;
    reciever: number;
    message: string;
    date: string;
}

export const ChatList: React.FC<{
    onSelectUser: (userId: number) => void;
}> = ({ onSelectUser }) => {
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
            // Das sollte eine Liste von Nachrichten sein, die laut View gefiltert sind.
            setInbox(res.data);
        } catch (err: any) {
            setError(err.message);
        }
    };

    // Ermitteln, wer der Chatpartner ist (sender oder reciever)
    const getChatPartnerId = (msg: InboxMessage) => {
        return msg.sender === currentUserId ? msg.reciever : msg.sender;
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
