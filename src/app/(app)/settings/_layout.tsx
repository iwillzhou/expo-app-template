import React from 'react';
import { Button } from 'src/components/ui';
import { Stack, router } from 'expo-router';
import { ArrowLeftStroke } from 'src/components/icons';
import { useNavigationTheme } from 'src/hooks/theme';

export default function SettingsLayout() {
    const navigationTheme = useNavigationTheme();
    return (
        <Stack
            screenOptions={{
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontSize: 16
                },
                headerTintColor: navigationTheme.colors.text,
                headerLeft: ({ tintColor }) => (
                    <Button variant="ghost" size="icon" onPress={() => router.back()}>
                        <ArrowLeftStroke color={tintColor} />
                    </Button>
                )
            }}
        >
            <Stack.Screen name="index" options={{ title: 'Setting' }} />
            <Stack.Screen name="dark-mode" options={{ title: 'Dark mode' }} />
        </Stack>
    );
}
