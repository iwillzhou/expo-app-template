import 'ts-node/register';
import { ExpoConfig } from 'expo/config';
import { getAppName, getAppScheme, getProjectId, getUniqueIdentifier, getUpdatesUrl, isProduction } from './app.utils';

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
            CFBundleAllowMixedLocalizations: isProduction
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
    ...(isProduction
        ? {
              locales: {
                  en: './src/i18n/locales/en.json',
                  zh: './src/i18n/locales/zh.json'
              }
          }
        : {}),
    plugins: [
        'expo-router',
        'expo-localization',
        [
            'expo-splash-screen',
            {
                image: './assets/images/splash-icon.png',
                imageWidth: 200,
                resizeMode: 'contain',
                backgroundColor: '#ffffff'
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
