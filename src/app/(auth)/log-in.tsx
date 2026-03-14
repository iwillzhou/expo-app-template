import { Link } from 'expo-router';
import * as burnt from 'burnt';
import { useTranslation } from 'react-i18next';
import { View, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Text } from 'src/components/ui';
import { PasswordInput } from 'src/components/password-input';
import { useLogInWithPassword } from 'src/hooks/queries/auth';
import { SocialConnections } from 'src/components/social-connections';
import { useLogInSchema, LogInFormData } from 'src/hooks/schema/auth';

export default function LogIn() {
    const { t } = useTranslation('auth', { keyPrefix: 'logIn' });
    const logInMutation = useLogInWithPassword();

    const schema = useLogInSchema();
    const { control, handleSubmit } = useForm<LogInFormData>({ resolver: zodResolver(schema) });

    const onSubmit = handleSubmit(
        data => {
            logInMutation.mutate(data);
        },
        errors => {
            const msg = Object.values(errors)
                .map(item => item.message)
                .join(';');
            burnt.toast({ title: msg, preset: 'error' });
        }
    );

    return (
        <ScrollView className="grow px-7">
            <View className="my-16">
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
                            placeholder={t('emailPlaceholder')}
                            textContentType="emailAddress" // iOS: 告诉系统这是用户名
                            autoComplete="email" // Android: 告诉系统这是邮箱/账号
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
                                placeholder={t('passwordPlaceholder')}
                                textContentType="password" // iOS: 触发钥匙串
                                autoComplete="password" // Android: 触发密码管理器
                            />
                            <View className="flex flex-row-reverse">
                                <Link href="/forgot-password" asChild>
                                    <Button variant="link" className="px-0!">
                                        <Text>{t('forgotPassword')}</Text>
                                    </Button>
                                </Link>
                            </View>
                        </View>
                    )}
                />
                <Button size="lg" className="mt-4" disabled={logInMutation.isPending} onPress={onSubmit}>
                    <Text>{t('submitBtn')}</Text>
                </Button>
            </View>
            <View className="flex-row items-baseline justify-center mt-4">
                <Text>{t('signUpPrefix')}</Text>
                <Link href="/sign-up" asChild replace>
                    <Button variant="link" className="px-1!">
                        <Text>{t('signUpLink')}</Text>
                    </Button>
                </Link>
            </View>
            <SocialConnections className="mt-4" />
        </ScrollView>
    );
}
