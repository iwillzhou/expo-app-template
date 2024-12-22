import { useFonts } from 'expo-font';
import { useState, useEffect } from 'react';
import { useNetworkState } from 'expo-network';
import { useTheme } from 'src/hooks/use-theme';
import { getIsFirstLaunch } from 'src/utils/is-first-launch';

export function usePrepareApp() {
    const networkState = useNetworkState();
    const [fontLoaded] = useFonts({
        'SpaceMono-Regular': require('assets/fonts/SpaceMono-Regular.ttf')
    });
    const { loaded: themeLoaded, isDarkColorScheme, navTheme } = useTheme();

    const [appIsReady, setAppIsReady] = useState(false);
    const [isFirstLaunch, setIsFirstLaunch] = useState(true);

    useEffect(() => {
        async function prepare() {
            if (fontLoaded && themeLoaded && networkState.type) {
                const isFirstLaunch = await getIsFirstLaunch();
                setIsFirstLaunch(isFirstLaunch);
                setAppIsReady(true);
            }
        }
        prepare();
    }, [themeLoaded, fontLoaded, networkState]);

    return {
        appIsReady,
        isDarkColorScheme,
        navTheme,
        isFirstLaunch,
        networkState
    };
}
