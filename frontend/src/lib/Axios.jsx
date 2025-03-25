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

AxiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Token ${token}`;

        }

        if (config.data instanceof FormData) {
            delete config.headers['Content-Type'];
        } else {
            config.headers['Content-Type'] = 'application/json';
            config.headers['Accept'] = 'application/json';
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

AxiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Authentication helper functions
export const handleLogout = async () => {
    try {
        const token = localStorage.getItem('access_token');
        console.log('Attempting logout with token:', token);

        if (!token) {
            throw new Error('No access token found');
        }

        const response = await AxiosInstance.post('/api/auth/logout/', {}, {
            headers: {
                'Authorization': `Token ${token}`
            }
        });

        console.log('Logout response:', response.data);

        // Only clear storage and redirect if the request was successful
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        window.location.href = '/login';

    } catch (error) {  // Removed the ': any' type annotation
        console.error('Logout error:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });

        // If we get a 401, it means the token is already invalid/expired
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