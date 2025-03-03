import { createClient } from '@supabase/supabase-js';
import { LargeSecureStore } from 'src/utils/large-secure-store';

const supabaseUrl = 'https://narrnzfjucabxmxwurvf.supabase.co';
const supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5hcnJuemZqdWNhYnhteHd1cnZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQzODQ3MjksImV4cCI6MjAzOTk2MDcyOX0.sHyEtHTsixYnfqg_jqDMvbITKTDj_2dadXZCRF_G2r4';

export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        storage: LargeSecureStore,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false
    }
});
