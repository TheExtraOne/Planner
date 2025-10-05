import { memo, useCallback, useState } from 'react';
import Navigation from 'src/components/navigation/Navigation.tsx';
import HeaderActions from './HeaderActions';
import MobileMenu from './MobileMenu';
import styles from './Header.module.css';
import useDeviceType from 'src/hooks/useDeviceType';

const Header = memo(() => {
  const { isMobile } = useDeviceType();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState(false);
  // TODO: Implement theme switching logic
  const [isLightTheme, setIsLightTheme] = useState(false);
  // TODO: Implement language switching logic
  const [language, setLanguage] = useState('en');

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleLanguageChange = useCallback((newLanguage: string) => {
    setLanguage(newLanguage);
    console.log('Language changed to:', newLanguage);
  }, []);

  const toggleTheme = useCallback((isDark: boolean) => {
    setIsLightTheme(isDark);
    // TODO: Implement theme switching logic
    console.log('Theme toggled:', isDark ? 'dark' : 'light');
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
          isLightTheme={isLightTheme}
          language={language}
          onMobileMenuToggle={toggleMobileMenu}
          onSettingsToggle={toggleSettings}
          onSettingsClose={closeSettingsDropdown}
          onThemeToggle={toggleTheme}
          onLogout={handleLogout}
        />
      </nav>

      {isMobile && isMobileMenuOpen && (
        <MobileMenu
          onClose={closeMobileMenu}
          isLightTheme={isLightTheme}
          onThemeToggle={toggleTheme}
          language={language}
          onLogout={handleLogout}
        />
      )}
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
