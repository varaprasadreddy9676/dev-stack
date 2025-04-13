
import { TroubleshootingIssue } from "@/types/troubleshooting";
import { API_BASE_URL } from "../baseService";
import { mockProjects } from "../mockProjects";

export const getTroubleshootingIssues = async (projectId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}/troubleshooting`);
    
    if (!response.ok) {
      console.warn("API call failed, using mock data");
      const mockProject = mockProjects.find(p => p._id === projectId);
      if (!mockProject) {
        throw new Error("Project not found");
      }
      return mockProject.troubleshooting || [];
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch troubleshooting issues for project ${projectId}:`, error);
    
    // Try to find in mock data
    const mockProject = mockProjects.find(p => p._id === projectId);
    if (mockProject) return mockProject.troubleshooting || [];
    
    return [];
  }
};
