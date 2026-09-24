import { loginAdminApi } from './api';

export const ADMIN_EMAIL = 'admin@nexora.com';
export const ADMIN_PASSWORD = 'admin123';
export const ADMIN_SESSION_KEY = 'nexora_admin_logged_in';

export const isAdminAuthenticated = () => {
  if (typeof window === 'undefined') return false;
  return !!window.localStorage.getItem('nexora_admin_token') || window.localStorage.getItem(ADMIN_SESSION_KEY) === 'true';
};

export const loginAdmin = async (email: string, password: string) => {
  if (typeof window === 'undefined') return false;

  try {
    await loginAdminApi(email, password);
    window.localStorage.setItem(ADMIN_SESSION_KEY, 'true');
    return true;
  } catch (error) {
    return false;
  }
};

export const logoutAdmin = () => {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(ADMIN_SESSION_KEY);
  window.localStorage.removeItem('nexora_admin_token');
};
