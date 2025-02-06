import Header from "@/layout/Header/Header.tsx";
import LeftSidebar from "@/pages/home/components/LeftSidebar.tsx";
import RightSidebar from "@/pages/home/components/RightSidebar.tsx";

const HomePage = () => {

    return (
        <div className="min-h-screen flex flex-col">
            <div className="pb-10">
                <Header/>
            </div>

            <div className="flex-[1-5] flex">
                <div className="w-[27vw] bg-amber-100 p-3">
                    <LeftSidebar/>
                </div>

                <main className="w-[46vw] bg-gray-50 p-6">

                </main>

                <div className="w-[27vw] bg-amber-100 p-3">
                    <RightSidebar/>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
