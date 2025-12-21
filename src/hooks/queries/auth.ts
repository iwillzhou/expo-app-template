import * as Burnt from 'burnt';
import { router } from 'expo-router';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { authService } from 'src/api/services';
import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const authQueries = createQueryKeys('auth', {
    info: {
        queryKey: null,
        queryFn: () => authService.getUser()
    }
});

export const useUser = () => useQuery(authQueries.info);

export function useLogInWithPassword() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: authService.logInWithPassword,
        onSuccess(data) {
            queryClient.setQueryData(authQueries.info.queryKey, data.user);
            router.push('/');
        },
        onError: error => {
            console.error('Log in failed:', error.message);
            Alert.alert(error.message);
        }
    });
}

export function useSignUp() {
    return useMutation({
        mutationFn: authService.signUp,
        onSuccess(data, variables) {
            const { email } = variables;
            if (!data.session) {
                router.push({
                    pathname: '/sign-up/otp',
                    params: { email }
                });
            }
        },
        onError: error => {
            Alert.alert(error.message);
        }
    });
}

export function useVerifySignUpEmailOtp() {
    return useMutation({
        mutationFn: authService.verifySignUpEmailOtp,
        onSuccess: () => {
            router.push('/sign-up/success');
        },
        onError: error => {
            Alert.alert(error.message);
        }
    });
}

export function useResendSignUpEmailOtp() {
    const { t } = useTranslation('auth', { keyPrefix: 'sign_up_otp' });
    return useMutation({
        mutationFn: authService.resend,
        onSuccess: () => {
            Burnt.toast({
                title: t('send_otp_success_info'),
                preset: 'done'
            });
        },
        onError: error => {
            Alert.alert(error.message);
        }
    });
}

export function useResetPasswordForEmail() {
    const { t } = useTranslation('auth', { keyPrefix: 'forgot_password_otp' });
    return useMutation({
        mutationFn: authService.resetPasswordForEmail,
        onSuccess: (_, email) => {
            Burnt.toast({
                title: t('send_otp_success_info'),
                preset: 'done'
            });
            router.push({
                pathname: '/forgot-password/otp',
                params: { email }
            });
        },
        onError: error => {
            Alert.alert(error.message);
        }
    });
}

export function useResendResetPasswordEmailOtp() {
    const { t } = useTranslation('auth', { keyPrefix: 'forgot_password_otp' });
    return useMutation({
        mutationFn: authService.resetPasswordForEmail,
        onSuccess: () => {
            Burnt.toast({
                title: t('send_otp_success_info'),
                preset: 'done'
            });
        },
        onError: error => {
            Alert.alert(error.message);
        }
    });
}

export function useVerifyResetPasswordEmailOtp() {
    return useMutation({
        mutationFn: authService.verifyResetPasswordEmailOtp,
        onSuccess: () => {
            router.push('/forgot-password/update');
        },
        onError: error => {
            Alert.alert(error.message);
        }
    });
}

export function useUpdatePassword() {
    return useMutation({
        mutationFn: authService.updatePassword,
        onSuccess: () => {
            router.push('/forgot-password/success');
        },
        onError: error => {
            Alert.alert(error.message);
        }
    });
}

export function useSignOut() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: authService.signOut,
        onSuccess() {
            queryClient.setQueryData(authQueries.info.queryKey, null);
            queryClient.removeQueries();
            router.push('/');
        },
        onError: error => {
            Alert.alert(error.message);
        }
    });
}
