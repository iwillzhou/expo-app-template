import { Redirect, Slot } from 'expo-router';
import { billingService, supabase } from 'src/api';
import type { Session } from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useState, PropsWithChildren } from 'react';

type AuthContextType = {
    session: Session | null;
    profile?: any;
    isAuthenticated: boolean;
    loading: boolean;
};

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: PropsWithChildren) {
    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // 1. 启动时获取 session（同步入口）
        const fetchSession = async () => {
            setLoading(true);
            const {
                data: { session }
            } = await supabase.auth.getSession();
            setSession(session);
            setLoading(false);
        };

        fetchSession();

        // 2. 监听登录态变化
        const {
            data: { subscription }
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            if (session) {
                const userId = session.user.id;
                const { data } = await supabase.from('profiles').select('*').eq('id', userId).single();
                setProfile(data);
                billingService.logIn(userId);
            } else {
                setProfile(null);
            }
            setLoading(false);
        };
        fetchProfile();
    }, [session]);

    return (
        <AuthContext.Provider
            value={{
                session,
                profile,
                isAuthenticated: !!session,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function ProtectedLayout() {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return null;

    if (!isAuthenticated) {
        return <Redirect href="/" />;
    }

    return <Slot />;
}

export const useAuth = () => useContext(AuthContext);
