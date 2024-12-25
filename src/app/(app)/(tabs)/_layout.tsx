import React from 'react';
import { Platform } from 'react-native';
import { Link, Tabs } from 'expo-router';
import { Button } from 'src/components/ui';
import { useTheme } from 'src/hooks/use-theme';
import { useTranslation } from 'react-i18next';
import { PlatformPressable } from '@react-navigation/elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeStroke, HomeSolid, UserStroke, UserSolid } from 'src/components/icons';

export default function TabsLayout() {
    const { t } = useTranslation();
    const { navTheme } = useTheme();
    const insets = useSafeAreaInsets();

    return (
        <Tabs
            screenOptions={{
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontSize: 16
                },
                headerStyle: {
                    height: (Platform.OS === 'android' ? 56 : 38) + insets.top
                },
                tabBarButton: props => <PlatformPressable {...props} pressColor={navTheme.colors.background} />,
                headerRight: ({ tintColor }) => (
                    <Link href="/log-in" asChild className="px-2">
                        <Button variant="ghost" size="icon">
                            <UserStroke color={tintColor} />
                        </Button>
                    </Link>
                )
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: t('home'),
                    tabBarIcon: ({ color, focused }) =>
                        focused ? <HomeSolid color={color} /> : <HomeStroke color={color} />
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: t('profile'),
                    tabBarIcon: ({ color, focused }) =>
                        focused ? <UserSolid color={color} /> : <UserStroke color={color} />
                }}
            />
        </Tabs>
    );
}
