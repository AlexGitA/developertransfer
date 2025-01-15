import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';

export const fetchHelloWorld = async (): Promise<{ message: string }> => {
    try {
        const response = await axios.get(`${API_URL}hello/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
