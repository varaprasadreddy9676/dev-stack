
import { useParams } from "react-router-dom";
import { PageForm } from "@/components/pages/PageForm";

const EditPage = () => {
  const { id } = useParams<{ id: string }>();
  
  if (!id) {
    return <div>Page ID is required</div>;
  }
  
  return <PageForm mode="edit" pageId={id} />;
};

export default EditPage;
