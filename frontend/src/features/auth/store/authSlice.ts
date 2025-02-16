import { create } from 'zustand';
import { UserDetails } from 'src/types/user';
import { persist } from "zustand/middleware";

interface AuthState {
    accessToken: string | null;
    user: UserDetails | null;
    actions: {
        setAuthData: (accessToken: string, user: UserDetails) => void;
        isAuthenticated: () => boolean;
        clearAuthData: () => void;
    };
}

const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            accessToken: null,
            user: null,
            actions: {
                setAuthData: (accessToken: string, user: UserDetails) => {
                    set({ accessToken, user });
                },
                isAuthenticated: () => !!get().accessToken,
                clearAuthData: () => set({ accessToken: null, user: null }),
            },
        }),
        { name: 'auth-storage' }
    )
);

export const useAuthActions = () => useAuthStore(state => state.actions);
export const useAccessToken = () => useAuthStore(state => state.accessToken);
export const useUserDetails = () => useAuthStore(state => state.user);
export const useIsAuthenticated = () => useAuthStore(state => state.actions.isAuthenticated());