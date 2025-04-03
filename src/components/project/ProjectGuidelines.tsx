
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
        lastUpdated: new Date().toISOString(),
        updatedBy: "user123" // In a real app, this would be the current user's ID
      }
    };
    
    await onSave(updatedProject);
    setIsEditing(false);
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between p-4 md:p-6">
        <div>
          <CardTitle className="text-lg md:text-xl">Project Guidelines</CardTitle>
          <CardDescription className="text-sm md:text-base">Best practices and standards</CardDescription>
        </div>
        {isEditing ? (
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsEditing(false)}
              className="h-9 md:h-10 min-w-[80px] touch-friendly"
            >
              <XIcon className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              onClick={handleSubmit}
              className="h-9 md:h-10 min-w-[80px] touch-friendly"
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
            className="h-9 md:h-10 min-w-[80px] touch-friendly"
          >
            <PencilIcon className="h-4 w-4 mr-2" />
            Edit
          </Button>
        )}
      </CardHeader>
      <CardContent className="p-4 md:p-6 pt-2 md:pt-4">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-3">
              <RichTextEditor 
                value={content} 
                onChange={setContent}
                allowHtml={true}
              />
              <p className="text-xs text-muted-foreground mt-3">
                Last updated: {formatDate(project.guidelines.lastUpdated)}
              </p>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="prose max-w-none dark:prose-invert">
              <ReactMarkdown 
                rehypePlugins={[rehypeRaw]}
                components={{
                  h1: ({node, ...props}) => <h1 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-xl md:text-2xl font-semibold mt-5 md:mt-6 mb-2 md:mb-3" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-lg md:text-xl font-medium mt-4 md:mt-5 mb-2" {...props} />,
                  p: ({node, ...props}) => <p className="mb-3 md:mb-4 leading-relaxed text-sm md:text-base" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc pl-5 md:pl-6 mb-3 md:mb-4 text-sm md:text-base" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal pl-5 md:pl-6 mb-3 md:mb-4 text-sm md:text-base" {...props} />,
                  li: ({node, ...props}) => <li className="mb-1 md:mb-2" {...props} />,
                  code: ({node, ...props}) => <code className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5 text-sm" {...props} />
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
            
            <div className="text-xs md:text-sm text-muted-foreground pt-3 border-t">
              Last updated: {formatDate(project.guidelines.lastUpdated)}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectGuidelines;
