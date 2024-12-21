import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, Text } from 'react-native';

export default function Launch() {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.replace('/home');
        }, 3000);
    }, []);
    return (
        <View className="flex-1 items-center justify-center">
            <Text>Launch</Text>
        </View>
    );
}
