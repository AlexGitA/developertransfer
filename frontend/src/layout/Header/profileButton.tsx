import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {MENTButton} from "@/components/button/MENT-button";
import AxiosInstance, {getUserId} from "@/lib/Axios";

const ProfileButton = () => {
    const [profileImage, setProfileImage] = useState('');
    const navigate = useNavigate();
    const currentUserId = getUserId();

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (currentUserId) {
                try {
                    const response = await AxiosInstance.get(`/api/user-details/${currentUserId}`);
                    setProfileImage(response.data.profile_picture || '');
                } catch (error) {
                    console.error('Error fetching user details:', error);
                }
            }
        };

        fetchUserDetails();
    }, [currentUserId]);

    return (
        //todo check with ammar if its a good idea to use href, bc styles disappear and also the routing looks like shit
        <MENTButton href={`/profile/${currentUserId}`}
                    className="main-header__right-profile-button"
        >
            <img
                src={profileImage || "/images/default-profile.png"}
                alt="Profile"
                className="main-header__right-profile-button-image"
            />
        </MENTButton>
    );
};

export default ProfileButton;