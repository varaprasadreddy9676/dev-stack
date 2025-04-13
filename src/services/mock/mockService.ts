
import { delay } from "../api/baseService";
import { 
  Page, 
  PageSummary, 
  CreatePageRequest, 
  UpdatePageRequest,
  LinkPageRequest,
  UnlinkPageRequest,
  PageSearchParams,
  EntityType,
  ObjectId
} from "@/types";

// Mock data for pages
const mockData = {
  pages: [
    {
      _id: "page1",
      title: "Getting Started with Project X",
      slug: "getting-started-project-x",
      content: "# Getting Started\n\nThis is a guide to help you get started with Project X. Follow these steps to set up your environment and begin development.",
      parent: {
        type: "project",
        id: "proj101",
      },
      relatedEntities: [
        {
          type: "component",
          id: "comp1",
          relationshipType: "implementation",
        },
      ],
      metadata: {
        createdBy: "user1",
        createdAt: new Date("2024-03-10T10:00:00Z"),
        lastUpdatedBy: "user1",
        lastUpdatedAt: new Date("2024-03-15T14:30:00Z"),
        contributors: ["user1", "user2"],
        version: 2,
      },
      visibility: "team",
      tags: ["getting-started", "setup", "onboarding"],
      permissions: {
        canEdit: ["admin", "content_manager"],
        canView: ["user", "developer", "admin", "content_manager"],
      },
    },
    {
      _id: "page2",
      title: "API Documentation",
      slug: "api-documentation",
      content: "# API Documentation\n\nThis document provides detailed information about the API endpoints available in this project.",
      parent: {
        type: "project",
        id: "proj101",
      },
      relatedEntities: [
        {
          type: "module",
          id: "mod1",
          relationshipType: "documentation",
        },
      ],
      metadata: {
        createdBy: "user2",
        createdAt: new Date("2024-03-12T09:15:00Z"),
        lastUpdatedBy: "user2",
        lastUpdatedAt: new Date("2024-03-18T11:45:00Z"),
        contributors: ["user2"],
        version: 1,
      },
      visibility: "public",
      tags: ["api", "documentation", "endpoints"],
      permissions: {
        canEdit: ["admin", "content_manager"],
        canView: ["user", "developer", "admin", "content_manager"],
      },
    },
  ],
};

// Mock implementation of the page service
export const mockPageService = {
  createPage: async (pageData: CreatePageRequest): Promise<Page> => {
    await delay(800);
    
    const newPage: Page = {
      _id: `page${mockData.pages.length + 1}`,
      title: pageData.title,
      slug: pageData.title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-'),
      content: pageData.content,
      parent: pageData.parent,
      relatedEntities: pageData.relatedEntities || [],
      metadata: {
        createdBy: "user1", // Would be the current user ID in a real app
        createdAt: new Date(),
        lastUpdatedBy: "user1",
        lastUpdatedAt: new Date(),
        contributors: ["user1"],
        version: 1,
      },
      visibility: pageData.visibility,
      tags: pageData.tags || [],
      permissions: {
        canEdit: ["admin", "content_manager"],
        canView: ["user", "developer", "admin", "content_manager"],
      },
    };
    
    mockData.pages.push(newPage);
    return newPage;
  },
  
  getPageById: async (id: ObjectId): Promise<Page> => {
    await delay(500);
    
    const page = mockData.pages.find(p => p._id === id);
    if (!page) {
      throw new Error(`Page with ID ${id} not found`);
    }
    
    return page;
  },
  
  updatePage: async (id: ObjectId, pageData: UpdatePageRequest): Promise<Page> => {
    await delay(800);
    
    const pageIndex = mockData.pages.findIndex(p => p._id === id);
    if (pageIndex === -1) {
      throw new Error(`Page with ID ${id} not found`);
    }
    
    const updatedPage = {
      ...mockData.pages[pageIndex],
      ...pageData,
      metadata: {
        ...mockData.pages[pageIndex].metadata,
        lastUpdatedBy: "user1", // Would be the current user ID in a real app
        lastUpdatedAt: new Date(),
        version: mockData.pages[pageIndex].metadata.version + 1,
      }
    };
    
    mockData.pages[pageIndex] = updatedPage;
    return updatedPage;
  },
  
  deletePage: async (id: ObjectId): Promise<{ success: boolean; message: string }> => {
    await delay(800);
    
    const pageIndex = mockData.pages.findIndex(p => p._id === id);
    if (pageIndex === -1) {
      throw new Error(`Page with ID ${id} not found`);
    }
    
    mockData.pages.splice(pageIndex, 1);
    return {
      success: true,
      message: "Page deleted successfully",
    };
  },
  
  getPagesByParent: async (entityType: EntityType, entityId: ObjectId, page = 1, limit = 10) => {
    await delay(500);
    
    const filteredPages = mockData.pages.filter(p => 
      p.parent.type === entityType && p.parent.id === entityId
    );
    
    const paginatedPages = filteredPages.slice((page - 1) * limit, page * limit);
    
    const summaries: PageSummary[] = paginatedPages.map(p => ({
      _id: p._id,
      title: p.title,
      slug: p.slug,
      snippet: p.content.substring(0, 100) + "...",
      parent: p.parent,
      metadata: {
        lastUpdatedBy: p.metadata.lastUpdatedBy,
        lastUpdatedAt: p.metadata.lastUpdatedAt,
      },
      tags: p.tags,
    }));
    
    return {
      data: summaries,
      count: paginatedPages.length,
      total: filteredPages.length,
      page,
      pageSize: limit,
    };
  },
  
  linkPage: async (pageId: ObjectId, linkData: LinkPageRequest) => {
    await delay(500);
    
    const pageIndex = mockData.pages.findIndex(p => p._id === pageId);
    if (pageIndex === -1) {
      throw new Error(`Page with ID ${pageId} not found`);
    }
    
    const existingLinkIndex = mockData.pages[pageIndex].relatedEntities.findIndex(
      entity => entity.type === linkData.entityType && entity.id === linkData.entityId
    );
    
    if (existingLinkIndex !== -1) {
      mockData.pages[pageIndex].relatedEntities[existingLinkIndex].relationshipType = linkData.relationshipType;
    } else {
      mockData.pages[pageIndex].relatedEntities.push({
        type: linkData.entityType,
        id: linkData.entityId,
        relationshipType: linkData.relationshipType,
      });
    }
    
    return {
      success: true,
      message: "Page linked successfully",
      data: {
        type: linkData.entityType,
        id: linkData.entityId,
        relationshipType: linkData.relationshipType,
      },
    };
  },
  
  unlinkPage: async (pageId: ObjectId, unlinkData: UnlinkPageRequest) => {
    await delay(500);
    
    const pageIndex = mockData.pages.findIndex(p => p._id === pageId);
    if (pageIndex === -1) {
      throw new Error(`Page with ID ${pageId} not found`);
    }
    
    const entityIndex = mockData.pages[pageIndex].relatedEntities.findIndex(
      entity => entity.type === unlinkData.entityType && entity.id === unlinkData.entityId
    );
    
    if (entityIndex === -1) {
      throw new Error(`Entity not linked to this page`);
    }
    
    mockData.pages[pageIndex].relatedEntities.splice(entityIndex, 1);
    
    return {
      success: true,
      message: "Link removed successfully",
    };
  },
  
  searchPages: async (params: PageSearchParams) => {
    await delay(800);
    
    let filteredPages = [...mockData.pages];
    
    // Filter by search query
    if (params.q) {
      const query = params.q.toLowerCase();
      filteredPages = filteredPages.filter(page => 
        page.title.toLowerCase().includes(query) || 
        page.content.toLowerCase().includes(query) ||
        page.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Filter by tags
    if (params.tags && params.tags.length > 0) {
      filteredPages = filteredPages.filter(page => 
        params.tags?.some(tag => page.tags.includes(tag))
      );
    }
    
    // Filter by parent
    if (params.parent) {
      const [type, id] = params.parent.split(':');
      filteredPages = filteredPages.filter(page => 
        page.parent.type === type && page.parent.id === id
      );
    }
    
    // Apply pagination
    const page = params.page || 1;
    const limit = params.limit || 10;
    const paginatedPages = filteredPages.slice((page - 1) * limit, page * limit);
    
    const summaries: PageSummary[] = paginatedPages.map(p => ({
      _id: p._id,
      title: p.title,
      slug: p.slug,
      snippet: p.content.substring(0, 100) + "...",
      matchScore: Math.random() * 0.5 + 0.5, // Mock relevance score
      parent: p.parent,
      metadata: {
        lastUpdatedBy: p.metadata.lastUpdatedBy,
        lastUpdatedAt: p.metadata.lastUpdatedAt,
      },
      tags: p.tags,
    }));
    
    return {
      data: summaries,
      count: paginatedPages.length,
      total: filteredPages.length,
    };
  },
  
  getRecentPages: async (limit = 5) => {
    await delay(500);
    
    // Sort pages by last updated date
    const sortedPages = [...mockData.pages].sort((a, b) => 
      new Date(b.metadata.lastUpdatedAt).getTime() - new Date(a.metadata.lastUpdatedAt).getTime()
    );
    
    const recentPages = sortedPages.slice(0, limit);
    
    const summaries: PageSummary[] = recentPages.map(p => ({
      _id: p._id,
      title: p.title,
      slug: p.slug,
      parent: p.parent,
      metadata: {
        lastUpdatedBy: p.metadata.lastUpdatedBy,
        lastUpdatedAt: p.metadata.lastUpdatedAt,
      },
      tags: p.tags,
    }));
    
    return {
      data: summaries,
    };
  },
};

// Add other mock services as needed
export const mockService = {
  pages: mockPageService,
  auth: {
    login: async () => ({ user: { id: 'user1', name: 'Test User', role: 'admin' }, token: 'mock-token' }),
    logout: async () => true,
    register: async () => ({ user: { id: 'user1', name: 'Test User', role: 'admin' }, token: 'mock-token' }),
    refreshToken: async () => ({ token: 'refreshed-mock-token' }),
    getUser: async () => ({ id: 'user1', name: 'Test User', role: 'admin' }),
  },
  projects: {
    getProjects: async () => [],
    getProjectById: async () => ({}),
    createProject: async () => ({}),
    updateProject: async () => ({}),
    deleteProject: async () => ({ success: true }),
  },
  components: {
    getComponents: async () => [],
    getComponentById: async () => ({}),
  },
  languages: {
    getLanguages: async () => [],
    getLanguageById: async () => ({}),
  },
  guidelines: {
    getGuidelines: async () => [],
    getGuidelineById: async () => ({}),
  },
  guides: {
    getGuides: async () => [],
    getGuideById: async () => ({}),
  }
};
