
import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";

interface Guidelines {
  content: string;
  lastUpdated: string;
  updatedBy: string;
}

interface ProjectGuidelinesTabProps {
  guidelines: Guidelines;
  formatDate: (dateString: string) => string;
}

const ProjectGuidelinesTab: React.FC<ProjectGuidelinesTabProps> = ({ guidelines, formatDate }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Guidelines</CardTitle>
        <CardDescription>Best practices and development standards</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="prose dark:prose-invert max-w-none">
          <p>{guidelines.content}</p>
        </div>
        
        <div className="text-sm text-muted-foreground mt-4">
          Last updated: {formatDate(guidelines.lastUpdated)}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectGuidelinesTab;
