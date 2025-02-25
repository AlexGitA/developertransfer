import axios from 'axios';

const baseUrl = 'http://localhost:8000';

const AxiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
    withCredentials: true,
});

AxiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Token ${token}`;

        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const handleLogout = async () => {
    try {
        const token = localStorage.getItem('access_token');
        if (!token) {
            throw new Error('No access token found');
        }
        const response = await AxiosInstance.post('/api/auth/logout/', {}, {
            headers: { 'Authorization': `Token ${token}` }
        });
        console.log('Logout response:', response.data);

        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    } catch (error) {
        console.error('Logout error:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
        });

        if (error.response?.status === 401) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
    }
};

export const isAuthenticated = () => {
    return !!localStorage.getItem('access_token');
};

export const getUserData = () => {
    const userData = localStorage.getItem('user');
    if (userData) {
        return JSON.parse(userData);
    }
    return null;
};

// Hole User-Id
export const getUserId = () => {
    const user = getUserData();
    return user ? user.pk : null;
};

export default AxiosInstance;
