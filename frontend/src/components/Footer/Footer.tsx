import type React from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

interface FooterProps {
    className?: string
}

const Footer: React.FC<FooterProps> = ({ className = "" }) => {
    return (
        <footer className={`bg-gray-100 dark:bg-gray-900 py-12 ${className}`}>
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Mentor Platform</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Connecting mentors and mentees for meaningful growth and learning.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/home"
                                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/login"
                                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                                >
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/register"
                                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                                >
                                    Register
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Legal</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/tos"
                                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                                >
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/pp"
                                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Contact</h3>
                        <p className="text-gray-600 dark:text-gray-300">Have questions? Reach out to our support team.</p>
                    </div>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 mt-12 pt-8 text-center text-gray-600 dark:text-gray-300">
                    <p>© {new Date().getFullYear()} Mentor Platform. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer

