
import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";

interface FolderStructure {
  description: string;
  folders: Array<{
    path: string;
    purpose: string;
  }>;
}

interface ProjectStructureTabProps {
  structure: FolderStructure;
}

const ProjectStructureTab: React.FC<ProjectStructureTabProps> = ({ structure }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Structure</CardTitle>
        <CardDescription>{structure.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {structure.folders.map((folder, idx) => (
            <div key={idx} className="p-3 bg-muted/50 rounded-md">
              <div className="font-mono text-sm">{folder.path}</div>
              <div className="text-sm text-muted-foreground mt-1">{folder.purpose}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectStructureTab;
