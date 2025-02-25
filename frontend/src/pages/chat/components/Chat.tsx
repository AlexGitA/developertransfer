// src/pages/chat/components/Chat.tsx
"use client";

import React, { useState, useEffect } from "react";
import AxiosInstance, { getUserId } from "@/lib/Axios";
import { Message } from "./Message";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface ChatMessage {
  id: number;
  content: string;
  isUser: boolean;
  timestamp: string;
}

interface ChatProps {
  recieverId: number; // User-ID des Chatpartners
}

export const Chat: React.FC<ChatProps> = ({ recieverId }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const currentUserId = getUserId();

  useEffect(() => {
    fetchMessages();
  }, [recieverId]);

  useEffect(() => {
    const roomName = `chat_${currentUserId}_${recieverId}`;
    const wsUrl = `ws://localhost:8000/ws/chat/${roomName}/`;
    const newSocket = new WebSocket(wsUrl);

    newSocket.onopen = () => {
      console.log("WebSocket connected:", wsUrl);
    };

    newSocket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.message) {
        const newChatMessage: ChatMessage = {
          id: Date.now(),
          content: data.message,
          isUser: false,
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
      const apiMessages = response.data.map((msg: any) => ({
        id: msg.id,
        content: msg.message,
        isUser: extractUserId(msg.sender) === currentUserId,
        timestamp: new Date(msg.date).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }));
      setMessages(apiMessages);
    } catch (err: any) {
      setError(err.message || "Fehler beim Laden der Nachrichten");
    } finally {
      setLoading(false);
    }
  };

  // Wie in ChatList: Extrahiere ggf. die ID, falls msg.sender ein Objekt ist
  const extractUserId = (user: any): number => {
    if (user && typeof user === "object" && user.id) {
      return user.id;
    }
    return user;
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
      await AxiosInstance.post("/chat/send-messages/", payload);
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
      if (socket) {
        socket.send(JSON.stringify({ message: newMessage }));
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
        <div className="p-4 bg-primary text-primary-foreground flex-shrink-0">
          <h1 className="text-2xl font-bold text-center">Chat</h1>
        </div>

        {error && (
            <div className="p-2 text-red-500 text-center">
              Fehler beim Laden/Senden: {error}
            </div>
        )}
        {loading && (
            <div className="p-2 text-center text-sm text-gray-500">Lade Daten ...</div>
        )}

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

        <div className="p-4 bg-muted flex-shrink-0">
          <div className="flex space-x-2">
            <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendMessage();
                }}
            />
            <Button onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
  );
};
