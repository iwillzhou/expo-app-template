import 'tsx/cjs';

import en from './src/i18n/locales/en/metadata.json';
import zhHans from './src/i18n/locales/zh-Hans/metadata.json';
import zhHant from './src/i18n/locales/zh-Hant/metadata.json';

const DEFAULT_APP_NAME = en.ios.CFBundleDisplayName;

const appID = 'com.onepixel.netflix';
const projectId = 'bebdcc56-dc37-4915-a305-1d03b03f700a';

export const isProduction = process.env.APP_ENV === 'production';

export const getAppName = (appName = DEFAULT_APP_NAME) => {
    const appNameSuffix = isProduction ? '' : `(${process.env.APP_ENV})`;
    return `${appName}${appNameSuffix}`;
};

export const getUniqueIdentifier = () => {
    const appIDSuffix = isProduction ? '' : `.${process.env.APP_ENV}`;
    return `${appID}${appIDSuffix}`;
};

export const getAppScheme = getUniqueIdentifier;

export const getIOSBundleID = getUniqueIdentifier;

export const getAndroidPackage = getUniqueIdentifier;

const metadataMap = {
    en,
    'zh-Hans': zhHans,
    'zh-Hant': zhHant
};

export const getLocales = () => {
    return Object.keys(metadataMap).reduce<Record<string, string | Record<string, any>>>((accumulator, key) => {
        const metadata = metadataMap[key as keyof typeof metadataMap];
        accumulator[key] = {
            ios: {
                ...metadata.ios,
                CFBundleDisplayName: getAppName(metadata.ios.CFBundleDisplayName)
            },
            android: {
                ...metadata.android,
                app_name: getAppName(metadata.android.app_name)
            }
        };
        return accumulator;
    }, {});
};

export const getProjectId = () => projectId;

export const getUpdatesUrl = () => `${process.env.HOSTNAME}/api/manifest?id=${projectId}&channel=${process.env.APP_ENV}`;
