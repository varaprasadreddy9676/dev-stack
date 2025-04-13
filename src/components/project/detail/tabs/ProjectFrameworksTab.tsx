
import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";

interface Framework {
  name: string;
  description: string;
  documentation: string;
  examples: Array<{
    title: string;
    code: string;
    description: string;
  }>;
}

interface ProjectFrameworksTabProps {
  frameworks: Framework[];
}

const ProjectFrameworksTab: React.FC<ProjectFrameworksTabProps> = ({ frameworks }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Custom Frameworks</CardTitle>
        <CardDescription>Custom utilities and frameworks used in this project</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {frameworks.map((framework, idx) => (
            <div key={idx} className="p-4 border rounded-lg">
              <h3 className="text-lg font-medium mb-2">{framework.name}</h3>
              <p className="text-muted-foreground mb-4">{framework.description}</p>
              <div className="bg-muted p-3 rounded-md overflow-auto">
                <pre className="text-sm font-mono">{framework.examples[0].code}</pre>
              </div>
              <p className="text-sm mt-2">{framework.examples[0].description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectFrameworksTab;
