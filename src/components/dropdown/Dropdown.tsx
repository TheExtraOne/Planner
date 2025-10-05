import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import classNames from 'classnames';
import styles from './Dropdown.module.css';

interface DropdownProps {
  trigger: ReactNode;
  children: ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  position?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';
  className?: string;
}

const Dropdown = ({
  trigger,
  children,
  isOpen,
  onToggle,
  onClose,
  position = 'bottomRight',
  className,
}: DropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classNames(styles.dropdownContainer, className)}>
      <div
        ref={triggerRef}
        className={styles.trigger}
        onClick={onToggle}
        role='button'
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggle();
          }
        }}
        aria-expanded={isOpen}
        aria-haspopup='true'
      >
        {trigger}
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className={classNames(styles.dropdown, styles[position])}
          role='menu'
          aria-orientation='vertical'
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
