import * as React from 'react';
import { cn } from 'src/utils/cn';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Text, Button, Separator } from 'src/components/ui';
import { AppleStroke, FacebookStroke, GoogleStroke } from 'src/components/icons';

interface Props {
    className?: string;
}

export const SocialLogin = ({ className }: Props) => {
    const { t } = useTranslation('auth', { keyPrefix: 'social_login' });
    return (
        <View className={cn('my-12', className)}>
            <View className="flex-row justify-center items-center">
                <Separator className="w-20" />
                <Text className="text-secondary-foreground mx-4">{t('or_continue_with')}</Text>
                <Separator className="w-20" />
            </View>
            <View className="flex-row justify-center gap-3 mt-6">
                <Button variant="outline" size="icon" className="!h-14 flex-grow">
                    <GoogleStroke className="text-foreground" />
                </Button>
                <Button variant="outline" size="icon" className="!h-14 flex-grow">
                    <FacebookStroke className="text-foreground" />
                </Button>
                <Button variant="outline" size="icon" className="!h-14 flex-grow">
                    <AppleStroke className="text-foreground" />
                </Button>
            </View>
        </View>
    );
};
