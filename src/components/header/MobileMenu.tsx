import { memo, useCallback } from 'react';
import { X, LogOut, Globe } from 'lucide-react';
import Button from 'src/components/button/Button.tsx';
import Navigation from 'src/components/navigation/Navigation.tsx';
import Toggle from 'src/components/toggle/Toggle.tsx';
import styles from './Header.module.css';

interface MobileMenuProps {
  onClose: () => void;
  isLightTheme: boolean;
  onThemeToggle: (isDark: boolean) => void;
  language: string;
  onLogout: () => void;
}

const MobileMenu = memo(
  ({
    onClose,
    isLightTheme,
    onThemeToggle,
    language,
    onLogout,
  }: MobileMenuProps) => {
    const handleLogout = useCallback(() => {
      onLogout();
      onClose();
    }, [onLogout, onClose]);

    return (
      <div
        className={styles.mobileMenuOverlay}
        onClick={onClose}
        role='dialog'
        aria-modal='true'
        aria-label='Mobile navigation menu'
      >
        <div
          className={styles.mobileMenu}
          onClick={(e) => e.stopPropagation()}
          role='menu'
        >
          <div className={styles.mobileMenuHeader}>
            <h3>Menu</h3>
            <Button
              onClick={onClose}
              variant='icon'
              aria-label='Close mobile menu'
            >
              <X size={20} />
            </Button>
          </div>
          <div className={styles.mobileMenuContent}>
            <Navigation />
            <div className={styles.mobileMenuSettings}>
              <div className={styles.themeToggleContainer}>
                <span className={styles.themeToggleLabel}>Theme</span>
                <Toggle
                  isOn={isLightTheme}
                  onToggle={onThemeToggle}
                  variant='theme'
                  aria-label='Toggle theme'
                />
              </div>
              <div className={styles.languageContainer}>
                <div className={styles.languageOption}>
                  <Globe size={16} className={styles.languageIcon} />
                  <span className={styles.languageLabel}>English</span>
                </div>
                <div className={styles.languageStatus}>
                  {language === 'en' && (
                    <span className={styles.currentLanguage}>Current</span>
                  )}
                </div>
              </div>
              <div className={styles.languageNote}>
                <span className={styles.noteText}>
                  More languages coming soon
                </span>
              </div>
              <button
                onClick={handleLogout}
                className={styles.mobileLogoutButton}
                aria-label='Logout from application'
              >
                Logout
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

export default MobileMenu;
