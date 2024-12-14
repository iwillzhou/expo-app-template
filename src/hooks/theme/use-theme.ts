import { useEffect } from 'react';
import useStore from 'src/stores/theme';
import type { UseTheme } from 'src/types/theme';
import { DEFAULT_COLOR_SCHEME, THEMES } from 'src/constants/theme';
import { useColorScheme as useNativewindColorScheme, vars } from 'nativewind';

export function useTheme(): UseTheme {
    const { colorScheme, setColorScheme } = useNativewindColorScheme();
    const { loading, theme, colorSchemeSetting, setTheme, setColorSchemeSetting } = useStore();

    useEffect(() => {
        setColorScheme(colorSchemeSetting);
    }, [colorSchemeSetting]);

    const toggleAndStoreColorScheme = () => {
        const newColorScheme = colorScheme === 'light' ? 'dark' : 'light';
        setColorSchemeSetting(newColorScheme);
    };

    return {
        loaded: !loading,
        theme,
        colorScheme: colorScheme ?? DEFAULT_COLOR_SCHEME,
        colorSchemeSetting,
        colors: vars(THEMES[theme][colorScheme ?? DEFAULT_COLOR_SCHEME]),
        isDarkColorScheme: colorScheme === 'dark',
        setTheme,
        setColorSchemeSetting,
        toggleColorScheme: toggleAndStoreColorScheme
    };
}
