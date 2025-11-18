import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { Theme } from 'src/constants';
import { getInitialTheme, THEME_STORAGE_KEY } from 'src/utils/theme.helpers.ts';

interface ThemeState {
  theme: Theme;
  isDarkMode: boolean;
}

const initialTheme = getInitialTheme();

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    theme: initialTheme,
    isDarkMode: initialTheme === Theme.DARK,
  } as ThemeState,
  reducers: {
    setTheme: (_state, action: PayloadAction<Theme>) => {
      const newTheme = action.payload;
      try {
        localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      } catch (error) {
        console.warn('Failed to save theme to localStorage:', error);
      }
      return {
        theme: newTheme,
        isDarkMode: newTheme === Theme.DARK,
      };
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
