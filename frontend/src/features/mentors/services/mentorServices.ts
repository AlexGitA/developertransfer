import AxiosInstance from "@/lib/Axios";

const mentorService = {

    getMentors: async () => {
        try {
            const response = await AxiosInstance.get('/api/user-details/');

            if (!response) {
                throw new Error("Ein Fehler ist beim Laden von Mentoren aufgetreten");
            }

            return response.data;

        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    }
}

export default mentorService;