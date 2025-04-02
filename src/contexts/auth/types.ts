
import { User } from '@/types/auth';

export interface AuthContextType {
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
