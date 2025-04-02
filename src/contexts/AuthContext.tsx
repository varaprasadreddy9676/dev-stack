
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User, AuthResponse } from '@/types/auth';
import { toast } from '@/hooks/use-toast';
import { API_CONFIG } from '@/config/config';
import { AUTH_CONFIG } from '@/config/config';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string, role: string) => Promise<boolean>;
  logout: () => Promise<void>;
  getProfile: () => Promise<User | null>;
  updateProfile: (userData: Partial<User>) => Promise<boolean>;
  hasPermission: (requiredRoles: string[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check if token is expired
  const isTokenExpired = (token: string): boolean => {
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
  
  // Initialize auth state from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem(AUTH_CONFIG.TOKEN_STORAGE_KEY);
    
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

  const saveAuthData = (data: AuthResponse['data']) => {
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem(AUTH_CONFIG.TOKEN_STORAGE_KEY, data.token);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(AUTH_CONFIG.TOKEN_STORAGE_KEY);
  };

  const register = async (
    username: string, 
    email: string, 
    password: string, 
    role: string = 'developer'
  ): Promise<boolean> => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ username, email, password, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast({
          title: 'Registration failed',
          description: data.message || 'Failed to register',
          variant: 'destructive',
        });
        return false;
      }

      // Only save auth data if we're registering the current user
      // For admin creating other users, we don't want to switch to that user
      if (!token) {
        saveAuthData(data.data);
        toast({
          title: 'Registration successful',
          description: 'Your account has been created',
        });
      } else {
        toast({
          title: 'User created',
          description: `User ${username} has been created successfully`,
        });
      }
      
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: 'Registration failed',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast({
          title: 'Login failed',
          description: data.message || 'Invalid credentials',
          variant: 'destructive',
        });
        return false;
      }

      saveAuthData(data.data);
      toast({
        title: 'Login successful',
        description: `Welcome back, ${data.data.user.username}!`,
      });
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'Login failed',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    if (token) {
      try {
        const response = await fetch(`${API_CONFIG.BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        
        if (response.ok) {
          toast({
            title: 'Logged out',
            description: 'You have been successfully logged out',
          });
        }
      } catch (error) {
        console.error('Logout error:', error);
      }
    }
    
    // Always clean up local state regardless of server response
    handleLogout();
  };

  const getProfile = async (): Promise<User | null> => {
    const storedToken = token || localStorage.getItem(AUTH_CONFIG.TOKEN_STORAGE_KEY);
    
    if (!storedToken) {
      return null;
    }

    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${storedToken}`,
        },
      });

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      setUser(data.data);
      return data.data;
    } catch (error) {
      console.error('Get profile error:', error);
      return null;
    }
  };

  const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
    if (!token) {
      toast({
        title: 'Authentication required',
        description: 'Please log in to update your profile',
        variant: 'destructive',
      });
      return false;
    }

    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast({
          title: 'Update failed',
          description: data.message || 'Failed to update profile',
          variant: 'destructive',
        });
        return false;
      }

      setUser(prevUser => prevUser ? { ...prevUser, ...data.data } : null);
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully',
      });
      return true;
    } catch (error) {
      console.error('Update profile error:', error);
      toast({
        title: 'Update failed',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
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
