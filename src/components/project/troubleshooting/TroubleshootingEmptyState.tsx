
import React from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Plus } from "lucide-react";

interface TroubleshootingEmptyStateProps {
  hasIssues: boolean;
  onAddIssue: () => void;
}

const TroubleshootingEmptyState: React.FC<TroubleshootingEmptyStateProps> = ({
  hasIssues,
  onAddIssue
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 text-center border-2 border-dashed rounded-lg">
      <AlertTriangle className="h-10 w-10 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium mb-1">No issues found</h3>
      <p className="text-muted-foreground mb-4">
        {hasIssues 
          ? "No issues match your current search or filter." 
          : "No troubleshooting issues have been added yet."}
      </p>
      {!hasIssues && (
        <Button onClick={onAddIssue}>
          <Plus className="mr-1 h-4 w-4" /> Add First Issue
        </Button>
      )}
    </div>
  );
};

export default TroubleshootingEmptyState;
