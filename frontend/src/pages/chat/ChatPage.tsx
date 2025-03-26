// src/pages/chat/ChatPage.tsx

import Header from "@/layout/Header/Header";
import RightSidebar from "@/pages/profile/components/RightSidebar";
import { Chat } from "@/pages/chat/components/Chat";
import ChatSidebar from "@/pages/chat/components/ChatSidebar";
import {useState} from "react";

const ChatPage = () => {
    const [selectedUser, setSelectedUser] = useState<number | null>(null);

    return (
        <div className="min-h-screen flex bg-white transition-colors dark:bg-gray-900 flex-col">
            <div className="pb-5">
                <Header />
            </div>

            <div className="flex-1 flex pt-3 gap-6">
                {/* Left Sidebar: Hier wird jetzt die ChatSidebar verwendet */}
                <aside className="w-90 hidden lg:block fixed left-0 top-[3.5rem] bottom-0 overflow-y-auto px-6 py-6">
                    <ChatSidebar onSelectUser={(userId) => setSelectedUser(userId)} />
                </aside>

                {/* Main content */}
                <main className="flex-1 px-4 sm:px-6 py-4 mx-auto w-full pt-10 lg:ml-72 lg:mr-72">
                    <div className="lg:px-0 px-0 sm:px-4 flex gap-4 chat-wrapper">
                        <div className="w-full">
                            {selectedUser ? (
                                <Chat recieverId={selectedUser} />
                            ) : (
                                <div className="text-center text-gray-500">
                                    Please choose your Chat Buddy
                                </div>
                            )}
                        </div>
                    </div>
                </main>

                {/* Right Sidebar */}
                <aside className="w-72 hidden lg:block fixed right-0 top-[3.5rem] bottom-0 overflow-y-auto px-6 py-6">
                    <RightSidebar />
                </aside>
            </div>
        </div>
    );
};

export default ChatPage;
