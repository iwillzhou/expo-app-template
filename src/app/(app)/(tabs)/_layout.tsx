import React from 'react';
import { Platform } from 'react-native';
import { Link, Tabs } from 'expo-router';
import { Button } from 'src/components/ui';
import { useTheme } from 'src/hooks/use-theme';
import { useTranslation } from 'react-i18next';
import { PlatformPressable } from '@react-navigation/elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeStroke, HomeSolid, UserStroke, UserSolid, SettingStroke } from 'src/components/icons';

export default function TabsLayout() {
    const { t } = useTranslation();
    const { navTheme, colors } = useTheme();
    const insets = useSafeAreaInsets();

    return (
        <Tabs
            screenOptions={{
                headerTitleAlign: 'center',
                headerShadowVisible: false,
                headerTitleStyle: {
                    fontSize: 16
                },
                headerStyle: {
                    height: (Platform.OS === 'android' ? 56 : 38) + insets.top
                },
                tabBarButton: props => <PlatformPressable {...props} pressColor={navTheme.colors.background} />,
                headerLeft: () => (
                    <Link href="/log-in" asChild>
                        <Button variant="ghost" size="icon" className="mx-4 rounded-full">
                            <UserStroke className="text-foreground" />
                        </Button>
                    </Link>
                ),
                headerRight: () => (
                    <Link href="/settings" asChild>
                        <Button variant="ghost" size="icon" className="mx-4 rounded-full">
                            <SettingStroke className="text-foreground" />
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
