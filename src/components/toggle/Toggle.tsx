import { Sun, Moon } from 'lucide-react';
import classNames from 'classnames';
import styles from './Toggle.module.css';

interface ToggleProps {
  isOn: boolean;
  onToggle: (isOn: boolean) => void;
  label?: string;
  variant?: 'default' | 'theme';
  className?: string;
}

const Toggle = ({
  isOn,
  onToggle,
  label,
  variant = 'default',
  className,
}: ToggleProps) => {
  const handleToggle = () => {
    onToggle(!isOn);
  };

  const getToggleContent = () => {
    if (variant === 'theme') {
      return isOn ? <Sun size={16} /> : <Moon size={16} />;
    }
    return null;
  };

  return (
    <div className={classNames(styles.toggleContainer, className)}>
      {label && <span className={styles.toggleLabel}>{label}</span>}
      <button
        className={classNames(styles.toggle, {
          [styles.toggleOn]: isOn,
          [styles.toggleOff]: !isOn,
          [styles.themeToggle]: variant === 'theme',
        })}
        onClick={handleToggle}
        type='button'
        role='switch'
        aria-checked={isOn}
        aria-label={label || 'Toggle'}
      >
        <span className={styles.toggleThumb}>
          {variant === 'theme' && getToggleContent()}
        </span>
      </button>
    </div>
  );
};

export default Toggle;
