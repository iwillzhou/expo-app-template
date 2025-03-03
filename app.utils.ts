import 'ts-node/register';

import en from './src/i18n/locales/en.json';

const appName: string = en.CFBundleDisplayName; // Explicitly define the type
const appID: string = 'com.onepixel.netflix';
const projectId: string = 'bebdcc56-dc37-4915-a305-1d03b03f700a';

export const isProduction: boolean = process.env.APP_ENV === 'production';

export const getAppName = (): string => {
    const appNameSuffix: string = isProduction ? '' : `(${process.env.APP_ENV})`;
    return `${appName}${appNameSuffix}`;
};

export const getAppScheme = (): string => appName;

export const getUniqueIdentifier = (): string => {
    const appIDSuffix: string = isProduction ? '' : `.${process.env.APP_ENV}`;
    return `${appID}${appIDSuffix}`;
};

export const getProjectId = (): string => projectId;

export const getUpdatesUrl = (): string => `${process.env.HOSTNAME}/api/manifest?id=${projectId}&channel=${process.env.APP_ENV}`;
