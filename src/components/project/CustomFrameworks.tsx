
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
  PlusIcon, 
  SaveIcon 
} from "lucide-react";
import { ProjectData } from "@/types/project";
import { FrameworkType } from "@/types/framework";
import FrameworkForm from "./frameworks/FrameworkForm";
import FrameworkItem from "./frameworks/FrameworkItem";
import FrameworkDisplay from "./frameworks/FrameworkDisplay";

interface CustomFrameworksProps {
  project: ProjectData;
  onSave: (updatedData: Partial<ProjectData>) => Promise<void>;
}

const CustomFrameworks: React.FC<CustomFrameworksProps> = ({ project, onSave }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [frameworks, setFrameworks] = useState<FrameworkType[]>([...project.customFrameworks]);
  const [currentFrameworkIndex, setCurrentFrameworkIndex] = useState<number | null>(null);
  const [showFrameworkForm, setShowFrameworkForm] = useState<boolean>(false);
  const [frameworkForm, setFrameworkForm] = useState<FrameworkType>({
    name: "",
    description: "",
    documentation: "",
    examples: []
  });

  const handleSave = async () => {
    const updatedProject = {
      customFrameworks: frameworks
    };
    
    await onSave(updatedProject);
    setIsEditing(false);
  };

  const startEditFramework = (index: number | null) => {
    if (index === null) {
      // Adding new framework
      setFrameworkForm({
        name: "",
        description: "",
        documentation: "",
        examples: []
      });
    } else {
      // Editing existing framework
      setFrameworkForm({ ...frameworks[index] });
    }
    setCurrentFrameworkIndex(index);
    setShowFrameworkForm(true);
  };

  const cancelFrameworkEdit = () => {
    setShowFrameworkForm(false);
    setCurrentFrameworkIndex(null);
  };

  const saveFramework = () => {
    if (currentFrameworkIndex === null) {
      // Adding new framework
      setFrameworks([...frameworks, { ...frameworkForm }]);
    } else {
      // Updating existing framework
      const updatedFrameworks = [...frameworks];
      updatedFrameworks[currentFrameworkIndex] = { ...frameworkForm };
      setFrameworks(updatedFrameworks);
    }
    
    setShowFrameworkForm(false);
    setCurrentFrameworkIndex(null);
  };

  const deleteFramework = (index: number) => {
    const updatedFrameworks = frameworks.filter((_, i) => i !== index);
    setFrameworks(updatedFrameworks);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Custom Frameworks</CardTitle>
          <CardDescription>Project-specific libraries and utilities</CardDescription>
        </div>
        {!isEditing ? (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsEditing(true)}
          >
            <PencilIcon className="h-4 w-4 mr-2" />
            Edit
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsEditing(false)}
            >
              <XIcon className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              onClick={handleSave}
            >
              <SaveIcon className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {isEditing && !showFrameworkForm ? (
          <div className="space-y-6">
            <Button 
              variant="outline" 
              onClick={() => startEditFramework(null)}
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Add New Framework
            </Button>
            
            {frameworks.length === 0 ? (
              <p className="text-muted-foreground italic">No frameworks defined yet.</p>
            ) : (
              <div className="space-y-4">
                {frameworks.map((framework, index) => (
                  <FrameworkItem
                    key={index}
                    framework={framework}
                    index={index}
                    onEdit={startEditFramework}
                    onDelete={deleteFramework}
                  />
                ))}
              </div>
            )}
          </div>
        ) : isEditing && showFrameworkForm ? (
          <FrameworkForm
            frameworkForm={frameworkForm}
            setFrameworkForm={setFrameworkForm}
            saveFramework={saveFramework}
            cancelEdit={cancelFrameworkEdit}
            currentFrameworkIndex={currentFrameworkIndex}
          />
        ) : (
          // View mode
          <FrameworkDisplay frameworks={project.customFrameworks} />
        )}
      </CardContent>
    </Card>
  );
};

export default CustomFrameworks;
