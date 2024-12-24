import { z } from 'zod';
import { useTranslation } from 'react-i18next';

const useBaseSchema = () => {
    const { t } = useTranslation('auth', { keyPrefix: 'validations' });

    return z.object({
        email: z.string({ message: t('empty_email') }).email({ message: t('invalid_email') }),
        password: z
            .string({ message: t('empty_password') })
            .min(8, {
                message: t('password_min_len_error')
            })
            .max(100)
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, {
                message: t('password_pattern_error')
            }),
        otp: z.string().length(6, {
            message: t('otp_length_error')
        }),
        username: z.string().min(3).max(50)
    });
};

export const useLogInSchema = () => {
    const baseSchema = useBaseSchema();

    return z.object({
        email: baseSchema.shape.email,
        password: baseSchema.shape.password
    });
};

export const useSignUpSchema = () => {
    const baseSchema = useBaseSchema();

    return z.object({
        email: baseSchema.shape.email,
        username: baseSchema.shape.username,
        password: baseSchema.shape.password
    });
};

export const useVerifyOtpSchema = () => {
    const baseSchema = useBaseSchema();

    return z.object({
        otp: baseSchema.shape.otp
    });
};

export const useVerifyEmailSchema = () => {
    const baseSchema = useBaseSchema();

    return z.object({
        email: baseSchema.shape.email
    });
};

export const useResetPasswordSchema = () => {
    const baseSchema = useBaseSchema();
    const { t } = useTranslation('auth', { keyPrefix: 'validations' });

    return z
        .object({
            password: baseSchema.shape.password,
            confirmPassword: baseSchema.shape.password
        })
        .refine(data => data.password === data.confirmPassword, {
            message: t('password_not_match_error'),
            path: ['confirmPassword']
        });
};
