import { z } from 'zod';
import { Alert, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLocalSearchParams } from 'expo-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useVerifyOtpSchema } from 'src/hooks/schema/auth';
import { Button, Text, InputOTP } from 'src/components/ui';
import { useVerifyResetPasswordEmailOtp } from 'src/hooks/queries/auth';

type FormData = z.infer<ReturnType<typeof useVerifyOtpSchema>>;

export default function ForgotPasswordOTP() {
    const { t } = useTranslation('auth', { keyPrefix: 'forgot_password_otp' });

    const { isPending, mutate } = useVerifyResetPasswordEmailOtp();
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
        <View className="flex-grow px-7">
            <View className="my-16">
                <Text className="text-3xl font-bold">{t('title')}</Text>
                <Text className="text-xl mt-6">{t('desc')}</Text>
            </View>
            <View className="grid gap-7">
                <Controller
                    name="otp"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <InputOTP cellCount={6} value={value} onChange={onChange} />
                    )}
                />
                <Button size="lg" className="mt-4" disabled={isPending} onPress={onSubmit}>
                    <Text>{t('submit_btn')}</Text>
                </Button>
            </View>
        </View>
    );
}
