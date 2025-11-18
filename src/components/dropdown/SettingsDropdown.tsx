import { memo } from 'react';
import { Globe } from 'lucide-react';
import Toggle from 'src/components/toggle/Toggle';
import styles from 'src/components/dropdown/SettingsDropdown.module.css';
import { Theme } from 'src/constants';
import { setTheme } from 'src/stores/theme.store';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from 'src/stores/app.store';

interface SettingsDropdownProps {
  language?: string;
}

const SettingsDropdown = memo(({ language = 'en' }: SettingsDropdownProps) => {
  const { isDarkMode } = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch<AppDispatch>();

  const handleThemeToggle = (checked: boolean) => {
    const newTheme = checked ? Theme.LIGHT : Theme.DARK;
    dispatch(setTheme(newTheme));
  };

  return (
    <div className={styles.settingsDropdown}>
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h4 className={styles.sectionTitle}>Theme</h4>
        </div>
        <div className={styles.settingItem}>
          <div className={styles.settingContent}>
            <span className={styles.settingLabel}>
              {isDarkMode ? 'Dark Mode' : 'Light Mode'}
            </span>
            <Toggle
              isOn={!isDarkMode}
              onToggle={handleThemeToggle}
              variant='theme'
            />
          </div>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h4 className={styles.sectionTitle}>Language</h4>
        </div>
        <div className={styles.settingItem}>
          <div className={styles.settingContent}>
            <div className={styles.languageOption}>
              <Globe size={16} className={styles.languageIcon} />
              <span className={styles.settingLabel}>English</span>
            </div>
            <div className={styles.languageStatus}>
              {language === 'en' && (
                <span className={styles.currentLanguage}>Current</span>
              )}
            </div>
          </div>
        </div>
        <div className={styles.languageNote}>
          <span className={styles.noteText}>More languages coming soon</span>
        </div>
      </div>
    </div>
  );
});

export default SettingsDropdown;
