import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, Text } from 'react-native';
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
        <View className="flex-1 items-center justify-center">
            <Text>Onboarding</Text>
        </View>
    );
}
