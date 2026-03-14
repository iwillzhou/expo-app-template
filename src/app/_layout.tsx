import 'src/global.css';
import 'src/i18n';

import { useEffect, useState, useCallback } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from 'src/hooks/use-auth';
import { initSentry } from 'src/utils/sentry';
import { useTheme } from 'src/hooks/use-theme';
import * as Sentry from '@sentry/react-native';
import { PortalHost } from '@rn-primitives/portal';
import * as SplashScreen from 'expo-splash-screen';
import { useLanguage } from 'src/hooks/use-language';
import { queryClient, billingService } from 'src/api';
import { PostHogProvider } from 'posthog-react-native';
import { useFontScale } from 'src/hooks/use-font-scale';
import { ThemeProvider } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { useLaunchInfoStore } from 'src/stores/launch-info';

export { ErrorBoundary } from 'expo-router';

initSentry();
SplashScreen.preventAutoHideAsync();

function RootLayout() {
    const { loading: isAuthLoading } = useAuth();
    const { loading: isLanguageLoading } = useLanguage();
    const { loading: isFontScaleLoading } = useFontScale();
    const { loading: isAppLaunchInfoLoading } = useLaunchInfoStore();
    const { loading: isThemeLoading, colorScheme, navTheme } = useTheme();

    const appIsReady =
        !isLanguageLoading && !isAppLaunchInfoLoading && !isFontScaleLoading && !isThemeLoading && !isAuthLoading;

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
        <PostHogProvider
            apiKey={process.env.EXPO_PUBLIC_POSTHOG_API_KEY}
            options={{
                host: 'https://us.i.posthog.com'
            }}
        >
            <QueryClientProvider client={queryClient}>
                <ThemeProvider value={navTheme}>
                    <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
                    <Stack screenOptions={{ headerShown: false }} />
                    <PortalHost />
                </ThemeProvider>
            </QueryClientProvider>
        </PostHogProvider>
    );
}

export default Sentry.wrap(RootLayout);
