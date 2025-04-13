
import { usePageCrud } from "./usePageCrud";
import { usePageRelationships } from "./usePageRelationships";
import { usePageSearch } from "./usePageSearch";

export const usePageData = () => {
  const { loading: crudLoading, createPage, getPage, updatePage, deletePage } = usePageCrud();
  const { loading: relLoading, getPagesByParent, linkPage, unlinkPage } = usePageRelationships();
  const { loading: searchLoading, searchPages, getRecentPages } = usePageSearch();

  // Combine loading states
  const loading = crudLoading || relLoading || searchLoading;

  return {
    loading,
    // CRUD operations
    createPage,
    getPage,
    updatePage,
    deletePage,
    // Relationship operations
    getPagesByParent,
    linkPage,
    unlinkPage,
    // Search operations
    searchPages,
    getRecentPages,
  };
};
