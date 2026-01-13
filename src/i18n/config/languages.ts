export const LANGUAGES = {
    en: {
        nativeName: 'English',
        localizedNames: {
            en: 'English',
            'zh-Hans': '英语',
            'zh-Hant': '英文'
        }
    },
    'zh-Hans': {
        nativeName: '简体中文',
        localizedNames: {
            en: 'Chinese (Simplified)',
            'zh-Hans': '简体中文',
            'zh-Hant': '簡體中文'
        }
    },
    'zh-Hant': {
        nativeName: '繁體中文',
        localizedNames: {
            en: 'Chinese (Traditional)',
            'zh-Hans': '繁体中文',
            'zh-Hant': '繁體中文'
        }
    }
} as const;

export type Language = keyof typeof LANGUAGES;
