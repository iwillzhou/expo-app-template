import React from 'react';
import { Tabs } from 'expo-router';
import { HomeStroke, HomeSolid, UserStroke, UserSolid } from 'src/components/icons';

export default function TabsLayout() {
    return (
        <Tabs screenOptions={{ headerTitleAlign: 'center' }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, focused }) => {
                        return focused ? <HomeSolid color={color} /> : <HomeStroke color={color} />;
                    }
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, focused }) =>
                        focused ? <UserSolid color={color} /> : <UserStroke color={color} />
                }}
            />
        </Tabs>
    );
}
