
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
  SaveIcon 
} from "lucide-react";
import { ProjectData } from "@/types/project";
import { updateArrayItem, removeArrayItem } from "@/utils/projectHelpers";
import { 
  dependenciesToString, 
  stringToDependencies 
} from "@/utils/projectHelpers";
import { ModuleType, ModuleFormData } from "./modules/moduleTypes";
import ModuleForm from "./modules/ModuleForm";
import ModuleList from "./modules/ModuleList";

interface ProjectModulesProps {
  project: ProjectData;
  onSave: (updatedData: Partial<ProjectData>) => Promise<void>;
}

const ProjectModules: React.FC<ProjectModulesProps> = ({ project, onSave }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [modules, setModules] = useState<ModuleType[]>([...project.modules]);
  const [currentModuleIndex, setCurrentModuleIndex] = useState<number | null>(null);
  const [showModuleForm, setShowModuleForm] = useState<boolean>(false);
  const [moduleForm, setModuleForm] = useState<ModuleFormData>({
    name: "",
    description: "",
    documentation: "",
    dependencies: ""
  });

  const handleSave = async () => {
    const updatedProject = {
      modules: modules
    };
    
    await onSave(updatedProject);
    setIsEditing(false);
  };

  const startEditModule = (index: number | null) => {
    if (index === null) {
      // Adding new module
      setModuleForm({
        name: "",
        description: "",
        documentation: "",
        dependencies: ""
      });
    } else {
      // Editing existing module
      const module = modules[index];
      setModuleForm({
        name: module.name,
        description: module.description,
        documentation: module.documentation,
        dependencies: dependenciesToString(module.dependencies)
      });
    }
    setCurrentModuleIndex(index);
    setShowModuleForm(true);
  };

  const saveModule = () => {
    // Convert dependencies string to array
    const dependencies = stringToDependencies(moduleForm.dependencies);
    
    const updatedModule = {
      name: moduleForm.name,
      description: moduleForm.description,
      documentation: moduleForm.documentation,
      dependencies
    };
    
    if (currentModuleIndex === null) {
      // Adding new module
      setModules([...modules, updatedModule]);
    } else {
      // Updating existing module
      const updatedModules = updateArrayItem(
        modules,
        currentModuleIndex,
        updatedModule
      );
      setModules(updatedModules);
    }
    
    setShowModuleForm(false);
    setCurrentModuleIndex(null);
  };

  const deleteModule = (index: number) => {
    const updatedModules = removeArrayItem(modules, index);
    setModules(updatedModules);
  };

  const cancelForm = () => {
    setShowModuleForm(false);
    setCurrentModuleIndex(null);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Project Modules</CardTitle>
          <CardDescription>Core functionality modules and libraries</CardDescription>
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
        {isEditing && !showModuleForm ? (
          <ModuleList 
            modules={modules}
            onAddModule={() => startEditModule(null)}
            onEditModule={startEditModule}
            onDeleteModule={deleteModule}
            isEditing={true}
          />
        ) : isEditing && showModuleForm ? (
          <ModuleForm 
            moduleData={moduleForm}
            setModuleForm={setModuleForm}
            onCancel={cancelForm}
            onSave={saveModule}
            isNew={currentModuleIndex === null}
          />
        ) : (
          <ModuleList 
            modules={project.modules}
            onAddModule={() => {}}
            onEditModule={() => {}}
            onDeleteModule={() => {}}
            isEditing={false}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectModules;
