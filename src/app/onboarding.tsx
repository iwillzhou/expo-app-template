import { useEffect } from 'react';
import { Text } from 'src/components/ui';
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Onboarding() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace('/home');
        }, 1000);
        return () => {
            clearTimeout(timer);
        };
    }, []);
    return (
        <SafeAreaView className="flex-1 items-center justify-center">
            <Stack.Screen options={{ animation: 'none' }} />
            <Text>Onboarding</Text>
        </SafeAreaView>
    );
}
