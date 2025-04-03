
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types/auth';
import { AuthContextType } from './types';
import { isTokenExpired, saveToken, getStoredToken, removeToken } from './tokenUtils';
import { loginApi, registerApi, logoutApi, getProfileApi, updateProfileApi } from './authApi';
import { toast } from '@/hooks/use-toast';

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
    const initAuth = async () => {
      try {
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
          const userData = await getProfile();
          if (userData) {
            setUser(userData);
          } else {
            // Token is invalid, clear it
            handleLogout();
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        handleLogout();
      } finally {
        setIsLoading(false);
      }
    };
    
    initAuth();
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
    try {
      const result = await registerApi(username, email, password, role, token);
      
      if (result.success && result.data) {
        // Only save auth data if we're registering the current user
        // For admin creating other users, we don't want to switch to that user
        if (!token) {
          saveAuthData(result.data);
          toast({
            title: 'Registration successful',
            description: 'Your account has been created',
          });
        } else {
          toast({
            title: 'User created',
            description: `${username} has been added successfully`,
          });
        }
        return true;
      } else {
        toast({
          title: 'Registration failed',
          description: 'Could not create the account',
          variant: 'destructive',
        });
        return false;
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: 'Registration error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const result = await loginApi(email, password);
      
      if (result.success && result.data) {
        saveAuthData(result.data);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Login error in AuthProvider:', error);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    if (token) {
      try {
        await logoutApi(token);
        toast({
          title: 'Logged out',
          description: 'You have been successfully logged out',
        });
      } catch (error) {
        console.error('Logout error:', error);
        // Still proceed with local logout even if API call fails
      }
    }
    
    // Always clean up local state regardless of server response
    handleLogout();
  };

  const getProfile = async (): Promise<User | null> => {
    try {
      const storedToken = token || getStoredToken();
      
      if (!storedToken) {
        return null;
      }

      const userData = await getProfileApi(storedToken);
      if (userData) {
        setUser(userData);
      }
      return userData;
    } catch (error) {
      console.error('Get profile error:', error);
      return null;
    }
  };

  const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
    if (!token) {
      return false;
    }

    try {
      const result = await updateProfileApi(token, userData);
      
      if (result.success && result.data) {
        setUser(prevUser => prevUser ? { ...prevUser, ...result.data } : null);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Update profile error:', error);
      return false;
    }
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
