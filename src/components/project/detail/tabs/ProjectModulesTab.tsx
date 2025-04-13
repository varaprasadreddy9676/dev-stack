
import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { PackageIcon } from "lucide-react";

interface Module {
  name: string;
  description: string;
  documentation?: string;
  dependencies?: string[];
}

interface ProjectModulesTabProps {
  modules: Module[];
}

const ProjectModulesTab: React.FC<ProjectModulesTabProps> = ({ modules }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Modules</CardTitle>
        <CardDescription>Main functional modules in this project</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modules.map((module, idx) => (
            <div key={idx} className="p-4 border rounded-lg">
              <div className="flex items-center gap-2">
                <PackageIcon className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-lg font-medium">{module.name}</h3>
              </div>
              <p className="text-muted-foreground mt-2">{module.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectModulesTab;
