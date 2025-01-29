import axios from 'axios'

// TODO needs to be completed and finished with authService.ts

const baseUrl = 'http://localhost:8000'

const AxiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
    headers: {
        "Content-Type": 'application/json',
        accept: 'application/json',
    },
    withCredentials: true
})

// Request interceptor with the JWT token
AxiosInstance.interceptors.request.use(
    config => {
        // Get token from localStorage or wherever you store it
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log('Starting Request:', config);
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Response interceptor
AxiosInstance.interceptors.response.use(
    response => {
        console.log('Response:', response);
        return response;
    },
    error => {
        console.log('Error:', error.response || error);
        return Promise.reject(error);
    }
);

export default AxiosInstance;