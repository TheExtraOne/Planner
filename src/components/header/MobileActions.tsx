import { memo, useCallback } from 'react';
import { X, LogOut, Globe } from 'lucide-react';
import Button from 'src/components/button/Button.tsx';
import Navigation from 'src/components/navigation/Navigation.tsx';
import Toggle from 'src/components/toggle/Toggle.tsx';
import styles from 'src/components/header/Header.module.css';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from 'src/stores/app.store';
import { Theme } from 'src/constants';
import { setTheme } from 'src/stores/theme.store';

interface MobileMenuProps {
  onClose: () => void;
  language: string;
  onLogout: () => void;
}

const MobileActions = memo(
  ({ onClose, language, onLogout }: MobileMenuProps) => {
    const { isDarkMode } = useSelector((state: RootState) => state.theme);
    const dispatch = useDispatch<AppDispatch>();

    const handleThemeToggle = (checked: boolean) => {
      const newTheme = checked ? Theme.LIGHT : Theme.DARK;
      dispatch(setTheme(newTheme));
    };

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
                  isOn={!isDarkMode}
                  onToggle={handleThemeToggle}
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

export default MobileActions;
