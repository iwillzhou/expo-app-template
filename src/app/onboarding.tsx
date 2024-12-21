import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Text } from 'src/components/ui';
import { ThemedView } from 'src/components/themed-view';
import { setIsFirstLaunch } from 'src/utils/is-first-launch';

export default function Onboarding() {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.replace('/home');
            setIsFirstLaunch(false);
        }, 3000);
    }, []);
    return (
        <ThemedView className="flex-1 items-center justify-center">
            <Text>Onboarding</Text>
        </ThemedView>
    );
}
