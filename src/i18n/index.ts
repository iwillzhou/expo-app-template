import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources } from './locales';
import { DEFAULT_LANGUAGE, NAMESPACES } from './config';

i18next.use(initReactI18next).init({
    debug: false,
    resources,
    fallbackLng: DEFAULT_LANGUAGE,
    ns: NAMESPACES,
    defaultNS: 'common',
    interpolation: {
        escapeValue: false
    }
});

export default i18next;
