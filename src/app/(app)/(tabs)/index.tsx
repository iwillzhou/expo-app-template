import { Text } from 'react-native';
import { ThemedView } from 'src/components/themed-view';

export default function HomeScreen() {
    return (
        <ThemedView className="flex-1 justify-center items-center">
            <Text className="text-primary text-4xl">Home</Text>
        </ThemedView>
    );
}
