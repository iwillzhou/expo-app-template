import { useEffect } from 'react';
import { Uniwind, useUniwind } from 'uniwind';
import { NAV_THEME } from 'src/constants/theme';
import { useThemeStore } from 'src/stores/theme';

export function useTheme() {
    const { theme } = useUniwind();
    const { loading, colorSchemeSetting, setColorSchemeSetting } = useThemeStore();

    useEffect(() => {
        Uniwind.setTheme(colorSchemeSetting);
    }, [colorSchemeSetting]);

    return {
        loading,
        navTheme: NAV_THEME[theme],
        colorScheme: theme,
        colorSchemeSetting,
        setColorSchemeSetting
    };
}
