"use client";

import React, { useState, useEffect } from "react";
import AxiosInstance, { getUserId } from "@/lib/Axios"; // <-- Pfad ggf. anpassen
import { Message } from "./Message";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

// Nachrichtentyp für den State
interface ChatMessage {
  id: number;
  content: string;
  isUser: boolean;
  timestamp: string;
}

// Prop-Typ für Chat: Wer ist der Empfänger?
interface ChatProps {
  recieverId: number;
}

export const Chat: React.FC<ChatProps> = ({ recieverId }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  // Aktueller User
  const currentUserId = getUserId();

  // 1) Nachrichten beim ersten Rendern (oder wenn sich recieverId ändert) laden
  useEffect(() => {
    fetchMessages();
  }, [recieverId]);

  // 2) WebSocket-Verbindung aufbauen
  useEffect(() => {
    // Beispiel: Raumname kann so aussehen:
    // "chat_<currentUserId>_<recieverId>"
    const roomName = `chat_${currentUserId}_${recieverId}`;

    // WebSocket-URL anpassen, falls du HTTPS/SSL oder einen anderen Host verwendest
    const newSocket = new WebSocket(`ws://localhost:8000/ws/chat/${roomName}/`);

    newSocket.onopen = () => {
      console.log("WebSocket connected");
    };

    newSocket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      // Falls im JSON ein "message"-Feld enthalten ist, ist es eine neue Chat-Nachricht
      if (data.message) {
        const newChatMessage: ChatMessage = {
          id: Date.now(), // Temporäre ID
          content: data.message,
          isUser: false, // Gehen wir davon aus, dass eingehende WebSocket-Msgs vom anderen User stammen
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

    // Cleanup, wenn Komponente unmountet oder recieverId wechselt
    return () => {
      newSocket.close();
    };
  }, [recieverId]);

  // Funktion zum Laden aller Nachrichten via REST
  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError(null);

      // GET: /chat/get-messages/<sender_id>/<reciever_id>/
      const response = await AxiosInstance.get(
          `/chat/get-messages/${currentUserId}/${recieverId}/`
      );
      // Backend liefert: [{ id, sender, reciever, message, date, ... }, ...]
      const apiMessages = response.data.map((msg: any) => ({
        id: msg.id,
        content: msg.message,
        isUser: msg.sender === currentUserId,
        timestamp: new Date(msg.date).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }));
      setMessages(apiMessages);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Funktion zum Senden einer neuen Nachricht
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      setLoading(true);
      setError(null);

      // (A) REST-POST an Django, damit die Nachricht in DB gespeichert wird
      const payload = {
        sender: currentUserId,
        reciever: recieverId,
        message: newMessage,
      };
      await AxiosInstance.post("/chat/send-messages/", payload);

      // (B) Direkt im State anzeigen
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

      // (C) WebSocket-Broadcast, damit der andere User die Nachricht in Echtzeit sieht
      if (socket) {
        socket.send(JSON.stringify({ message: newMessage }));
      }

      // Eingabefeld leeren
      setNewMessage("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="flex flex-col h-full w-full bg-background rounded-lg shadow-md overflow-hidden">
        {/* Oberer Bereich (Titel) */}
        <div className="p-4 bg-primary text-primary-foreground flex-shrink-0">
          <h1 className="text-2xl font-bold text-center">Chat</h1>
        </div>

        {/* Fehler-/Lade-Anzeige */}
        {error && (
            <div className="p-2 text-red-500 text-center">
              Fehler beim Laden/Senden: {error}
            </div>
        )}
        {loading && (
            <div className="p-2 text-center text-sm text-gray-500">
              Lade Daten ...
            </div>
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

        {/* Eingabefeld unten */}
        <div className="p-4 bg-muted flex-shrink-0">
          <div className="flex space-x-2">
            <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
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
