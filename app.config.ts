import 'ts-node/register';
import { ExpoConfig } from 'expo/config';
import { getAppName, getAppScheme, getProjectId, getUniqueIdentifier, getUpdatesUrl } from './app.utils';

const config: ExpoConfig = {
    name: getAppName(),
    slug: 'expo-app-template',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: getAppScheme(),
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    ios: {
        supportsTablet: true,
        bundleIdentifier: getUniqueIdentifier(),
        infoPlist: {
            CFBundleAllowMixedLocalizations: true
        }
    },
    android: {
        adaptiveIcon: {
            foregroundImage: './assets/images/adaptive-icon.png',
            backgroundColor: '#ffffff'
        },
        package: getUniqueIdentifier()
    },
    web: {
        bundler: 'metro',
        output: 'static',
        favicon: './assets/images/favicon.png'
    },
    locales: {
        en: './src/i18n/locales/en.json',
        zh: './src/i18n/locales/zh.json'
    },
    plugins: [
        'expo-router',
        'expo-localization',
        'expo-secure-store',
        [
            'expo-splash-screen',
            {
                image: './assets/images/splash-icon.png',
                imageWidth: 60,
                backgroundColor: '#221F1F'
            }
        ]
    ],
    experiments: {
        typedRoutes: true
    },
    updates: {
        url: getUpdatesUrl()
    },
    runtimeVersion: {
        policy: 'fingerprint'
    },
    extra: {
        eas: {
            projectId: getProjectId()
        }
    }
};

export default config;
