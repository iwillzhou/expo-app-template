import * as burnt from 'burnt';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLocalSearchParams } from 'expo-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Button, Text, InputOTP } from 'src/components/ui';
import { useVerifyOtpSchema, VerifyOtpFormData } from 'src/hooks/schema/auth';
import { useResendSignUpEmailOtp, useVerifySignUpEmailOtp } from 'src/hooks/queries/auth';

export default function SignUpOTP() {
    const { t } = useTranslation('auth', { keyPrefix: 'signUpOtp' });

    const { email } = useLocalSearchParams<{ email: string }>();

    const resendSignUpEmailOtpMutation = useResendSignUpEmailOtp();
    const verifySignUpEmailOtpMutation = useVerifySignUpEmailOtp();

    const schema = useVerifyOtpSchema();
    const { control, handleSubmit } = useForm<VerifyOtpFormData>({ resolver: zodResolver(schema) });

    const onSubmit = handleSubmit(
        data => {
            verifySignUpEmailOtpMutation.mutate({ email, token: data.otp });
        },
        errors => {
            const msg = Object.values(errors).find(item => !!item.message)?.message ?? '';
            burnt.toast({ title: msg, preset: 'error' });
        }
    );

    const onResend = () => {
        resendSignUpEmailOtpMutation.mutate({ email });
    };

    return (
        <View className="grow px-7">
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
                <Button size="lg" className="mt-4" disabled={verifySignUpEmailOtpMutation.isPending} onPress={onSubmit}>
                    <Text>{t('submitBtn')}</Text>
                </Button>
                <View className="flex-row items-baseline justify-center w-full">
                    <Text>{t('resendOtpBtnPrefix')}</Text>
                    <Button variant="link" className="px-1!" onPress={onResend}>
                        <Text>{t('resendOtpBtn')}</Text>
                    </Button>
                </View>
            </View>
        </View>
    );
}
