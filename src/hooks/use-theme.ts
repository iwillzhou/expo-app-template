import { useEffect } from 'react';
import { useThemeStore } from 'src/stores/theme';
import { Uniwind, useCSSVariable, useUniwind } from 'uniwind';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export function useTheme() {
    const { theme } = useUniwind();
    const { loading, colorSchemeSetting, setColorSchemeSetting } = useThemeStore();
    const [primaryColor, backgroundColor, borderColor, cardColor, destructiveColor, foregroundColor] = useCSSVariable([
        '--color-primary',
        '--color-background',
        '--color-border',
        '--color-card',
        '--color-destructive',
        '--color-foreground'
    ]);

    const navTheme = {
        ...(theme === 'light' ? DefaultTheme : DarkTheme),
        colors: {
            background: backgroundColor as string,
            border: borderColor as string,
            card: cardColor as string,
            notification: destructiveColor as string,
            primary: primaryColor as string,
            text: foregroundColor as string
        }
    };

    useEffect(() => {
        Uniwind.setTheme(colorSchemeSetting);
    }, [colorSchemeSetting]);

    return {
        loading,
        navTheme,
        colorScheme: theme,
        colorSchemeSetting,
        setColorSchemeSetting
    };
}
