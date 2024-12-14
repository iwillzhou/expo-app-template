import type { Theme, Colors } from 'src/types/theme';
import { default as ZINC_THEME_CONFIG } from './zinc';
import { default as BLUE_THEME_CONFIG } from './blue';
import { default as ORANGE_THEME_CONFIG } from './orange';
import { default as VIOLET_THEME_CONFIG } from './violet';

export const DEFAULT_THEME = 'zinc';
export const DEFAULT_COLOR_SCHEME = 'light';
export const DEFAULT_COLOR_SCHEME_SETTING = 'system';

export const THEMES: Record<Theme, { light: Colors; dark: Colors }> = {
    [DEFAULT_THEME]: ZINC_THEME_CONFIG,
    blue: BLUE_THEME_CONFIG,
    orange: ORANGE_THEME_CONFIG,
    violet: VIOLET_THEME_CONFIG
};
