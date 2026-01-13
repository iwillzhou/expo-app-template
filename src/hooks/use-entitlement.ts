import { useCustomerInfo } from './queries/billing';
import { ENTITLEMENT } from 'src/api';

export function useEntitlement() {
    const { data: customerInfo, isPending: loading } = useCustomerInfo();

    const hasActiveEntitlement = (entitlementId: string) => {
        return !!customerInfo?.entitlements[entitlementId];
    };

    return {
        loading,
        customerInfo,
        hasActiveEntitlement,
        isPro: hasActiveEntitlement(ENTITLEMENT.PRO)
    };
}
