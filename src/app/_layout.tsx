import 'src/i18n';
import 'src/styles/global.css';
import { useState } from 'react';
import { routerUtils } from 'src/utils';
import { usePrepareApp } from 'src/hooks';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { PortalHost } from '@rn-primitives/portal';
import { Stack, ErrorBoundary } from 'expo-router';
import { ThemeProvider } from '@react-navigation/native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AnimatedSplashScreen from 'src/components/animated-splash-screen';

export { ErrorBoundary };

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const { appIsReady, isDarkColorScheme, navTheme, isFirstLaunch, networkState } = usePrepareApp();
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
        if (isFirstLaunch) {
            routerUtils.reset('/onboarding');
        } else if (networkState.isConnected) {
            routerUtils.reset('/launch');
        }
    };

    return (
        <GestureHandlerRootView onLayout={onSetInitialRouteName}>
            <ThemeProvider value={navTheme}>
                <BottomSheetModalProvider>
                    <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
                    <Stack
                        initialRouteName="onboarding"
                        screenOptions={{
                            animation: 'none',
                            headerShown: false,
                            navigationBarColor: navTheme.colors.background
                        }}
                    />
                </BottomSheetModalProvider>
            </ThemeProvider>
            <PortalHost />
        </GestureHandlerRootView>
    );
}
