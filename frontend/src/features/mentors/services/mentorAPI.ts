import AxiosInstance from "@/lib/Axios";

const API_URL = '/api/user-details/';

export const getMentors = () => {
    return AxiosInstance.get(`${API_URL}`);
};