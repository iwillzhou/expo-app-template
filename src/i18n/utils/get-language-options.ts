import { LANGUAGES, Language } from '../config/languages';

export function getLanguageOptions(current: Language) {
    return (Object.keys(LANGUAGES) as Language[]).map(lang => {
        const meta = LANGUAGES[lang];

        return {
            value: lang,
            label: meta.nativeName,
            localizedName: meta.localizedNames[current] ?? ''
        };
    });
}
