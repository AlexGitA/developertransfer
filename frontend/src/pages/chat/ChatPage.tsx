// ChatPage.tsx
import {Chat} from "@/pages/chat/components/Chat.tsx";
import Header from './../../layout/Header/Header'
import LeftSidebar from "@/pages/profile/components/LeftSidebar.tsx";
import RightSidebar from "@/pages/profile/components/RightSidebar.tsx";

const PostPage = () => {
    return (
        <div className="min-h-screen flex bg-white transition-colors dark:bg-gray-900 flex-col">
            <div className="pb-5">
                <Header/>
            </div>

            <div className="flex-1 flex pt-3 gap-6">
                {/* Left Sidebar */}
                <aside
                    className="w-72 hidden lg:block fixed left-0 top-[3.5rem] bottom-0 overflow-y-auto px-6 py-6">
                    <LeftSidebar/>
                </aside>

                {/* Main content */}
                <main className={`
          flex-1 
          px-4 sm:px-6 py-4
          mx-auto
          w-full
          pt-10
          lg:ml-72 lg:mr-72 
          ${window.innerWidth >= 1024 ? 'max-w-5xl' : 'max-w-2xl'}
        `}>

                    <div className="lg:px-0 px-0 sm:px-4">
                         <Chat />
                    </div>

                </main>

                {/* Right Sidebar */}
                <aside
                    className="w-72 hidden lg:block fixed right-0 top-[3.5rem] bottom-0 overflow-y-auto px-6 py-6">
                    <RightSidebar/>
                </aside>
            </div>
        </div>
    )
}

export default PostPage;