import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import zh from './locales/zh.json';
import { LanguageDetector } from './plugins/language-detector';

export const DEFAULT_LANG = 'en';

const resources = {
    en: {
        name: 'English',
        display: 'English',
        ...en
    },
    zh: {
        name: 'Chinese',
        display: '简体中文',
        ...zh
    }
};

i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: false,
        resources,
        fallbackLng: DEFAULT_LANG,
        ns: ['common'],
        defaultNS: 'common',
        interpolation: {
            escapeValue: false
        }
    });

export default i18next;
