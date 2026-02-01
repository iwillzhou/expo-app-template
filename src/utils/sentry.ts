import * as Sentry from '@sentry/react-native';
import Constants from 'expo-constants';
import * as Updates from 'expo-updates';

export function initSentry() {
    Sentry.init({
        dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,

        environment: __DEV__ ? 'development' : 'production',

        // Hermes / Native
        enableNative: true,

        // 性能监控
        tracesSampleRate: __DEV__ ? 1.0 : 0.1,
        profilesSampleRate: __DEV__ ? 1.0 : 0.1,

        // release（Expo plugin 会兜底，但建议显式）
        release: `${Constants.expoConfig?.name}@${Constants.expoConfig?.version}`,

        beforeSend(event) {
            if (__DEV__) return null;
            return event;
        }
    });

    // OTA 关联（强烈推荐）
    Sentry.setContext('expo', {
        updateId: Updates.updateId,
        channel: Updates.channel,
        runtimeVersion: Updates.runtimeVersion
    });
}
