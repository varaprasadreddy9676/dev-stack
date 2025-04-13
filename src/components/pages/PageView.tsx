
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { usePageViewData } from "./page-view/usePageViewData";
import { usePagePermissions } from "./page-view/usePagePermissions";

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
  const navigate = useNavigate();
  const { user } = useAuth();
  const { page, loading, handleDelete } = usePageViewData(id);
  const { canEdit } = usePagePermissions(page, user?._id);

  const onDelete = async () => {
    const success = await handleDelete();
    if (success) {
      navigate(-1);
    }
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
        onDelete={onDelete}
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
