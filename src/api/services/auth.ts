import { supabase } from 'src/api/core';

export async function getUserInfo() {
    const { data, error } = await supabase.auth.getSession();
    if (error) return Promise.reject(error);
    return data;
}
