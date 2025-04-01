
import { API_CONFIG } from "@/config/config";

// Base API URL from centralized config
export const API_BASE_URL = API_CONFIG.BASE_URL;

// Helper to simulate network delay (for mock implementations)
export const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Helper for common error handling
export const handleApiError = (error: unknown, fallbackMessage: string): never => {
  console.error(fallbackMessage, error);
  throw error instanceof Error ? error : new Error(fallbackMessage);
};

// Helper to determine if mock data should be used
export const shouldUseMockData = () => API_CONFIG.USE_MOCK_DATA;
