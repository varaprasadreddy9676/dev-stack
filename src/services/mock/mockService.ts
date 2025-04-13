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

// Mock implementation of page service
const pages = {
  createPage: async (pageData) => {
    const newPage = {
      _id: `page${mockData.pagesData.length + 1}`,
      slug: pageData.title.toLowerCase().replace(/\s+/g, '-'),
      metadata: {
        createdBy: "currentUser",
        createdAt: new Date(),
        lastUpdatedBy: "currentUser",
        lastUpdatedAt: new Date(),
        contributors: ["currentUser"],
        version: 1
      },
      permissions: {
        canEdit: ["admin", "content_manager"],
        canView: ["developer", "implementation", "support"]
      },
      ...pageData
    };
    
    mockData.pagesData.push(newPage);
    return { ...newPage };
  },
  
  getPageById: async (id) => {
    const page = mockData.pagesData.find(p => p._id === id);
    if (!page) {
      throw new Error("Page not found");
    }
    return { ...page };
  },
  
  updatePage: async (id, pageData) => {
    const pageIndex = mockData.pagesData.findIndex(p => p._id === id);
    if (pageIndex === -1) {
      throw new Error("Page not found");
    }
    
    const updatedPage = {
      ...mockData.pagesData[pageIndex],
      ...pageData,
      metadata: {
        ...mockData.pagesData[pageIndex].metadata,
        lastUpdatedBy: "currentUser",
        lastUpdatedAt: new Date(),
        version: mockData.pagesData[pageIndex].metadata.version + 1
      }
    };
    
    mockData.pagesData[pageIndex] = updatedPage;
    return { ...updatedPage };
  },
  
  deletePage: async (id) => {
    const pageIndex = mockData.pagesData.findIndex(p => p._id === id);
    if (pageIndex === -1) {
      throw new Error("Page not found");
    }
    
    mockData.pagesData.splice(pageIndex, 1);
    return { success: true, message: "Page successfully deleted" };
  },
  
  getPagesByParent: async (entityType, entityId, page = 1, limit = 10) => {
    const pages = mockData.pagesData.filter(p => 
      p.parent.type === entityType && p.parent.id === entityId
    );
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = pages.slice(startIndex, endIndex);
    
    const pageData = paginatedData.map(p => ({
      _id: p._id,
      title: p.title,
      slug: p.slug,
      parent: p.parent,
      metadata: {
        lastUpdatedBy: p.metadata.lastUpdatedBy,
        lastUpdatedAt: p.metadata.lastUpdatedAt
      },
      tags: p.tags
    }));
    
    return {
      data: pageData,
      count: paginatedData.length,
      total: pages.length,
      page,
      pageSize: limit
    };
  },
  
  linkPage: async (pageId, linkData) => {
    const pageIndex = mockData.pagesData.findIndex(p => p._id === pageId);
    if (pageIndex === -1) {
      throw new Error("Page not found");
    }
    
    const { entityType, entityId, relationshipType } = linkData;
    const existingLinkIndex = mockData.pagesData[pageIndex].relatedEntities.findIndex(
      r => r.type === entityType && r.id === entityId
    );
    
    if (existingLinkIndex !== -1) {
      mockData.pagesData[pageIndex].relatedEntities[existingLinkIndex].relationshipType = relationshipType;
    } else {
      mockData.pagesData[pageIndex].relatedEntities.push({
        type: entityType,
        id: entityId,
        relationshipType
      });
    }
    
    return {
      success: true,
      message: "Page linked successfully",
      data: {
        type: entityType,
        id: entityId,
        relationshipType
      }
    };
  },
  
  unlinkPage: async (pageId, unlinkData) => {
    const pageIndex = mockData.pagesData.findIndex(p => p._id === pageId);
    if (pageIndex === -1) {
      throw new Error("Page not found");
    }
    
    const { entityType, entityId } = unlinkData;
    const entityIndex = mockData.pagesData[pageIndex].relatedEntities.findIndex(
      r => r.type === entityType && r.id === entityId
    );
    
    if (entityIndex !== -1) {
      mockData.pagesData[pageIndex].relatedEntities.splice(entityIndex, 1);
    }
    
    return {
      success: true,
      message: "Link removed successfully"
    };
  },
  
  searchPages: async (params) => {
    let filtered = [...mockData.pagesData];
    
    // Filter by search query
    if (params.q) {
      const query = params.q.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(query) || 
        p.content.toLowerCase().includes(query) || 
        p.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Filter by tags
    if (params.tags && params.tags.length > 0) {
      const tagArray = Array.isArray(params.tags) ? params.tags : [params.tags];
      filtered = filtered.filter(p => 
        tagArray.some(tag => p.tags.includes(tag))
      );
    }
    
    // Filter by parent
    if (params.parent) {
      const [type, id] = params.parent.split(':');
      filtered = filtered.filter(p => 
        p.parent.type === type && p.parent.id === id
      );
    }
    
    // Add match score and snippets for search results
    const results = filtered.map(p => ({
      _id: p._id,
      title: p.title,
      slug: p.slug,
      snippet: p.content.substring(0, 100) + "...",
      matchScore: Math.random() * 0.5 + 0.5, // Random score between 0.5 and 1
      parent: p.parent,
      metadata: {
        lastUpdatedBy: p.metadata.lastUpdatedBy,
        lastUpdatedAt: p.metadata.lastUpdatedAt
      },
      tags: p.tags
    }));
    
    // Sort by match score
    results.sort((a, b) => b.matchScore - a.matchScore);
    
    // Apply pagination if needed
    const limit = params.limit || 10;
    const page = params.page || 1;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedResults = results.slice(startIndex, endIndex);
    
    return {
      data: paginatedResults,
      count: paginatedResults.length,
      total: results.length
    };
  },
  
  getRecentPages: async (limit = 5) => {
    const pages = [...mockData.pagesData];
    
    // Sort by lastUpdatedAt
    pages.sort((a, b) => 
      new Date(b.metadata.lastUpdatedAt).getTime() - 
      new Date(a.metadata.lastUpdatedAt).getTime()
    );
    
    const recentPages = pages.slice(0, limit).map(p => ({
      _id: p._id,
      title: p.title,
      slug: p.slug,
      parent: p.parent,
      metadata: {
        lastUpdatedBy: p.metadata.lastUpdatedBy,
        lastUpdatedAt: p.metadata.lastUpdatedAt
      }
    }));
    
    return {
      data: recentPages
    };
  }
};

// Export the mock service
export const mockService = {
  pages
};
