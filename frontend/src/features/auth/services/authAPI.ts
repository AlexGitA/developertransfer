import axios from 'axios';

const API_URL = '/api/auth';

export const signIn = (username: string, password: string) => {
    return axios.post(`${API_URL}/login/`, { username, password });
};

export const logout = () => {
    return axios.post(`${API_URL}/logout/`);
};

export const signUp = (username: string, email: string, password1: string, password2: string) => {
    return axios.post(`${API_URL}/register/`, { username, email, password1, password2});
};

export const fetchUser = (token: string) => {
    return axios.get(`${API_URL}/user/`, {
        headers: {
            'Authorization': `Token ${token}`
        }
    })
};