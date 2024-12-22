import 'src/i18n';
import 'src/styles/global.css';
import { useState } from 'react';
import { queryClient } from 'src/api';
import { routerUtils } from 'src/utils';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { PortalHost } from '@rn-primitives/portal';
import { Stack, ErrorBoundary } from 'expo-router';
import { ThemeProvider } from '@react-navigation/native';
import { usePrepareApp } from 'src/hooks/use-prepare-app';
import { QueryClientProvider } from '@tanstack/react-query';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AnimatedSplashScreen from 'src/components/animated-splash-screen';

export { ErrorBoundary };

SplashScreen.preventAutoHideAsync();

let FIRST_RENDER = true;

export default function RootLayout() {
    const { appIsReady, isDarkColorScheme, navTheme, isFirstLaunch, networkState, isAuthenticated } = usePrepareApp();
    const [splashAnimationFinished, setSplashAnimationFinished] = useState(false);

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
                    routerUtils.reset('/onboarding');
                } else if (networkState.isConnected) {
                    routerUtils.reset('/launch');
                } else if (isAuthenticated) {
                    routerUtils.reset('/home');
                } else {
                    routerUtils.reset('/log-in');
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
                                animation: 'none',
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
