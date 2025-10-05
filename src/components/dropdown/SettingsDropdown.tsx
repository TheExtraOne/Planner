import { memo } from 'react';
import { Globe } from 'lucide-react';
import Toggle from 'src/components/toggle/Toggle';
import styles from './SettingsDropdown.module.css';

interface SettingsDropdownProps {
  isLightTheme: boolean;
  onThemeToggle: (isDark: boolean) => void;
  language?: string;
}

const SettingsDropdown = memo(
  ({ isLightTheme, onThemeToggle, language = 'en' }: SettingsDropdownProps) => {
    return (
      <div className={styles.settingsDropdown}>
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h4 className={styles.sectionTitle}>Theme</h4>
          </div>
          <div className={styles.settingItem}>
            <div className={styles.settingContent}>
              <span className={styles.settingLabel}>
                {isLightTheme ? 'Light Mode' : 'Dark Mode'}
              </span>
              <Toggle
                isOn={isLightTheme}
                onToggle={onThemeToggle}
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
  },
);

export default SettingsDropdown;
