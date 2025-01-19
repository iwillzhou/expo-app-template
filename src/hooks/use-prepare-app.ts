import { rem } from 'nativewind';
import { useFonts } from 'expo-font';
import { useState, useEffect } from 'react';
import { useNetworkState } from 'expo-network';
import { useTheme } from 'src/hooks/use-theme';
// import { authService } from 'src/api/services';
import { getIsFirstLaunch } from 'src/utils/is-first-launch';
import { useStore as useFontSizeStore } from 'src/stores/font-size';

export function usePrepareApp() {
    const networkState = useNetworkState();
    const [fontLoaded] = useFonts({
        'SpaceMono-Regular': require('assets/fonts/SpaceMono-Regular.ttf')
    });
    const { followSystem: allowFontScaling, customFontSize, loading: fontSizeLoading } = useFontSizeStore();
    const { loaded: themeLoaded, isDarkColorScheme, navTheme, colors } = useTheme();

    const [appIsReady, setAppIsReady] = useState(false);
    const [isFirstLaunch, setIsFirstLaunch] = useState(true);
    // const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        rem.set(customFontSize);
    }, [customFontSize]);

    useEffect(() => {
        async function prepare() {
            if (fontLoaded && themeLoaded && networkState.type && !fontSizeLoading) {
                const isFirstLaunch = await getIsFirstLaunch();
                setIsFirstLaunch(isFirstLaunch);

                // const basicInfo = await authService.getUserInfo();
                // setIsAuthenticated(!!basicInfo?.session?.user);

                setAppIsReady(true);
            }
        }
        prepare();
    }, [themeLoaded, fontLoaded, networkState, fontSizeLoading]);

    return {
        appIsReady,
        isDarkColorScheme,
        colors,
        navTheme,
        // isAuthenticated,
        isFirstLaunch,
        isConnected: networkState.isConnected,
        allowFontScaling
    };
}
