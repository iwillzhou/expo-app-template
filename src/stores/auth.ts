import { create } from 'zustand';
import { Storage } from 'src/utils/storage';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
    userId: string | null;
    profile: any | null;
    setUserId: (userId: string) => void;
    setProfile: (profile: any) => void;
    clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        set => ({
            userId: null,
            profile: null,
            setUserId: userId => set({ userId }),
            setProfile: profile => set({ profile }),
            clearAuth: () => set({ userId: null, profile: null })
        }),
        {
            name: '@@app_auth',
            storage: createJSONStorage(() => Storage)
        }
    )
);
