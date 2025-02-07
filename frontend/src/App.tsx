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

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Navigate to="/home" replace/>}/>
                    <Route path="playground" element={<DerPlayground/>}/>
                    <Route path="profile/:id" element={<ProfilePage/>}/>
                    <Route path="home" element={<HomePage/>}/>
                    <Route path="login" element={<LoginPage/>}/>
                    <Route path="register" element={<RegisterPage/>}/>
                    <Route path="tos" element={<TermsOfService/>}/>
                    <Route path="pp" element={<PrivacyPolicy/>}/>
                    {/* Add more routes as needed */}
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App