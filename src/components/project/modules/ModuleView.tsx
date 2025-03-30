
import React from "react";
import { Badge } from "@/components/ui/badge";

interface ModuleType {
  name: string;
  description: string;
  documentation: string;
  dependencies: string[];
}

interface ModuleViewProps {
  module: ModuleType;
}

const ModuleView: React.FC<ModuleViewProps> = ({ module }) => {
  return (
    <div className="py-6 first:pt-0 last:pb-0">
      <h3 className="text-xl font-semibold mb-2">{module.name}</h3>
      <p className="mb-4">{module.description}</p>
      
      <div className="mb-4">
        <h4 className="text-lg font-medium mb-2">Documentation</h4>
        <div className="prose max-w-none dark:prose-invert bg-muted/30 p-4 rounded-md">
          <p>{module.documentation}</p>
        </div>
      </div>
      
      <div>
        <h4 className="text-lg font-medium mb-2">Dependencies</h4>
        <div className="flex flex-wrap gap-2">
          {module.dependencies.length === 0 ? (
            <p className="text-muted-foreground italic">No dependencies specified.</p>
          ) : (
            module.dependencies.map((dep, i) => (
              <Badge key={i} variant="secondary">{dep}</Badge>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ModuleView;
