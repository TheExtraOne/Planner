import { memo, useCallback, useState } from 'react';
import Navigation from 'src/components/navigation/Navigation.tsx';
import HeaderActions from 'src/components/header/HeaderActions.tsx';
import styles from 'src/components/header/Header.module.css';
import useDeviceType from 'src/hooks/useDeviceType';
import MobileActions from 'src/components/header/MobileActions.tsx';

const Header = memo(() => {
  const { isMobile } = useDeviceType();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState(false);
  // TODO: Implement language switching logic, move it to children
  const [language] = useState('en');

  const handleLogout = useCallback(() => {
    // TODO: Implement logout logic, move it to children
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
          language={language}
          onMobileMenuToggle={toggleMobileMenu}
          onSettingsToggle={toggleSettings}
          onSettingsClose={closeSettingsDropdown}
          onLogout={handleLogout}
        />
      </nav>

      {isMobile && (
        <MobileActions
          onClose={closeMobileMenu}
          isMobileMenuOpen={isMobileMenuOpen}
          language={language}
          onLogout={handleLogout}
        />
      )}
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
