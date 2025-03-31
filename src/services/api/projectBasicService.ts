
import { ProjectData } from "@/types/project";
import { API_BASE_URL, handleApiError } from "./baseService";
import { mockProjects } from "./mockProjects";

export const projectBasicService = {
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
  },
  
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
  },
  
  createProject: async (projectData: Omit<ProjectData, "_id" | "createdAt" | "updatedAt">) => {
    try {
      console.log("Creating new project with data:", projectData);
      const response = await fetch(`${API_BASE_URL}/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });
      
      if (!response.ok) {
        console.warn("API call failed, creating mock project");
        // Fix: Ensure createdAt and updatedAt are strings
        const now = new Date().toISOString();
        const newProject = {
          _id: `proj-${Date.now()}`,
          ...projectData,
          createdAt: now,
          updatedAt: now,
          architecture: projectData.architecture || {
            description: "",
            diagrams: []
          },
          structure: projectData.structure || {
            description: "",
            folders: []
          },
          customFrameworks: projectData.customFrameworks || [],
          modules: projectData.modules || [],
          guidelines: projectData.guidelines || {
            content: "",
            lastUpdated: now,
            updatedBy: "System"
          },
          components: projectData.components || [],
          resources: projectData.resources || [],
          team: projectData.team || [], // Ensure team is always present
          troubleshooting: projectData.troubleshooting || []
        };
        // Add to mock projects
        mockProjects.push(newProject);
        return newProject;
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to create project:", error);
      // Fix: Ensure createdAt and updatedAt are strings
      const now = new Date().toISOString();
      const newProject = {
          _id: `proj-${Date.now()}`,
          ...projectData,
          createdAt: now,
          updatedAt: now,
          architecture: projectData.architecture || {
            description: "",
            diagrams: []
          },
          structure: projectData.structure || {
            description: "",
            folders: []
          },
          customFrameworks: projectData.customFrameworks || [],
          modules: projectData.modules || [],
          guidelines: projectData.guidelines || {
            content: "",
            lastUpdated: now,
            updatedBy: "System"
          },
          components: projectData.components || [],
          resources: projectData.resources || [],
          team: projectData.team || [], // Ensure team is always present
          troubleshooting: projectData.troubleshooting || []
      };
      // Add to mock projects
      mockProjects.push(newProject);
      return newProject;
    }
  },
  
  deleteProject: async (projectId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Failed to delete project ${projectId}:`, error);
      throw error;
    }
  }
};
