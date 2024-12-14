import React from 'react';
import { Button, Text } from 'src/components/ui';
import { Stack, router } from 'expo-router';
import { ArrowLeftStroke } from 'src/components/icons';
import { useNavigationTheme } from 'src/hooks/theme';

export default function SettingsLayout() {
    const navigationTheme = useNavigationTheme();
    return (
        <Stack
            screenOptions={{
                headerTitleAlign: 'center',
                headerBackButtonDisplayMode: 'minimal',
                headerTintColor: navigationTheme.colors.text,
                headerLeft: ({ tintColor }) => (
                    <Button variant="ghost" size="icon" onPress={() => router.back()}>
                        <ArrowLeftStroke color={tintColor} />
                    </Button>
                )
            }}
        >
            <Stack.Screen name="index" options={{ title: 'Settings' }} />
            <Stack.Screen name="dark-mode" options={{ title: 'Dark mode' }} />
        </Stack>
    );
}
