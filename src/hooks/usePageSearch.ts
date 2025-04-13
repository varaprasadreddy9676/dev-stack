
import { useCallback } from "react";
import { services } from "@/services/serviceFactory";
import { usePageDataBase } from "./usePageDataBase";
import { PageSearchParams } from "@/types";

export const usePageSearch = () => {
  const { loading, setLoading, setError, handleError } = usePageDataBase();

  const searchPages = useCallback(async (params: PageSearchParams) => {
    setLoading(true);
    setError(null);
    try {
      return await services.pages.searchPages(params);
    } catch (err) {
      handleError(err);
      return { data: [], count: 0, total: 0 };
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, handleError]);

  const getRecentPages = useCallback(async (limit = 5) => {
    setLoading(true);
    setError(null);
    try {
      return await services.pages.getRecentPages(limit);
    } catch (err) {
      handleError(err);
      return { data: [] };
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, handleError]);

  return {
    loading,
    searchPages,
    getRecentPages,
  };
};
