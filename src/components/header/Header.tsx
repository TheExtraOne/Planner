import { memo, useCallback, useState } from 'react';
import Navigation from 'src/components/navigation/Navigation.tsx';
import HeaderActions from 'src/components/header/HeaderActions.tsx';
import MobileMenu from 'src/components/header/MobileMenu.tsx';
import styles from 'src/components/header/Header.module.css';
import useDeviceType from 'src/hooks/useDeviceType';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from 'src/stores/app.store';
import { Theme } from 'src/constants';
import { setTheme } from 'src/stores/theme.store';

const Header = memo(() => {
  const { isMobile } = useDeviceType();
  const { isDarkMode } = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch<AppDispatch>();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState(false);
  // TODO: Implement language switching logic
  const [language] = useState('en');

  const handleLogout = useCallback(() => {
    // TODO: Implement logout logic
    console.log('Logout clicked');
  }, []);

  const toggleSettings = useCallback(() => {
    setIsSettingsDropdownOpen((prev) => !prev);
  }, []);

  const closeSettingsDropdown = useCallback(() => {
    setIsSettingsDropdownOpen(false);
  }, []);

  // TODO: Implement language switching logic
  // const handleLanguageChange = useCallback((newLanguage: string) => {
  //   setLanguage(newLanguage);
  //   console.log('Language changed to:', newLanguage);
  // }, []);

  const handleThemeToggle = (checked: boolean) => {
    const newTheme = checked ? Theme.LIGHT : Theme.DARK;
    dispatch(setTheme(newTheme));
  };

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <header
      className={styles.header}
      role='banner'
      aria-label='Main navigation header'
    >
      <nav
        className={styles.nav}
        role='navigation'
        aria-label='Primary navigation'
      >
        <div className={styles.navLeft}>
          <div className={styles.logoContainer}>
            <img
              src='/taskflow-logo.svg'
              alt='TaskFlow'
              className={styles.logo}
            />
          </div>
          {!isMobile && <Navigation />}
        </div>

        <HeaderActions
          isMobile={isMobile}
          isMobileMenuOpen={isMobileMenuOpen}
          isSettingsOpen={isSettingsDropdownOpen}
          isLightTheme={!isDarkMode}
          language={language}
          onMobileMenuToggle={toggleMobileMenu}
          onSettingsToggle={toggleSettings}
          onSettingsClose={closeSettingsDropdown}
          onThemeToggle={handleThemeToggle}
          onLogout={handleLogout}
        />
      </nav>

      {isMobile && isMobileMenuOpen && (
        <MobileMenu
          onClose={closeMobileMenu}
          isLightTheme={!isDarkMode}
          onThemeToggle={handleThemeToggle}
          language={language}
          onLogout={handleLogout}
        />
      )}
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
