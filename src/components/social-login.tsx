import * as React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Text, Button, Separator } from 'src/components/ui';
import { AppleStroke, FacebookStroke, GoogleStroke } from 'src/components/icons';

export const SocialLogin = () => {
    const { t } = useTranslation('auth', { keyPrefix: 'social_login' });
    return (
        <View className="mt-12">
            <View className="flex-row justify-center items-center">
                <Separator className="w-20" />
                <Text className="text-secondary-foreground mx-4">{t('or_continue_with')}</Text>
                <Separator className="w-20" />
            </View>
            <View className="flex-row justify-center mt-6">
                <Button variant="outline" size="icon" className="!h-14 flex-grow mx-3">
                    <GoogleStroke className="text-foreground" />
                </Button>
                <Button variant="outline" size="icon" className="!h-14 flex-grow mx-3">
                    <FacebookStroke className="text-foreground" />
                </Button>
                <Button variant="outline" size="icon" className="!h-14 flex-grow mx-3">
                    <AppleStroke className="text-foreground" />
                </Button>
            </View>
        </View>
    );
};
