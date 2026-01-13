import en from './en';
import zhHans from './zh-Hans';
import zhHant from './zh-Hant';

export const resources = {
    en,
    'zh-Hans': zhHans,
    'zh-Hant': zhHant
} as const;
