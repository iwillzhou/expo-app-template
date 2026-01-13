import * as burnt from 'burnt';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button, Text } from 'src/components/ui';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdatePassword } from 'src/hooks/queries/auth';
import { PasswordInput } from 'src/components/password-input';
import { useResetPasswordSchema, ResetPasswordFormData } from 'src/hooks/schema/auth';

export default function UpdatePassword() {
    const { t } = useTranslation('auth', { keyPrefix: 'forgotPasswordUpdate' });
    const updatePasswordMutation = useUpdatePassword();

    const schema = useResetPasswordSchema();
    const { control, handleSubmit } = useForm<ResetPasswordFormData>({ resolver: zodResolver(schema) });

    const onSubmit = handleSubmit(
        data => {
            updatePasswordMutation.mutate(data.password);
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
            <View className="grid gap-3">
                <Controller
                    name="password"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <PasswordInput value={value} onChangeText={onChange} placeholder={t('passwordPlaceholder')} />
                    )}
                />
                <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <PasswordInput
                            value={value}
                            onChangeText={onChange}
                            placeholder={t('confirmPasswordPlaceholder')}
                        />
                    )}
                />
                <Button size="lg" className="mt-4" disabled={updatePasswordMutation.isPending} onPress={onSubmit}>
                    <Text>{t('submitBtn')}</Text>
                </Button>
            </View>
        </View>
    );
}
