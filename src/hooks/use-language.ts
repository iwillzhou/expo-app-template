import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocales } from 'expo-localization';
import { LANG_SETTING_SYSTEM, useLanguageStore } from 'src/stores/language';

export function useLanguage() {
    const systemLocales = useLocales();
    const { i18n } = useTranslation();
    const { loading, languageSetting } = useLanguageStore();
    const { languageTag, languageCode } = systemLocales[0];

    let systemLanguage = languageTag;

    // 针对中文的特殊处理逻辑
    if (languageCode === 'zh' || languageTag.includes('zh')) {
        if (languageTag.includes('Hans') || languageTag.includes('CN')) {
            systemLanguage = 'zh-Hans';
        }
        if (languageTag.includes('Hant') || languageTag.includes('TW') || languageTag.includes('HK')) {
            systemLanguage = 'zh-Hant';
        }
    }

    useEffect(() => {
        const resolveLanguageSetting = languageSetting === LANG_SETTING_SYSTEM ? systemLanguage : languageSetting;
        i18n.changeLanguage(resolveLanguageSetting);
    }, [languageSetting, systemLanguage]);

    return { loading };
}
