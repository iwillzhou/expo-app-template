import { create } from 'zustand';
import { Storage } from 'src/utils';
import { Theme, ColorSchemeSetting } from 'src/types/theme';
import { persist, createJSONStorage } from 'zustand/middleware';
import { DEFAULT_THEME, DEFAULT_COLOR_SCHEME_SETTING } from 'src/constants/theme';

interface ThemeState {
    theme: Theme;
    colorSchemeSetting: ColorSchemeSetting;
    loading: boolean;
    setTheme: (theme: Theme) => void;
    setColorSchemeSetting: (colorSchemeSetting: ColorSchemeSetting) => void;
    setLoading: (loading: boolean) => void;
}

const useStore = create<ThemeState>()(
    persist(
        set => ({
            theme: DEFAULT_THEME,
            colorSchemeSetting: DEFAULT_COLOR_SCHEME_SETTING,
            loading: true,
            setTheme: (theme: Theme) => set({ theme }),
            setColorSchemeSetting: (colorSchemeSetting: ColorSchemeSetting) => set({ colorSchemeSetting }),
            setLoading: (loading: boolean) => set({ loading })
        }),
        {
            name: 'theme',
            storage: createJSONStorage(() => Storage),
            partialize: state => ({ theme: state.theme, colorSchemeSetting: state.colorSchemeSetting }),
            onRehydrateStorage: () => state => {
                if (state) {
                    state.setLoading(false); // 状态恢复后，设置 loading 为 false
                }
            }
        }
    )
);

export default useStore;
