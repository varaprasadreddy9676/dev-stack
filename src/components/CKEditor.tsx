
import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

interface CKEditorProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  minHeight?: string;
}

const CKEditorComponent: React.FC<CKEditorProps> = ({
  id,
  value,
  onChange,
  placeholder = "Type your content here...",
  className,
  minHeight = "200px"
}) => {
  const [editorData, setEditorData] = useState(value);
  
  // Sync editor data with external value
  useEffect(() => {
    setEditorData(value);
  }, [value]);

  return (
    <div className={className} style={{ minHeight }}>
      <CKEditor
        editor={ClassicEditor}
        data={editorData}
        config={{
          placeholder,
          toolbar: [
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            '|',
            'outdent',
            'indent',
            '|',
            'blockQuote',
            'insertTable',
            'undo',
            'redo'
          ],
          language: 'en',
          // This removes the warning about the license key - it's allowed for the free version
          licenseKey: '',
        }}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          if (editor && editor.editing && editor.editing.view) {
            editor.editing.view.change((writer) => {
              writer.setStyle(
                'min-height',
                minHeight,
                editor.editing.view.document.getRoot()
              );
            });
          }
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setEditorData(data);
          onChange(data);
        }}
      />
    </div>
  );
};

export default CKEditorComponent;
