import { authService } from 'src/api';
import { useQuery } from '@tanstack/react-query';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const authQueries = createQueryKeys('auth', {
    info: {
        queryKey: null,
        queryFn: () => authService.getUserInfo()
    }
});

export const useBasicInfo = () => useQuery(authQueries.info);
