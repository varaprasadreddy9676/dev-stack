
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePageData } from "@/hooks/usePageData";
import { Page } from "@/types";
import { useAuth } from "@/contexts/auth";

// Import our new components
import { PageBreadcrumbNav } from "./page-view/PageBreadcrumbNav";
import { PageHeader } from "./page-view/PageHeader";
import { PageMetadataDisplay } from "./page-view/PageMetadata";
import { PageContent } from "./page-view/PageContent";
import { PageSidebar } from "./page-view/PageSidebar";
import { PageNotFound } from "./page-view/PageNotFound";
import { PageLoading } from "./page-view/PageLoading";

export const PageView = () => {
  const { id } = useParams<{ id: string }>();
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const { getPage, deletePage } = usePageData();
  const navigate = useNavigate();
  const { user } = useAuth();

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

  const canEdit = page?.permissions.canEdit.includes("admin") || 
                  (user?.role && page?.permissions.canEdit.includes(user.role));

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
        canEdit={!!canEdit}
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
