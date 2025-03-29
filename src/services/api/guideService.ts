
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

export const guideService = {
  getGuides: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/guides`);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch guides:", error);
      throw error;
    }
  },
  
  getGuideById: async (guideId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/guides/${guideId}`);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Failed to fetch guide ${guideId}:`, error);
      throw error;
    }
  }
};
