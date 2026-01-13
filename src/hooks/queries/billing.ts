import { billingService } from 'src/api';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useOfferings = () =>
    useQuery({ queryKey: ['billing', 'offerings'], queryFn: billingService.getOfferings });

export const useCustomerInfo = () =>
    useQuery({ queryKey: ['billing', 'customerInfo'], queryFn: billingService.getCustomerInfo });

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
