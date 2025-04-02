
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types/auth';
import { AuthContextType } from './types';
import { isTokenExpired, saveToken, getStoredToken, removeToken } from './tokenUtils';
import { loginApi, registerApi, logoutApi, getProfileApi, updateProfileApi } from './authApi';

// Create the context with undefined initial value
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Initialize auth state from localStorage
  useEffect(() => {
    const storedToken = getStoredToken();
    
    if (storedToken) {
      // Check if token is expired
      if (isTokenExpired(storedToken)) {
        console.log('Token expired, logging out');
        handleLogout();
        setIsLoading(false);
        return;
      }
      
      setToken(storedToken);
      getProfile().then(userData => {
        if (userData) {
          setUser(userData);
        } else {
          // Token is invalid, clear it
          handleLogout();
        }
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  const saveAuthData = (data: { user: User; token: string }) => {
    setUser(data.user);
    setToken(data.token);
    saveToken(data.token);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    removeToken();
  };

  const register = async (
    username: string, 
    email: string, 
    password: string, 
    role: string = 'developer'
  ): Promise<boolean> => {
    const result = await registerApi(username, email, password, role, token);
    
    if (result.success && result.data) {
      // Only save auth data if we're registering the current user
      // For admin creating other users, we don't want to switch to that user
      if (!token) {
        saveAuthData(result.data);
      }
      return true;
    }
    
    return false;
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    const result = await loginApi(email, password);
    
    if (result.success && result.data) {
      saveAuthData(result.data);
      return true;
    }
    
    return false;
  };

  const logout = async (): Promise<void> => {
    if (token) {
      await logoutApi(token);
    }
    
    // Always clean up local state regardless of server response
    handleLogout();
  };

  const getProfile = async (): Promise<User | null> => {
    const storedToken = token || getStoredToken();
    
    if (!storedToken) {
      return null;
    }

    const userData = await getProfileApi(storedToken);
    if (userData) {
      setUser(userData);
    }
    return userData;
  };

  const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
    if (!token) {
      return false;
    }

    const result = await updateProfileApi(token, userData);
    
    if (result.success && result.data) {
      setUser(prevUser => prevUser ? { ...prevUser, ...result.data } : null);
      return true;
    }
    
    return false;
  };

  // Check if user has the required role
  const hasPermission = (requiredRoles: string[]): boolean => {
    if (!user) return false;
    return requiredRoles.includes(user.role);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        getProfile,
        updateProfile,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
