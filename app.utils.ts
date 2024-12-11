import 'ts-node/register';

const appName = 'myapp';
const appID = 'com.onepixel.myapp';

const isProduction = process.env.APP_ENV === 'production';

export const getAppName = () => {
    const appNameSuffix = isProduction ? '' : `(${process.env.APP_ENV})`;
    return `${appName}${appNameSuffix}`;
};

export const getAppScheme = () => appName;

export const getAppSlug = () => appID;

export const getUniqueIdentifier = () => {
    const appIDSuffix = isProduction ? '' : `.${process.env.APP_ENV}`;
    return `${appID}${appIDSuffix}`;
};
