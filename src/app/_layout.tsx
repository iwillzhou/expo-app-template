import 'src/i18n';
import 'src/styles/global.css';
import { useState } from 'react';
import { queryClient } from 'src/api';
import * as SystemUI from 'expo-system-ui';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { PortalHost } from '@rn-primitives/portal';
import { ThemeProvider } from '@react-navigation/native';
import { usePrepareApp } from 'src/hooks/use-prepare-app';
import { QueryClientProvider } from '@tanstack/react-query';
import { Stack, ErrorBoundary, useRouter } from 'expo-router';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AnimatedSplashScreen from 'src/components/animated-splash-screen';
import { View } from 'react-native';

export { ErrorBoundary };

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const router = useRouter();
    const { appIsReady, isDarkColorScheme, navTheme, isFirstLaunch, networkState, colors } = usePrepareApp();
    const [splashAnimationFinished, setSplashAnimationFinished] = useState(false);

    SystemUI.setBackgroundColorAsync(navTheme.colors.background);

    if (!appIsReady || !splashAnimationFinished) {
        return (
            <AnimatedSplashScreen
                onLayout={() => SplashScreen.hide()}
                onAnimationFinish={isCancelled => {
                    if (!isCancelled) {
                        setSplashAnimationFinished(true);
                    }
                }}
            />
        );
    }

    return (
        <GestureHandlerRootView className="flex-1" style={colors}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider value={navTheme}>
                    <BottomSheetModalProvider>
                        <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
                        <Stack
                            screenOptions={{
                                headerShown: false,
                                navigationBarColor: navTheme.colors.background
                            }}
                        >
                            <Stack.Screen
                                name="index"
                                initialParams={{ isFirstLaunch, isConnected: networkState.isConnected }}
                            />
                        </Stack>
                    </BottomSheetModalProvider>
                    <PortalHost />
                </ThemeProvider>
            </QueryClientProvider>
        </GestureHandlerRootView>
    );
}
