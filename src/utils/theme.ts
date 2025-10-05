import { Theme } from 'src/constants.ts';

const THEME_STORAGE_KEY = 'taskflow-theme';

/**
 * Get the user's preferred theme from localStorage or system preference
 */
export const getInitialTheme = (): Theme => {
  // Check localStorage first
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (storedTheme && Object.values(Theme).includes(storedTheme as Theme)) {
    return storedTheme as Theme;
  }

  // Fall back to system preference
  if (typeof window !== 'undefined' && window.matchMedia) {
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    return prefersDark ? Theme.DARK : Theme.LIGHT;
  }

  // Default to light theme
  return Theme.LIGHT;
};

/**
 * Save theme preference to localStorage
 */
export const saveTheme = (theme: Theme): void => {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (error) {
    console.warn('Failed to save theme to localStorage:', error);
  }
};

/**
 * Apply theme to the document root
 */
export const applyTheme = (theme: Theme): void => {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;

  // Remove existing theme classes
  root.classList.remove('light-theme', 'dark-theme');

  // Add new theme class
  root.classList.add(`${theme}-theme`);

  // Also set data attribute for CSS selectors
  root.setAttribute('data-theme', theme);
};
