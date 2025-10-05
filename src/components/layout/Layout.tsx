import { Outlet } from 'react-router-dom';
import Header from 'src/components/header/Header.tsx';
import styles from './Layout.module.css';

const Layout = () => {
  return (
    <div className={styles.layout}>
      <Header />

      <main className={styles.mainContent}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <p className={styles.footerText}>
          &copy; 2025 TaskFlow. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Layout;
