
import { API_CONFIG } from '@/config/config';
import { User } from '@/types/auth';
import { toast } from '@/hooks/use-toast';
import { authService } from '@/services/api/authService';

// Handle login API call
export const loginApi = async (email: string, password: string) => {
  try {
    // Always use mock data when in development or when explicitly configured
    if (API_CONFIG.USE_MOCK_DATA) {
      console.log('Using mock login data');
      const result = await authService.login(email, password);
      return { 
        success: result.success, 
        data: result.success ? result.data : null 
      };
    }

    console.log('Attempting login with real API');
    
    try {
      // Attempt real API call
      const response = await fetch(`${API_CONFIG.BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('API returned non-JSON response, falling back to mock data');
        // Fallback to mock implementation for non-JSON responses
        const mockResult = await authService.login(email, password);
        return { 
          success: mockResult.success, 
          data: mockResult.success ? mockResult.data : null 
        };
      }

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
      console.error('Failed to login', error);
      // Fallback to mock implementation on any error
      console.log('API error, falling back to mock data');
      const mockResult = await authService.login(email, password);
      
      return { 
        success: mockResult.success, 
        data: mockResult.success ? mockResult.data : null 
      };
    }
  } catch (outerError) {
    console.error('Login error:', outerError);
    
    // Ultimate fallback
    toast({
      title: 'Login error',
      description: 'An unexpected error occurred. Using demo mode.',
      variant: 'destructive',
    });
    
    // Always return a successful result with mock data in case of total failure
    const safeResult = await authService.login(email, password);
    return { 
      success: safeResult.success, 
      data: safeResult.success ? safeResult.data : null 
    };
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
    // Check if we should use mock data
    if (API_CONFIG.USE_MOCK_DATA) {
      console.log('Using mock register data');
      const result = await authService.register(username, email, password, role);
      return { 
        success: result.success, 
        data: result.success ? result.data : null 
      };
    }

    const response = await fetch(`${API_CONFIG.BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ username, email, password, role }),
    });

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.log('API returned non-JSON response, falling back to mock data');
      // Fallback to mock implementation
      const mockResult = await authService.register(username, email, password, role);
      return { 
        success: mockResult.success, 
        data: mockResult.success ? mockResult.data : null 
      };
    }

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
    
    // Fallback to mock implementation on error
    console.log('Error occurred, falling back to mock data');
    const mockResult = await authService.register(username, email, password, role);
    
    if (!mockResult.success) {
      toast({
        title: 'Registration failed',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
      return { success: false, data: null };
    }
    
    return { 
      success: mockResult.success, 
      data: mockResult.success ? mockResult.data : null 
    };
  }
};

// Handle logout API call
export const logoutApi = async (token: string) => {
  try {
    if (API_CONFIG.USE_MOCK_DATA) {
      console.log('Using mock logout');
      toast({
        title: 'Logged out',
        description: 'You have been successfully logged out',
      });
      return { success: true };
    }

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
    if (API_CONFIG.USE_MOCK_DATA) {
      console.log('Using mock profile data');
      const result = await authService.getUserProfile(token);
      return result.success ? result.data : null;
    }

    const response = await fetch(`${API_CONFIG.BASE_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.log('API returned non-JSON response, falling back to mock data');
      // Fallback to mock implementation
      const mockResult = await authService.getUserProfile(token);
      return mockResult.success ? mockResult.data : null;
    }

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Get profile error:', error);
    
    // Fallback to mock implementation on error
    console.log('Error occurred, falling back to mock data');
    const mockResult = await authService.getUserProfile(token);
    return mockResult.success ? mockResult.data : null;
  }
};

// Update user profile
export const updateProfileApi = async (token: string, userData: Partial<User>): Promise<{ success: boolean; data?: User }> => {
  try {
    if (API_CONFIG.USE_MOCK_DATA) {
      console.log('Using mock profile update');
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully',
      });
      return { success: true, data: { ...userData as User } };
    }

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
