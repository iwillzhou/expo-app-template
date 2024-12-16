import { Storage } from 'src/utils';
import { getLocales } from 'expo-localization';
import { type LanguageDetectorAsyncModule } from 'i18next';

const storageKey = 'language';

export const LanguageDetector: LanguageDetectorAsyncModule = {
    type: 'languageDetector',
    async: true,
    init: () => {},
    detect: async (callback: any) => {
        const storedLanguage = await Storage.getItem(storageKey);
        if (storedLanguage) {
            return callback(storedLanguage);
        }
        const { languageTag } = getLocales()[0];
        return callback(languageTag);
    },
    cacheUserLanguage: async language => {
        await Storage.setItem(storageKey, language);
    }
};
