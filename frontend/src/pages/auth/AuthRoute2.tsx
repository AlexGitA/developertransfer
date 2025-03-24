import {isAuthenticated} from "@/lib/Axios";
import {Navigate, Outlet} from "react-router-dom";
import {useState} from "react";

export const AuthRoute2 = () => {
    const [isLoggedIn] = useState(isAuthenticated());

    if (!isLoggedIn) {
        return <Navigate to="/login" replace/>
    }

    return <Outlet />
}