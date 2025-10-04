import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';

const Layout = () => {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <h2 className={styles.title}>Planner App</h2>
          {/* TODO: Add navigation items */}
        </nav>
      </header>

      <main className={styles.mainContent}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <p className={styles.footerText}>
          &copy; 2025 Planner App. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Layout;
