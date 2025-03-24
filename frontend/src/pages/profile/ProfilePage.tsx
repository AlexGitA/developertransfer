// ProfilePage.tsx
import {useState, useEffect} from "react";
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import {useParams} from 'react-router-dom';
import ProfileCard from './components/ProfileCard';
import AxiosInstance, {getUserId} from "@/lib/Axios";
import axios from 'axios';
import {UserDetails} from '@/types/user';
import Header from './../../layout/Header/Header'
import Footer from "@/components/Footer/Footer.tsx";

const ProfilePage = () => {
    const {id} = useParams();
    const [userData, setUserData] = useState<UserDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const currentUserId = getUserId();

    useEffect(() => {
        console.log("ProfilePage mounted, ID:", id);
        fetchUserData();
    }, [id]);

    const fetchUserData = async () => {
        try {
            setLoading(true);
            console.log('Fetching user data for ID:', id);
            const response = await AxiosInstance.get(`/api/user-details/${id}`);
            console.log('Response received:', response.data);
            setUserData(response.data);
            setError(null);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.error('Full error object:', err);
                setError(err.response?.data?.message || 'Failed to fetch user data');
                if (err.response) {
                    console.error('Error response:', {
                        status: err.response.status,
                        headers: err.response.headers,
                        data: err.response.data
                    });
                }
            } else {
                setError('An unexpected error occurred');
                console.error('Non-Axios error:', err);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleEditProfile = () => {
        console.log('Edit profile clicked');
        // todo Add edit profile logic here
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

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
                    {userData && (
                        <div className="lg:px-0 px-0 sm:px-4">
                            <ProfileCard
                                userDetails={userData}
                                currentUserId={currentUserId}
                                onEdit={handleEditProfile}
                            />
                        </div>
                    )}
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

export default ProfilePage;