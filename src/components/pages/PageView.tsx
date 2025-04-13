
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePageData } from "@/hooks/usePageData";
import { Page } from "@/types";
import { useAuth } from "@/contexts/auth";

// Import components from the index file
import {
  PageBreadcrumbNav,
  PageHeader,
  PageMetadataDisplay,
  PageContent,
  PageSidebar,
  PageNotFound,
  PageLoading
} from "./page-view";

export const PageView = () => {
  const { id } = useParams<{ id: string }>();
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const { getPage, deletePage } = usePageData();
  const navigate = useNavigate();
  const { user, hasPermission } = useAuth();

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
      if (success) {
        navigate(-1);
      }
    }
  };

  // Determine if the user can edit this page based on:
  // 1. If they are an admin (always can edit)
  // 2. If they have the role specified in page's canEdit permissions
  // 3. If they are the creator of the page
  const canEdit = () => {
    if (!page || !user) return false;
    
    // Admin can always edit
    if (hasPermission(['admin'])) return true;
    
    // Check if user's role is in the page's canEdit permissions
    if (user.role && page.permissions.canEdit.includes(user.role)) return true;
    
    // Check if user is the creator of the page
    if (page.metadata.createdBy === user._id) return true;
    
    return false;
  };

  if (loading) {
    return <PageLoading />;
  }

  if (!page) {
    return <PageNotFound onBack={() => navigate(-1)} />;
  }

  return (
    <div className="container py-10 animate-fade-in">
      <PageBreadcrumbNav page={page} navigateBack={() => navigate(-1)} />
      
      <PageHeader 
        id={id || ''}
        title={page.title}
        tags={page.tags}
        canEdit={canEdit()}
        onDelete={handleDelete}
      />
      
      <PageMetadataDisplay metadata={page.metadata} />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
        <div className="lg:col-span-3">
          <PageContent content={page.content} />
        </div>
        
        <div>
          <PageSidebar page={page} />
        </div>
      </div>
    </div>
  );
};
