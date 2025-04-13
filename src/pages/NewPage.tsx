
import { useParams } from "react-router-dom";
import { PageForm } from "@/components/pages/PageForm";
import { PageParentType } from "@/types";

const NewPage = () => {
  const { entityType, id } = useParams<{ entityType?: string; id?: string }>();
  
  // Convert route params to the proper types if they exist
  const parentType = entityType as PageParentType | undefined;
  
  return (
    <PageForm 
      mode="create" 
      initialParentType={parentType || "root"}
      initialParentId={id || null}
    />
  );
};

export default NewPage;
