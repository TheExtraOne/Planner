import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Routes } from 'src/constants.ts';
import styles from './Navigation.module.css';

const Navigation = () => {
  return (
    <div className={styles.navLinks}>
      <NavLink
        to={Routes.DASHBOARD}
        className={({ isActive }) =>
          classNames(styles.navLink, {
            [styles.navLinkActive]: isActive,
          })
        }
      >
        Dashboard
      </NavLink>
      <NavLink
        to={Routes.PROFILE}
        className={({ isActive }) =>
          classNames(styles.navLink, {
            [styles.navLinkActive]: isActive,
          })
        }
      >
        My Profile
      </NavLink>
    </div>
  );
};

export default Navigation;
