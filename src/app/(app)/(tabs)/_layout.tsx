import { Link, Tabs } from 'expo-router';
import { Settings } from 'lucide-react-native';
import { Button, Icon } from 'src/components/ui';

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerTitleAlign: 'center',
                headerShadowVisible: false,
                headerRight: () => (
                    <Link href="/settings" asChild>
                        <Button variant="ghost" size="icon" className="mx-4 rounded-full">
                            <Icon as={Settings} />
                        </Button>
                    </Link>
                )
            }}
        >
            <Tabs.Screen name="home" options={{ title: 'home' }} />
            <Tabs.Screen name="profile" options={{ title: 'profile' }} />
        </Tabs>
    );
}
