
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

interface ProjectArchitectureProps {
  project: ProjectData;
  onSave: (updatedData: Partial<ProjectData>) => Promise<void>;
}

interface DiagramType {
  title: string;
  imageUrl: string;
  description: string;
}

const ProjectArchitecture: React.FC<ProjectArchitectureProps> = ({ project, onSave }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    description: project.architecture.description,
    diagrams: [...project.architecture.diagrams]
  });
  const [newDiagram, setNewDiagram] = useState<DiagramType>({
    title: "",
    imageUrl: "",
    description: ""
  });
  const [showNewDiagramForm, setShowNewDiagramForm] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedProject = {
      architecture: formData
    };
    
    await onSave(updatedProject);
    setIsEditing(false);
  };

  const handleDiagramChange = (index: number, field: keyof DiagramType, value: string) => {
    const updatedDiagrams = updateArrayItem(
      formData.diagrams, 
      index, 
      { ...formData.diagrams[index], [field]: value }
    );
    
    setFormData(prev => ({ ...prev, diagrams: updatedDiagrams }));
  };

  const handleAddDiagram = () => {
    if (newDiagram.title && newDiagram.imageUrl) {
      setFormData(prev => ({
        ...prev,
        diagrams: addArrayItem(prev.diagrams, { ...newDiagram })
      }));
      
      setNewDiagram({ title: "", imageUrl: "", description: "" });
      setShowNewDiagramForm(false);
    }
  };

  const handleRemoveDiagram = (index: number) => {
    const updatedDiagrams = removeArrayItem(formData.diagrams, index);
    setFormData(prev => ({ ...prev, diagrams: updatedDiagrams }));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Architecture</CardTitle>
          <CardDescription>System architecture and diagrams</CardDescription>
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
              <Label htmlFor="arch-description">Architecture Description</Label>
              <Textarea 
                id="arch-description" 
                value={formData.description} 
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Diagrams</h3>
                {!showNewDiagramForm && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowNewDiagramForm(true)}
                  >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add Diagram
                  </Button>
                )}
              </div>
              
              {formData.diagrams.map((diagram, index) => (
                <div key={index} className="border p-4 rounded-md mb-4">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-medium">Diagram {index + 1}</h4>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleRemoveDiagram(index)}
                    >
                      <TrashIcon className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                  
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`diagram-title-${index}`}>Title</Label>
                      <Input 
                        id={`diagram-title-${index}`} 
                        value={diagram.title} 
                        onChange={(e) => handleDiagramChange(index, "title", e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`diagram-image-${index}`}>Image URL</Label>
                      <Input 
                        id={`diagram-image-${index}`} 
                        value={diagram.imageUrl} 
                        onChange={(e) => handleDiagramChange(index, "imageUrl", e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`diagram-desc-${index}`}>Description</Label>
                      <Textarea 
                        id={`diagram-desc-${index}`} 
                        value={diagram.description} 
                        onChange={(e) => handleDiagramChange(index, "description", e.target.value)}
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              {showNewDiagramForm && (
                <div className="border p-4 rounded-md mb-4 bg-muted/30">
                  <h4 className="font-medium mb-3">New Diagram</h4>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-diagram-title">Title</Label>
                      <Input 
                        id="new-diagram-title" 
                        value={newDiagram.title} 
                        onChange={(e) => setNewDiagram(prev => ({ ...prev, title: e.target.value }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="new-diagram-image">Image URL</Label>
                      <Input 
                        id="new-diagram-image" 
                        value={newDiagram.imageUrl} 
                        onChange={(e) => setNewDiagram(prev => ({ ...prev, imageUrl: e.target.value }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="new-diagram-desc">Description</Label>
                      <Textarea 
                        id="new-diagram-desc" 
                        value={newDiagram.description} 
                        onChange={(e) => setNewDiagram(prev => ({ ...prev, description: e.target.value }))}
                        rows={2}
                      />
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <Button 
                        type="button" 
                        variant="ghost"
                        onClick={() => {
                          setShowNewDiagramForm(false);
                          setNewDiagram({ title: "", imageUrl: "", description: "" });
                        }}
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={handleAddDiagram}
                        disabled={!newDiagram.title || !newDiagram.imageUrl}
                      >
                        Add Diagram
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
              <h3 className="text-lg font-medium">Architecture Description</h3>
              <p>{project.architecture.description}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Diagrams</h3>
              
              {project.architecture.diagrams.length === 0 ? (
                <p className="text-muted-foreground italic">No diagrams added yet.</p>
              ) : (
                <div className="grid gap-6">
                  {project.architecture.diagrams.map((diagram, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">{diagram.title}</h4>
                      <div className="bg-muted rounded-md p-6 text-center mb-3">
                        {diagram.imageUrl ? (
                          <img 
                            src={diagram.imageUrl} 
                            alt={diagram.title}
                            className="max-h-64 mx-auto"
                          />
                        ) : (
                          <div className="text-muted-foreground">Image placeholder</div>
                        )}
                      </div>
                      <p className="text-sm">{diagram.description}</p>
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

export default ProjectArchitecture;
