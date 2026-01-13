import { useColorScheme } from 'nativewind';
import { DEFAULT_COLOR_SCHEME, NAV_THEME } from 'src/constants/theme';
import { useThemeStore } from 'src/stores/theme';

export function useTheme() {
    const { colorScheme } = useColorScheme();
    const { loading, colorSchemeSetting, setColorSchemeSetting } = useThemeStore();

    const resolveColorScheme = colorScheme ?? DEFAULT_COLOR_SCHEME;

    return {
        loading,
        navTheme: NAV_THEME[resolveColorScheme],
        colorScheme: resolveColorScheme,
        colorSchemeSetting,
        setColorSchemeSetting
    };
}
