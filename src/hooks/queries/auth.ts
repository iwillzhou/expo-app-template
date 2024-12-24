import { router } from 'expo-router';
import { Alert } from 'react-native';
import { authService } from 'src/api/services';
import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const authQueries = createQueryKeys('auth', {
    info: {
        queryKey: null,
        queryFn: () => authService.getUserInfo()
    }
});

export const useBasicInfo = () => useQuery(authQueries.info);

export function useLogInWithPassword() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: authService.logInWithPassword,
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: authQueries.info.queryKey,
                refetchType: 'none'
            });
            router.push('/');
        },
        onError: error => {
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
                Alert.alert('Info', 'Please check your inbox for email verification!', [
                    {
                        text: 'OK',
                        onPress: () => {
                            router.push({
                                pathname: '/sign-up/otp',
                                params: { email }
                            });
                        }
                    }
                ]);
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

export function useResetPasswordForEmail() {
    return useMutation({
        mutationFn: authService.resetPasswordForEmail,
        onSuccess: (_, email) => {
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
