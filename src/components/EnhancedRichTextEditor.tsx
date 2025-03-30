
import React, { useEffect, useRef, useState } from "react";
import { Editor } from '@tinymce/tinymce-react';

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
  const editorRef = useRef<any>(null);
  const [isReady, setIsReady] = useState(false);

  // Configure toolbar based on whether HTML is allowed
  const getToolbar = () => {
    const basicFormatting = 'undo redo | formatselect | bold italic underline | bullist numlist | link';
    const advancedFormatting = allowHtml 
      ? ' | alignleft aligncenter alignright | removeformat | code'
      : ' | removeformat';
    
    return `${basicFormatting}${advancedFormatting}`;
  };

  return (
    <div className="border rounded-md overflow-hidden">
      <Editor
        id={id}
        apiKey="no-api-key" // For TinyMCE free version
        onInit={(evt, editor) => {
          editorRef.current = editor;
          setIsReady(true);
        }}
        initialValue={value}
        value={value}
        onEditorChange={(newValue) => onChange(newValue)}
        init={{
          height: minHeight,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'charmap',
            'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'table', 'wordcount'
          ],
          toolbar: getToolbar(),
          content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue, sans-serif; font-size: 14px; }',
          placeholder: placeholder,
          branding: false,
          promotion: false,
          browser_spellcheck: true,
          contextmenu: false,
          entity_encoding: 'raw',
          convert_urls: false,
          setup: function (editor) {
            editor.on('change', function () {
              onChange(editor.getContent());
            });
          }
        }}
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
