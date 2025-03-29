
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
  TrashIcon, 
  SaveIcon,
  Link as LinkIcon,
  FileText as FileTextIcon,
  Play as PlayIcon,
  ExternalLink as ExternalLinkIcon
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ProjectData } from "@/hooks/useProjectData";
import { updateArrayItem, removeArrayItem } from "@/utils/projectHelpers";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProjectResourcesProps {
  project: ProjectData;
  onSave: (updatedData: Partial<ProjectData>) => Promise<void>;
}

interface ResourceType {
  title: string;
  type: "link" | "pdf" | "video";
  url: string;
  description: string;
}

const ResourceTypeIcons = {
  link: <LinkIcon className="h-4 w-4" />,
  pdf: <FileTextIcon className="h-4 w-4" />,
  video: <PlayIcon className="h-4 w-4" />
};

const ProjectResources: React.FC<ProjectResourcesProps> = ({ project, onSave }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [resources, setResources] = useState<ResourceType[]>([...project.resources]);
  const [showNewResourceForm, setShowNewResourceForm] = useState<boolean>(false);
  const [newResource, setNewResource] = useState<ResourceType>({
    title: "",
    type: "link",
    url: "",
    description: ""
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedProject = {
      resources: resources
    };
    
    await onSave(updatedProject);
    setIsEditing(false);
  };

  const startEditResource = (index: number) => {
    setEditingIndex(index);
    setNewResource({ ...resources[index] });
    setShowNewResourceForm(true);
  };

  const saveResource = () => {
    if (newResource.title && newResource.url) {
      if (editingIndex !== null) {
        // Update existing
        const updatedResources = updateArrayItem(
          resources,
          editingIndex,
          { ...newResource }
        );
        setResources(updatedResources);
      } else {
        // Add new
        setResources([...resources, { ...newResource }]);
      }
      
      setNewResource({
        title: "",
        type: "link",
        url: "",
        description: ""
      });
      setShowNewResourceForm(false);
      setEditingIndex(null);
    }
  };

  const removeResource = (index: number) => {
    const updatedResources = removeArrayItem(resources, index);
    setResources(updatedResources);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Project Resources</CardTitle>
          <CardDescription>Documentation, links, and references</CardDescription>
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
              onClick={handleSubmit}
            >
              <SaveIcon className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-6">
            {!showNewResourceForm && (
              <Button 
                variant="outline"
                onClick={() => {
                  setNewResource({
                    title: "",
                    type: "link",
                    url: "",
                    description: ""
                  });
                  setEditingIndex(null);
                  setShowNewResourceForm(true);
                }}
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Resource
              </Button>
            )}
            
            {showNewResourceForm && (
              <div className="border p-4 rounded-md bg-muted/30 space-y-4">
                <h3 className="font-medium">
                  {editingIndex === null ? "Add Resource" : "Edit Resource"}
                </h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="resource-title">Title</Label>
                    <Input 
                      id="resource-title" 
                      value={newResource.title} 
                      onChange={(e) => setNewResource(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g., API Documentation"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="resource-type">Type</Label>
                    <Select 
                      value={newResource.type}
                      onValueChange={(value) => setNewResource(prev => ({ 
                        ...prev, 
                        type: value as "link" | "pdf" | "video" 
                      }))}
                    >
                      <SelectTrigger id="resource-type">
                        <SelectValue placeholder="Select resource type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="link">Link</SelectItem>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="resource-url">URL</Label>
                    <Input 
                      id="resource-url" 
                      value={newResource.url} 
                      onChange={(e) => setNewResource(prev => ({ ...prev, url: e.target.value }))}
                      placeholder="https://..."
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="resource-description">Description</Label>
                    <Textarea 
                      id="resource-description" 
                      value={newResource.description} 
                      onChange={(e) => setNewResource(prev => ({ ...prev, description: e.target.value }))}
                      rows={2}
                      placeholder="Brief description of this resource"
                    />
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="ghost"
                      onClick={() => {
                        setShowNewResourceForm(false);
                        setEditingIndex(null);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={saveResource}
                      disabled={!newResource.title || !newResource.url}
                    >
                      {editingIndex === null ? "Add" : "Update"} Resource
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {resources.length > 0 && (
              <div className="space-y-3">
                {resources.map((resource, index) => (
                  <div key={index} className="flex justify-between items-center border p-3 rounded-md">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <div className="mr-2">
                          {ResourceTypeIcons[resource.type]}
                        </div>
                        <div>
                          <div className="font-medium">{resource.title}</div>
                          <div className="text-sm truncate text-muted-foreground">
                            {resource.url}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => startEditResource(index)}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeResource(index)}
                      >
                        <TrashIcon className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {project.resources.length === 0 ? (
              <p className="text-muted-foreground italic">No resources added yet.</p>
            ) : (
              <div className="divide-y">
                {project.resources.map((resource, index) => (
                  <div key={index} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex items-start">
                      <div className="mr-3 mt-1">
                        {ResourceTypeIcons[resource.type]}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-medium">{resource.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {resource.description}
                        </p>
                        <div className="mt-2">
                          <a 
                            href={resource.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm text-primary hover:underline"
                          >
                            Visit resource
                            <ExternalLinkIcon className="ml-1 h-3 w-3" />
                          </a>
                        </div>
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

export default ProjectResources;
