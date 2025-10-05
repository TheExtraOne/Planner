import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.errorCode}>404</div>

        <h1 className={styles.title}>Oops! Page Not Found</h1>

        <p className={styles.description}>
          The page you're looking for seems to have wandered off into the
          digital void. Don't worry, even the best explorers sometimes take a
          wrong turn!
        </p>

        <div className={styles.actions}>
          <button
            className={styles.homeButton}
            onClick={handleGoHome}
            aria-label='Go to home page'
          >
            🏠 Take Me Home
          </button>

          <button
            className={styles.backButton}
            onClick={handleGoBack}
            aria-label='Go back to previous page'
          >
            ← Go Back
          </button>
        </div>

        <div className={styles.suggestions}>
          <h2 className={styles.suggestionsTitle}>What you can do:</h2>
          <ul className={styles.suggestionsList}>
            <li className={styles.suggestionItem}>Check the URL for typos</li>
            <li className={styles.suggestionItem}>
              Use the navigation menu to find what you need
            </li>
            <li className={styles.suggestionItem}>
              Go back to the previous page
            </li>
            <li className={styles.suggestionItem}>Return to the home page</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
