import React from 'react';
import { useTheme } from 'src/hooks';
import { Button } from 'src/components/ui';
import { Stack, router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ArrowLeftStroke } from 'src/components/icons';

export default function SettingsLayout() {
    const { t } = useTranslation();
    const { navTheme } = useTheme();
    return (
        <Stack
            screenOptions={{
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontSize: 16
                },
                headerTintColor: navTheme.colors.text,
                headerLeft: ({ tintColor }) => (
                    <Button variant="ghost" size="icon" onPress={() => router.back()}>
                        <ArrowLeftStroke color={tintColor} />
                    </Button>
                )
            }}
        >
            <Stack.Screen name="index" options={{ title: t('settings') }} />
            <Stack.Screen name="language" options={{ title: t('language') }} />
            <Stack.Screen name="dark-mode" options={{ title: t('darkMode') }} />
        </Stack>
    );
}
