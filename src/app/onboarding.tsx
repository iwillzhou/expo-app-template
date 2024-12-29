import { useEffect } from 'react';
import { View } from 'react-native';
import { Text } from 'src/components/ui';
import { Stack, useRouter } from 'expo-router';
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
        <View className="flex-1 items-center justify-center">
            <Stack.Screen options={{ animation: 'none' }} />
            <Text>Onboarding</Text>
        </View>
    );
}
