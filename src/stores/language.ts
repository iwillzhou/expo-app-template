import { create } from 'zustand';
import { Storage } from 'src/utils/storage';
import { createJSONStorage, persist } from 'zustand/middleware';

interface LanguageState {
    languageSetting: string;
    setLanguageSetting: (languageSetting: string) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

export const LANG_SETTING_SYSTEM = 'system';

export const useLanguageStore = create<LanguageState>()(
    persist(
        set => ({
            languageSetting: LANG_SETTING_SYSTEM,
            setLanguageSetting: (languageSetting: string) => set({ languageSetting }),
            loading: true,
            setLoading: (loading: boolean) => set({ loading })
        }),
        {
            name: '@app_language',
            storage: createJSONStorage(() => Storage),
            partialize: state => ({ languageSetting: state.languageSetting }),
            onRehydrateStorage: () => state => {
                if (state) {
                    state.setLoading(false); // 状态恢复后，设置 loading 为 false
                }
            }
        }
    )
);
