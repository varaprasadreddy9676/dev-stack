
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
  ObjectId 
} from "@/types";

export const pageService = {
  // Page CRUD Operations
  createPage: async (pageData: CreatePageRequest): Promise<Page> => {
    const response = await baseService.post("/api/pages", pageData);
    return response.data.data;
  },

  getPageById: async (id: ObjectId): Promise<Page> => {
    const response = await baseService.get(`/api/pages/${id}`);
    return response.data.data;
  },

  updatePage: async (id: ObjectId, pageData: UpdatePageRequest): Promise<Page> => {
    const response = await baseService.put(`/api/pages/${id}`, pageData);
    return response.data.data;
  },

  deletePage: async (id: ObjectId): Promise<{ success: boolean; message: string }> => {
    const response = await baseService.delete(`/api/pages/${id}`);
    return response.data;
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
    return response.data;
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
    return response.data;
  },

  unlinkPage: async (pageId: ObjectId, unlinkData: UnlinkPageRequest): Promise<{
    success: boolean;
    message: string;
  }> => {
    const response = await baseService.delete(`/api/pages/${pageId}/link`, {
      data: unlinkData
    });
    return response.data;
  },

  // Page Search and Discovery
  searchPages: async (params: PageSearchParams): Promise<{
    data: PageSummary[];
    count: number;
    total: number;
  }> => {
    const response = await baseService.get("/api/pages/search", { params });
    return response.data;
  },

  getRecentPages: async (limit = 5): Promise<{
    data: PageSummary[];
  }> => {
    const response = await baseService.get("/api/pages/recent", {
      params: { limit }
    });
    return response.data;
  }
};
