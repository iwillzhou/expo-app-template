import { z } from 'zod';
import { Link } from 'expo-router';
import { Alert, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSignUp } from 'src/hooks/queries/auth';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignUpSchema } from 'src/hooks/schema/auth';
import { Button, Input, Text } from 'src/components/ui';
import { SocialLogin } from 'src/components/social-login';
import { PasswordInput } from 'src/components/password-input';
import { ThemedView } from 'src/components/themed-view';

type FormData = z.infer<ReturnType<typeof useSignUpSchema>>;

export default function SignUp() {
    const { t } = useTranslation('auth', { keyPrefix: 'sign_up' });
    const { isPending, mutate } = useSignUp();

    const schema = useSignUpSchema();
    const { control, handleSubmit } = useForm<FormData>({ resolver: zodResolver(schema) });

    const onSubmit = handleSubmit(
        data => {
            mutate(data);
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
                    name="username"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Input
                            className="native:h-16"
                            autoCapitalize={'none'}
                            placeholder={t('username_placeholder')}
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                />
                <Controller
                    name="password"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <PasswordInput value={value} onChangeText={onChange} placeholder={t('password_placeholder')} />
                    )}
                />
                <Button size="lg" className="mt-4" disabled={isPending} onPress={onSubmit}>
                    <Text>{t('submit_btn')}</Text>
                </Button>
            </View>
            <SocialLogin />
            <View className="flex-row items-baseline justify-center absolute bottom-8 left-7 w-full">
                <Text>{t('sign_in_prefix')}</Text>
                <Link href="/log-in" asChild>
                    <Button variant="link" className="!px-1">
                        <Text>{t('sign_in_link')}</Text>
                    </Button>
                </Link>
            </View>
        </ThemedView>
    );
}
