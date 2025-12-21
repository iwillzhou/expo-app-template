import { z } from 'zod';
import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogInSchema } from 'src/hooks/schema/auth';
import { View, Alert, ScrollView } from 'react-native';
import { Button, Input, Text } from 'src/components/ui';
import { SocialLogin } from 'src/components/social-login';
import { PasswordInput } from 'src/components/password-input';
import { useLogInWithPassword } from 'src/hooks/queries/auth';

type FormData = z.infer<ReturnType<typeof useLogInSchema>>;

export default function LogIn() {
    const { t } = useTranslation('auth', { keyPrefix: 'log_in' });
    const logInMutation = useLogInWithPassword();

    const schema = useLogInSchema();
    const { control, handleSubmit } = useForm<FormData>({ resolver: zodResolver(schema) });

    const onSubmit = handleSubmit(
        data => {
            logInMutation.mutate(data);
        },
        errors => {
            const msg = Object.values(errors)
                .map(item => item.message)
                .join();
            Alert.alert(msg!);
        }
    );

    return (
        <ScrollView className="flex-grow px-7">
            <View className="my-[64px]">
                <Text className="text-3xl font-bold">{t('title')}</Text>
            </View>
            <View className="grid gap-3">
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
                <Controller
                    name="password"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <View>
                            <PasswordInput
                                value={value}
                                onChangeText={onChange}
                                placeholder={t('password_placeholder')}
                            />
                            <View className="flex flex-row-reverse">
                                <Link href="/forgot-password" asChild>
                                    <Button variant="link" className="!px-0">
                                        <Text>{t('forgot_password')}</Text>
                                    </Button>
                                </Link>
                            </View>
                        </View>
                    )}
                />
                <Button size="lg" className="mt-4" disabled={logInMutation.isPending} onPress={onSubmit}>
                    <Text>{t('submit_btn')}</Text>
                </Button>
            </View>
            <SocialLogin className="mb-24" />
            <View className="flex-row items-baseline justify-center absolute bottom-8 w-full">
                <Text>{t('sign_up_prefix')}</Text>
                <Link href="/sign-up" asChild replace>
                    <Button variant="link" className="!px-1">
                        <Text>{t('sign_up_link')}</Text>
                    </Button>
                </Link>
            </View>
        </ScrollView>
    );
}
