
import { ProjectData } from "@/types/project";

// Base API URL from environment or config
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

// Mock project data (fallback for when API is unavailable)
const mockProjects = [
  {
    _id: "proj123",
    name: "Customer Portal",
    description: "Frontend application for customer account management and service requests",
    tags: ["react", "typescript", "customer-facing"],
    updatedAt: "2024-03-10T09:15:00Z",
    createdAt: "2024-02-10T09:15:00Z",
    architecture: {
      description: "Microservices architecture with React frontend",
      diagrams: []
    },
    structure: {
      description: "Feature-based organization with shared components",
      folders: [
        {
          path: "/src/features",
          purpose: "Feature-specific components and logic"
        },
        {
          path: "/src/shared",
          purpose: "Cross-feature shared components and utilities"
        }
      ]
    },
    customFrameworks: [],
    modules: [],
    guidelines: {
      content: "Follow these guidelines when contributing...",
      lastUpdated: "2024-03-01T10:30:00Z",
      updatedBy: "Admin"  // Added missing updatedBy field
    },
    components: [],
    resources: [],
    team: []
  },
  {
    _id: "proj456",
    name: "Admin Dashboard",
    description: "Internal tool for system administration",
    tags: ["react", "redux", "internal"],
    updatedAt: "2024-03-05T14:30:00Z",
    createdAt: "2024-02-05T14:30:00Z",
    architecture: {
      description: "Single-page application architecture",
      diagrams: []
    },
    structure: {
      description: "Feature-based organization",
      folders: []
    },
    customFrameworks: [],
    modules: [],
    guidelines: {
      content: "Admin dashboard guidelines...",
      lastUpdated: "2024-03-01T10:30:00Z"
    },
    components: [],
    resources: [],
    team: []
  }
];

export const projectService = {
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
        const newProject: ProjectData = {
          _id: `proj-${Date.now()}`,
          ...projectData,
          createdAt: now,
          updatedAt: now,
          architecture: {
            description: "",
            diagrams: []
          },
          structure: {
            description: "",
            folders: []
          },
          customFrameworks: [],
          modules: [],
          guidelines: {
            content: "",
            lastUpdated: new Date(),
            updatedBy: "System"
          },
          components: [],
          resources: []
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
      const newProject: ProjectData = {
        _id: `proj-${Date.now()}`,
        ...projectData,
        createdAt: now,
        updatedAt: now,
        architecture: {
          description: "",
          diagrams: []
        },
        structure: {
          description: "",
          folders: []
        },
        customFrameworks: [],
        modules: [],
        guidelines: {
          content: "",
          lastUpdated: new Date(),
          updatedBy: "System"
        },
        components: [],
        resources: []
      };
      // Add to mock projects
      mockProjects.push(newProject);
      return newProject;
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
          updatedAt: new Date().toISOString()
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
        updatedAt: new Date().toISOString()
      };
      
      mockProjects[projectIndex] = updatedProject;
      return updatedProject;
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
