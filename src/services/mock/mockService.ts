
import { delay } from "../api/baseService";
import { User } from "@/types/auth";
import { 
  Page,
  PageSummary,
  PageParentType,
  EntityType,
  PageVisibility,
  RelationshipType
} from "@/types/page";
import { ObjectId } from "@/types/common";

// Mock data for authentication
const mockUsers = [
  {
    id: "user1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    avatar: "https://i.pravatar.cc/150?u=admin",
    permissions: ["read", "write", "admin"]
  },
  {
    id: "user2",
    name: "Regular User",
    email: "user@example.com",
    role: "user",
    avatar: "https://i.pravatar.cc/150?u=user",
    permissions: ["read"]
  }
];

// Mock data for page service
const mockPages: Page[] = [
  {
    _id: "page1",
    title: "Getting Started with Project X",
    slug: "getting-started-project-x",
    content: "# Getting Started\n\nThis guide will help you set up Project X...",
    parent: {
      type: "project" as PageParentType,
      id: "proj101"
    },
    relatedEntities: [
      {
        type: "module" as EntityType,
        id: "mod1",
        relationshipType: "documentation" as RelationshipType
      }
    ],
    metadata: {
      createdBy: "user1",
      createdAt: new Date("2023-04-01"),
      lastUpdatedBy: "user1",
      lastUpdatedAt: new Date("2023-04-10"),
      contributors: ["user1"],
      version: 2
    },
    visibility: "public" as PageVisibility,
    tags: ["setup", "documentation", "beginner"],
    permissions: {
      canEdit: ["admin", "content_manager"],
      canView: ["*"]
    }
  },
  {
    _id: "page2",
    title: "API Reference for Project X",
    slug: "api-reference-project-x",
    content: "# API Reference\n\nThis document contains the API endpoints for Project X...",
    parent: {
      type: "project" as PageParentType,
      id: "proj101"
    },
    relatedEntities: [
      {
        type: "module" as EntityType,
        id: "mod2",
        relationshipType: "reference" as RelationshipType
      }
    ],
    metadata: {
      createdBy: "user1",
      createdAt: new Date("2023-03-15"),
      lastUpdatedBy: "user2",
      lastUpdatedAt: new Date("2023-04-05"),
      contributors: ["user1", "user2"],
      version: 3
    },
    visibility: "team" as PageVisibility,
    tags: ["api", "reference", "technical"],
    permissions: {
      canEdit: ["admin"],
      canView: ["developer", "admin"]
    }
  }
];

// Convert Pages to PageSummaries
const createPageSummaries = (pages: Page[]): PageSummary[] => {
  return pages.map(page => ({
    _id: page._id,
    title: page.title,
    slug: page.slug,
    snippet: page.content.substring(0, 100) + "...",
    parent: page.parent,
    metadata: {
      lastUpdatedBy: page.metadata.lastUpdatedBy,
      lastUpdatedAt: page.metadata.lastUpdatedAt
    },
    tags: page.tags
  }));
};

// Mock service implementations
export const mockService = {
  auth: {
    login: async (email: string, password: string) => {
      await delay(500);
      
      const user = mockUsers.find(u => u.email === email);
      if (!user) {
        throw new Error("Invalid credentials");
      }
      
      return {
        token: "mock-jwt-token",
        user
      };
    },
    
    getProfile: async () => {
      await delay(300);
      return mockUsers[0];
    },
    
    logout: async () => {
      await delay(200);
      return { success: true };
    }
  },
  
  // Mock page service
  pages: {
    createPage: async (pageData: any) => {
      await delay(800);
      
      const newPage: Page = {
        _id: `page${Date.now()}`,
        slug: pageData.title.toLowerCase().replace(/\s+/g, '-'),
        metadata: {
          createdBy: "user1",
          createdAt: new Date(),
          lastUpdatedBy: "user1",
          lastUpdatedAt: new Date(),
          contributors: ["user1"],
          version: 1
        },
        title: pageData.title,
        content: pageData.content,
        parent: pageData.parent,
        relatedEntities: pageData.relatedEntities || [],
        visibility: pageData.visibility || "public",
        tags: pageData.tags || [],
        permissions: {
          canEdit: ["admin", "content_manager"],
          canView: ["*"]
        }
      };
      
      mockPages.push(newPage);
      return newPage;
    },
    
    getPageById: async (id: string) => {
      await delay(300);
      
      const page = mockPages.find(p => p._id === id);
      if (!page) {
        throw new Error("Page not found");
      }
      
      return { ...page };
    },
    
    updatePage: async (id: string, pageData: any) => {
      await delay(500);
      
      const pageIndex = mockPages.findIndex(p => p._id === id);
      if (pageIndex === -1) {
        throw new Error("Page not found");
      }
      
      const updatedPage: Page = {
        ...mockPages[pageIndex],
        ...pageData,
        metadata: {
          ...mockPages[pageIndex].metadata,
          lastUpdatedBy: "user1",
          lastUpdatedAt: new Date(),
          version: mockPages[pageIndex].metadata.version + 1
        }
      };
      
      mockPages[pageIndex] = updatedPage;
      return updatedPage;
    },
    
    deletePage: async (id: string) => {
      await delay(300);
      
      const pageIndex = mockPages.findIndex(p => p._id === id);
      if (pageIndex !== -1) {
        mockPages.splice(pageIndex, 1);
      }
      
      return { success: true, message: "Page deleted successfully" };
    },
    
    getPagesByParent: async (entityType: string, entityId: string, page = 1, limit = 10) => {
      await delay(500);
      
      const filteredPages = mockPages.filter(p => 
        p.parent.type === entityType && p.parent.id === entityId
      );
      
      const start = (page - 1) * limit;
      const end = start + limit;
      const paginatedPages = filteredPages.slice(start, end);
      
      return {
        data: createPageSummaries(paginatedPages),
        count: paginatedPages.length,
        total: filteredPages.length,
        page,
        pageSize: limit
      };
    },
    
    searchPages: async (params: any) => {
      await delay(700);
      
      let filteredPages = [...mockPages];
      
      if (params.q) {
        const searchTerm = params.q.toLowerCase();
        filteredPages = filteredPages.filter(p => 
          p.title.toLowerCase().includes(searchTerm) ||
          p.content.toLowerCase().includes(searchTerm) ||
          p.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
      }
      
      if (params.tags) {
        const tags = Array.isArray(params.tags) ? params.tags : params.tags.split(',');
        filteredPages = filteredPages.filter(p => 
          tags.some(tag => p.tags.includes(tag))
        );
      }
      
      if (params.parent) {
        const [type, id] = params.parent.split(':');
        filteredPages = filteredPages.filter(p => 
          p.parent.type === type && p.parent.id === id
        );
      }
      
      const result = filteredPages.map(page => ({
        _id: page._id,
        title: page.title,
        slug: page.slug,
        snippet: page.content.substring(0, 100) + "...",
        matchScore: Math.random() * 0.5 + 0.5, // Mock relevance score
        parent: page.parent,
        metadata: {
          lastUpdatedBy: page.metadata.lastUpdatedBy,
          lastUpdatedAt: page.metadata.lastUpdatedAt
        },
        tags: page.tags
      }));
      
      return {
        data: result,
        count: result.length,
        total: result.length
      };
    },
    
    getRecentPages: async (limit = 5) => {
      await delay(300);
      
      const sortedPages = [...mockPages].sort((a, b) => 
        new Date(b.metadata.lastUpdatedAt).getTime() - new Date(a.metadata.lastUpdatedAt).getTime()
      );
      
      const recentPages = sortedPages.slice(0, limit);
      
      return {
        data: recentPages.map(page => ({
          _id: page._id,
          title: page.title,
          slug: page.slug,
          parent: page.parent,
          metadata: {
            lastUpdatedBy: page.metadata.lastUpdatedBy,
            lastUpdatedAt: page.metadata.lastUpdatedAt
          },
          tags: page.tags
        }))
      };
    }
  },
  
  // Mock implementations for other services (just placeholders)
  components: {},
  guides: {},
  guidelines: {},
  languages: {},
  projects: {
    // Implement the troubleshooting methods required by ProjectTroubleshooting component
    getTroubleshootingIssues: async (projectId: string) => {
      await delay(500);
      return [];
    },
    createTroubleshootingIssue: async (projectId: string, issueData: any) => {
      await delay(600);
      return {
        id: `issue-${Date.now()}`,
        ...issueData,
        lastUpdated: new Date().toISOString(),
      };
    },
    updateTroubleshootingIssue: async (projectId: string, issueId: string, issueData: any) => {
      await delay(500);
      return {
        id: issueId,
        ...issueData,
        lastUpdated: new Date().toISOString(),
      };
    },
    deleteTroubleshootingIssue: async (projectId: string, issueId: string) => {
      await delay(400);
      return { success: true };
    },
    // Basic project methods that might be needed
    getProjects: async () => {
      await delay(500);
      return [];
    },
    getProjectById: async (id: string) => {
      await delay(300);
      return {
        _id: id,
        name: "Mock Project",
        description: "This is a mock project",
        team: [],
        troubleshooting: []
      };
    },
    updateProject: async (id: string, data: any) => {
      await delay(600);
      return {
        _id: id,
        ...data,
        updatedAt: new Date().toISOString()
      };
    },
    createProject: async (data: any) => {
      await delay(800);
      return {
        _id: `proj-${Date.now()}`,
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    }
  }
};
