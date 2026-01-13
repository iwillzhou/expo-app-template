import * as burnt from 'burnt';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLocalSearchParams } from 'expo-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Button, Text, InputOTP } from 'src/components/ui';
import { useVerifyOtpSchema, VerifyOtpFormData } from 'src/hooks/schema/auth';
import { useResendResetPasswordEmailOtp, useVerifyResetPasswordEmailOtp } from 'src/hooks/queries/auth';

export default function ForgotPasswordOTP() {
    const { t } = useTranslation('auth', { keyPrefix: 'forgotPasswordOtp' });

    const verifyResetPasswordEmailOtpMutation = useVerifyResetPasswordEmailOtp();
    const resendResetPasswordEmailOtpMutation = useResendResetPasswordEmailOtp();

    const { email } = useLocalSearchParams<{ email: string }>();

    const schema = useVerifyOtpSchema();
    const { control, handleSubmit } = useForm<VerifyOtpFormData>({ resolver: zodResolver(schema) });

    const onSubmit = handleSubmit(
        data => {
            verifyResetPasswordEmailOtpMutation.mutate({ email, token: data.otp });
        },
        errors => {
            const msg = Object.values(errors).find(item => !!item.message)?.message ?? '';
            burnt.toast({ title: msg, preset: 'error' });
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
                    <Text>{t('submitBtn')}</Text>
                </Button>
                <View className="flex-row items-baseline justify-center w-full">
                    <Text>{t('resendOtpBtnPrefix')}</Text>
                    <Button
                        variant="link"
                        className="!px-1"
                        disabled={resendResetPasswordEmailOtpMutation.isPending}
                        onPress={onResend}
                    >
                        <Text>{t('resendOtpBtn')}</Text>
                    </Button>
                </View>
            </View>
        </View>
    );
}
