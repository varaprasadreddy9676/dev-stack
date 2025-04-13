
import { useCallback } from "react";
import { services } from "@/services/serviceFactory";
import { usePageDataBase } from "./usePageDataBase";
import { CreatePageRequest, UpdatePageRequest, ObjectId, Page } from "@/types";

export const usePageCrud = () => {
  const { loading, setLoading, setError, toast, handleError } = usePageDataBase();

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
      handleError(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [toast, setLoading, setError, handleError]);

  const getPage = useCallback(async (id: ObjectId): Promise<Page | null> => {
    setLoading(true);
    setError(null);
    try {
      return await services.pages.getPageById(id);
    } catch (err) {
      handleError(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, handleError]);

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
      handleError(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [toast, setLoading, setError, handleError]);

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
      handleError(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [toast, setLoading, setError, handleError]);

  return {
    loading,
    createPage,
    getPage,
    updatePage,
    deletePage,
  };
};
