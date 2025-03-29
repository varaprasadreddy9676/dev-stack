
import React from "react";
import { Textarea } from "@/components/ui/textarea";

// This is a simple placeholder for a rich text editor
// In a real application, you would use a library like TipTap, Slate, or React-Quill
interface RichTextEditorProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ id, value, onChange }) => {
  return (
    <div className="border rounded-md">
      <div className="bg-muted p-2 border-b flex gap-2">
        <button type="button" className="p-1 hover:bg-background rounded">
          <span className="font-bold">B</span>
        </button>
        <button type="button" className="p-1 hover:bg-background rounded">
          <span className="italic">I</span>
        </button>
        <button type="button" className="p-1 hover:bg-background rounded">
          <span className="underline">U</span>
        </button>
        <div className="h-5 w-px bg-border mx-1"></div>
        <button type="button" className="p-1 hover:bg-background rounded">
          <span># Heading</span>
        </button>
        <button type="button" className="p-1 hover:bg-background rounded">
          <span>• List</span>
        </button>
        <button type="button" className="p-1 hover:bg-background rounded">
          <span>{"```"} Code</span>
        </button>
      </div>
      
      <Textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[200px] border-0 focus-visible:ring-0 resize-y"
        placeholder="Enter markdown content..."
      />
      
      <div className="bg-muted p-2 border-t text-xs text-muted-foreground">
        Markdown supported
      </div>
    </div>
  );
};

export default RichTextEditor;
