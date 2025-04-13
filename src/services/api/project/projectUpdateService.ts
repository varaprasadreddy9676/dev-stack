
import { ProjectData } from "@/types/project";
import { API_BASE_URL } from "../baseService";
import { mockProjects } from "../mockProjects";

export const projectUpdateService = {
  updateProject: async (projectId: string, updatedData: Partial<ProjectData>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      
      if (!response.ok) {
        console.warn("API call failed, using mock data");
        // For mock updates, let's find the project and update it
        const projectIndex = mockProjects.findIndex(p => p._id === projectId);
        if (projectIndex === -1) {
          throw new Error("Project not found");
        }
        
        const updatedProject = {
          ...mockProjects[projectIndex],
          ...updatedData,
          updatedAt: new Date().toISOString(),
          // Ensure required fields are present
          team: updatedData.team || mockProjects[projectIndex].team || [],
          troubleshooting: updatedData.troubleshooting || mockProjects[projectIndex].troubleshooting || []
        };
        
        mockProjects[projectIndex] = updatedProject;
        return updatedProject;
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Failed to update project ${projectId}:`, error);
      
      // For mock updates, let's find the project and update it
      const projectIndex = mockProjects.findIndex(p => p._id === projectId);
      if (projectIndex === -1) {
        throw new Error("Project not found");
      }
      
      const updatedProject = {
        ...mockProjects[projectIndex],
        ...updatedData,
        updatedAt: new Date().toISOString(),
        // Ensure required fields are present
        team: updatedData.team || mockProjects[projectIndex].team || [],
        troubleshooting: updatedData.troubleshooting || mockProjects[projectIndex].troubleshooting || []
      };
      
      mockProjects[projectIndex] = updatedProject;
      return updatedProject;
    }
  }
};
