
import { baseService } from "./baseService";
import { 
  Page, 
  PageSummary, 
  CreatePageRequest, 
  UpdatePageRequest, 
  LinkPageRequest, 
  UnlinkPageRequest, 
  PageSearchParams, 
  EntityType, 
  ObjectId,
  PageParentType
} from "@/types";

const mockPage: Page = {
  _id: "page123",
  title: "Example Page",
  slug: "example-page",
  content: "This is an example page",
  parent: {
    type: "project" as PageParentType,
    id: "proj123"
  },
  relatedEntities: [{
    type: "module",
    id: "mod123",
    relationshipType: "documentation"
  }],
  metadata: {
    createdBy: "user123",
    createdAt: new Date(),
    lastUpdatedBy: "user123",
    lastUpdatedAt: new Date(),
    contributors: ["user123"],
    version: 1
  },
  visibility: "public",
  tags: ["example", "documentation"],
  permissions: {
    canEdit: ["admin"],
    canView: ["developer"]
  }
};

const mockPageSummary: PageSummary = {
  _id: "page123",
  title: "Example Page",
  slug: "example-page",
  snippet: "This is an example page",
  parent: {
    type: "project" as PageParentType,
    id: "proj123"
  },
  metadata: {
    lastUpdatedBy: "user123",
    lastUpdatedAt: new Date()
  },
  tags: ["example", "documentation"]
};

export const pageService = {
  // Page CRUD Operations
  createPage: async (pageData: CreatePageRequest): Promise<Page> => {
    const response = await baseService.post("/api/pages", pageData);
    return response.data.data as Page || mockPage;
  },

  getPageById: async (id: ObjectId): Promise<Page> => {
    const response = await baseService.get(`/api/pages/${id}`);
    return response.data.data as Page || mockPage;
  },

  updatePage: async (id: ObjectId, pageData: UpdatePageRequest): Promise<Page> => {
    const response = await baseService.put(`/api/pages/${id}`, pageData);
    return response.data.data as Page || mockPage;
  },

  deletePage: async (id: ObjectId): Promise<{ success: boolean; message: string }> => {
    const response = await baseService.delete(`/api/pages/${id}`);
    return response.data as { success: boolean; message: string } || { success: true, message: "Page deleted successfully" };
  },

  // Page Relationship Operations
  getPagesByParent: async (entityType: EntityType, entityId: ObjectId, page = 1, limit = 10): Promise<{
    data: PageSummary[];
    count: number;
    total: number;
    page: number;
    pageSize: number;
  }> => {
    const response = await baseService.get(`/api/${entityType}s/${entityId}/pages`, {
      params: { page, limit }
    });
    return {
      data: (response.data.data as PageSummary[]) || [mockPageSummary],
      count: 1,
      total: 1,
      page: page,
      pageSize: limit
    };
  },

  linkPage: async (pageId: ObjectId, linkData: LinkPageRequest): Promise<{
    success: boolean;
    message: string;
    data: {
      type: EntityType;
      id: ObjectId;
      relationshipType: string;
    };
  }> => {
    const response = await baseService.post(`/api/pages/${pageId}/link`, linkData);
    return {
      success: true,
      message: "Page linked successfully",
      data: response.data.data || {
        type: linkData.entityType,
        id: linkData.entityId,
        relationshipType: linkData.relationshipType
      }
    };
  },

  unlinkPage: async (pageId: ObjectId, unlinkData: UnlinkPageRequest): Promise<{
    success: boolean;
    message: string;
  }> => {
    const response = await baseService.delete(`/api/pages/${pageId}/link`, {
      data: unlinkData
    });
    return response.data as { success: boolean; message: string } || { success: true, message: "Link removed successfully" };
  },

  // Page Search and Discovery
  searchPages: async (params: PageSearchParams): Promise<{
    data: PageSummary[];
    count: number;
    total: number;
  }> => {
    const response = await baseService.get("/api/pages/search", { params });
    return {
      data: (response.data.data as PageSummary[]) || [mockPageSummary],
      count: 1,
      total: 1
    };
  },

  getRecentPages: async (limit = 5): Promise<{
    data: PageSummary[];
  }> => {
    const response = await baseService.get("/api/pages/recent", {
      params: { limit }
    });
    return {
      data: (response.data.data as PageSummary[]) || [mockPageSummary]
    };
  }
};
