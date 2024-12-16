import React from 'react';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigationTheme } from 'src/hooks/theme';
import { PlatformPressable } from '@react-navigation/elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeStroke, HomeSolid, UserStroke, UserSolid } from 'src/components/icons';

export default function TabsLayout() {
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();
    const navTheme = useNavigationTheme();

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
                tabBarButton: props => <PlatformPressable {...props} pressColor={navTheme.colors.background} />
            }}
        >
            <Tabs.Screen
                name="index"
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
