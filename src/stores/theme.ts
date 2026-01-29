import { Uniwind } from 'uniwind';
import { create } from 'zustand';
import { Storage } from 'src/utils/storage';
import { createJSONStorage, persist } from 'zustand/middleware';

export const enum ColorSchemeSetting {
    Light = 'light',
    Dark = 'dark',
    System = 'system'
}

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
            colorSchemeSetting: ColorSchemeSetting.System,
            loading: true,
            setColorSchemeSetting: (colorSchemeSetting: ColorSchemeSetting) => {
                set({ colorSchemeSetting });
                Uniwind.setTheme(colorSchemeSetting);
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
                        Uniwind.setTheme(state.colorSchemeSetting);
                    }
                    state.setLoading(false); // 状态恢复后，设置 loading 为 false
                }
            }
        }
    )
);
