import { Theme } from 'src/constants';

export const THEME_STORAGE_KEY = 'taskflow-theme';

export const getSystemThemePreference = (): Theme => {
  if (typeof window === 'undefined') {
    return Theme.LIGHT;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? Theme.DARK
    : Theme.LIGHT;
};

export const getStoredThemePreference = (): Theme | null => {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === Theme.LIGHT || stored === Theme.DARK) {
      return stored;
    }
  } catch (error) {
    console.warn('Failed to read theme from localStorage:', error);
  }
  return null;
};

export const getInitialTheme = (): Theme => {
  const stored = getStoredThemePreference();
  if (stored) {
    return stored;
  }
  return getSystemThemePreference();
};
