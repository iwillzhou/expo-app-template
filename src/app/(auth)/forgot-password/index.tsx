import * as burnt from 'burnt';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Text } from 'src/components/ui';
import { useResetPasswordForEmail } from 'src/hooks/queries/auth';
import { useVerifyEmailSchema, VerifyEmailFormData } from 'src/hooks/schema/auth';

export default function ForgotPassword() {
    const { t } = useTranslation('auth', { keyPrefix: 'forgotPassword' });
    const resetPasswordForEmailMutation = useResetPasswordForEmail();

    const schema = useVerifyEmailSchema();
    const { control, handleSubmit } = useForm<VerifyEmailFormData>({ resolver: zodResolver(schema) });

    const onSubmit = handleSubmit(
        data => {
            resetPasswordForEmailMutation.mutate(data.email);
        },
        errors => {
            const msg = Object.values(errors).find(item => !!item.message)?.message ?? '';
            burnt.toast({ title: msg, preset: 'error' });
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
                    name="email"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Input
                            className="native:h-16"
                            autoCapitalize={'none'}
                            placeholder={t('emailPlaceholder')}
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                />
                <Button
                    size="lg"
                    className="mt-4"
                    disabled={resetPasswordForEmailMutation.isPending}
                    onPress={onSubmit}
                >
                    <Text>{t('submitBtn')}</Text>
                </Button>
            </View>
        </View>
    );
}
