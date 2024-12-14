import { Link } from 'expo-router';
import { Button, Text } from 'src/components/ui';
import { SettingStroke } from 'src/components/icons';
import { ThemedView } from 'src/components/themed-view';

export default function ProfileScreen() {
    return (
        <ThemedView className="grid grid-flow-col p-4 gap-4">
            {/* <Link href="/settings" asChild>
                <Pressable>
                    <View className="flex flex-row items-center p-4 bg-secondary">
                        <SettingStroke className="mr-4" />
                        <Text>settings</Text>
                    </View>
                </Pressable>
            </Link> */}
            <Link href="/settings" asChild>
                <Button variant="secondary" className="flex-row justify-start native:h-14">
                    <SettingStroke className="mr-4 text-foreground" />
                    <Text className="font-normal">settings</Text>
                </Button>
            </Link>
        </ThemedView>
    );
}
