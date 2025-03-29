
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

export const componentService = {
  getComponents: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/components`);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch components:", error);
      throw error;
    }
  },
  
  getComponentById: async (componentId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/components/${componentId}`);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Failed to fetch component ${componentId}:`, error);
      throw error;
    }
  }
};
