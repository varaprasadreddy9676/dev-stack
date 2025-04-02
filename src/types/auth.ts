
export interface User {
  _id: string;
  username: string;
  email: string;
  role: 'admin' | 'content_manager' | 'developer';
  projects?: string[];
  favorites?: {
    languages: string[];
    projects: string[];
    components: string[];
    guides: string[];
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface UserProfileResponse {
  success: boolean;
  message: string;
  data: User;
}

export interface AuthError {
  success: false;
  message: string;
  error?: string | Record<string, string[]>;
}

export type Role = 'admin' | 'content_manager' | 'developer';
