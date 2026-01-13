import type { VerifyEmailOtpParams } from '@supabase/supabase-js';
import { supabase } from 'src/api/core';

// 获取当前客户端本地缓存的 Session（不会请求 Supabase 服务器）
export async function getSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data;
}

// 向 Supabase Auth 服务请求当前用户
export async function getUser() {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data.user;
}

export async function logInWithPassword(credentials: { email: string; password: string }) {
    const { data, error } = await supabase.auth.signInWithPassword(credentials);
    if (error) throw error;
    return data;
}

export async function signUp({ email, password, username }: { email: string; password: string; username: string }) {
    const credentials = { email, password, data: { username } };
    const { data, error } = await supabase.auth.signUp(credentials);
    if (error) throw error;
    return data;
}

export async function resend({ email }: { email: string }) {
    const { data, error } = await supabase.auth.resend({
        type: 'signup',
        email
    });
    if (error) throw error;
    return data;
}

export async function verifySignUpEmailOtp(params: { email: string; token: string }) {
    const newParams: VerifyEmailOtpParams = { ...params, type: 'signup' };
    const { data, error } = await supabase.auth.verifyOtp(newParams);
    if (error) throw error;
    return data;
}

export async function resetPasswordForEmail(email: string) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
    return data;
}

export async function verifyResetPasswordEmailOtp(params: { email: string; token: string }) {
    const newParams: VerifyEmailOtpParams = { ...params, type: 'recovery' };
    const { data, error } = await supabase.auth.verifyOtp(newParams);
    if (error) throw error;
    return data;
}

export async function updatePassword(password: string) {
    const { data, error } = await supabase.auth.updateUser({ password });
    if (error) throw error;
    return data;
}

export async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
}
