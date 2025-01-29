import { useState, useEffect } from 'react';
import "../../index.css";
import {MENTButton} from "@/components/button/MENT-button.tsx";

const ProfileButton = () => {
    const [profileImage, setProfileImage] = useState('');

    useEffect(() => {

        const fetchProfileImage = async () => {
            // const userProfileImage = 'https://example.com/profilbild.jpg';
            // setProfileImage(userProfileImage);
        };
        fetchProfileImage();
    }, []);

    return (
        <MENTButton className="main-header__right-profile-button">
            <img
                src={profileImage || "/images/default-profile.png"}
                className="main-header__right-profile-button-image"
            />
        </MENTButton>
    );
};

export default ProfileButton;
