
// Mock authentication service
import { User, Role } from '@/types/auth';

const authService = {
  // Login with mock credentials
  login: async (email: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Admin user
    if (email === 'admin@example.com' && password === 'AdminPass123!') {
      return {
        success: true,
        data: {
          user: {
            _id: '1',
            username: 'admin',
            email: 'admin@example.com',
            role: 'admin' as Role,
            createdAt: new Date().toISOString(),
          },
          token: 'mock-admin-token-xyz',
        },
      };
    }
    
    // Content manager user
    if (email === 'content@example.com' && password === 'ContentPass123!') {
      return {
        success: true,
        data: {
          user: {
            _id: '2',
            username: 'contentmanager',
            email: 'content@example.com',
            role: 'content_manager' as Role,
            createdAt: new Date().toISOString(),
          },
          token: 'mock-content-manager-token-xyz',
        },
      };
    }
    
    // Developer user
    if (email === 'dev@example.com' && password === 'DevPass123!') {
      return {
        success: true,
        data: {
          user: {
            _id: '3',
            username: 'developer1',
            email: 'dev@example.com',
            role: 'developer' as Role,
            createdAt: new Date().toISOString(),
          },
          token: 'mock-developer-token-xyz',
        },
      };
    }

    return {
      success: false,
      message: 'Invalid email or password',
    };
  },
  
  // Register a new user (mock implementation)
  register: async (username: string, email: string, password: string, role: string = 'developer') => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Check if the email is already registered (very basic check)
    if (email.endsWith('@example.com')) {
      return {
        success: false,
        message: 'Email already registered',
      };
    }

    // Ensure role is valid
    let validRole: Role = 'developer';
    if (role === 'admin' || role === 'content_manager' || role === 'developer') {
      validRole = role as Role;
    }

    const newUser = {
      _id: Math.random().toString(36).substring(2, 15), // Generate a random ID
      username,
      email,
      role: validRole,
      createdAt: new Date().toISOString(),
    };

    return {
      success: true,
      data: {
        user: newUser,
        token: 'mock-new-user-token-xyz',
      },
    };
  },

  // Get user profile (mock implementation)
  getUserProfile: async (token: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Check if the token is a valid mock token
    if (token === 'mock-admin-token-xyz') {
      return {
        success: true,
        data: {
          _id: '1',
          username: 'admin',
          email: 'admin@example.com',
          role: 'admin' as Role,
          createdAt: new Date().toISOString(),
        },
      };
    }

    if (token === 'mock-content-manager-token-xyz') {
      return {
        success: true,
        data: {
          _id: '2',
          username: 'contentmanager',
          email: 'content@example.com',
          role: 'content_manager' as Role,
          createdAt: new Date().toISOString(),
        },
      };
    }

    if (token === 'mock-developer-token-xyz') {
      return {
        success: true,
        data: {
          _id: '3',
          username: 'developer1',
          email: 'dev@example.com',
          role: 'developer' as Role,
          createdAt: new Date().toISOString(),
        },
      };
    }

    return {
      success: false,
      message: 'Invalid token',
    };
  },
};

export { authService };
