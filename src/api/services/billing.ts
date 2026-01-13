import Purchases, { PACKAGE_TYPE } from 'react-native-purchases';

export { PACKAGE_TYPE };

export type PurchasePackage = {
    id: string;
    title: string;
    price: string;
    packageType: PACKAGE_TYPE;
};

export enum ENTITLEMENT {
    PRO = 'pro'
}

export type PurchaserInfo = {
    entitlements: Record<string, boolean>; // active entitlements
};

export interface IBillingService {
    init(): Promise<void>;
    getOfferings(): Promise<PurchasePackage[]>;
    purchase(packageId: string): Promise<void>;
    restorePurchases(): Promise<void>;
    getCustomerInfo(): Promise<PurchaserInfo>;
    logIn(appUserID: string): Promise<void>;
    logOut(): Promise<void>;
}

class RevenueCatAdapter implements IBillingService {
    async init() {
        // Purchases.setLogLevel(LOG_LEVEL.VERBOSE);

        const apiKey = process.env.EXPO_PUBLIC_REVENUECAT_API_KEY;
        if (!apiKey) {
            throw new Error('Missing environment variable: EXPO_PUBLIC_REVENUECAT_API_KEY');
        }
        Purchases.configure({ apiKey });
    }

    async logIn(appUserID: string) {
        Purchases.logIn(appUserID);
    }

    async logOut() {
        Purchases.logOut();
    }

    async getCustomerInfo() {
        const info = await Purchases.getCustomerInfo();
        return {
            entitlements: Object.fromEntries(Object.entries(info.entitlements.active).map(([k]) => [k, true]))
        };
    }

    async getOfferings(): Promise<PurchasePackage[]> {
        const offerings = await Purchases.getOfferings();
        if (!offerings.current) return [];
        return offerings.current.availablePackages.map(p => ({
            id: p.identifier,
            title: p.product.title,
            price: p.product.priceString,
            packageType: p.packageType
        }));
    }

    async purchase(packageId: string) {
        const offerings = await Purchases.getOfferings();
        const pkg = offerings.current?.availablePackages.find(p => p.identifier === packageId);
        if (!pkg) throw new Error('Package not found');
        await Purchases.purchasePackage(pkg);
    }

    async restorePurchases() {
        await Purchases.restorePurchases();
    }
}

// class StripeAdapter implements IBillingService {
//     async init() {}

//     async logIn(appUserID: string) {}

//     async logOut() {}

//     async getCustomerInfo() {
//         return {
//             entitlements: {}
//         };
//     }

//     async getOfferings(): Promise<PurchasePackage[]> {
//         return [];
//     }

//     async purchase(packageId: string) {}

//     async restorePurchases() {}
// }

// class AlipayAdapter implements IBillingService {
//     async init() {}

//     async logIn(appUserID: string) {}

//     async logOut() {}

//     async getCustomerInfo() {
//         return {
//             entitlements: {}
//         };
//     }

//     async getOfferings(): Promise<PurchasePackage[]> {
//         return [];
//     }

//     async purchase(packageId: string) {
//         // 1. 调用你自己后端的接口创建订单，获取支付宝所需的支付字符串
//         const orderInfo = await myApi.createAlipayOrder(productId);

//         // 2. 调用支付宝 SDK 唤起支付
//         const result = await Alipay.pay(orderInfo);

//         if (result.success) {
//             // 3. 关键：支付成功后，强制让 RevenueCat 刷新一下数据
//             // 因为后端已经通过 API 给 RC 发了通知，这里刷新就能拿到新权限
//             await Purchases.invalidateCustomerInfoCache();
//             const customerInfo = await Purchases.getCustomerInfo();
//             return !!customerInfo.entitlements.active['pro'];
//         }
//         return false;
//     }

//     async restorePurchases() {}
// }

// class WechatAdapter implements IBillingService {
//     async init() {}

//     async logIn(appUserID: string) {}

//     async logOut() {}

//     async getCustomerInfo() {
//         return {
//             entitlements: {}
//         };
//     }

//     async getOfferings(): Promise<PurchasePackage[]> {
//         return [];
//     }

//     async purchase(packageId: string) {}

//     async restorePurchases() {}
// }

export const billingService = new RevenueCatAdapter();
