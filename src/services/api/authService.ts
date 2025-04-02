import { API_BASE_URL, handleApiError, delay, shouldUseMockData } from './baseService';
import { 
  User, 
  AuthResponse, 
  UserProfileResponse,
  AuthError
} from '@/types/auth';

// Registration endpoint
export const register = async (
  username: string,
  email: string,
  password: string,
  role: string = 'developer'
): Promise<AuthResponse> => {
  try {
    if (shouldUseMockData()) {
      await delay();
      return mockRegister(username, email, role);
    }

    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password, role }),
    });

    const data = await response.json();
    if (!response.ok) throw data;
    return data;
  } catch (error) {
    const errorResponse = handleApiError(error, 'Failed to register user') as AuthError;
    return {
      ...errorResponse,
      data: { 
        user: {} as User, 
        token: '' 
      }
    } as AuthResponse;
  }
};

// Login endpoint
export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    if (shouldUseMockData()) {
      await delay();
      return mockLogin(email);
    }

    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) throw data;
    return data;
  } catch (error) {
    const errorResponse = handleApiError(error, 'Failed to login') as AuthError;
    return {
      ...errorResponse,
      data: { 
        user: {} as User, 
        token: '' 
      }
    } as AuthResponse;
  }
};

// Logout endpoint
export const logout = async (token: string): Promise<{ success: boolean; message: string }> => {
  try {
    if (shouldUseMockData()) {
      await delay();
      return { success: true, message: 'Logged out successfully' };
    }

    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
    });

    const data = await response.json();
    if (!response.ok) throw data;
    return data;
  } catch (error) {
    return handleApiError(error, 'Failed to logout') as AuthError;
  }
};

// Get user profile
export const getUserProfile = async (token: string): Promise<UserProfileResponse> => {
  try {
    if (shouldUseMockData()) {
      await delay();
      return mockGetProfile();
    }

    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });

    const data = await response.json();
    if (!response.ok) throw data;
    return data;
  } catch (error) {
    const errorResponse = handleApiError(error, 'Failed to fetch user profile') as AuthError;
    return {
      ...errorResponse,
      data: {} as User
    } as UserProfileResponse;
  }
};

// Mock implementations for development
const mockRegister = (username: string, email: string, role: string): AuthResponse => {
  const mockUserId = Math.random().toString(36).substring(2, 15);
  const mockToken = `mock_token_${mockUserId}`;
  
  return {
    success: true,
    message: 'User registered successfully',
    data: {
      user: {
        _id: mockUserId,
        username,
        email,
        role: role as 'admin' | 'content_manager' | 'developer',
        favorites: {
          languages: [],
          projects: [],
          components: [],
          guides: []
        }
      },
      token: mockToken
    }
  };
};

const mockLogin = (email: string): AuthResponse => {
  const mockUserId = Math.random().toString(36).substring(2, 15);
  const mockToken = `mock_token_${mockUserId}`;
  
  // Extract username from email
  const username = email.split('@')[0];
  
  return {
    success: true,
    message: 'Login successful',
    data: {
      user: {
        _id: mockUserId,
        username,
        email,
        role: 'developer',
        favorites: {
          languages: [],
          projects: [],
          components: [],
          guides: []
        }
      },
      token: mockToken
    }
  };
};

const mockGetProfile = (): UserProfileResponse => {
  const mockUserId = Math.random().toString(36).substring(2, 15);
  
  return {
    success: true,
    message: 'User profile retrieved',
    data: {
      _id: mockUserId,
      username: 'mockuser',
      email: 'mock@example.com',
      role: 'developer',
      projects: [],
      favorites: {
        languages: [],
        projects: [],
        components: [],
        guides: []
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  };
};

export const authService = {
  register,
  login,
  logout,
  getUserProfile
};
