
import { ProjectData } from "@/types/project";
import { TroubleshootingIssue } from "@/types/troubleshooting";

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
      updatedBy: "Admin"
    },
    components: [],
    resources: [],
    team: [],
    troubleshooting: [
      {
        id: "issue1",
        issue: "API Connection Error",
        description: "Users are experiencing API connection errors when submitting forms",
        symptoms: ["Form submission fails", "Console shows 403 error", "User gets error toast"],
        solutions: [
          {
            steps: "Verify API credentials in configuration",
            code: "// Check if API keys are correctly set\nconst apiKey = config.API_KEY;\nconsole.log('Using API key:', apiKey);",
            resources: [
              {
                title: "API Documentation",
                type: "link",
                url: "https://api-docs.example.com"
              }
            ]
          }
        ],
        relatedIssues: [],
        tags: ["api", "forms", "configuration"],
        lastUpdated: "2024-03-15T14:30:00Z",
        updatedBy: "user123"
      }
    ]
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
      lastUpdated: "2024-03-01T10:30:00Z",
      updatedBy: "Admin"
    },
    components: [],
    resources: [],
    team: [],
    troubleshooting: []
  },
  {
    _id: "proj101",
    name: "Test Project",
    description: "Test project for troubleshooting",
    tags: ["test", "demo"],
    updatedAt: "2024-04-01T09:15:00Z",
    createdAt: "2024-03-15T09:15:00Z",
    architecture: {
      description: "Test architecture",
      diagrams: []
    },
    structure: {
      description: "Test structure",
      folders: []
    },
    customFrameworks: [],
    modules: [],
    guidelines: {
      content: "Test guidelines",
      lastUpdated: "2024-03-20T10:30:00Z",
      updatedBy: "Admin"
    },
    components: [],
    resources: [],
    team: [],
    troubleshooting: [
      {
        id: "issue-test1",
        issue: "Test Issue 1",
        description: "This is a test troubleshooting issue",
        symptoms: ["Symptom 1", "Symptom 2"],
        solutions: [
          {
            steps: "These are the steps to fix the issue",
            code: "// Sample code\nconsole.log('Testing');"
          }
        ],
        relatedIssues: [],
        tags: ["test", "demo"],
        lastUpdated: "2024-04-01T10:00:00Z",
        updatedBy: "tester"
      }
    ]
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
        const newProject = {
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
            lastUpdated: now,
            updatedBy: "System"
          },
          components: [],
          resources: [],
          team: [],
          troubleshooting: []
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
          lastUpdated: now,
          updatedBy: "System"
        },
        components: [],
        resources: [],
        team: [],
        troubleshooting: []
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
  },
  
  getTroubleshootingIssues: async (projectId: string) => {
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
  },
  
  createTroubleshootingIssue: async (projectId: string, issueData: Omit<TroubleshootingIssue, "id" | "lastUpdated">) => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/${projectId}/troubleshooting`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(issueData),
      });
      
      if (!response.ok) {
        console.warn("API call failed, using mock data");
        // Create a mock issue
        const newIssue: TroubleshootingIssue = {
          id: `issue-${Date.now()}`,
          ...issueData,
          lastUpdated: new Date().toISOString(),
        };
        
        // Add to mock project
        const projectIndex = mockProjects.findIndex(p => p._id === projectId);
        if (projectIndex !== -1) {
          if (!mockProjects[projectIndex].troubleshooting) {
            mockProjects[projectIndex].troubleshooting = [];
          }
          mockProjects[projectIndex].troubleshooting.push(newIssue);
        }
        
        return newIssue;
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Failed to create troubleshooting issue for project ${projectId}:`, error);
      
      // Create a mock issue
      const newIssue: TroubleshootingIssue = {
        id: `issue-${Date.now()}`,
        ...issueData,
        lastUpdated: new Date().toISOString(),
      };
      
      // Add to mock project
      const projectIndex = mockProjects.findIndex(p => p._id === projectId);
      if (projectIndex !== -1) {
        if (!mockProjects[projectIndex].troubleshooting) {
          mockProjects[projectIndex].troubleshooting = [];
        }
        mockProjects[projectIndex].troubleshooting.push(newIssue);
      }
      
      return newIssue;
    }
  },
  
  updateTroubleshootingIssue: async (projectId: string, issueId: string, updatedData: Partial<TroubleshootingIssue>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/${projectId}/troubleshooting/${issueId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      
      if (!response.ok) {
        console.warn("API call failed, using mock data");
        
        // For mock updates, find the project and update the issue
        const projectIndex = mockProjects.findIndex(p => p._id === projectId);
        if (projectIndex === -1 || !mockProjects[projectIndex].troubleshooting) {
          throw new Error("Project or issue not found");
        }
        
        const issueIndex = mockProjects[projectIndex].troubleshooting.findIndex(i => i.id === issueId);
        if (issueIndex === -1) {
          throw new Error("Issue not found");
        }
        
        const updatedIssue = {
          ...mockProjects[projectIndex].troubleshooting[issueIndex],
          ...updatedData,
          lastUpdated: new Date().toISOString()
        };
        
        mockProjects[projectIndex].troubleshooting[issueIndex] = updatedIssue;
        return updatedIssue;
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Failed to update troubleshooting issue ${issueId} for project ${projectId}:`, error);
      
      // For mock updates, find the project and update the issue
      const projectIndex = mockProjects.findIndex(p => p._id === projectId);
      if (projectIndex === -1 || !mockProjects[projectIndex].troubleshooting) {
        throw new Error("Project or issue not found");
      }
      
      const issueIndex = mockProjects[projectIndex].troubleshooting.findIndex(i => i.id === issueId);
      if (issueIndex === -1) {
        throw new Error("Issue not found");
      }
      
      const updatedIssue = {
        ...mockProjects[projectIndex].troubleshooting[issueIndex],
        ...updatedData,
        lastUpdated: new Date().toISOString()
      };
      
      mockProjects[projectIndex].troubleshooting[issueIndex] = updatedIssue;
      return updatedIssue;
    }
  },
  
  deleteTroubleshootingIssue: async (projectId: string, issueId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/${projectId}/troubleshooting/${issueId}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        console.warn("API call failed, using mock data");
        
        // For mock deletion, find the project and remove the issue
        const projectIndex = mockProjects.findIndex(p => p._id === projectId);
        if (projectIndex === -1 || !mockProjects[projectIndex].troubleshooting) {
          throw new Error("Project or issue not found");
        }
        
        const issueIndex = mockProjects[projectIndex].troubleshooting.findIndex(i => i.id === issueId);
        if (issueIndex === -1) {
          throw new Error("Issue not found");
        }
        
        mockProjects[projectIndex].troubleshooting.splice(issueIndex, 1);
        return { success: true };
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Failed to delete troubleshooting issue ${issueId} for project ${projectId}:`, error);
      
      // For mock deletion, find the project and remove the issue
      const projectIndex = mockProjects.findIndex(p => p._id === projectId);
      if (projectIndex === -1 || !mockProjects[projectIndex].troubleshooting) {
        throw new Error("Project or issue not found");
      }
      
      const issueIndex = mockProjects[projectIndex].troubleshooting.findIndex(i => i.id === issueId);
      if (issueIndex === -1) {
        throw new Error("Issue not found");
      }
      
      mockProjects[projectIndex].troubleshooting.splice(issueIndex, 1);
      return { success: true };
    }
  }
};
