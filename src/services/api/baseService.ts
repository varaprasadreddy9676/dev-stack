
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

// Export a baseService object with common HTTP methods
export const baseService = {
  get: async (url: string, options = {}) => {
    try {
      // This is a mock implementation
      // In a real app, this would use fetch or axios
      console.log(`GET request to ${url}`, options);
      await delay();
      return { data: { success: true, data: {} } };
    } catch (error) {
      return handleApiError(error, `Error fetching data from ${url}`);
    }
  },
  
  post: async (url: string, data: any, options = {}) => {
    try {
      console.log(`POST request to ${url}`, data, options);
      await delay();
      return { data: { success: true, data } };
    } catch (error) {
      return handleApiError(error, `Error posting data to ${url}`);
    }
  },
  
  put: async (url: string, data: any, options = {}) => {
    try {
      console.log(`PUT request to ${url}`, data, options);
      await delay();
      return { data: { success: true, data } };
    } catch (error) {
      return handleApiError(error, `Error updating data at ${url}`);
    }
  },
  
  delete: async (url: string, options = {}) => {
    try {
      console.log(`DELETE request to ${url}`, options);
      await delay();
      return { data: { success: true, message: "Resource deleted successfully" } };
    } catch (error) {
      return handleApiError(error, `Error deleting resource at ${url}`);
    }
  }
};
