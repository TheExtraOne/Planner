import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { useState, Suspense, lazy } from 'react';
import { Routes } from 'src/constants';
import LoginPage from 'src/pages/LoginPage.tsx';
import RegisterPage from 'src/pages/RegisterPage.tsx';
import Dashboard from 'src/pages/DashboardPage/Dashboard';
import Layout from 'src/components/layout/Layout.tsx';
import Loader from 'src/components/loader/Loader.tsx';
import { useThemeEffect } from 'src/hooks/useThemeEffect.ts';

// Lazy load pages (except DASHBOARD, LOGIN, and REGISTER)
const CategoriesPage = lazy(
  () => import('src/pages/CategoriesPage/CategoriesPage'),
);
const ProfilePage = lazy(() => import('src/pages/ProfilePage.tsx'));
const NotFound = lazy(() => import('src/pages/NotFoundPage/NotFound'));

function App() {
  /* TODO: Remove this once authentication is implemented */
  const [isAuthenticated] = useState(true);

  // Apply theme class to HTML element
  useThemeEffect();

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
          path: Routes.CATEGORIES,
          element: (
            <Suspense fallback={<Loader />}>
              <CategoriesPage />
            </Suspense>
          ),
        },
        {
          path: Routes.CATEGORIES,
          element: (
            <Suspense fallback={<Loader />}>
              <CategoriesPage />
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

  return <RouterProvider router={router} />;
}

export default App;
