
import { useCallback } from "react";
import { services } from "@/services/serviceFactory";
import { usePageDataBase } from "./usePageDataBase";
import { 
  LinkPageRequest, 
  UnlinkPageRequest, 
  EntityType, 
  ObjectId,
  PageSummary 
} from "@/types";

export const usePageRelationships = () => {
  const { loading, setLoading, setError, toast, handleError } = usePageDataBase();

  const getPagesByParent = useCallback(async (entityType: EntityType, entityId: ObjectId, page = 1, limit = 10) => {
    setLoading(true);
    setError(null);
    try {
      return await services.pages.getPagesByParent(entityType, entityId, page, limit);
    } catch (err) {
      handleError(err);
      return { data: [], count: 0, total: 0, page: 1, pageSize: limit };
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, handleError]);

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
      handleError(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [toast, setLoading, setError, handleError]);

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
      handleError(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [toast, setLoading, setError, handleError]);

  return {
    loading,
    getPagesByParent,
    linkPage,
    unlinkPage,
  };
};
