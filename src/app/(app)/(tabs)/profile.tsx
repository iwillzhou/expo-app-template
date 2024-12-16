import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Button, Text } from 'src/components/ui';
import { SettingStroke } from 'src/components/icons';
import { ThemedView } from 'src/components/themed-view';

export default function ProfileScreen() {
    const { t } = useTranslation();
    return (
        <ThemedView className="grid grid-flow-col p-4 gap-4">
            <Link href="/settings" asChild>
                <Button variant="secondary" className="flex-row justify-start native:h-14">
                    <SettingStroke className="mr-4 text-foreground" />
                    <Text className="font-normal">{t('settings')}</Text>
                </Button>
            </Link>
        </ThemedView>
    );
}
