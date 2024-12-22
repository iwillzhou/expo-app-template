import { useEffect } from 'react';
import useThemeStore from 'src/stores/theme';
import { DEFAULT_COLOR_SCHEME, THEMES } from 'src/constants/theme';
import { useColorScheme as useNativewindColorScheme, vars } from 'nativewind';
import { Theme as NavigationTheme, DefaultTheme } from '@react-navigation/native';

export function useTheme() {
    const { colorScheme, setColorScheme } = useNativewindColorScheme();
    const { loading, theme, colorSchemeSetting, setTheme, setColorSchemeSetting } = useThemeStore();

    useEffect(() => {
        setColorScheme(colorSchemeSetting);
    }, [colorSchemeSetting]);

    const toggleAndStoreColorScheme = () => {
        const newColorScheme = colorScheme === 'light' ? 'dark' : 'light';
        setColorSchemeSetting(newColorScheme);
    };

    const resolveColorScheme = colorScheme ?? DEFAULT_COLOR_SCHEME;
    const isDarkColorScheme = resolveColorScheme === 'dark';
    const colorMap = THEMES[theme][resolveColorScheme];

    const navTheme: NavigationTheme = {
        dark: isDarkColorScheme,
        colors: {
            primary: `hsl(${colorMap['--primary']})`,
            background: `hsl(${colorMap['--background']})`,
            card: `hsl(${colorMap['--card']})`,
            text: `hsl(${colorMap['--foreground']})`,
            border: `hsl(${colorMap['--border']})`,
            notification: `hsl(${colorMap['--destructive']})`
        },
        fonts: DefaultTheme.fonts
    };

    return {
        loaded: !loading,
        theme,
        navTheme,
        colorScheme: resolveColorScheme,
        colorSchemeSetting,
        colors: vars(colorMap),
        isDarkColorScheme,
        setTheme,
        setColorSchemeSetting,
        toggleColorScheme: toggleAndStoreColorScheme
    };
}
