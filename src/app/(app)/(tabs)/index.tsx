import { Button, Text } from 'src/components/ui';
import { ThemedView } from 'src/components/themed-view';
import { Link } from 'expo-router';

export default function HomeScreen() {
    return (
        <ThemedView className="flex-1 justify-center items-center">
            <Text className="text-primary text-4xl">Home</Text>
            <Link href="/playground" asChild>
                <Button variant="link" className="flex-row justify-between native:h-14">
                    <Text className="font-normal">Playground</Text>
                </Button>
            </Link>
        </ThemedView>
    );
}
