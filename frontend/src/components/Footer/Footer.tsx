import type React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface FooterProps {
    className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = "" }) => {
    const navigate = useNavigate();
    return (
        <footer className={`bg-gray-50 dark:bg-gray-900 py-6 ${className}`}>
            <div className="container mx-auto px-4 flex flex-wrap justify-between items-center">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                    MentorX
                </h3>
                <nav className="flex space-x-6">
                    <Link to="/home" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                        Home
                    </Link>
                    <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                        Login
                    </Link>
                    <Link to="/register" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                        Register
                    </Link>
                    <Link to="/tos" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                        Terms
                    </Link>
                    <Link to="/pp" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                        Privacy
                    </Link>
                </nav>
                <Button onClick={() => navigate('/home')} variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 rounded-full px-4 py-1 text-sm">
                    Home
                </Button>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4 text-center text-gray-600 dark:text-gray-300 text-sm">
                © {new Date().getFullYear()} Mentor Platform. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
