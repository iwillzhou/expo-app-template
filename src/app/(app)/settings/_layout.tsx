import React from 'react';
import { Button } from 'src/components/ui';
import { Stack, router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ArrowLeftStroke } from 'src/components/icons';

export default function SettingsLayout() {
    const { t } = useTranslation('settings', { keyPrefix: 'index' });
    return (
        <Stack
            screenOptions={{
                headerTitleAlign: 'center',
                headerShadowVisible: false,
                headerTitleStyle: {
                    fontSize: 16
                },
                headerLeft: () => (
                    <Button variant="ghost" size="icon" onPress={() => router.back()} className="rounded-full">
                        <ArrowLeftStroke className="text-foreground" />
                    </Button>
                )
            }}
        >
            <Stack.Screen name="index" options={{ title: t('settings') }} />
            <Stack.Screen name="language" options={{ title: t('language') }} />
            <Stack.Screen name="font-size" options={{ title: t('font_size') }} />
            <Stack.Screen name="theme" options={{ title: t('theme') }} />
            <Stack.Screen name="dark-mode" options={{ title: t('dark_mode') }} />
        </Stack>
    );
}
