import 'src/styles/global.css';

import 'src/i18n';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { useTheme } from 'src/hooks/use-theme';
import { AuthProvider } from 'src/hooks/use-auth';
import { PortalHost } from '@rn-primitives/portal';
import * as SplashScreen from 'expo-splash-screen';
import { queryClient, billingService } from 'src/api';
import { ThemeProvider } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { useLaunchInfoStore } from 'src/stores/launch-info';
import { useFontScale } from 'src/hooks/use-font-scale';
import { useLanguage } from 'src/hooks/use-language';

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [appIsReady, setAppIsReady] = useState(false);

    const { loading: isLanguageLoading } = useLanguage();
    const { loading: isFontScaleLoading } = useFontScale();
    const { isLoading: isAppLaunchInfoLoading } = useLaunchInfoStore();
    const { loading: isThemeLoading, colorScheme, navTheme } = useTheme();

    useEffect(() => {
        billingService.init();
    }, []);

    useEffect(() => {
        const appIsReady = !isAppLaunchInfoLoading && !isAppLaunchInfoLoading && !isFontScaleLoading && !isThemeLoading;
        setAppIsReady(appIsReady);
        if (appIsReady) {
            SplashScreen.hide();
        }
    }, [isLanguageLoading, isFontScaleLoading, isAppLaunchInfoLoading, isThemeLoading]);

    if (!appIsReady) {
        return null;
    }

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider value={navTheme}>
                <AuthProvider>
                    <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
                    <Stack screenOptions={{ headerShown: false }} />
                    <PortalHost />
                </AuthProvider>
            </ThemeProvider>
        </QueryClientProvider>
    );
}
