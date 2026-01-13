import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Button, Text } from 'src/components/ui';

export default function SignUpSuccess() {
    const router = useRouter();
    const { t } = useTranslation('auth', { keyPrefix: 'signUpSuccess' });

    const onBackToLogin = () => {
        router.replace('/log-in');
    };
    return (
        <View className="flex justify-center items-center pt-16 px-7">
            {/* <SuccessSvg width={300} height={300} /> */}
            <View className="my-10 flex items-center">
                <Text className="text-3xl font-bold">{t('title')}</Text>
            </View>
            <Button className="w-full" size="lg" onPress={onBackToLogin}>
                <Text>{t('submitBtn')}</Text>
            </Button>
        </View>
    );
}
