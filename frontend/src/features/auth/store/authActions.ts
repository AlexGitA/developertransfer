import authService, { SignInParams, SignUpParams } from "../services/authService";
import {useAccessToken, useAuthActions, useUserDetails} from "./authSlice";
import { UserDetails } from "src/types/user";

const parseJwt = (token: string) => {
    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
        return null;
    }
};

const isTokenValid = (token: string): boolean => {
    const decoded = parseJwt(token);
    return decoded?.exp * 1000 > Date.now();
};

export const authActions = {
    signIn: async (params: SignInParams): Promise<UserDetails> => {
        try {
            const { token, user } = await authService.signIn(params);

            if (!isTokenValid(token)) {
                authActions.logout();
                throw new Error("Session abgelaufen");
            }

            useAuthActions().setAuthData(token, user);
            return user;
        } catch (error) {
            authActions.logout();
            throw new Error("Login fehlgeschalgen");
        }
    },

    signUp: async (params: SignUpParams): Promise<UserDetails> => {
        try {
            const { token, user } = await authService.signUp(params);

            useAuthActions().setAuthData(token, user);
            return user;
        } catch (error) {
            authActions.logout();
            throw new Error("Registrierung fehlgeschlagen");
        }
    },

    logout: (): void => {
        try {
            useAuthActions().clearAuthData();
        } catch (error) {
            console.error("Logout fehlerhaft beendet mit:", error);
        }
    },

    initializeAuthState: (): void => {
        try {
            const token = useAccessToken()
            const user = useUserDetails()

            if (token && user) {
                if (isTokenValid(token)) {
                    useAuthActions().setAuthData(token, user);
                } else {
                    authActions.logout();
                }
            }
        } catch (error) {
            console.error("Auth initialisierung fehlgeschlagen mit:", error);
            authActions.logout();
        }
    }
};
