import { memo } from 'react';
import { Menu } from 'lucide-react';
import Button from 'src/components/button/Button.tsx';
import DesktopActions from './DesktopActions';
import styles from './Header.module.css';

interface HeaderActionsProps {
  isMobile: boolean;
  isMobileMenuOpen: boolean;
  isSettingsOpen: boolean;
  isLightTheme: boolean;
  language: string;
  onMobileMenuToggle: () => void;
  onSettingsToggle: () => void;
  onSettingsClose: () => void;
  onThemeToggle: () => void;
  onLogout: () => void;
}

const HeaderActions = memo(
  ({
    isMobile,
    isMobileMenuOpen,
    isSettingsOpen,
    isLightTheme,
    language,
    onMobileMenuToggle,
    onSettingsToggle,
    onSettingsClose,
    onThemeToggle,
    onLogout,
  }: HeaderActionsProps) => {
    return (
      <div className={styles.navRight}>
        {isMobile ? (
          <Button
            onClick={onMobileMenuToggle}
            variant='icon'
            aria-label={
              isMobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'
            }
            aria-expanded={isMobileMenuOpen}
          >
            <Menu size={20} />
          </Button>
        ) : (
          <DesktopActions
            isSettingsOpen={isSettingsOpen}
            onSettingsToggle={onSettingsToggle}
            onSettingsClose={onSettingsClose}
            isLightTheme={isLightTheme}
            onThemeToggle={onThemeToggle}
            language={language}
            onLogout={onLogout}
          />
        )}
      </div>
    );
  },
);

export default HeaderActions;
