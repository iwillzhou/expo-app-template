import { supabase } from 'src/api/core';
import type { VerifyEmailOtpParams } from '@supabase/supabase-js';

export async function getUserInfo() {
    const { data, error } = await supabase.auth.getSession();
    if (error) return Promise.reject(error);
    return data;
}

export async function logInWithPassword(credentials: { email: string; password: string }) {
    const { data, error } = await supabase.auth.signInWithPassword(credentials);
    if (error) return Promise.reject(error);
    return data;
}

export async function signUp({ email, password, username }: { email: string; password: string; username: string }) {
    const credentials = { email, password, data: { username } };
    const { data, error } = await supabase.auth.signUp(credentials);
    if (error) return Promise.reject(error);
    return data;
}

export async function verifySignUpEmailOtp(params: { email: string; token: string }) {
    const newParams: VerifyEmailOtpParams = { ...params, type: 'signup' };
    const { data, error } = await supabase.auth.verifyOtp(newParams);
    if (error) return Promise.reject(error);
    return data;
}

export async function resetPasswordForEmail(email: string) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) return Promise.reject(error);
    return data;
}

export async function verifyResetPasswordEmailOtp(params: { email: string; token: string }) {
    const newParams: VerifyEmailOtpParams = { ...params, type: 'recovery' };
    const { data, error } = await supabase.auth.verifyOtp(newParams);
    if (error) return Promise.reject(error);
    return data;
}

export async function updatePassword(password: string) {
    const { data, error } = await supabase.auth.updateUser({ password });
    if (error) return Promise.reject(error);
    return data;
}

export async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) return Promise.reject(error);
}
