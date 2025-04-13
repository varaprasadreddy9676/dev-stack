
import { useParams } from "react-router-dom";
import { PageForm } from "@/components/pages/PageForm";

const NewPage = () => {
  const { entityType, entityId } = useParams<{ entityType?: string; entityId?: string }>();
  
  // Convert route params to the proper types if they exist
  const parentType = entityType as "project" | "module" | "language" | "component" | "guide" | "root" | undefined;
  
  return (
    <PageForm 
      mode="create" 
      initialParentType={parentType || "root"}
      initialParentId={entityId || null}
    />
  );
};

export default NewPage;
