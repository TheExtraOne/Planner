import { memo } from 'react';
import { Menu } from 'lucide-react';
import Button from 'src/components/button/Button.tsx';
import DesktopActions from 'src/components/header/DesktopActions.tsx';
import styles from 'src/components/header/Header.module.css';

interface HeaderActionsProps {
  isMobile: boolean;
  isMobileMenuOpen: boolean;
  isSettingsOpen: boolean;
  language: string;
  onMobileMenuToggle: () => void;
  onSettingsToggle: () => void;
  onSettingsClose: () => void;
  onLogout: () => void;
}

const HeaderActions = memo(
  ({
    isMobile,
    isMobileMenuOpen,
    isSettingsOpen,
    language,
    onMobileMenuToggle,
    onSettingsToggle,
    onSettingsClose,
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
            language={language}
            onLogout={onLogout}
          />
        )}
      </div>
    );
  },
);

export default HeaderActions;
