
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
          <div className="prose dark:prose-invert max-w-none">
            <ReactMarkdown 
              rehypePlugins={[rehypeRaw]}
              components={{
                h1: ({node, ...props}) => <h1 className="text-3xl font-bold mb-4" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-2xl font-semibold mt-6 mb-3" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-xl font-semibold mt-5 mb-2" {...props} />,
                p: ({node, ...props}) => <p className="mb-4 leading-relaxed" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-4" {...props} />,
                li: ({node, ...props}) => <li className="mb-1" {...props} />,
                code: ({node, inline, ...props}) => 
                  inline 
                    ? <code className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5 text-sm" {...props} />
                    : <pre className="bg-gray-100 dark:bg-gray-800 rounded p-3 overflow-x-auto mb-4"><code {...props} /></pre>,
                blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 italic my-4" {...props} />,
                a: ({node, ...props}) => <a className="text-primary hover:underline" {...props} />
              }}
            >
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
