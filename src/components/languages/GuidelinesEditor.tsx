
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PencilIcon, SaveIcon, X, BookOpen } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import RichTextEditor from "@/components/RichTextEditor";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Separator } from "@/components/ui/separator";

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
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between p-4 md:p-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-lg md:text-xl">Coding Guidelines</CardTitle>
          </div>
          <CardDescription className="text-xs md:text-sm">
            Standards and best practices for development
          </CardDescription>
        </div>
        {isEditing ? (
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsEditing(false)}
              className="h-9 md:h-10 min-w-[80px] touch-friendly"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              onClick={handleSaveGuidelines}
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
      <CardContent className="p-4 md:p-6 pt-2 md:pt-3">
        {isEditing ? (
          <div className="space-y-4">
            <RichTextEditor 
              value={guidelinesContent} 
              onChange={setGuidelinesContent} 
              allowHtml={true}
            />
            <Button
              onClick={handleSaveGuidelines}
              className="w-full md:w-auto mt-3 h-10 md:h-11 touch-friendly"
            >
              <SaveIcon className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="prose dark:prose-invert max-w-none">
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
                  blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 italic my-4" {...props} />,
                  a: ({node, ...props}) => <a className="text-primary hover:underline" {...props} />,
                  code: ({node, className, ...props}: any) => {
                    const match = /language-(\w+)/.exec(className || '');
                    const isInline = !match && !className;
                    
                    return isInline ? (
                      <code className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5 text-sm" {...props} />
                    ) : (
                      <pre className="bg-gray-100 dark:bg-gray-800 rounded p-3 overflow-x-auto mb-4">
                        <code className={className} {...props} />
                      </pre>
                    );
                  }
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
            
            <Separator className="my-4" />
            
            <div className="text-xs md:text-sm text-muted-foreground flex items-center">
              Last updated on {formatDate(lastUpdated)}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GuidelinesEditor;
