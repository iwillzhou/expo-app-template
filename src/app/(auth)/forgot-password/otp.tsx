import { z } from 'zod';
import { Alert, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLocalSearchParams } from 'expo-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useVerifyOtpSchema } from 'src/hooks/schema/auth';
import { Button, Text, InputOTP } from 'src/components/ui';
import { useResendResetPasswordEmailOtp, useVerifyResetPasswordEmailOtp } from 'src/hooks/queries/auth';

type FormData = z.infer<ReturnType<typeof useVerifyOtpSchema>>;

export default function ForgotPasswordOTP() {
    const { t } = useTranslation('auth', { keyPrefix: 'forgot_password_otp' });

    const verifyResetPasswordEmailOtpMutation = useVerifyResetPasswordEmailOtp();
    const resendResetPasswordEmailOtpMutation = useResendResetPasswordEmailOtp();

    const { email } = useLocalSearchParams<{ email: string }>();

    const schema = useVerifyOtpSchema();
    const { control, handleSubmit } = useForm<FormData>({ resolver: zodResolver(schema) });

    const onSubmit = handleSubmit(
        data => {
            verifyResetPasswordEmailOtpMutation.mutate({ email, token: data.otp });
        },
        errors => {
            const msg = Object.values(errors).find(item => !!item.message)?.message;
            Alert.alert(msg!);
        }
    );

    const onResend = () => {
        resendResetPasswordEmailOtpMutation.mutate(email);
    };

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
                <Button
                    size="lg"
                    className="mt-4"
                    disabled={verifyResetPasswordEmailOtpMutation.isPending}
                    onPress={onSubmit}
                >
                    <Text>{t('submit_btn')}</Text>
                </Button>
                <View className="flex-row items-baseline justify-center w-full">
                    <Text>{t('resend_otp_btn_prefix')}</Text>
                    <Button
                        variant="link"
                        className="!px-1"
                        disabled={resendResetPasswordEmailOtpMutation.isPending}
                        onPress={onResend}
                    >
                        <Text>{t('resend_otp_btn')}</Text>
                    </Button>
                </View>
            </View>
        </View>
    );
}
