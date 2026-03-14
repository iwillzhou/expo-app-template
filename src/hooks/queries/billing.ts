import { billingService } from 'src/api';
import { useMutation, useQuery } from '@tanstack/react-query';

export function useOfferings() {
    return useQuery({
        queryKey: ['billing', 'offerings'],
        queryFn: billingService.getOfferings
    });
}

export function useCustomerInfo() {
    return useQuery({
        queryKey: ['billing', 'customerInfo'],
        queryFn: billingService.getCustomerInfo
    });
}

export function usePurchase() {
    return useMutation({
        mutationFn: billingService.purchase
    });
}

export function useRestorePurchase() {
    return useMutation({
        mutationFn: billingService.restorePurchases
    });
}
