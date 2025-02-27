import { ArrowRight, Users, MessageSquare, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/layout/Header/Header.tsx"
import { Link } from "react-router-dom"
import MentorList from "@/features/mentors"
import { useMentors } from "@/features/mentors/hooks/useMentor"

const LandingPage = () => {
    const { mentors, loading, error } = useMentors()

    return (
        <div className="min-h-screen flex flex-col">
            <div className="pb-10">
                <Header />
            </div>

            {/* Hero Section */}
            <section className="bg-amber-50 dark:bg-gray-900 py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1 space-y-6">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Find Your Perfect <span className="text-blue-600 dark:text-blue-400">Mentor</span> Match
                            </h1>
                            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
                                Connect with experienced mentors in your field who can guide you through your career journey and help
                                you achieve your goals.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8" asChild>
                                    <Link to="/register">
                                        Get Started <ArrowRight className="ml-2 h-5 w-5" />
                                    </Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="border-blue-600 text-blue-600 hover:bg-blue-50 rounded-full px-8"
                                    asChild
                                >
                                    <Link to="/login">Sign In</Link>
                                </Button>
                            </div>
                        </div>
                        <div className="flex-1">
                            {loading ? (
                                <div>Loading mentors...</div>
                            ) : error ? (
                                <div>Error loading mentors: {error}</div>
                            ) : mentors.length > 0 ? (
                                <img
                                    src={mentors[0].profile_picture || "/placeholder.svg"}
                                    alt="Featured Mentor"
                                    className="rounded-xl shadow-lg w-full h-auto object-cover"
                                />
                            ) : (
                                <img
                                    src="/placeholder.svg?height=400&width=500"
                                    alt="Mentorship illustration"
                                    className="rounded-xl shadow-lg"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-white dark:bg-gray-800">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Why Choose Our Platform?
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            We've built the perfect environment for meaningful mentorship connections
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-amber-50 dark:bg-gray-700 p-8 rounded-xl shadow-sm">
                            <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-6">
                                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Expert Mentors</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Connect with verified professionals who have real-world experience in your field of interest.
                            </p>
                        </div>

                        <div className="bg-amber-50 dark:bg-gray-700 p-8 rounded-xl shadow-sm">
                            <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-6">
                                <MessageSquare className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Seamless Communication</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Our integrated chat system makes it easy to schedule sessions and exchange knowledge.
                            </p>
                        </div>

                        <div className="bg-amber-50 dark:bg-gray-700 p-8 rounded-xl shadow-sm">
                            <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-6">
                                <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Personalized Learning</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Get guidance tailored to your specific needs, goals, and learning pace.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Mentors Section */}
            <section className="py-16 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Featured Mentors</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            Meet some of our exceptional mentors ready to guide you on your journey
                        </p>
                    </div>
                    <MentorList />
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-blue-600 dark:bg-blue-800">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Start Your Journey?</h2>
                    <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                        Join our community today and connect with mentors who can help you achieve your goals.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 rounded-full px-8" asChild>
                            <Link to="/register">
                                Sign Up Now <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="border-white text-white hover:bg-blue-700 rounded-full px-8"
                            asChild
                        >
                            <Link to="/login">Log In</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-100 dark:bg-gray-900 py-12">
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
                            <Button variant="outline" className="mt-4 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-full">
                                Contact Us
                            </Button>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 mt-12 pt-8 text-center text-gray-600 dark:text-gray-300">
                        <p>© {new Date().getFullYear()} Mentor Platform. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default LandingPage

