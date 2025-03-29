
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

export const languageService = {
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
  }
};
