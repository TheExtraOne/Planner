import React from 'react';
import classNames from 'classnames';
import styles from './Loader.module.css';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({
  size = 'medium',
  message = 'Loading...',
}) => {
  return (
    <div className={styles.loaderContainer}>
      <div className={classNames(styles.spinner, styles[size])}></div>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default Loader;
