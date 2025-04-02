
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User, AuthResponse } from '@/types/auth';
import { toast } from '@/hooks/use-toast';
import { API_CONFIG } from '@/config/config';

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
  hasPermission: (requiredRole: string[]) => boolean;
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
  
  // Initialize auth state from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token');
    if (storedToken) {
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
    localStorage.setItem('auth_token', data.token);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth_token');
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

      saveAuthData(data.data);
      toast({
        title: 'Registration successful',
        description: 'Your account has been created',
      });
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
    const storedToken = token || localStorage.getItem('auth_token');
    
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
