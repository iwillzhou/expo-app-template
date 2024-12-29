import { useFonts } from 'expo-font';
import { useState, useEffect } from 'react';
import { useNetworkState } from 'expo-network';
import { useTheme } from 'src/hooks/use-theme';
// import { authService } from 'src/api/services';
import { getIsFirstLaunch } from 'src/utils/is-first-launch';

export function usePrepareApp() {
    const networkState = useNetworkState();
    const [fontLoaded] = useFonts({
        'SpaceMono-Regular': require('assets/fonts/SpaceMono-Regular.ttf')
    });
    const { loaded: themeLoaded, isDarkColorScheme, navTheme, colors } = useTheme();

    const [appIsReady, setAppIsReady] = useState(false);
    const [isFirstLaunch, setIsFirstLaunch] = useState(true);
    // const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        async function prepare() {
            if (fontLoaded && themeLoaded && networkState.type) {
                const isFirstLaunch = await getIsFirstLaunch();
                setIsFirstLaunch(isFirstLaunch);

                // const basicInfo = await authService.getUserInfo();
                // setIsAuthenticated(!!basicInfo?.session?.user);

                setAppIsReady(true);
            }
        }
        prepare();
    }, [themeLoaded, fontLoaded, networkState]);

    return {
        appIsReady,
        isDarkColorScheme,
        colors,
        navTheme,
        // isAuthenticated,
        isFirstLaunch,
        networkState
    };
}
