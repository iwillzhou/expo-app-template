import { NAV_THEME } from 'src/constants/theme';
import { useThemeStore } from 'src/stores/theme';
import { useUniwind } from 'uniwind';

export function useTheme() {
    const { theme } = useUniwind();
    const { loading, colorSchemeSetting, setColorSchemeSetting } = useThemeStore();

    return {
        loading,
        navTheme: NAV_THEME[theme],
        colorScheme: theme,
        colorSchemeSetting,
        setColorSchemeSetting
    };
}
