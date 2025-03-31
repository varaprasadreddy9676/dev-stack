
import { 
  mockLanguages, 
  mockComponents, 
  mockGuides 
} from "./mockData";
import { ProjectData } from "@/types/project";
import { TroubleshootingIssue, Solution } from "@/types/troubleshooting";
import { mockProjects } from "../api/mockProjects";

// Helper to simulate network delay
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to simulate random errors (for testing error handling)
const simulateError = (errorRate: number = 0.1): boolean => {
  return Math.random() < errorRate;
};

export const mockProjectService = {
  getProjects: async () => {
    await delay();
    if (simulateError()) {
      throw new Error("Failed to fetch projects");
    }
    return [...mockProjects];
  },
  
  getProjectById: async (projectId: string) => {
    await delay();
    if (simulateError()) {
      throw new Error("Failed to fetch project");
    }
    const project = mockProjects.find(p => p._id === projectId);
    if (!project) {
      throw new Error("Project not found");
    }
    return { ...project };
  },
  
  updateProject: async (projectId: string, updatedData: Partial<ProjectData>) => {
    await delay();
    if (simulateError()) {
      throw new Error("Failed to update project");
    }
    const projectIndex = mockProjects.findIndex(p => p._id === projectId);
    if (projectIndex === -1) {
      throw new Error("Project not found");
    }
    
    // In a real implementation, this would update the backend
    // For the mock, we'll just return the merged data
    return {
      ...mockProjects[projectIndex],
      ...updatedData,
      updatedAt: new Date().toISOString(),
      team: updatedData.team || mockProjects[projectIndex].team || [],
      troubleshooting: updatedData.troubleshooting || mockProjects[projectIndex].troubleshooting || []
    };
  },
  
  createProject: async (projectData: Omit<ProjectData, "_id" | "createdAt" | "updatedAt">) => {
    await delay();
    if (simulateError()) {
      throw new Error("Failed to create project");
    }
    
    // Generate a new ID
    const newId = `proj${Date.now()}`;
    const now = new Date().toISOString();
    
    // Create new project
    const newProject: ProjectData = {
      _id: newId,
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
    
    return newProject;
  },
  
  deleteProject: async (projectId: string) => {
    await delay();
    if (simulateError()) {
      throw new Error("Failed to delete project");
    }
    
    const projectIndex = mockProjects.findIndex(p => p._id === projectId);
    if (projectIndex === -1) {
      throw new Error("Project not found");
    }
    
    // In a real implementation, this would delete from the backend
    // For the mock, we'll just return success
    return { success: true };
  },
  
  getTroubleshootingIssues: async (projectId: string) => {
    await delay();
    if (simulateError()) {
      throw new Error("Failed to fetch troubleshooting issues");
    }
    
    const project = mockProjects.find(p => p._id === projectId);
    if (!project) {
      throw new Error("Project not found");
    }
    
    return project.troubleshooting || [];
  },
  
  createTroubleshootingIssue: async (
    projectId: string, 
    issueData: Omit<TroubleshootingIssue, "id" | "lastUpdated">
  ) => {
    await delay();
    if (simulateError()) {
      throw new Error("Failed to create troubleshooting issue");
    }
    
    const projectIndex = mockProjects.findIndex(p => p._id === projectId);
    if (projectIndex === -1) {
      throw new Error("Project not found");
    }
    
    const newIssue: TroubleshootingIssue = {
      id: `issue-${Date.now()}`,
      ...issueData,
      solutions: issueData.solutions.map(s => ({
        steps: s.steps,
        code: s.code || "",
        screenshots: s.screenshots || [],
        resources: s.resources || [] // Ensure resources is always present
      })),
      lastUpdated: new Date().toISOString()
    };
    
    if (!mockProjects[projectIndex].troubleshooting) {
      mockProjects[projectIndex].troubleshooting = [];
    }
    
    mockProjects[projectIndex].troubleshooting.push(newIssue);
    
    return newIssue;
  },
  
  updateTroubleshootingIssue: async (
    projectId: string, 
    issueId: string, 
    issueData: Partial<Omit<TroubleshootingIssue, "id" | "lastUpdated">>
  ) => {
    await delay();
    if (simulateError()) {
      throw new Error("Failed to update troubleshooting issue");
    }
    
    const projectIndex = mockProjects.findIndex(p => p._id === projectId);
    if (projectIndex === -1 || !mockProjects[projectIndex].troubleshooting) {
      throw new Error("Project or troubleshooting not found");
    }
    
    const issueIndex = mockProjects[projectIndex].troubleshooting.findIndex(i => i.id === issueId);
    if (issueIndex === -1) {
      throw new Error("Issue not found");
    }
    
    // Create a properly typed updated issue
    const currentIssue = mockProjects[projectIndex].troubleshooting[issueIndex];
    const updatedIssue: TroubleshootingIssue = {
      id: issueId,
      issue: issueData.issue || currentIssue.issue,
      description: issueData.description || currentIssue.description,
      symptoms: issueData.symptoms || currentIssue.symptoms,
      solutions: issueData.solutions 
        ? issueData.solutions.map(s => ({
            steps: s.steps,
            code: s.code || "",
            screenshots: s.screenshots || [],
            resources: s.resources || [] // Ensure resources is always present
          })) 
        : currentIssue.solutions.map(s => ({
            ...s,
            resources: s.resources || [] // Ensure resources is always present in existing solutions
          })),
      relatedIssues: issueData.relatedIssues || currentIssue.relatedIssues,
      tags: issueData.tags || currentIssue.tags,
      lastUpdated: new Date().toISOString(),
      updatedBy: issueData.updatedBy || currentIssue.updatedBy
    };
    
    mockProjects[projectIndex].troubleshooting[issueIndex] = updatedIssue;
    
    return updatedIssue;
  },
  
  deleteTroubleshootingIssue: async (projectId: string, issueId: string) => {
    await delay();
    if (simulateError()) {
      throw new Error("Failed to delete troubleshooting issue");
    }
    
    const projectIndex = mockProjects.findIndex(p => p._id === projectId);
    if (projectIndex === -1 || !mockProjects[projectIndex].troubleshooting) {
      throw new Error("Project or troubleshooting not found");
    }
    
    const issueIndex = mockProjects[projectIndex].troubleshooting.findIndex(i => i.id === issueId);
    if (issueIndex === -1) {
      throw new Error("Issue not found");
    }
    
    mockProjects[projectIndex].troubleshooting.splice(issueIndex, 1);
    
    return { success: true };
  }
};

export const mockLanguageService = {
  getLanguages: async () => {
    await delay();
    if (simulateError()) {
      throw new Error("Failed to fetch languages");
    }
    return [...mockLanguages];
  },
  
  getLanguageById: async (languageId: string) => {
    await delay();
    if (simulateError()) {
      throw new Error("Failed to fetch language");
    }
    const language = mockLanguages.find(l => l.id === languageId);
    if (!language) {
      throw new Error("Language not found");
    }
    return { ...language };
  }
};

export const mockComponentService = {
  getComponents: async () => {
    await delay();
    if (simulateError()) {
      throw new Error("Failed to fetch components");
    }
    return [...mockComponents];
  },
  
  getComponentById: async (componentId: string) => {
    await delay();
    if (simulateError()) {
      throw new Error("Failed to fetch component");
    }
    const component = mockComponents.find(c => c.id === componentId);
    if (!component) {
      throw new Error("Component not found");
    }
    return { ...component };
  }
};

export const mockGuideService = {
  getGuides: async () => {
    await delay();
    if (simulateError()) {
      throw new Error("Failed to fetch guides");
    }
    return [...mockGuides];
  },
  
  getGuideById: async (guideId: string) => {
    await delay();
    if (simulateError()) {
      throw new Error("Failed to fetch guide");
    }
    const guide = mockGuides.find(g => g.id === guideId);
    if (!guide) {
      throw new Error("Guide not found");
    }
    return { ...guide };
  }
};
