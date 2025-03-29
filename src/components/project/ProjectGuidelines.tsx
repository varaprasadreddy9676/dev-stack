
import React, { useState } from "react";
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PencilIcon, XIcon, SaveIcon } from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";
import { ProjectData } from "@/types/project";
import { formatDate } from "@/utils/projectHelpers";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface ProjectGuidelinesProps {
  project: ProjectData;
  onSave: (updatedData: Partial<ProjectData>) => Promise<void>;
}

const ProjectGuidelines: React.FC<ProjectGuidelinesProps> = ({ project, onSave }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [content, setContent] = useState<string>(project.guidelines.content);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedProject = {
      guidelines: {
        ...project.guidelines,
        content,
        lastUpdated: new Date(),
        // In a real app, this would be the current user's ID
        updatedBy: "user123"
      }
    };
    
    await onSave(updatedProject);
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Project Guidelines</CardTitle>
          <CardDescription>Best practices and standards</CardDescription>
        </div>
        {isEditing ? (
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
        ) : (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsEditing(true)}
          >
            <PencilIcon className="h-4 w-4 mr-2" />
            Edit
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <RichTextEditor 
                value={content} 
                onChange={setContent}
                allowHtml={true}
              />
              <p className="text-xs text-muted-foreground mt-2">
                Last updated: {formatDate(project.guidelines.lastUpdated)}
              </p>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="prose max-w-none dark:prose-invert">
              <ReactMarkdown rehypePlugins={[rehypeRaw]}>{project.guidelines.content}</ReactMarkdown>
            </div>
            
            <div className="text-sm text-muted-foreground">
              Last updated: {formatDate(project.guidelines.lastUpdated)}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectGuidelines;
