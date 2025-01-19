import 'src/i18n';
import 'src/styles/global.css';
import { useState } from 'react';
import { View } from 'react-native';
import { queryClient } from 'src/api';
import * as SystemUI from 'expo-system-ui';
import { StatusBar } from 'expo-status-bar';
import { Stack, ErrorBoundary } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { PortalHost } from '@rn-primitives/portal';
import { TextContext } from 'src/components/ui/text';
import { ThemeProvider } from '@react-navigation/native';
import { usePrepareApp } from 'src/hooks/use-prepare-app';
import { QueryClientProvider } from '@tanstack/react-query';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AnimatedSplashScreen from 'src/components/animated-splash-screen';

export { ErrorBoundary };

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const { appIsReady, isDarkColorScheme, navTheme, isFirstLaunch, isConnected, colors, allowFontScaling } =
        usePrepareApp();
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
        <GestureHandlerRootView>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider value={navTheme}>
                    <View className="flex-1" style={colors}>
                        <TextContext.Provider value={{ allowFontScaling }}>
                            <BottomSheetModalProvider>
                                <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
                                <Stack
                                    screenOptions={{
                                        headerShown: false,
                                        navigationBarColor: navTheme.colors.background
                                    }}
                                >
                                    <Stack.Screen name="index" initialParams={{ isFirstLaunch, isConnected }} />
                                </Stack>
                            </BottomSheetModalProvider>
                            <PortalHost />
                        </TextContext.Provider>
                    </View>
                </ThemeProvider>
            </QueryClientProvider>
        </GestureHandlerRootView>
    );
}
