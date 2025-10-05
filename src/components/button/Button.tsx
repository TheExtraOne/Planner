import React from 'react';
import classNames from 'classnames';
import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'ghost',
  className = '',
}) => {
  const getButtonClass = () => {
    return classNames(
      styles.button,
      {
        [styles.primaryButton]: variant === 'primary',
        [styles.secondaryButton]: variant === 'secondary',
        [styles.ghostButton]: variant === 'ghost',
        [styles.iconButton]: variant === 'icon',
      },
      className,
    );
  };

  return (
    <button className={getButtonClass()} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default Button;
