import * as authAPI from "./authAPI";
import { UserDetails } from "src/types/user";

export interface SignInParams {
    username: string;
    password: string;
}

export interface SignUpParams {
    username: string;
    email: string;
    password1: string;
    password2: string;
}

const authService = {
    signIn: async (
        params: SignInParams
    ): Promise<{ token: string; user: UserDetails }> => {
        try {
            const response = await authAPI.signIn(params.username, params.password);

            if (!response.data || !response.data.key) {
                throw new Error("Invalid response from sign-in API");
            }
            const token: string = response.data.key;
            const userResponse = await authAPI.fetchUser(token);
            if (!userResponse.data) {
                throw new Error("Failed to fetch user data");
            }
            const user = userResponse.data as UserDetails;
            return { token, user };
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    },

    signUp: async (
        params: SignUpParams
    ): Promise<{ token: string; user: UserDetails }> => {
        try {
            const response = await authAPI.signUp(
                params.username,
                params.email,
                params.password1,
                params.password2
            );

            if (!response.data || !response.data.key) {
                throw new Error("Invalid response from sign-up API");
            }
            const token: string = response.data.key;
            const userResponse = await authAPI.fetchUser(token);
            if (!userResponse.data) {
                throw new Error("Failed to fetch user data after registration");
            }
            const user = userResponse.data as UserDetails;
            return { token, user };
        } catch (error) {
            console.error("Registration error:", error);
            throw error;
        }
    },

    fetchUsers: async (token: string) => {
        return authAPI.fetchUser(token);
    }
};

export default authService;
