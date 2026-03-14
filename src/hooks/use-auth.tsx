import { useEffect, useState } from 'react';
import { useAuthStore } from 'src/stores/auth';
import * as Sentry from '@sentry/react-native';
import { billingService, queryClient, supabase } from 'src/api';

export const useAuth = () => {
    const [loading, setLoading] = useState(true);
    const { setUserId, clearAuth } = useAuthStore();

    useEffect(() => {
        // 1. 启动时获取 session（同步入口）
        const fetchSession = async () => {
            setLoading(true);
            const {
                data: { session }
            } = await supabase.auth.getSession();
            if (session) {
                const userId = session.user.id;
                setUserId(userId);
                billingService.logIn(userId);
                Sentry.setUser({ id: userId });
            }
            setLoading(false);
        };

        fetchSession();

        // 2. 监听登录态变化
        const {
            data: { subscription }
        } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                setUserId(session.user.id);
            } else if (_event === 'SIGNED_OUT') {
                // 彻底登出：清空 Zustand 和本地持久化
                clearAuth();
                billingService.logOut();
                Sentry.setUser(null);
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return { loading };
};
