import { Settings, Menu, X, LogOut } from 'lucide-react';
import { useState } from 'react';
import Button from 'src/components/button/Button.tsx';
import Navigation from 'src/components/navigation/Navigation.tsx';
import Toggle from 'src/components/toggle/Toggle.tsx';
import styles from './Header.module.css';
import useDeviceType from 'src/hooks/useDeviceType';

/*
TODO:
1. ✅ Add logo
2. ✅ Add normal style for navigation links
3. Extract settings to a separate component
4. ✅ Add responsive (hook)
*/
const Header = () => {
  const { isMobile } = useDeviceType();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log('Logout clicked');
  };

  const handleSettings = () => {
    // TODO: Implement settings logic
    console.log('Settings clicked');
  };

  const handleThemeToggle = (isDark: boolean) => {
    setIsDarkTheme(isDark);
    // TODO: Implement theme switching logic
    console.log('Theme toggled:', isDark ? 'dark' : 'light');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
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

        <div className={styles.navRight}>
          {isMobile ? (
            <Button onClick={toggleMobileMenu} variant='icon'>
              <Menu size={20} />
            </Button>
          ) : (
            <>
              <Button onClick={handleSettings} variant='icon'>
                <Settings size={16} />
              </Button>
              <Button onClick={handleLogout} variant='primary'>
                Logout
              </Button>
            </>
          )}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobile && isMobileMenuOpen && (
        <div className={styles.mobileMenuOverlay} onClick={closeMobileMenu}>
          <div
            className={styles.mobileMenu}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.mobileMenuHeader}>
              <h3>Menu</h3>
              <Button onClick={closeMobileMenu} variant='icon'>
                <X size={20} />
              </Button>
            </div>
            <div className={styles.mobileMenuContent}>
              <Navigation />
              <div className={styles.mobileMenuSettings}>
                <div className={styles.themeToggleContainer}>
                  <span className={styles.themeToggleLabel}>Theme</span>
                  <Toggle
                    isOn={isDarkTheme}
                    onToggle={handleThemeToggle}
                    variant='theme'
                  />
                </div>
                <button
                  onClick={handleLogout}
                  className={styles.mobileLogoutButton}
                >
                  Logout
                  <LogOut size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
