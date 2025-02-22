import "../../index.css";
import { MENTButton } from "@/components/button/MENT-button.tsx";
import ProfileButton from "@/layout/Header/profileButton.tsx";
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from "react";
import {handleLogout, isAuthenticated} from '@/lib/Axios';
import DarkModeToggle from "@/components/button/DarkModeToggle.tsx";
import '@fortawesome/fontawesome-free/css/all.css';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());

    const handleLogoClick = () => {
        navigate('/home');
    };

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    return (
        <header className="main-header h-14 bg-white dark:bg-gray-800 transition-colors">
            <div className="main-header__left flex items-center gap-6">
                <h1
                    className="main-header__left-logo"
                    onClick={handleLogoClick}
                    style={{cursor: 'pointer'}}
                >
                    <text className="main-header__left-text dark:text-white">
                        Mentor<span className="main-header__left-text-space">X</span>
                    </text>
                </h1>

                {/* Navigation Links */}
                <nav className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/post')}
                        className={`flex items-center text-white gap-2 px-2.5 py-1.5 rounded-lg transition-all
                            ${isActive('/post') 
                                ? 'bg-white/10 text-primary dark:text-primary-300' 
                                : 'hover:text-primary hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50'
                            }`}>
                        <i className="fas fa-newspaper text-lg"/>
                        <span className="text-sm font-medium">Posts</span>
                    </button>
                    <button
                        onClick={() => navigate('/chats')}
                        className={`flex items-center text-white gap-2 px-2.5 py-1.5 rounded-lg transition-all
                            ${isActive('/chats') 
                                ? 'bg-white/10 text-primary dark:text-primary-300' 
                                : 'hover:text-primary hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50'
                            }`}>
                        <i className="fa-regular fa-comment text-lg"/>
                        <span className="text-sm font-medium">Chats</span>
                    </button>
                </nav>
            </div>

            <div className="main-header__mid text-center">
                <MENTButton className="main-header__mid-button">
                    <span className="main-header__mid-button-text">Search for your Mentor
                         <i className="fa-solid fa-magnifying-glass text-lg"/>
                    </span>
                </MENTButton>
            </div>

            <div className="main-header__right flex items-center gap-2">
                <DarkModeToggle/>
                {/* todo should not try to get to user a user if not logged in */}
                <ProfileButton/>
                {/* Todo, add on log in condition*/}
                    <button
                        onClick={() => navigate('/settings')}
                        className="px-2 py-1 rounded hover:bg-gray-100 hover:text-primary text-white dark:hover:bg-gray-700 dark:text-white transition-colors">
                        <i className="fa-solid fa-gear text-lg"/>
                    </button>
                {isLoggedIn ? (
                    <button
                        className="px-4 py-2 text-white rounded hover:bg-gray-100 hover:text-primary
                        dark:text-white dark:hover:bg-gray-700 dark:hover:text-primary-200 transition-colors"
                        onClick={() => {
                            handleLogout();
                            setIsLoggedIn(false);
                        }}
                    >
                        Logout
                    </button>
                ) : (
                    <button
                        className="px-2 py-1 rounded hover:bg-gray-100 hover:text-primary text-white dark:hover:bg-gray-700 dark:text-white transition-colors"
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