
import { PageFormContainer } from "./form";

interface PageFormProps {
  pageId?: string;
  initialParentType?: "project" | "module" | "language" | "component" | "guide" | "root";
  initialParentId?: string | null;
  mode: "create" | "edit";
}

export const PageForm = (props: PageFormProps) => {
  return <PageFormContainer {...props} />;
};

export default PageForm;
