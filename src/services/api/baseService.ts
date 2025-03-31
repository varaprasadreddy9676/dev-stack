
// Base API URL from environment or config
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

// Helper to simulate network delay (for mock implementations)
export const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Helper for common error handling
export const handleApiError = (error: unknown, fallbackMessage: string): never => {
  console.error(fallbackMessage, error);
  throw error instanceof Error ? error : new Error(fallbackMessage);
};
