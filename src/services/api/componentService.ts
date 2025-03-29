
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
  },
  
  createComponent: async (componentData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/components`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(componentData),
      });
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to create component:", error);
      throw error;
    }
  },
  
  updateComponent: async (componentId: string, componentData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/components/${componentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(componentData),
      });
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Failed to update component ${componentId}:`, error);
      throw error;
    }
  },
  
  deleteComponent: async (componentId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/components/${componentId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      return true;
    } catch (error) {
      console.error(`Failed to delete component ${componentId}:`, error);
      throw error;
    }
  }
};
