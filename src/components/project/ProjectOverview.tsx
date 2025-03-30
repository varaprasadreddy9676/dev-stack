
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
import { PencilIcon, XIcon, SaveIcon } from "lucide-react";
import EnhancedRichTextEditor from "@/components/EnhancedRichTextEditor";
import { ProjectData } from "@/types/project";
import { tagsStringToArray } from "@/utils/projectHelpers";
import ReactMarkdown from "react-markdown";

interface ProjectOverviewProps {
  project: ProjectData;
  onSave: (updatedData: Partial<ProjectData>) => Promise<void>;
}

const ProjectOverview: React.FC<ProjectOverviewProps> = ({ project, onSave }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: project.name,
    description: project.description,
    overview: project.overview,
    tags: project.tags.join(", ")
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedProject = {
      name: formData.name,
      description: formData.description,
      overview: formData.overview,
      tags: tagsStringToArray(formData.tags)
    };
    
    await onSave(updatedProject);
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Project Overview</CardTitle>
          <CardDescription>Basic information about the project</CardDescription>
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name</Label>
              <Input 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Project Description</Label>
              <Textarea 
                id="description" 
                name="description" 
                value={formData.description} 
                onChange={handleChange}
                rows={2}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="overview">Project Overview</Label>
              <EnhancedRichTextEditor 
                id="overview" 
                value={formData.overview || ''} 
                onChange={(value) => setFormData(prev => ({ ...prev, overview: value }))}
                minHeight={250}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input 
                id="tags" 
                name="tags" 
                value={formData.tags} 
                onChange={handleChange}
              />
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
              <h3 className="text-lg font-medium">Project Name</h3>
              <p>{project.name}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium">Description</h3>
              <p>{project.description}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium">Overview</h3>
              <div className="prose max-w-none dark:prose-invert">
                <ReactMarkdown>{project.overview}</ReactMarkdown>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium">Tags</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectOverview;
