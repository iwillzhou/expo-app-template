import { View } from 'react-native';
import { Storage } from 'src/utils/storage';
import { Button, Text } from 'src/components/ui';
import { useFontScaleStore } from 'src/stores/font-scale';
import * as Sentry from '@sentry/react-native';
import { usePostHog } from 'posthog-react-native';

export default function HomeScreen() {
    const { fontScale } = useFontScaleStore();
    const posthog = usePostHog();

    return (
        <View className="flex-1 items-center justify-center bg-background gap-4">
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
            <Button
                onPress={() => {
                    posthog.capture('button_pressed', {
                        button_name: 'Try PostHog!'
                    });
                }}
            >
                <Text>Try PostHog!</Text>
            </Button>
        </View>
    );
}
