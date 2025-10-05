import React, { createContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { Theme } from 'src/constants.ts';
import { getInitialTheme, saveTheme, applyTheme } from 'src/utils/theme.ts';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
  isLight: boolean;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => getInitialTheme());

  useEffect(() => {
    applyTheme(theme);
    saveTheme(theme);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState((currentTheme) =>
      currentTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT,
    );
  };

  const isDark = theme === Theme.DARK;
  const isLight = theme === Theme.LIGHT;

  const value: ThemeContextType = {
    theme,
    toggleTheme,
    setTheme,
    isDark,
    isLight,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeContext;
