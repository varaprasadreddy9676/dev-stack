
import { useState, useCallback } from "react";
import { services } from "@/services/serviceFactory";
import { useToast } from "@/hooks/use-toast";
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

export const usePageData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const createPage = useCallback(async (pageData: CreatePageRequest): Promise<Page | null> => {
    setLoading(true);
    setError(null);
    try {
      const newPage = await services.pages.createPage(pageData);
      toast({
        title: "Success",
        description: "Page created successfully",
      });
      return newPage;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to create page";
      setError(message);
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const getPage = useCallback(async (id: ObjectId): Promise<Page | null> => {
    setLoading(true);
    setError(null);
    try {
      return await services.pages.getPageById(id);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch page";
      setError(message);
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const updatePage = useCallback(async (id: ObjectId, pageData: UpdatePageRequest): Promise<Page | null> => {
    setLoading(true);
    setError(null);
    try {
      const updatedPage = await services.pages.updatePage(id, pageData);
      toast({
        title: "Success",
        description: "Page updated successfully",
      });
      return updatedPage;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to update page";
      setError(message);
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const deletePage = useCallback(async (id: ObjectId): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await services.pages.deletePage(id);
      toast({
        title: "Success",
        description: "Page deleted successfully",
      });
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to delete page";
      setError(message);
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const getPagesByParent = useCallback(async (entityType: EntityType, entityId: ObjectId, page = 1, limit = 10) => {
    setLoading(true);
    setError(null);
    try {
      return await services.pages.getPagesByParent(entityType, entityId, page, limit);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch pages";
      setError(message);
      return { data: [], count: 0, total: 0, page: 1, pageSize: limit };
    } finally {
      setLoading(false);
    }
  }, []);

  const linkPage = useCallback(async (pageId: ObjectId, linkData: LinkPageRequest): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await services.pages.linkPage(pageId, linkData);
      toast({
        title: "Success",
        description: "Page linked successfully",
      });
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to link page";
      setError(message);
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const unlinkPage = useCallback(async (pageId: ObjectId, unlinkData: UnlinkPageRequest): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await services.pages.unlinkPage(pageId, unlinkData);
      toast({
        title: "Success",
        description: "Page unlinked successfully",
      });
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to unlink page";
      setError(message);
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const searchPages = useCallback(async (params: PageSearchParams) => {
    setLoading(true);
    setError(null);
    try {
      return await services.pages.searchPages(params);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to search pages";
      setError(message);
      return { data: [], count: 0, total: 0 };
    } finally {
      setLoading(false);
    }
  }, []);

  const getRecentPages = useCallback(async (limit = 5) => {
    setLoading(true);
    setError(null);
    try {
      return await services.pages.getRecentPages(limit);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch recent pages";
      setError(message);
      return { data: [] };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    createPage,
    getPage,
    updatePage,
    deletePage,
    getPagesByParent,
    linkPage,
    unlinkPage,
    searchPages,
    getRecentPages,
  };
};
