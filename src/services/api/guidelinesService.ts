
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

export const guidelinesService = {
  getLanguages: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/languages`);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch languages:", error);
      throw error;
    }
  },
  
  getLanguageById: async (languageId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/languages/${languageId}`);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Failed to fetch language ${languageId}:`, error);
      throw error;
    }
  },
  
  createLanguage: async (languageData) => {
    try {
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
