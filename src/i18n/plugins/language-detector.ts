import { Storage } from 'src/utils';
import { getLocales } from 'expo-localization';
import { type LanguageDetectorAsyncModule } from 'i18next';

export const LANGUAGE_SETTING_STORAGE_KEY = 'languageSetting';

export const LANGUAGE_SYSTEM_OPTION = 'system';

export const LanguageDetector: LanguageDetectorAsyncModule = {
    type: 'languageDetector',
    async: true,
    init: () => {},
    detect: async (callback: any) => {
        const storedLanguage = await Storage.getItem(LANGUAGE_SETTING_STORAGE_KEY);
        if (storedLanguage && storedLanguage !== LANGUAGE_SYSTEM_OPTION) {
            return callback(storedLanguage);
        }
        const { languageTag } = getLocales()[0];
        return callback(languageTag);
    },
    cacheUserLanguage: () => {}
};
