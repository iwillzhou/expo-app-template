import { create } from 'zustand';
import { Storage } from 'src/utils';
import { persist, createJSONStorage } from 'zustand/middleware';

const DEFAULT_CUSTOM_FONT_SIZE = 14;

interface FontSizeState {
    followSystem: boolean;
    customFontSize: number;
    loading: boolean;
    setFollowSystem: (followSystem: boolean) => void;
    setCustomFontSize: (fontSize: number) => void;
    setLoading: (loading: boolean) => void;
}

export const useStore = create<FontSizeState>()(
    persist(
        set => ({
            followSystem: true,
            customFontSize: DEFAULT_CUSTOM_FONT_SIZE,
            loading: true,
            setFollowSystem: (followSystem: boolean) =>
                set({ followSystem, ...(followSystem ? { customFontSize: DEFAULT_CUSTOM_FONT_SIZE } : {}) }),
            setCustomFontSize: (customFontSize: number) => set({ customFontSize }),
            setLoading: (loading: boolean) => set({ loading })
        }),
        {
            name: 'fontSize',
            storage: createJSONStorage(() => Storage),
            partialize: state => ({ followSystem: state.followSystem, customFontSize: state.customFontSize }),
            onRehydrateStorage: () => state => {
                if (state) {
                    state.setLoading(false); // 状态恢复后，设置 loading 为 false
                }
            }
        }
    )
);

export default useStore;
