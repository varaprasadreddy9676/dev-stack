
import { API_BASE_URL } from "../baseService";
import { mockProjects } from "../mockProjects";

export const projectRetrievalService = {
  getProjects: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects`);
      if (!response.ok) {
        console.warn("API call failed, using mock data");
        return mockProjects;
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      console.warn("Using mock data instead");
      return mockProjects;
    }
  },
  
  getProjectById: async (projectId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/${projectId}`);
      if (!response.ok) {
        console.warn("API call failed, using mock data");
        const mockProject = mockProjects.find(p => p._id === projectId);
        if (!mockProject) {
          console.error(`Project with ID ${projectId} not found in mock data`);
          throw new Error("Project not found");
        }
        return mockProject;
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Failed to fetch project ${projectId}:`, error);
      // Try to find in mock data
      const mockProject = mockProjects.find(p => p._id === projectId);
      if (mockProject) return mockProject;
      throw error;
    }
  }
};
