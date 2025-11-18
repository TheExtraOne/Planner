import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { type RootState } from 'src/stores/app.store.ts';

export const useThemeEffect = () => {
  const { theme } = useSelector((state: RootState) => state.theme);

  useEffect(() => {
    const root = document.documentElement;

    root.classList.remove('light-theme', 'dark-theme');
    root.classList.add(`${theme}-theme`);
    root.setAttribute('data-theme', theme);
  }, [theme]);
};
