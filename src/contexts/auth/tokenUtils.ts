
import { AUTH_CONFIG } from '@/config/config';

// Check if token is expired
export const isTokenExpired = (token: string): boolean => {
  try {
    // Basic JWT token structure check
    const base64Url = token.split('.')[1];
    if (!base64Url) return true;
    
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(
      decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      )
    );
    
    if (!payload.exp) return false;
    const expirationTime = payload.exp * 1000; // Convert to milliseconds
    return Date.now() >= expirationTime;
  } catch (error) {
    console.error('Error checking token expiration:', error);
    return true; // Consider invalid tokens as expired
  }
};

// Save token to localStorage
export const saveToken = (token: string): void => {
  localStorage.setItem(AUTH_CONFIG.TOKEN_STORAGE_KEY, token);
};

// Get token from localStorage
export const getStoredToken = (): string | null => {
  return localStorage.getItem(AUTH_CONFIG.TOKEN_STORAGE_KEY);
};

// Remove token from localStorage
export const removeToken = (): void => {
  localStorage.removeItem(AUTH_CONFIG.TOKEN_STORAGE_KEY);
};
