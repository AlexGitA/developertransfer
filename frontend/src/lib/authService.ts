// services/authService.ts
import AxiosInstance from './Axios';

// TODO needs to be completed and finished
export const getCurrentUser = async () => {
    try {
        const response = await AxiosInstance.get('/auth/user'); // adjust endpoint as needed
        return response.data;
    } catch (error) {
        console.error('Error getting current user:', error);
        return null;
    }
};