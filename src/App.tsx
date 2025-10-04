import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Routes } from 'src/constants';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import ProjectPage from './pages/ProjectPage';
import ProfilePage from './pages/ProfilePage';
import NotFound from './pages/NotFound';
import Layout from './components/Layout';
import { useState } from 'react';

/* TODO: 
1. ✅ Add routing
2. Add pages scaffolding
3. Add lazy-loading for pages
4. Theme
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
          element: <ProjectPage />,
        },
        {
          path: Routes.PROFILE,
          element: <ProfilePage />,
        },
      ],
    },
    // 404 page (outside Layout)
    {
      path: '*',
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
