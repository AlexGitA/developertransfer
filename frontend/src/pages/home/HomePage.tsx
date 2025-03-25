import Header from "@/layout/Header/Header.tsx";
import LeftSidebar from "@/pages/home/components/LeftSidebar.tsx";
import RightSidebar from "@/pages/home/components/RightSidebar.tsx";
import MentorList from "@/features/mentors";
import SearchBar from "@/pages/home/components/SearchBar.tsx";
import Footer from "@/components/Footer/Footer";

const HomePage = () => {

    return (<div className="max-h-screen flex bg-white transition-colors dark:bg-gray-900 flex-col">
        <div className="pb-5">
            <Header/>
        </div>

        <div className="flex-1 flex pt-3 gap-6 w-screen">
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
          ${window.innerWidth >= 1024 ? 'width-full' : 'max-w-2xl'}
        `}><SearchBar/>
                <MentorList/>
                </main>

            <aside
                className="w-72 hidden lg:block fixed right-0 top-[3.5rem] bottom-0 overflow-y-auto px-6 py-6">
                <RightSidebar/>
            </aside>
        </div>
        <Footer/>
        </div>
    );
};

export default HomePage;
