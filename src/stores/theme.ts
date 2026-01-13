import { colorScheme } from 'nativewind';
import { DEFAULT_COLOR_SCHEME_SETTING } from 'src/constants/theme';
import { Storage } from 'src/utils/storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type ColorSchemeSetting = 'light' | 'dark' | 'system';

interface ThemeState {
    colorSchemeSetting: ColorSchemeSetting;
    loading: boolean;
    setColorSchemeSetting: (scheme: ColorSchemeSetting) => void;
    setLoading: (loading: boolean) => void;
}

const STORAGE_KEY = '@app_theme';

export const useThemeStore = create<ThemeState>()(
    persist(
        set => ({
            colorSchemeSetting: DEFAULT_COLOR_SCHEME_SETTING,
            loading: true,
            setColorSchemeSetting: (colorSchemeSetting: ColorSchemeSetting) => {
                set({ colorSchemeSetting });
                colorScheme.set(colorSchemeSetting);
            },
            setLoading: (loading: boolean) => set({ loading })
        }),
        {
            name: STORAGE_KEY,
            storage: createJSONStorage(() => Storage),
            partialize: state => ({ colorSchemeSetting: state.colorSchemeSetting }),
            onRehydrateStorage: () => state => {
                if (state) {
                    if (state.colorSchemeSetting) {
                        colorScheme.set(state.colorSchemeSetting);
                    }
                    state.setLoading(false); // 状态恢复后，设置 loading 为 false
                }
            }
        }
    )
);
