import { memo } from 'react';
import { Settings } from 'lucide-react';
import Button from 'src/components/button/Button.tsx';
import Dropdown from 'src/components/dropdown/Dropdown.tsx';
import SettingsDropdown from 'src/components/dropdown/SettingsDropdown.tsx';

interface DesktopActionsProps {
  isSettingsOpen: boolean;
  onSettingsToggle: () => void;
  onSettingsClose: () => void;
  isLightTheme: boolean;
  onThemeToggle: (isDark: boolean) => void;
  language: string;
  onLogout: () => void;
}

const DesktopActions = memo(
  ({
    isSettingsOpen,
    onSettingsToggle,
    onSettingsClose,
    isLightTheme,
    onThemeToggle,
    language,
    onLogout,
  }: DesktopActionsProps) => {
    return (
      <>
        <Dropdown
          trigger={
            <Button variant='icon' aria-label='Open settings menu'>
              <Settings size={16} />
            </Button>
          }
          isOpen={isSettingsOpen}
          onToggle={onSettingsToggle}
          onClose={onSettingsClose}
          position='bottomRight'
        >
          <SettingsDropdown
            isLightTheme={isLightTheme}
            onThemeToggle={onThemeToggle}
            language={language}
          />
        </Dropdown>
        <Button
          onClick={onLogout}
          variant='primary'
          aria-label='Logout from application'
        >
          Logout
        </Button>
      </>
    );
  },
);

export default DesktopActions;
