const APP_ENV = process.env.APP_ENV ?? 'development';

const isDev = process.env.APP_ENV === 'development';
const isTesting = process.env.APP_ENV === 'testing';
const isStaging = process.env.APP_ENV === 'staging';
const isProduction = process.env.APP_ENV === 'production';
