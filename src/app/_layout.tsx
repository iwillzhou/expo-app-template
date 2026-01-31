import 'src/global.css';
import 'src/i18n';

import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from 'src/hooks/use-theme';
import { AuthProvider } from 'src/hooks/use-auth';
import { PortalHost } from '@rn-primitives/portal';
import * as SplashScreen from 'expo-splash-screen';
import { useLanguage } from 'src/hooks/use-language';
import { queryClient, billingService } from 'src/api';
import { useFontScale } from 'src/hooks/use-font-scale';
import { ThemeProvider } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { useLaunchInfoStore } from 'src/stores/launch-info';
import * as Sentry from '@sentry/react-native';

export { ErrorBoundary } from 'expo-router';

Sentry.init({
    dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
    sendDefaultPii: true
});

SplashScreen.preventAutoHideAsync();

function RootLayout() {
    const { loading: isLanguageLoading } = useLanguage();
    const { loading: isFontScaleLoading } = useFontScale();
    const { loading: isAppLaunchInfoLoading } = useLaunchInfoStore();
    const { loading: isThemeLoading, colorScheme, navTheme } = useTheme();

    const appIsReady = !isLanguageLoading && !isAppLaunchInfoLoading && !isFontScaleLoading && !isThemeLoading;

    useEffect(() => {
        billingService.init().catch(e => {
            Sentry.captureException(e);
        });
    }, []);

    useEffect(() => {
        if (appIsReady) {
            SplashScreen.hide();
        }
    }, [appIsReady]);

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

export default Sentry.wrap(RootLayout);
