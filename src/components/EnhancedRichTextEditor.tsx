
import React from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface EnhancedRichTextEditorProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  allowHtml?: boolean;
  minHeight?: number;
  placeholder?: string;
}

const EnhancedRichTextEditor: React.FC<EnhancedRichTextEditorProps> = ({
  id,
  value,
  onChange,
  allowHtml = true,
  minHeight = 300,
  placeholder = "Enter content here..."
}) => {
  // Configure toolbar based on whether HTML is allowed
  const modules = {
    toolbar: allowHtml 
      ? [
          [{ 'header': [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          ['link'],
          [{ 'align': [] }],
          ['clean'],
          ...(allowHtml ? [['code-block']] : [])
        ]
      : [
          [{ 'header': [1, 2, 3, false] }],
          ['bold', 'italic', 'underline'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          ['link'],
          ['clean']
        ]
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'link',
    'align',
    ...(allowHtml ? ['code-block'] : [])
  ];

  return (
    <div className="border rounded-md overflow-hidden">
      <ReactQuill
        id={id}
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        style={{ height: minHeight }}
        theme="snow"
      />
      <div className="bg-muted p-2 border-t text-xs text-muted-foreground">
        {allowHtml 
          ? "Rich text editor with HTML support" 
          : "Rich text editor (limited HTML)"
        }
      </div>
    </div>
  );
};

export default EnhancedRichTextEditor;
