import * as burnt from 'burnt';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from 'src/stores/auth';
import { authService, supabase } from 'src/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useSession() {
    return useQuery({
        queryKey: ['auth', 'session'],
        queryFn: authService.getSession,
        staleTime: 0,
        gcTime: 0
    });
}

export function useUser() {
    return useQuery({
        queryKey: ['auth', 'user'],
        queryFn: authService.getUser
    });
}

export function useProfile() {
    const { userId, profile, setProfile } = useAuthStore();

    return useQuery({
        queryKey: ['auth', 'profile', userId],
        queryFn: async () => {
            const profile = await authService.getProfile(userId!);
            setProfile(profile);
            return profile;
        },
        enabled: !!userId,
        initialData: profile || undefined,
        // 即使有初始值，也要在后台刷一次最新的
        refetchOnMount: true
    });
}

export function useLogInWithPassword() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: authService.logInWithPassword,
        onSuccess: data => {
            queryClient.setQueryData(['user'], data.user);
            router.push('/');
        },
        onError: error => {
            console.error('Log in failed:', error.message);
            burnt.toast({ title: error.message, preset: 'error' });
        }
    });
}

export function useSignUp() {
    return useMutation({
        mutationFn: authService.signUp,
        onSuccess: async (data, variables) => {
            const { email, username } = variables;
            if (!data.session) {
                if (data.user?.id) {
                    console.warn(data.user?.id);
                    const { error: profileError } = await supabase.from('profiles').upsert([
                        {
                            id: data.user.id,
                            username
                        }
                    ]);
                    if (profileError) {
                        console.error('Create profile failed:', profileError.message);
                    }
                }
                router.push({
                    pathname: '/sign-up/otp',
                    params: { email }
                });
            }
        },
        onError: error => {
            burnt.toast({ title: error.message, preset: 'error' });
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
            burnt.toast({ title: error.message, preset: 'error' });
        }
    });
}

export function useResendSignUpEmailOtp() {
    const { t } = useTranslation('auth');
    return useMutation({
        mutationFn: authService.resend,
        onSuccess: () => {
            burnt.toast({
                title: t('signUpOtp.sendOtpSuccessInfo'),
                preset: 'done'
            });
        },
        onError: error => {
            burnt.toast({ title: error.message, preset: 'error' });
        }
    });
}

export function useResetPasswordForEmail() {
    const { t } = useTranslation('auth');
    return useMutation({
        mutationFn: authService.resetPasswordForEmail,
        onSuccess: (_, email) => {
            burnt.toast({
                title: t('forgotPasswordOtp.sendOtpSuccessInfo'),
                preset: 'done'
            });
            router.push({
                pathname: '/forgot-password/otp',
                params: { email }
            });
        },
        onError: error => {
            burnt.toast({ title: error.message, preset: 'error' });
        }
    });
}

export function useResendResetPasswordEmailOtp() {
    const { t } = useTranslation('auth');
    return useMutation({
        mutationFn: authService.resetPasswordForEmail,
        onSuccess: () => {
            burnt.toast({
                title: t('forgotPasswordOtp.sendOtpSuccessInfo'),
                preset: 'done'
            });
        },
        onError: error => {
            burnt.toast({ title: error.message, preset: 'error' });
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
            burnt.toast({ title: error.message, preset: 'error' });
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
            burnt.toast({ title: error.message, preset: 'error' });
        }
    });
}

export function useSignOut() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: authService.signOut,
        onSuccess() {
            queryClient.setQueryData(['user'], null);
            queryClient.removeQueries();
            router.push('/');
        },
        onError: error => {
            burnt.toast({ title: error.message, preset: 'error' });
        }
    });
}
