import "../../index.css";
import {MENTButton} from "@/components/button/MENT-button.tsx";
import ProfileButton from "@/layout/Header/profileButton.tsx";
import {useNavigate} from 'react-router-dom';
import {getUserId, handleLogout, isAuthenticated} from '@/lib/axios';
import {useState} from "react";
import DarkModeToggle from "@/components/button/DarkModeToggle.tsx";

const Header = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());

    const handleLogoClick = () => {
        navigate('/home');
    };

    return (
        <header className="main-header h-14 bg-white dark:bg-gray-800 transition-colors">
            <div className="main-header__left">
                <h1
                    className="main-header__left-logo"
                    onClick={handleLogoClick}
                    style={{cursor: 'pointer'}}
                >
                    <text className="main-header__left-text dark:text-white">
                        Mentor<span className="main-header__left-text-space">X</span>
                    </text>
                </h1>
            </div>
            <div className="main-header__mid text-center">
                <MENTButton className="main-header__mid-button">
                    <span className="main-header__mid-button-text">Suche deinen Mentor   🔍</span>
                </MENTButton>
            </div>
            <div className="main-header__right flex items-center gap-2">
                <DarkModeToggle/>
                <ProfileButton/>
                {isLoggedIn ? (
                    <button
                        className="px-4 py-2 text-white rounded hover:bg-gray-100 hover:text-primary dark:text-white dark:hover:bg-gray-700 dark:hover:text-primary-200 transition-colors"
                        onClick={() => {
                            handleLogout();
                            setIsLoggedIn(false);
                        }}
                    >
                        Logout
                    </button>
                ) : (
                    <button
                        className="px-4 py-2 rounded hover:bg-gray-100 hover:text-primary text-white dark:hover:bg-gray-700 dark:text-white transition-colors"
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </button>
                )}
            </div>
        </header>
    );
};

export default Header;