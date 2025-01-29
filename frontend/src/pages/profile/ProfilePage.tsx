
import {useState, useEffect} from "react";
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import {useParams} from 'react-router-dom';
import ProfileCard from './components/ProfileCard';
import AxiosInstance from "@/lib/Axios";
import axios, {} from 'axios';
import {UserDetails} from '@/types/user';
import Header from './../../layout/Header/Header'

const ProfilePage = () => {
    const {id} = useParams(); // Get the id from URL
    const [userData, setUserData] = useState<UserDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    // TODO get the current users id (change to 1/2 to see the button)
    const currentUserId = 2;

    useEffect(() => {
        console.log("ProfilePage mounted, ID:", id); // Debug log
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
            // Type guard to check if err is AxiosError
            if (axios.isAxiosError(err)) {  // or: if (err instanceof AxiosError)
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
                // Handle non-Axios errors
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
        return <div>Loading...</div>; // Add a proper loading spinner component
    }

    if (error) {
        return <div>Error: {error}</div>; // Add a proper error component
    }
// TODO add a REAL NAVBAR
    return (
        <div className="min-h-screen flex flex-col">
            <div className="h-20">
                <Header/>
            </div>

            <div className="flex-[1-5] flex">
                <div className="w-[27vw] bg-amber-100 p-3">
                    <LeftSidebar/>
                </div>

                <main className="w-[46vw] bg-gray-50 p-6">
                    {userData && (
                        <ProfileCard
                            userDetails={userData}
                            currentUserId={currentUserId}
                            onEdit={handleEditProfile}
                        />
                    )}
                </main>

                <div className="w-[27vw] bg-amber-100 p-3">
                    <RightSidebar/>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
