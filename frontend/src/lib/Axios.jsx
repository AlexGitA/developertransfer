import axios from 'axios';

const baseUrl = 'http://localhost:8000';

const AxiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
    headers: {
        "Content-Type": 'application/json',
        accept: 'application/json',
    },
    withCredentials: true
});

// Authentication helper functions
export const handleLogout = async () => {
    try {
        const response = await AxiosInstance.post('/api/auth/logout/', {}, {
            headers: {
                'Authorization': `Token ${localStorage.getItem('access_token')}`
            }
        });
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        console.log('Logout response:', response.data.detail);
        window.location.href = '/login';
    } catch (error) {
        console.error('Logout error:', error);
    }
};

export const isAuthenticated = () => {
    return !!localStorage.getItem('access_token');
};

// Get User Data
export const getUserData = () => {
    const userData = localStorage.getItem('user');
    if (userData) {
        return JSON.parse(userData);
    }
    return null;
};

// Get User Token
export const getUserToken = () => {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
        return JSON.parse(access_token);
    }
    return null;
};


// Get User Id
export const getUserId = () => {
    const user = getUserData();
    return user ? user.pk : null;
};

export default AxiosInstance;