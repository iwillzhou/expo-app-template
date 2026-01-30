import 'tsx/cjs';
import { ConfigContext, ExpoConfig } from 'expo/config';
import { getAndroidPackage, getAppName, getAppScheme, getIOSBundleID, getLocales, getProjectId } from './app.util';

export default ({ config }: ConfigContext): ExpoConfig => ({
    ...config,
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
        bundleIdentifier: getIOSBundleID(),
        infoPlist: {
            CFBundleAllowMixedLocalizations: true
        }
    },
    android: {
        package: getAndroidPackage(),
        adaptiveIcon: {
            backgroundColor: '#E6F4FE',
            foregroundImage: './assets/images/android-icon-foreground.png',
            backgroundImage: './assets/images/android-icon-background.png',
            monochromeImage: './assets/images/android-icon-monochrome.png'
        },
        edgeToEdgeEnabled: true,
        predictiveBackGestureEnabled: false
    },
    locales: getLocales(),
    plugins: [
        'expo-font',
        'expo-router',
        'expo-secure-store',
        'expo-localization',
        [
            'expo-splash-screen',
            {
                image: './assets/images/splash-icon.png',
                imageWidth: 200,
                resizeMode: 'contain',
                backgroundColor: '#ffffff',
                dark: {
                    backgroundColor: '#000000'
                }
            }
        ]
    ],
    experiments: {
        typedRoutes: true,
        reactCompiler: true
    },
    extra: {
        eas: {
            projectId: getProjectId()
        }
    }
});
