
import { API_BASE_URL, handleApiError, shouldUseMockData } from "./baseService";
import { mockLanguages } from "../mock/mockData";

export const guidelinesService = {
  getLanguages: async () => {
    try {
      // Check if we should use mock data
      if (shouldUseMockData()) {
        return mockLanguages;
      }
      
      const response = await fetch(`${API_BASE_URL}/languages`);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch languages:", error);
      // If API fails, fall back to mock data in production for a better user experience
      return mockLanguages;
    }
  },
  
  getLanguageById: async (languageId: string) => {
    try {
      // Check if we should use mock data
      if (shouldUseMockData()) {
        const language = mockLanguages.find(lang => lang.id === languageId);
        if (!language) {
          throw new Error(`Language with ID ${languageId} not found`);
        }
        return language;
      }
      
      const response = await fetch(`${API_BASE_URL}/languages/${languageId}`);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Failed to fetch language ${languageId}:`, error);
      // If API fails, try to find the language in mock data as fallback
      const language = mockLanguages.find(lang => lang.id === languageId);
      if (language) {
        return language;
      }
      throw error;
    }
  },
  
  createLanguage: async (languageData) => {
    try {
      if (shouldUseMockData()) {
        // Simulate successful creation with mock data
        return { ...languageData, id: `lang-${Date.now()}` };
      }
      
      const response = await fetch(`${API_BASE_URL}/languages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(languageData),
      });
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to create language:", error);
      throw error;
    }
  },
  
  updateLanguage: async (languageId: string, languageData) => {
    try {
      if (shouldUseMockData()) {
        // Simulate successful update with mock data
        return { ...languageData, id: languageId };
      }
      
      const response = await fetch(`${API_BASE_URL}/languages/${languageId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(languageData),
      });
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Failed to update language ${languageId}:`, error);
      throw error;
    }
  }
};
