import { createClient } from '@supabase/supabase-js';
import { LargeSecureStore } from 'src/utils/large-secure-store';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_KEY;

if (!supabaseUrl) {
    throw new Error('Missing environment variable: EXPO_PUBLIC_SUPABASE_URL');
}
if (!supabaseKey) {
    throw new Error('Missing environment variable: EXPO_PUBLIC_SUPABASE_ANON_KEY');
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        storage: LargeSecureStore,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false
    }
});
