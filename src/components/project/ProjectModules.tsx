import React, { useState } from "react";
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  PencilIcon, 
  XIcon, 
  PlusIcon, 
  TrashIcon, 
  SaveIcon 
} from "lucide-react";
import EnhancedRichTextEditor from "@/components/EnhancedRichTextEditor";
import { ProjectData } from "@/types/project";
import { updateArrayItem, removeArrayItem } from "@/utils/projectHelpers";
import { 
  dependenciesToString, 
  stringToDependencies 
} from "@/utils/projectHelpers";

interface ProjectModulesProps {
  project: ProjectData;
  onSave: (updatedData: Partial<ProjectData>) => Promise<void>;
}

interface ModuleType {
  name: string;
  description: string;
  documentation: string;
  dependencies: string[];
}

const ProjectModules: React.FC<ProjectModulesProps> = ({ project, onSave }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [modules, setModules] = useState<ModuleType[]>([...project.modules]);
  const [currentModuleIndex, setCurrentModuleIndex] = useState<number | null>(null);
  const [showModuleForm, setShowModuleForm] = useState<boolean>(false);
  const [moduleForm, setModuleForm] = useState<{
    name: string;
    description: string;
    documentation: string;
    dependencies: string; // string for form, converted to array on save
  }>({
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
          <div className="space-y-6">
            <Button 
              variant="outline" 
              onClick={() => startEditModule(null)}
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Add New Module
            </Button>
            
            {modules.length === 0 ? (
              <p className="text-muted-foreground italic">No modules defined yet.</p>
            ) : (
              <div className="space-y-4">
                {modules.map((module, index) => (
                  <div key={index} className="border rounded-md p-4">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-medium">{module.name}</h3>
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => startEditModule(index)}
                        >
                          <PencilIcon className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => deleteModule(index)}
                        >
                          <TrashIcon className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-muted-foreground mt-1">{module.description}</p>
                    <div className="flex gap-2 mt-3">
                      {module.dependencies.map((dep, i) => (
                        <Badge key={i} variant="outline">{dep}</Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : isEditing && showModuleForm ? (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">
              {currentModuleIndex === null ? "Add New Module" : "Edit Module"}
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="module-name">Module Name</Label>
                <Input 
                  id="module-name" 
                  value={moduleForm.name} 
                  onChange={(e) => setModuleForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Authentication"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="module-description">Short Description</Label>
                <Textarea 
                  id="module-description" 
                  value={moduleForm.description} 
                  onChange={(e) => setModuleForm(prev => ({ ...prev, description: e.target.value }))}
                  rows={2}
                  placeholder="Brief description of what this module does"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="module-documentation">Documentation</Label>
                <EnhancedRichTextEditor 
                  id="module-documentation" 
                  value={moduleForm.documentation} 
                  onChange={(value) => setModuleForm(prev => ({ ...prev, documentation: value }))}
                  minHeight={250}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="module-dependencies">Dependencies (comma-separated)</Label>
                <Input 
                  id="module-dependencies" 
                  value={moduleForm.dependencies} 
                  onChange={(e) => setModuleForm(prev => ({ ...prev, dependencies: e.target.value }))}
                  placeholder="e.g., axios, react-query, redux"
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button 
                variant="ghost"
                onClick={() => {
                  setShowModuleForm(false);
                  setCurrentModuleIndex(null);
                }}
              >
                Cancel
              </Button>
              <Button 
                variant="default"
                onClick={saveModule}
                disabled={!moduleForm.name || !moduleForm.description}
              >
                {currentModuleIndex === null ? "Add" : "Update"} Module
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {project.modules.length === 0 ? (
              <p className="text-muted-foreground italic">No modules defined for this project.</p>
            ) : (
              <div className="divide-y">
                {project.modules.map((module, index) => (
                  <div key={index} className="py-6 first:pt-0 last:pb-0">
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
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectModules;
