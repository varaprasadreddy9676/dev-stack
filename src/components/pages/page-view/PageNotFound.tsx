
import { Button } from "@/components/ui/button";
import { FileText, ArrowLeft } from "lucide-react";

interface PageNotFoundProps {
  onBack: () => void;
}

export const PageNotFound = ({ onBack }: PageNotFoundProps) => {
  return (
    <div className="container py-20 text-center">
      <FileText className="h-16 w-16 mx-auto text-muted-foreground opacity-30" />
      <h1 className="mt-6 text-2xl font-bold">Page Not Found</h1>
      <p className="mt-2 text-muted-foreground">
        The page you're looking for doesn't exist or you don't have permission to view it.
      </p>
      <Button className="mt-6" onClick={onBack}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Go Back
      </Button>
    </div>
  );
};
