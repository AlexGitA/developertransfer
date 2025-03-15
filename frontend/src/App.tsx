import './App.css'
import LoginPage from './pages/auth/LoginPage'
import Layout from "@/layout/Layout.tsx";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import DerPlayground from "@/playground/DerPlayground.tsx";
import ProfilePage from "@/pages/profile/ProfilePage.tsx";
import HomePage from "@/pages/home/HomePage.tsx";
import RegisterPage from "@/pages/auth/RegisterPage.tsx";
import TermsOfService from "@/pages/legal/TermsOfService.tsx";
import PrivacyPolicy from "@/pages/legal/PrivacyPolicy.tsx";
import VerifyEmailPage from "@/pages/auth/VerifyEmailPage.tsx";
import EmailConfirmationPage from "@/pages/auth/EmailConfirmationPage.tsx";
import PostPage from "@/pages/post/PostPage.tsx";
import {AuthRoute} from "@/pages/auth/AuthRoute.tsx";
import ChatPage from "@/pages/chat/ChatPage.tsx";
import LandingPage from "@/pages/landing/LandingPage.tsx";
import VerifyPasswordReset from "@/pages/auth/VerifyPasswordReset.tsx";
import PasswordResetPage from "@/pages/auth/PasswordResetPage.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    {/* API is unreachable */}
                    <Route path="/api/" element={<Navigate to="/" replace />} />
                    {/* Main paths */}
                    {/*<Route index element={<Navigate to="/home" replace/>}/>*/}
                    <Route path="playground" element={<DerPlayground/>}/>
                    <Route path="profile/:id" element={<ProfilePage/>}/>
                    <Route path="home" element={<HomePage/>}/>

                    {/* Auth paths */}
                    <Route element={<AuthRoute/>}>
                        <Route path="login" element={<LoginPage/>}/>
                        <Route path="register" element={<RegisterPage/>}/>
                        <Route path="verify-email" element={<VerifyEmailPage/>}/>
                        <Route path="confirm-email/:key" element={<EmailConfirmationPage/>}/>
                    </Route>

                    {/* Chat */}
                    <Route path="chats" element={<ChatPage/>}/>

                    {/* Landing Page */}
                    <Route path="/landing" element={<LandingPage/>}/>
                    <Route index element={<Navigate to="/landing" replace/>}/>

                    {/* Info paths */}
                    <Route path="tos" element={<TermsOfService/>}/>
                    <Route path="pp" element={<PrivacyPolicy/>}/>

                    {/* Password reset paths */}
                    <Route path="reset-confirmed" element={<VerifyPasswordReset/>}/>
                    <Route path="reset" element={<PasswordResetPage/>}/>

                    {/* Post paths */}
                    <Route path="post" element={<PostPage/>}/>

                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App