
import { API_CONFIG } from '@/config/config';
import { User } from '@/types/auth';
import { toast } from '@/hooks/use-toast';

// Handle login API call
export const loginApi = async (email: string, password: string) => {
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
      return { success: false, data: null };
    }

    return { success: true, data: data.data };
  } catch (error) {
    console.error('Login error:', error);
    toast({
      title: 'Login failed',
      description: 'An unexpected error occurred',
      variant: 'destructive',
    });
    return { success: false, data: null };
  }
};

// Handle registration API call
export const registerApi = async (
  username: string,
  email: string,
  password: string,
  role: string = 'developer',
  token?: string
) => {
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
      return { success: false, data: null };
    }

    return { success: true, data: data.data };
  } catch (error) {
    console.error('Registration error:', error);
    toast({
      title: 'Registration failed',
      description: 'An unexpected error occurred',
      variant: 'destructive',
    });
    return { success: false, data: null };
  }
};

// Handle logout API call
export const logoutApi = async (token: string) => {
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
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    return { success: false };
  }
};

// Get user profile
export const getProfileApi = async (token: string): Promise<User | null> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Get profile error:', error);
    return null;
  }
};

// Update user profile
export const updateProfileApi = async (token: string, userData: Partial<User>): Promise<{ success: boolean; data?: User }> => {
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
      return { success: false };
    }

    toast({
      title: 'Profile updated',
      description: 'Your profile has been updated successfully',
    });
    
    return { success: true, data: data.data };
  } catch (error) {
    console.error('Update profile error:', error);
    toast({
      title: 'Update failed',
      description: 'An unexpected error occurred',
      variant: 'destructive',
    });
    return { success: false };
  }
};
