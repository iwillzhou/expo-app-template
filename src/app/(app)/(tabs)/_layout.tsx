import { Link, Tabs } from 'expo-router';
import { Button, Icon } from 'src/components/ui';
import { House, Settings, UserRound } from 'lucide-react-native';

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
            <Tabs.Screen
                name="home"
                options={{
                    title: 'home',
                    tabBarIcon: ({ color }) => <House color={color} />
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'profile',
                    tabBarIcon: ({ color }) => <UserRound color={color} />
                }}
            />
        </Tabs>
    );
}
