import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Separator, Text } from 'src/components/ui';
import { AppleLogInButton } from './apple-login-button';
import { GoogleLogInButton } from './google-login-button';

export function SocialConnections({ className }: { className?: string }) {
    const { t } = useTranslation('auth', { keyPrefix: 'socialConnections' });

    return (
        <View className={className}>
            <View className="flex-row justify-center items-center">
                <Separator className="w-20" />
                <Text className="text-secondary-foreground mx-4">{t('orContinueWith')}</Text>
                <Separator className="w-20" />
            </View>
            <View className="flex-row justify-center gap-3 mt-6">
                <AppleLogInButton />
                <GoogleLogInButton />
            </View>
        </View>
    );
}
