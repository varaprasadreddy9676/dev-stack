
import { Link } from "react-router-dom";
import { FileText, FilePlus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyPageStateProps {
  projectId: string;
}

export const EmptyPageState = ({ projectId }: EmptyPageStateProps) => (
  <div className="text-center py-8">
    <FileText className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
    <h3 className="mt-4 text-lg font-medium">No Pages Found</h3>
    <p className="text-muted-foreground mt-2">
      This project doesn't have any pages yet. Create the first one!
    </p>
    <Button variant="outline" className="mt-4" asChild>
      <Link to={`/projects/${projectId}/new-page`}>
        <FilePlus className="mr-2 h-4 w-4" /> Create New Page
      </Link>
    </Button>
  </div>
);
