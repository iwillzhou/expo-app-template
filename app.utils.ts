import 'ts-node/register';

const appName = 'Netflix';
const appID = 'com.onepixel.netflix';
const projectId = 'bebdcc56-dc37-4915-a305-1d03b03f700a';

const isProduction = process.env.APP_ENV === 'production';

export const getAppName = () => {
    const appNameSuffix = isProduction ? '' : `(${process.env.APP_ENV})`;
    return `${appName}${appNameSuffix}`;
};

export const getAppScheme = () => appName;

export const getUniqueIdentifier = () => {
    const appIDSuffix = isProduction ? '' : `.${process.env.APP_ENV}`;
    return `${appID}${appIDSuffix}`;
};

export const getProjectId = () => projectId;

export const getUpdatesUrl = () => `${process.env.HOSTNAME}/api/manifest?id=${projectId}&channel=${process.env.APP_ENV}`;
