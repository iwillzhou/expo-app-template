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
        const resolveLanguageSetting = languageSetting === LANG_SETTING_SYSTEM ? systemLanguage : languageSetting;
        i18n.changeLanguage(resolveLanguageSetting);
    }, [languageSetting, systemLanguage]);

    return { loading };
}
