
import { 
  mockProjects, 
  mockLanguages, 
  mockComponents, 
  mockGuides 
} from "./mockData";
import { ProjectData } from "@/types/project";

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
      updatedAt: new Date()
    };
  },
  
  createProject: async (projectData: Omit<ProjectData, "_id" | "createdAt" | "updatedAt">) => {
    await delay();
    if (simulateError()) {
      throw new Error("Failed to create project");
    }
    
    // Generate a new ID
    const newId = `proj${Date.now()}`;
    
    // Create new project
    const newProject: ProjectData = {
      _id: newId,
      ...projectData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // In a real implementation, this would add to the backend
    // For the mock, we'll just return the new project
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
