
import React from "react";

interface CodeEditorProps {
  id?: string;
  language?: string;
  value: string;
  onChange: (value: string) => void;
}

// This is a simple placeholder for a code editor
// In a real application, you would use a library like Monaco Editor, CodeMirror, or Prism
const CodeEditor: React.FC<CodeEditorProps> = ({ id, language = "javascript", value, onChange }) => {
  return (
    <div className="border rounded-md overflow-hidden">
      <div className="bg-muted p-2 border-b flex justify-between">
        <div className="text-xs">{language}</div>
        <div className="flex gap-2">
          <button type="button" className="text-xs hover:text-primary">Format</button>
        </div>
      </div>
      
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full min-h-[150px] p-3 bg-muted/30 font-mono text-sm focus:outline-none resize-y"
        placeholder={`Enter ${language} code...`}
      />
    </div>
  );
};

export default CodeEditor;
