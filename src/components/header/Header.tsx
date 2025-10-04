import { Settings } from 'lucide-react';
import Button from 'src/components/button/Button.tsx';
import Navigation from 'src/components/navigation/Navigation.tsx';
import styles from './Header.module.css';

/*
TODO:
1. ✅ Add logo
2. ✅ Add normal style for navigation links
3. Extract settings to a separate component
4. Add responsive (hook)
*/
const Header = () => {
  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log('Logout clicked');
  };

  const handleSettings = () => {
    // TODO: Implement settings logic
    console.log('Settings clicked');
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.navLeft}>
          <div className={styles.logoContainer}>
            <img
              src='/taskflow-logo.svg'
              alt='TaskFlow'
              className={styles.logo}
            />
          </div>
          <Navigation />
        </div>

        <div className={styles.navRight}>
          <Button onClick={handleSettings} variant='icon'>
            <Settings size={16} />
          </Button>
          <Button onClick={handleLogout} variant='primary'>
            Logout
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
