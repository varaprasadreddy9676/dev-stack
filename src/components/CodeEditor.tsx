
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
  // Function to format code - placeholder implementation
  const formatCode = () => {
    // In a real app, this would use a formatter like Prettier
    // For now, we'll just preserve the code as is
    alert("Code formatting would happen here in a real app");
  };
  
  // Function to get syntax highlighting class
  const getSyntaxClass = (lang: string): string => {
    const langMap: Record<string, string> = {
      javascript: "bg-muted/30",
      typescript: "bg-muted/30",
      jsx: "bg-muted/30",
      tsx: "bg-muted/30",
      html: "bg-muted/30",
      css: "bg-muted/30",
      json: "bg-muted/30"
    };
    
    return langMap[lang] || "bg-muted/30";
  };
  
  return (
    <div className="border rounded-md overflow-hidden">
      <div className="bg-muted p-2 border-b flex justify-between">
        <div className="text-xs">{language}</div>
        <div className="flex gap-2">
          <button 
            type="button" 
            onClick={formatCode}
            className="text-xs hover:text-primary"
          >
            Format
          </button>
        </div>
      </div>
      
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full min-h-[150px] p-3 font-mono text-sm focus:outline-none resize-y ${getSyntaxClass(language)}`}
        placeholder={`Enter ${language} code...`}
        spellCheck="false"
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
      />
    </div>
  );
};

export default CodeEditor;
