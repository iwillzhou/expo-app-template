import { z } from 'zod';
import { View, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button, Text } from 'src/components/ui';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ThemedView } from 'src/components/themed-view';
import { useUpdatePassword } from 'src/hooks/queries/auth';
import { PasswordInput } from 'src/components/password-input';
import { useResetPasswordSchema } from 'src/hooks/schema/auth';

type FormData = z.infer<ReturnType<typeof useResetPasswordSchema>>;

export default function UpdatePassword() {
    const { t } = useTranslation('auth', { keyPrefix: 'forgot_password_update' });
    const { isPending, mutate } = useUpdatePassword();

    const schema = useResetPasswordSchema();
    const { control, handleSubmit } = useForm<FormData>({ resolver: zodResolver(schema) });

    const onSubmit = handleSubmit(
        data => {
            mutate(data.password);
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
            <View className="grid gap-3">
                <Controller
                    name="password"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <PasswordInput value={value} onChangeText={onChange} placeholder={t('password_placeholder')} />
                    )}
                />
                <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <PasswordInput
                            value={value}
                            onChangeText={onChange}
                            placeholder={t('confirm_password_placeholder')}
                        />
                    )}
                />
                <Button size="lg" className="mt-4" disabled={isPending} onPress={onSubmit}>
                    <Text>{t('submit_btn')}</Text>
                </Button>
            </View>
        </ThemedView>
    );
}
