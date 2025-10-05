import { memo, useCallback, useState } from 'react';
import Navigation from 'src/components/navigation/Navigation.tsx';
import HeaderActions from './HeaderActions';
import MobileMenu from './MobileMenu';
import { useTheme } from 'src/hooks/useTheme.ts';
import styles from './Header.module.css';
import useDeviceType from 'src/hooks/useDeviceType';

const Header = memo(() => {
  const { isMobile } = useDeviceType();
  const { isLight, toggleTheme } = useTheme();
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

  const handleThemeToggle = useCallback(() => {
    toggleTheme();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          isLightTheme={isLight}
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
          isLightTheme={isLight}
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
