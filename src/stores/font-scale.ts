import { create } from 'zustand';
import { Storage } from 'src/utils/storage';
import { createJSONStorage, persist } from 'zustand/middleware';
import { PixelRatio } from 'react-native';

export const FONT_SCALES = [0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4] as const;
export type FontScale = (typeof FONT_SCALES)[number];

export const DEFAULT_FONT_SCALE = 1.0;

interface FontScaleState {
    followSystem: boolean;
    fontScale: FontScale;
    loading: boolean;
    setFollowSystem: (followSystem: boolean) => void;
    setFontScale: (fontScale: FontScale) => void;
    setLoading: (loading: boolean) => void;
}

export function nearestFontScale(value: number): FontScale {
    return FONT_SCALES.reduce((prev, curr) => (Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev));
}

export const useFontScaleStore = create<FontScaleState>()(
    persist(
        set => ({
            followSystem: true,
            fontScale: DEFAULT_FONT_SCALE,
            loading: true,
            setFollowSystem: (followSystem: boolean) => {
                const systemFontScale = PixelRatio.getFontScale();
                const fontScale = nearestFontScale(systemFontScale);
                set({ followSystem, fontScale });
            },
            setFontScale: (fontScale: FontScale) => set({ fontScale }),
            setLoading: (loading: boolean) => set({ loading })
        }),
        {
            name: '@app_font_scale',
            storage: createJSONStorage(() => Storage),
            partialize: state => ({ followSystem: state.followSystem, fontScale: state.fontScale }),
            onRehydrateStorage: () => state => {
                if (state) {
                    state.setLoading(false); // 状态恢复后，设置 loading 为 false
                }
            }
        }
    )
);
