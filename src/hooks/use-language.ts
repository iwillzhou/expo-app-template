import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocales } from 'expo-localization';
import { LANG_SETTING_SYSTEM, useLanguageStore } from 'src/stores/language';

export function useLanguage() {
    const systemLocales = useLocales();
    const { i18n } = useTranslation();
    const { loading, languageSetting } = useLanguageStore();

    const { languageTag: systemLanguage } = systemLocales[0];

    useEffect(() => {
        if (languageSetting === LANG_SETTING_SYSTEM) {
            i18n.changeLanguage(systemLanguage);
        }
    }, [languageSetting, systemLanguage]);

    return { loading };
}
