
import React from "react";
import { Button } from "@/components/ui/button";
import { Bug, Plus } from "lucide-react";

interface TroubleshootingHeaderProps {
  onAddIssue: () => void;
}

const TroubleshootingHeader: React.FC<TroubleshootingHeaderProps> = ({
  onAddIssue
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
      <div>
        <h2 className="text-2xl font-bold mb-1 flex items-center">
          <Bug className="mr-2 h-5 w-5 text-amber-500" />
          Troubleshooting
        </h2>
        <p className="text-muted-foreground">
          Document and solve common issues that users might encounter.
        </p>
      </div>
      
      <Button onClick={onAddIssue}>
        <Plus className="mr-1 h-4 w-4" /> Add Issue
      </Button>
    </div>
  );
};

export default TroubleshootingHeader;
