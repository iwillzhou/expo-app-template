import { Link } from 'expo-router';
import { Storage } from 'src/utils';
import { View } from 'react-native';
import { Button, Text } from 'src/components/ui';

export default function HomeScreen() {
    return (
        <View className="flex-1 justify-center items-center">
            <Text className="text-primary text-4xl">Home</Text>
            <Button
                variant="link"
                onPress={() => {
                    Storage.clear();
                }}
            >
                <Text className="font-normal">Clear storage </Text>
            </Button>
            <Link href="/playground" asChild>
                <Button variant="link" className="flex-row justify-between native:h-14">
                    <Text className="font-normal">Playground</Text>
                </Button>
            </Link>
        </View>
    );
}
