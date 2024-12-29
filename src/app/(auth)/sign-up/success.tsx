import { View } from 'react-native';
import { routerUtils } from 'src/utils';
import { useTranslation } from 'react-i18next';
import { Button, Text } from 'src/components/ui';
import SuccessSvg from 'assets/images/illustrations/success.svg';

export default function SignUpSuccess() {
    const { t } = useTranslation('auth', { keyPrefix: 'sign_up_success' });

    const onBackToLogin = () => {
        routerUtils.reset('/log-in');
    };
    return (
        <View className="flex justify-center items-center pt-16 px-7">
            <SuccessSvg width={300} height={300} />
            <View className="my-10 flex items-center">
                <Text className="text-3xl font-bold">{t('title')}</Text>
            </View>
            <Button className="w-full" size="lg" onPress={onBackToLogin}>
                <Text>{t('submit_btn')}</Text>
            </Button>
        </View>
    );
}
