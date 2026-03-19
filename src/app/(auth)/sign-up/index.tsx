import * as burnt from 'burnt';
import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSignUp } from 'src/hooks/queries/auth';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { View, ScrollView } from 'react-native';
import { Button, Input, Text } from 'src/components/ui';
import { PasswordInput } from 'src/components/password-input';
import { SocialConnections } from 'src/components/social-connections';
import { useSignUpSchema, SignUpFormData } from 'src/hooks/schema/auth';

export default function SignUp() {
    const { t } = useTranslation('auth', { keyPrefix: 'signUp' });
    const signUpMutation = useSignUp();

    const schema = useSignUpSchema();
    const { control, handleSubmit } = useForm<SignUpFormData>({ resolver: zodResolver(schema) });

    const onSubmit = handleSubmit(
        data => {
            signUpMutation.mutate(data);
        },
        errors => {
            const msg = Object.values(errors).find(item => !!item.message)?.message ?? '';
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
                            placeholder={t('usernamePlaceholder')}
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                />
                <Controller
                    name="password"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <PasswordInput value={value} onChangeText={onChange} placeholder={t('passwordPlaceholder')} />
                    )}
                />
                <Button size="lg" className="mt-4" disabled={signUpMutation.isPending} onPress={onSubmit}>
                    <Text>{t('submitBtn')}</Text>
                </Button>
            </View>
            <View className="flex-row items-baseline justify-center w-full mt-4">
                <Text>{t('signInPrefix')}</Text>
                <Link href="/log-in" asChild replace>
                    <Button variant="link" className="px-1!">
                        <Text>{t('signInLink')}</Text>
                    </Button>
                </Link>
            </View>
            <SocialConnections className="mt-4" />
        </ScrollView>
    );
}
