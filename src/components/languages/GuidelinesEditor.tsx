
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PencilIcon, SaveIcon, X } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import RichTextEditor from "@/components/RichTextEditor";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface GuidelinesEditorProps {
  content: string;
  lastUpdated: Date;
  onSave: (content: string) => void;
  formatDate: (date: Date) => string;
}

const GuidelinesEditor: React.FC<GuidelinesEditorProps> = ({
  content, 
  lastUpdated, 
  onSave,
  formatDate
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [guidelinesContent, setGuidelinesContent] = useState(content);

  const handleSaveGuidelines = () => {
    onSave(guidelinesContent);
    toast.success("Guidelines updated successfully");
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Coding Guidelines</CardTitle>
          <CardDescription>
            Standards and best practices for development
          </CardDescription>
        </div>
        {isEditing ? (
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsEditing(false)}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              onClick={handleSaveGuidelines}
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
      <CardContent className="prose dark:prose-invert max-w-none">
        {isEditing ? (
          <RichTextEditor 
            value={guidelinesContent} 
            onChange={setGuidelinesContent} 
            allowHtml={true}
          />
        ) : (
          <div>
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
              {content}
            </ReactMarkdown>
          </div>
        )}
        <div className="text-sm text-muted-foreground mt-4">
          Last updated on {formatDate(lastUpdated)}
        </div>
      </CardContent>
    </Card>
  );
};

export default GuidelinesEditor;
