import { THEMES } from 'src/constants/theme';

export type Theme = keyof THEMES;

export type ColorScheme = 'light' | 'dark';

export type ColorSchemeSetting = 'system' | ColorScheme;

export type Colors = Record<string, string>;

export type UseTheme = {
    loaded: boolean;
    theme: Theme;
    colorScheme: ColorScheme;
    colorSchemeSetting: ColorSchemeSetting;
    colors: Colors;
    isDarkColorScheme: boolean;
    setTheme: (theme: Theme) => void;
    setColorSchemeSetting: (theme: ColorSchemeSetting) => void;
    toggleColorScheme: () => void;
};
