// ProfilePage.tsx
import {useState, useEffect} from "react";
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import {useParams} from 'react-router-dom';
import ProfileCard from './components/ProfileCard';
import AxiosInstance from "@/lib/Axios";
import axios from 'axios';
import {UserDetails} from '@/types/user';
import Header from './../../layout/Header/Header'

const ProfilePage = () => {
    const {id} = useParams();
    const [userData, setUserData] = useState<UserDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const currentUserId = 1; // TODO: Get from auth context

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
        // Add edit profile logic here
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="min-h-screen flex bg-muted flex-col">
            <div className="pb-10">
                <Header/>
            </div>

            <div className="flex-[1-5] flex pt-3">
                <div className="w-[27vw] bg-white p-3">
                    <LeftSidebar/>
                </div>

                <main className="w-[46vw] bg-muted p-6">
                    {userData && (
                        <ProfileCard
                            userDetails={userData}
                            currentUserId={currentUserId}
                            onEdit={handleEditProfile}
                        />
                    )}
                </main>

                <div className="w-[27vw] bg-white p-3">
                    <RightSidebar/>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;