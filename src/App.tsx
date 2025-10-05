import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Routes } from 'src/constants';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import Layout from './components/layout/Layout';
import Loader from './components/loader/Loader';
import { ThemeProvider } from './contexts/ThemeContext';
import { useState, Suspense, lazy } from 'react';

// Lazy load pages (except DASHBOARD, LOGIN, and REGISTER)
const ProjectPage = lazy(() => import('./pages/ProjectPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const NotFound = lazy(() => import('./pages/NotFound'));

/* TODO: 
1. ✅ Add routing
2. ✅ Add pages scaffolding
3. ✅ Add lazy-loading for pages
4. ✅ Theme
5. Add logging
6. Add CI/CD
7. Add deployment
*/
function App() {
  /* TODO: Remove this once authentication is implemented */
  const [isAuthenticated] = useState(true);

  const router = createBrowserRouter([
    {
      path: '/',
      element: isAuthenticated ? (
        <Navigate to={Routes.DASHBOARD} replace />
      ) : (
        <Navigate to={Routes.LOGIN} replace />
      ),
    },
    // Routes for unauthenticated users (outside Layout)
    {
      path: Routes.LOGIN,
      element: isAuthenticated ? (
        <Navigate to={Routes.DASHBOARD} replace />
      ) : (
        <LoginPage />
      ),
    },
    {
      path: Routes.REGISTER,
      element: isAuthenticated ? (
        <Navigate to={Routes.DASHBOARD} replace />
      ) : (
        <RegisterPage />
      ),
    },
    // Routes for authenticated users (inside Layout with Outlet)
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: Routes.DASHBOARD,
          element: <Dashboard />,
        },
        {
          path: Routes.PROJECT,
          element: (
            <Suspense fallback={<Loader />}>
              <ProjectPage />
            </Suspense>
          ),
        },
        {
          path: Routes.PROFILE,
          element: (
            <Suspense fallback={<Loader />}>
              <ProfilePage />
            </Suspense>
          ),
        },
      ],
    },
    // 404 page (outside Layout)
    {
      path: '*',
      element: (
        <Suspense fallback={<Loader />}>
          <NotFound />
        </Suspense>
      ),
    },
  ]);

  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
