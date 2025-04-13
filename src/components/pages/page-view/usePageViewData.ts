
import { useState, useEffect } from "react";
import { usePageData } from "@/hooks/usePageData";
import { Page } from "@/types";

export const usePageViewData = (id: string | undefined) => {
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const { getPage, deletePage } = usePageData();

  useEffect(() => {
    const fetchPage = async () => {
      if (id) {
        setLoading(true);
        const fetchedPage = await getPage(id);
        if (fetchedPage) {
          setPage(fetchedPage);
        }
        setLoading(false);
      }
    };

    fetchPage();
  }, [id, getPage]);

  const handleDelete = async () => {
    if (id) {
      const success = await deletePage(id);
      return success;
    }
    return false;
  };

  return {
    page,
    loading,
    handleDelete,
  };
};
