// src/pages/chat/components/Chat.tsx
"use client";

import React, {useState, useEffect} from "react";
import AxiosInstance, {getUserId} from "@/lib/Axios";
import {Message} from "./Message";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Send} from "lucide-react";

interface ChatMessage {
    id: number;
    content: string;
    isUser: boolean;
    timestamp: string;
}

interface ChatProps {
    recieverId: number; // Die User-ID des Chatpartners
}

export const Chat: React.FC<ChatProps> = ({recieverId}) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [socket, setSocket] = useState<WebSocket | null>(null);

    const currentUserId = getUserId();

    // Nachrichten laden via REST
    useEffect(() => {
        fetchMessages();
    }, [recieverId]);

    // WebSocket-Verbindung aufbauen mit sortiertem Raumnamen
    useEffect(() => {
        const sortedIds = [currentUserId, recieverId].sort((a, b) => a - b);
        const roomName = `chat_${sortedIds[0]}_${sortedIds[1]}`;
        const wsUrl = `ws://localhost:8000/ws/chat/${roomName}/`;
        const newSocket = new WebSocket(wsUrl);

        newSocket.onopen = () => {
            console.log("WebSocket connected:", wsUrl);
        };

        newSocket.onmessage = (e) => {
            const data = JSON.parse(e.data);
            if (data.message) {
                // Prüfe anhand des mitgesendeten sender-Feldes, ob die Nachricht vom aktuellen Nutzer stammt
                const isFromCurrentUser = data.sender === currentUserId;
                const newChatMessage: ChatMessage = {
                    id: Date.now(), // Temporäre ID; im echten Szenario solltest du z.B. msg.id vom Backend verwenden
                    content: data.message,
                    isUser: isFromCurrentUser,
                    timestamp: new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    }),
                };
                setMessages((prev) => [...prev, newChatMessage]);
            }
        };

        newSocket.onclose = () => {
            console.log("WebSocket disconnected");
        };

        setSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, [recieverId]);

    const fetchMessages = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await AxiosInstance.get(
                `/chat/get-messages/${currentUserId}/${recieverId}/`
            );
            const apiMessages = response.data.map((msg: any) => {
                // Extrahiere hier sender als Zahl, falls msg.sender ein Objekt ist
                const senderId = typeof msg.sender === "object" ? msg.sender.id : msg.sender;
                return {
                    id: msg.id,
                    content: msg.message,
                    isUser: senderId === currentUserId,
                    timestamp: new Date(msg.date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    }),
                };
            });
            setMessages(apiMessages);
        } catch (err: any) {
            setError(err.message || "Fehler beim Laden der Nachrichten");
        } finally {
            setLoading(false);
        }
    };

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;
        try {
            setLoading(true);
            setError(null);
            const payload = {
                sender: currentUserId,
                reciever: recieverId,
                message: newMessage,
            };
            // Nachricht per REST speichern
            await AxiosInstance.post("/chat/send-messages/", payload);

            // Setze die Nachricht lokal sofort als "gesendet" (isUser: true)
            const newChatMessage: ChatMessage = {
                id: Date.now(),
                content: newMessage,
                isUser: true,
                timestamp: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            };
            setMessages((prev) => [...prev, newChatMessage]);

            // Sende Nachricht via WebSocket mit sender-Feld
            if (socket) {
                socket.send(JSON.stringify({message: newMessage, sender: currentUserId}));
            }

            setNewMessage("");
        } catch (err: any) {
            setError(err.message || "Fehler beim Senden der Nachricht");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full w-full bg-background rounded-lg shadow-md overflow-hidden">
            {/* Titel */}
            <div className="p-4 bg-primary dark:bg-gray-800 text-primary-foreground flex-shrink-0">
                <h1 className="text-2xl text-white font-bold text-center">Chat</h1>
            </div>

            {error && (
                <div className="p-2 text-red-500 text-center">
                    Fehler beim Laden/Senden: {error}
                </div>
            )}
            {loading && (
                <div className="p-2 text-center text-sm text-gray-500">Loading Chats ...</div>
            )}

            {/* Nachrichtenbereich */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                    <Message
                        key={msg.id}
                        content={msg.content}
                        isUser={msg.isUser}
                        timestamp={msg.timestamp}
                    />
                ))}
            </div>

            {/* Eingabefeld */}
            <div className="p-4 dark:bg-gray-800 bg-primary flex-shrink-0">
                <div className="flex space-x-2">
                    <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-grow dark:bg-gray-800"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleSendMessage();
                        }}
                    />
                    <Button className="bg-white  hover:bg-white dark:bg-primary" onClick={handleSendMessage}>
                        <i className="fa-solid text-primary dark:text-white fa-paper-plane h-4 w-4"/>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
