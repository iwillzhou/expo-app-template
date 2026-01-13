import { z } from 'zod';
import { useTranslation } from 'react-i18next';

const useBaseSchema = () => {
    const { t } = useTranslation('auth');

    return z.object({
        email: z.string({ message: t('validations.emptyEmail') }).email({ message: t('validations.invalidEmail') }),
        password: z
            .string({ message: t('validations.emptyPassword') })
            .min(8, {
                message: t('validations.passwordMinLenError')
            })
            .max(100)
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/, {
                message: t('validations.passwordPatternError')
            }),
        otp: z.string().length(6, {
            message: t('validations.otpLengthError')
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

export type LogInFormData = z.infer<ReturnType<typeof useLogInSchema>>;

export const useSignUpSchema = () => {
    const baseSchema = useBaseSchema();

    return z.object({
        email: baseSchema.shape.email,
        username: baseSchema.shape.username,
        password: baseSchema.shape.password
    });
};

export type SignUpFormData = z.infer<ReturnType<typeof useSignUpSchema>>;

export const useVerifyOtpSchema = () => {
    const baseSchema = useBaseSchema();

    return z.object({
        otp: baseSchema.shape.otp
    });
};

export type VerifyOtpFormData = z.infer<ReturnType<typeof useVerifyOtpSchema>>;

export const useVerifyEmailSchema = () => {
    const baseSchema = useBaseSchema();

    return z.object({
        email: baseSchema.shape.email
    });
};

export type VerifyEmailFormData = z.infer<ReturnType<typeof useVerifyEmailSchema>>;

export const useResetPasswordSchema = () => {
    const baseSchema = useBaseSchema();
    const { t } = useTranslation('auth');

    return z
        .object({
            password: baseSchema.shape.password,
            confirmPassword: baseSchema.shape.password
        })
        .refine(data => data.password === data.confirmPassword, {
            message: t('validations.passwordNotMatchError'),
            path: ['confirmPassword']
        });
};

export type ResetPasswordFormData = z.infer<ReturnType<typeof useResetPasswordSchema>>;
