import { z } from 'zod';
import { Alert, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button, Text } from 'src/components/ui';
import OTPInput from 'react-native-otp-textinput';
import { useLocalSearchParams } from 'expo-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { ThemedView } from 'src/components/themed-view';
import { useVerifyOtpSchema } from 'src/hooks/schema/auth';
import { useVerifySignUpEmailOtp } from 'src/hooks/queries/auth';

type FormData = z.infer<ReturnType<typeof useVerifyOtpSchema>>;

export default function SignUpOTP() {
    const { t } = useTranslation('auth', { keyPrefix: 'sign_up_otp' });

    const { isPending, mutate } = useVerifySignUpEmailOtp();
    const { email } = useLocalSearchParams<{ email: string }>();

    const schema = useVerifyOtpSchema();
    const { control, handleSubmit } = useForm<FormData>({ resolver: zodResolver(schema) });

    const onSubmit = handleSubmit(
        data => {
            mutate({ email, token: data.otp });
        },
        errors => {
            const msg = Object.values(errors).find(item => !!item.message)?.message;
            Alert.alert(msg!);
        }
    );

    return (
        <ThemedView className="flex-grow px-7">
            <View className="my-16">
                <Text className="text-3xl font-bold">{t('title')}</Text>
                <Text className="text-xl mt-6">{t('desc')}</Text>
            </View>
            <View className="grid gap-7">
                <Controller
                    name="otp"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <OTPInput inputCount={6} handleTextChange={onChange} textInputStyle={{ flex: 1 }} />
                    )}
                />
                <Button size="lg" className="mt-4" disabled={isPending} onPress={onSubmit}>
                    <Text>{t('submit_btn')}</Text>
                </Button>
            </View>
        </ThemedView>
    );
}
