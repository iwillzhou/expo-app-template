import { Link } from 'expo-router';
import { Button, Text } from 'src/components/ui';
import { ThemedView } from 'src/components/themed-view';

export default function LogIn() {
    return (
        <ThemedView className="flex-1 justify-center items-center">
            <Text>LogIn</Text>
            <Link href="/home" asChild>
                <Button variant="link">
                    <Text>Go to Home</Text>
                </Button>
            </Link>
        </ThemedView>
    );
}
