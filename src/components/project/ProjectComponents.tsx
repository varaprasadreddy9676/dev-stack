
import React, { useState } from "react";
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  PencilIcon, 
  XIcon, 
  SaveIcon,
  PlusIcon,
  TrashIcon
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { ProjectData } from "@/types/project";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProjectComponentsProps {
  project: ProjectData;
  onSave: (updatedData: Partial<ProjectData>) => Promise<void>;
}

const ProjectComponents: React.FC<ProjectComponentsProps> = ({ project, onSave }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [components, setComponents] = useState<string[]>([...project.components]);
  const [newComponent, setNewComponent] = useState<string>("");
  const isMobile = useIsMobile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedProject = {
      components: components
    };
    
    await onSave(updatedProject);
    setIsEditing(false);
  };

  const addComponent = () => {
    if (newComponent.trim()) {
      setComponents([...components, newComponent]);
      setNewComponent("");
    }
  };

  const removeComponent = (index: number) => {
    setComponents(components.filter((_, i) => i !== index));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pt-4 pb-3 px-4">
        <div>
          <CardTitle className="text-lg md:text-xl">Project Components</CardTitle>
          <CardDescription className="text-sm">Reusable components used in this project</CardDescription>
        </div>
        {isEditing ? (
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsEditing(false)}
            >
              <XIcon className="h-4 w-4 mr-1 md:mr-2" />
              {!isMobile && "Cancel"}
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              onClick={handleSubmit}
            >
              <SaveIcon className="h-4 w-4 mr-1 md:mr-2" />
              {!isMobile && "Save"}
            </Button>
          </div>
        ) : (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsEditing(true)}
          >
            <PencilIcon className="h-4 w-4 mr-1 md:mr-2" />
            {!isMobile && "Edit"}
          </Button>
        )}
      </CardHeader>
      <CardContent className="px-4 pb-4">
        {isEditing ? (
          <div className="space-y-4 md:space-y-6">
            <div className="flex gap-2">
              <Input 
                value={newComponent} 
                onChange={(e) => setNewComponent(e.target.value)}
                placeholder="Component name"
                className="flex-1"
              />
              <Button 
                onClick={addComponent}
                disabled={!newComponent.trim()}
                size={isMobile ? "sm" : "default"}
              >
                <PlusIcon className="h-4 w-4 mr-1 md:mr-2" />
                {!isMobile && "Add"}
              </Button>
            </div>
            
            {components.length === 0 ? (
              <p className="text-muted-foreground italic text-sm">No components added yet.</p>
            ) : (
              <div className="space-y-2">
                {components.map((component, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-muted/30 rounded-md">
                    <span className="text-sm md:text-base">{component}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeComponent(index)}
                    >
                      <TrashIcon className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            {project.components.length === 0 ? (
              <p className="text-muted-foreground italic text-sm">No components defined for this project.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
                {project.components.map((component, index) => (
                  <div 
                    key={index} 
                    className="p-2 md:p-3 bg-muted/30 rounded-md hover:bg-muted/50 transition-colors"
                  >
                    <div className="font-medium text-sm md:text-base">{component}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectComponents;
