import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            gcTime: 5 * 60 * 1000, // 5分钟
            retry: 2,
            refetchOnWindowFocus: false,
            networkMode: 'offlineFirst'
        },
        mutations: {
            networkMode: 'offlineFirst'
        }
    }
});
