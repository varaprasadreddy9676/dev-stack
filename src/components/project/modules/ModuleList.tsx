
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusIcon, PencilIcon, TrashIcon } from "lucide-react";

interface ModuleType {
  name: string;
  description: string;
  documentation: string;
  dependencies: string[];
}

interface ModuleListProps {
  modules: ModuleType[];
  onAddModule: () => void;
  onEditModule: (index: number) => void;
  onDeleteModule: (index: number) => void;
  isEditing: boolean;
}

const ModuleList: React.FC<ModuleListProps> = ({ 
  modules, 
  onAddModule, 
  onEditModule, 
  onDeleteModule,
  isEditing
}) => {
  return (
    <div className="space-y-6">
      {isEditing && (
        <Button 
          variant="outline" 
          onClick={onAddModule}
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add New Module
        </Button>
      )}
      
      {modules.length === 0 ? (
        <p className="text-muted-foreground italic">
          {isEditing ? "No modules defined yet." : "No modules defined for this project."}
        </p>
      ) : (
        <div className={isEditing ? "space-y-4" : "divide-y"}>
          {modules.map((module, index) => (
            <div 
              key={index} 
              className={isEditing 
                ? "border rounded-md p-4" 
                : "py-6 first:pt-0 last:pb-0"}
            >
              {isEditing ? (
                <div className="flex justify-between">
                  <h3 className="text-lg font-medium">{module.name}</h3>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => onEditModule(index)}
                    >
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => onDeleteModule(index)}
                    >
                      <TrashIcon className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ) : (
                <h3 className="text-xl font-semibold mb-2">{module.name}</h3>
              )}
              
              <p className={isEditing ? "text-muted-foreground mt-1" : "mb-4"}>
                {module.description}
              </p>
              
              {!isEditing && (
                <div className="mb-4">
                  <h4 className="text-lg font-medium mb-2">Documentation</h4>
                  <div className="prose max-w-none dark:prose-invert bg-muted/30 p-4 rounded-md">
                    <p>{module.documentation}</p>
                  </div>
                </div>
              )}
              
              {!isEditing ? (
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
              ) : (
                <div className="flex gap-2 mt-3">
                  {module.dependencies.map((dep, i) => (
                    <Badge key={i} variant="outline">{dep}</Badge>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModuleList;
