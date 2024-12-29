import { z } from 'zod';
import { Alert, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Text } from 'src/components/ui';
import { useVerifyEmailSchema } from 'src/hooks/schema/auth';
import { useResetPasswordForEmail } from 'src/hooks/queries/auth';

type FormData = z.infer<ReturnType<typeof useVerifyEmailSchema>>;

export default function ForgotPassword() {
    const { t } = useTranslation('auth', { keyPrefix: 'forgot_password' });
    const { isPending, mutate } = useResetPasswordForEmail();

    const schema = useVerifyEmailSchema();
    const { control, handleSubmit } = useForm<FormData>({ resolver: zodResolver(schema) });

    const onSubmit = handleSubmit(
        data => {
            mutate(data.email);
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
                    name="email"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Input
                            className="native:h-16"
                            autoCapitalize={'none'}
                            placeholder={t('email_placeholder')}
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                />
                <Button size="lg" className="mt-4" disabled={isPending} onPress={onSubmit}>
                    <Text>{t('submit_btn')}</Text>
                </Button>
            </View>
        </View>
    );
}
