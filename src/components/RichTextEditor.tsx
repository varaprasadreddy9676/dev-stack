import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  Bold, 
  Italic, 
  Underline,
  ArrowDown,
  ArrowRight,
  Code
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface RichTextEditorProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  allowHtml?: boolean;  // New prop to enable HTML
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ 
  id, 
  value, 
  onChange, 
  allowHtml = false  // Default to false for safety
}) => {
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
  
  const insertMarkdown = (prefix: string, suffix: string = "") => {
    if (!textAreaRef.current) return;
    
    const textarea = textAreaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    const newText = 
      value.substring(0, start) + 
      prefix + 
      selectedText + 
      suffix + 
      value.substring(end);
    
    onChange(newText);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length, 
        start + prefix.length + selectedText.length
      );
    }, 0);
  };

  const formatBold = () => insertMarkdown("**", "**");
  const formatItalic = () => insertMarkdown("*", "*");
  const formatUnderline = () => insertMarkdown("__", "__");
  const formatHeading = () => insertMarkdown("## ");
  const formatList = () => insertMarkdown("- ");
  const formatCode = () => insertMarkdown("```\n", "\n```");
  const formatLink = () => insertMarkdown("[", "](url)");
  const formatHtml = () => insertMarkdown("<div>", "</div>");
  
  return (
    <div className="border rounded-md">
      <div className="bg-muted p-2 border-b flex flex-wrap gap-2">
        <Button 
          type="button" 
          variant="ghost" 
          size="sm"
          className="h-8 px-2"
          onClick={formatBold}
        >
          <Bold className="h-4 w-4" />
          <span className="sr-only">Bold</span>
        </Button>
        
        <Button 
          type="button" 
          variant="ghost" 
          size="sm"
          className="h-8 px-2"
          onClick={formatItalic}
        >
          <Italic className="h-4 w-4" />
          <span className="sr-only">Italic</span>
        </Button>
        
        <Button 
          type="button" 
          variant="ghost" 
          size="sm"
          className="h-8 px-2"
          onClick={formatUnderline}
        >
          <Underline className="h-4 w-4" />
          <span className="sr-only">Underline</span>
        </Button>
        
        <div className="h-5 w-px bg-border mx-1"></div>
        
        <Button 
          type="button" 
          variant="ghost" 
          size="sm"
          className="h-8 px-2"
          onClick={formatHeading}
        >
          <span className="text-xs font-bold">H2</span>
          <span className="sr-only">Heading</span>
        </Button>
        
        <Button 
          type="button" 
          variant="ghost" 
          size="sm"
          className="h-8 px-2"
          onClick={formatList}
        >
          <ArrowRight className="h-4 w-4" />
          <span className="sr-only">List</span>
        </Button>
        
        {allowHtml && (
          <Button 
            type="button" 
            variant="ghost" 
            size="sm"
            className="h-8 px-2"
            onClick={formatHtml}
          >
            <Code className="h-4 w-4" />
            <span className="sr-only">HTML</span>
          </Button>
        )}
      </div>
      
      <Textarea
        ref={textAreaRef}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[200px] border-0 focus-visible:ring-0 resize-y font-mono text-sm"
        placeholder="Enter markdown or HTML content..."
      />
      
      <div className="bg-muted p-2 border-t text-xs text-muted-foreground">
        <ReactMarkdown 
          rehypePlugins={allowHtml ? [rehypeRaw] : []}
          className="prose"
        >
          {value}
        </ReactMarkdown>
        <p>
          {allowHtml 
            ? "HTML and Markdown supported" 
            : "Markdown supported: **bold**, *italic*, ## headings, - lists, ```code blocks```"
          }
        </p>
      </div>
    </div>
  );
};

export default RichTextEditor;
