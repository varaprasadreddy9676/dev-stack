
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
import { 
  PencilIcon, 
  XIcon, 
  PlusIcon, 
  TrashIcon, 
  SaveIcon 
} from "lucide-react";
import { ProjectData } from "@/hooks/useProjectData";
import { updateArrayItem, removeArrayItem, addArrayItem } from "@/utils/projectHelpers";

interface ProjectStructureProps {
  project: ProjectData;
  onSave: (updatedData: Partial<ProjectData>) => Promise<void>;
}

interface FolderType {
  path: string;
  purpose: string;
}

const ProjectStructure: React.FC<ProjectStructureProps> = ({ project, onSave }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    description: project.structure.description,
    folders: [...project.structure.folders]
  });
  const [newFolder, setNewFolder] = useState<FolderType>({
    path: "",
    purpose: ""
  });
  const [showNewFolderForm, setShowNewFolderForm] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedProject = {
      structure: formData
    };
    
    await onSave(updatedProject);
    setIsEditing(false);
  };

  const handleFolderChange = (index: number, field: keyof FolderType, value: string) => {
    const updatedFolders = updateArrayItem(
      formData.folders, 
      index, 
      { ...formData.folders[index], [field]: value }
    );
    
    setFormData(prev => ({ ...prev, folders: updatedFolders }));
  };

  const handleAddFolder = () => {
    if (newFolder.path && newFolder.purpose) {
      setFormData(prev => ({
        ...prev,
        folders: addArrayItem(prev.folders, { ...newFolder })
      }));
      
      setNewFolder({ path: "", purpose: "" });
      setShowNewFolderForm(false);
    }
  };

  const handleRemoveFolder = (index: number) => {
    const updatedFolders = removeArrayItem(formData.folders, index);
    setFormData(prev => ({ ...prev, folders: updatedFolders }));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Project Structure</CardTitle>
          <CardDescription>File and folder organization</CardDescription>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? <XIcon className="h-4 w-4 mr-2" /> : <PencilIcon className="h-4 w-4 mr-2" />}
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="structure-description">Structure Description</Label>
              <Textarea 
                id="structure-description" 
                value={formData.description} 
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Folders</h3>
                {!showNewFolderForm && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowNewFolderForm(true)}
                  >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add Folder
                  </Button>
                )}
              </div>
              
              {formData.folders.map((folder, index) => (
                <div key={index} className="border p-4 rounded-md mb-4">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-medium font-mono">{folder.path}</h4>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleRemoveFolder(index)}
                    >
                      <TrashIcon className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                  
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`folder-path-${index}`}>Path</Label>
                      <Input 
                        id={`folder-path-${index}`} 
                        value={folder.path} 
                        onChange={(e) => handleFolderChange(index, "path", e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`folder-purpose-${index}`}>Purpose</Label>
                      <Textarea 
                        id={`folder-purpose-${index}`} 
                        value={folder.purpose} 
                        onChange={(e) => handleFolderChange(index, "purpose", e.target.value)}
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              {showNewFolderForm && (
                <div className="border p-4 rounded-md mb-4 bg-muted/30">
                  <h4 className="font-medium mb-3">New Folder</h4>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-folder-path">Path</Label>
                      <Input 
                        id="new-folder-path" 
                        value={newFolder.path} 
                        onChange={(e) => setNewFolder(prev => ({ ...prev, path: e.target.value }))}
                        placeholder="/src/components"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="new-folder-purpose">Purpose</Label>
                      <Textarea 
                        id="new-folder-purpose" 
                        value={newFolder.purpose} 
                        onChange={(e) => setNewFolder(prev => ({ ...prev, purpose: e.target.value }))}
                        rows={2}
                        placeholder="What this folder contains"
                      />
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <Button 
                        type="button" 
                        variant="ghost"
                        onClick={() => {
                          setShowNewFolderForm(false);
                          setNewFolder({ path: "", purpose: "" });
                        }}
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={handleAddFolder}
                        disabled={!newFolder.path || !newFolder.purpose}
                      >
                        Add Folder
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" type="button" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button type="submit">
                <SaveIcon className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Structure Description</h3>
              <p>{project.structure.description}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Folders</h3>
              
              {project.structure.folders.length === 0 ? (
                <p className="text-muted-foreground italic">No folders defined yet.</p>
              ) : (
                <div className="space-y-4">
                  {project.structure.folders.map((folder, index) => (
                    <div key={index} className="p-3 bg-muted/50 rounded-md">
                      <div className="font-mono text-sm">{folder.path}</div>
                      <div className="text-sm text-muted-foreground mt-1">{folder.purpose}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectStructure;
