import HomePage from './pages/HomePage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminStudentsPage from './pages/admin/AdminStudentsPage';
import AdminCertificatesPage from './pages/admin/AdminCertificatesPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import AdminLayout from './components/admin/AdminLayout';
import type { ReactNode } from 'react';

export interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
  public?: boolean;
}

export const routes: RouteConfig[] = [
  {
    name: 'Nexora Master Class',
    path: '/',
    element: <HomePage />,
    public: true,
  },
  {
    name: 'Admin Login',
    path: '/admin/login',
    element: <AdminLoginPage />,
    public: true,
  },
  {
    name: 'Admin Dashboard',
    path: '/admin/dashboard',
    element: (
      <AdminLayout>
        <AdminDashboardPage />
      </AdminLayout>
    ),
    public: true,
  },
  {
    name: 'Admin Students',
    path: '/admin/students',
    element: (
      <AdminLayout>
        <AdminStudentsPage />
      </AdminLayout>
    ),
    public: true,
  },
  {
    name: 'Admin Certificates',
    path: '/admin/certificates',
    element: (
      <AdminLayout>
        <AdminCertificatesPage />
      </AdminLayout>
    ),
    public: true,
  },
  {
    name: 'Admin Settings',
    path: '/admin/settings',
    element: (
      <AdminLayout>
        <AdminSettingsPage />
      </AdminLayout>
    ),
    public: true,
  },
];
