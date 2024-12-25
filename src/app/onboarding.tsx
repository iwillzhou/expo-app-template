import { useEffect } from 'react';
import { Text } from 'src/components/ui';
import { Stack, useRouter } from 'expo-router';
import { ThemedView } from 'src/components/themed-view';
import { setIsFirstLaunch } from 'src/utils/is-first-launch';

export default function Onboarding() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace('/home');
            setIsFirstLaunch(false);
        }, 3000);
        return () => {
            clearTimeout(timer);
        };
    }, []);
    return (
        <ThemedView className="flex-1 items-center justify-center">
            <Stack.Screen options={{ animation: 'none' }} />
            <Text>Onboarding</Text>
        </ThemedView>
    );
}
