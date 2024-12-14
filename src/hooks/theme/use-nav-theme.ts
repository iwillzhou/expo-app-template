import { THEMES } from 'src/constants/theme';
import { Theme as NavigationTheme, DefaultTheme } from '@react-navigation/native';
import { useTheme } from './use-theme';

export function useNavigationTheme() {
    const { theme, colorScheme, isDarkColorScheme } = useTheme();

    const colors = THEMES[theme][colorScheme];

    const navTheme: NavigationTheme = {
        dark: isDarkColorScheme,
        colors: {
            primary: `hsl(${colors['--primary']})`,
            background: `hsl(${colors['--background']})`,
            card: `hsl(${colors['--card']})`,
            text: `hsl(${colors['--foreground']})`,
            border: `hsl(${colors['--border']})`,
            notification: `hsl(${colors['--destructive']})`
        },
        fonts: DefaultTheme.fonts
    };

    return navTheme;
}
