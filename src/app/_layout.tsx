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

export { ErrorBoundary };

SplashScreen.preventAutoHideAsync();

let FIRST_RENDER = true;

export default function RootLayout() {
    const router = useRouter();
    const { appIsReady, isDarkColorScheme, navTheme, isFirstLaunch, networkState } = usePrepareApp();
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

    // stack的 initialRouteName 设置不生效，默认是/, 这里hack一下
    const onSetInitialRouteName = () => {
        setTimeout(() => {
            if (FIRST_RENDER) {
                FIRST_RENDER = false;
                if (isFirstLaunch) {
                    router.replace('/onboarding');
                } else if (networkState.isConnected) {
                    router.replace('/launch');
                } else {
                    router.replace('/home');
                }
            }
        });
    };

    return (
        <GestureHandlerRootView onLayout={onSetInitialRouteName}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider value={navTheme}>
                    <BottomSheetModalProvider>
                        <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
                        <Stack
                            screenOptions={{
                                headerShown: false,
                                navigationBarColor: navTheme.colors.background
                            }}
                        />
                    </BottomSheetModalProvider>
                    <PortalHost />
                </ThemeProvider>
            </QueryClientProvider>
        </GestureHandlerRootView>
    );
}
