import 'src/styles/global.css';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '@react-navigation/native';
import { useTheme, useNavigationTheme } from 'src/hooks/theme';
import { SplashScreen, Stack, ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const navigationTheme = useNavigationTheme();
    const { loaded: themeLoaded, isDarkColorScheme, colors } = useTheme();

    useEffect(() => {
        if (themeLoaded) {
            SplashScreen.hideAsync();
        }
    }, [themeLoaded]);

    if (!themeLoaded) {
        return null;
    }

    return (
        <ThemeProvider value={navigationTheme}>
            <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
            <Stack screenOptions={{ headerShown: false, navigationBarColor: navigationTheme.colors.background }}>
                <Stack.Screen name="(app)" />
            </Stack>
        </ThemeProvider>
    );
}

export { ErrorBoundary };
