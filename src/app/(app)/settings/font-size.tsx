import { Text } from 'src/components/ui';
import { ThemedView } from 'src/components/themed-view';

export default function FontSizeSetting() {
    return (
        <ThemedView className="grid grid-flow-col p-4 gap-4">
            <Text className="font-normal">字号大小</Text>
        </ThemedView>
    );
}
