import "../../index.css";
import {MENTButton} from "@/components/button/MENT-button.tsx";
import ProfileButton from "@/layout/Header/profileButton.tsx";
import {useNavigate} from 'react-router-dom';
import {getUserId, handleLogout, isAuthenticated} from '@/lib/axios';
import {useState} from "react";

const Header = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());

    const handleLogoClick = () => {
        navigate('/home');
    };

    return (
        <header className="main-header h-14">
            <div className="main-header__left">
                <h1
                    className="main-header__left-logo"
                    onClick={handleLogoClick}
                    style={{cursor: 'pointer'}} // Add this to show it's clickable
                >
                    <text className="main-header__left-text">
                        Mentor<span className="main-header__left-text-space">X</span>
                    </text>
                </h1>
            </div>
            <div className="main-header__mid text-center">
                <MENTButton className="main-header__mid-button">
                    <span className="main-header__mid-button-text">Suche deinen Mentor   🔍</span>
                </MENTButton>
            </div>
            <div className="main-header__right">
                <ProfileButton/>
                {isLoggedIn ? (
                    <button onClick={() => {
                        handleLogout();
                        setIsLoggedIn(false);
                    }}>Logout</button>
                ) : (
                    <button onClick={() => navigate('/login')}>Login</button>
                )}
            </div>
        </header>
    );
};

export default Header;
