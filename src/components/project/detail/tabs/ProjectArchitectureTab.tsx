
import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookMarked } from "lucide-react";
import { ProjectData } from "@/types/project";

interface ProjectArchitectureTabProps {
  project: ProjectData;
}

const ProjectArchitectureTab: React.FC<ProjectArchitectureTabProps> = ({ project }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>System Architecture</CardTitle>
          <CardDescription>{project.architecture.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center p-10">
          <div className="p-10 border-2 border-dashed border-muted-foreground/20 rounded-md text-center w-full">
            <div className="mb-4 text-muted-foreground">Architecture Diagram</div>
            <Button variant="outline" size="sm">
              <BookMarked className="mr-2 h-4 w-4" />
              View Full Diagram
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Component Dependencies</CardTitle>
          <CardDescription>How components interact with each other</CardDescription>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <p>
            The Customer Portal uses a hierarchical component structure with clear boundaries
            between features. Components communicate through props and context API, with minimal
            global state management.
          </p>
          <div className="p-4 bg-muted/50 rounded-md mt-4">
            <h4 className="text-lg font-medium">Key Dependencies</h4>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>React Router for navigation</li>
              <li>React Query for data fetching</li>
              <li>Zod for schema validation</li>
              <li>Custom hooks for shared functionality</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectArchitectureTab;
