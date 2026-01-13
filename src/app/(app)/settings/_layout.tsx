import { router, Stack } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { Button, Icon } from 'src/components/ui';

export default function SettingsLayout() {
    return (
        <Stack
            screenOptions={{
                headerTitleAlign: 'center',
                headerShadowVisible: false,
                headerLeft: () => (
                    <Button variant="ghost" size="icon" onPress={() => router.back()} className="rounded-full">
                        <Icon as={ChevronLeft} size={24} />
                    </Button>
                )
            }}
        >
            <Stack.Screen name="about" options={{ headerShown: false }} />
        </Stack>
    );
}
