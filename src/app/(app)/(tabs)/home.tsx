import { View } from 'react-native';
import { Storage } from 'src/utils/storage';
import { Button, Text } from 'src/components/ui';
import { useFontScaleStore } from 'src/stores/font-scale';
import * as Sentry from '@sentry/react-native';

export default function HomeScreen() {
    const { fontScale } = useFontScaleStore();

    return (
        <View className="flex-1 items-center justify-center gap-4">
            <Text>Home</Text>
            <Button onPress={() => Storage.clear()}>
                <Text>Clear storage</Text>
            </Button>
            <Text>Font Scale: {fontScale}</Text>
            <Button
                onPress={() => {
                    Sentry.captureException(new Error('First error'));
                }}
            >
                <Text>Try Sentry!</Text>
            </Button>
        </View>
    );
}
