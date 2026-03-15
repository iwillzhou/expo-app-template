import { useEffect, useRef } from 'react';
import { usePostHog } from 'posthog-react-native';
import { usePathname, useGlobalSearchParams } from 'expo-router';

/**
 * 在 Expo Router 下模拟 captureScreens 功能
 */
export function usePostHogScreenTracking() {
    const posthog = usePostHog();
    const pathname = usePathname();
    const params = useGlobalSearchParams();
    const prevPath = useRef<string | null>(null);

    useEffect(() => {
        if (prevPath.current !== pathname) {
            try {
                posthog.screen(pathname, {
                    ...params,
                    pathname
                });
            } catch (error) {
                console.warn('PostHog screen tracking failed:', error);
            }
            prevPath.current = pathname;
        }
    }, [pathname, params, posthog]);
}
