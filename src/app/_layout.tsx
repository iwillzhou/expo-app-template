import 'src/i18n';
import 'src/styles/global.css';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { PortalHost } from '@rn-primitives/portal';
import { ThemeProvider } from '@react-navigation/native';
import { useTheme, useNavigationTheme } from 'src/hooks/theme';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { SplashScreen, Stack, ErrorBoundary } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export { ErrorBoundary };

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
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ThemeProvider value={navigationTheme}>
                <BottomSheetModalProvider>
                    <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
                    <Stack
                        screenOptions={{
                            headerShown: false,
                            navigationBarColor: navigationTheme.colors.background
                        }}
                    >
                        <Stack.Screen name="(app)" />
                    </Stack>
                </BottomSheetModalProvider>
            </ThemeProvider>
            <PortalHost />
        </GestureHandlerRootView>
    );
}
