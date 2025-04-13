
import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Component, Code } from "lucide-react";

interface ComponentItem {
  id: string;
  name: string;
  description: string;
  variants: number;
}

interface ProjectComponentsTabProps {
  components: ComponentItem[];
  handleViewComponent: (componentId: string) => void;
}

const ProjectComponentsTab: React.FC<ProjectComponentsTabProps> = ({ components, handleViewComponent }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Project Components</h2>
        <Button size="sm">
          <Component className="mr-2 h-4 w-4" />
          New Component
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {components.map((component) => (
          <Card key={component.id} className="h-full overflow-hidden hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{component.name}</CardTitle>
              <CardDescription>{component.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                {component.variants} {component.variants === 1 ? 'variant' : 'variants'}
              </div>
              <Button 
                variant="link" 
                className="p-0 h-auto text-primary mt-2"
                onClick={() => handleViewComponent(component.id)}
              >
                View Component
                <Code className="ml-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectComponentsTab;
