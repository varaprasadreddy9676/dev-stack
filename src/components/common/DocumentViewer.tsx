
import React from "react";
import DocViewer, { DocViewerRenderers, ITheme } from "@cyntler/react-doc-viewer";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

export interface DocumentFile {
  uri: string;
  fileType?: string;
  fileName?: string;
}

interface DocumentViewerProps {
  isOpen: boolean;
  onClose: () => void;
  documents: DocumentFile[];
  title?: string;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({
  isOpen,
  onClose,
  documents,
  title = "Document Viewer"
}) => {
  // Create a custom theme that uses our app's colors
  const customTheme: ITheme = {
    primary: "rgb(var(--primary))",
    secondary: "rgb(var(--secondary))",
    tertiary: "#f5f5f5",
    textPrimary: "rgb(var(--foreground))",
    textSecondary: "rgb(var(--muted-foreground))"
    // 'background' is not a valid property in ITheme, so we've removed it
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl w-[90vw] max-h-[90vh] h-auto overflow-hidden">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="h-[calc(90vh-8rem)] overflow-auto">
          {documents.length > 0 ? (
            <DocViewer
              documents={documents}
              pluginRenderers={DocViewerRenderers}
              theme={customTheme}
              style={{ height: "100%" }}
              config={{
                header: {
                  disableFileName: false,
                  disableHeader: false,
                  retainURLParams: false
                },
                // Fix for the loadingRenderer - provide it as a component reference instead of a direct function
                loadingRenderer: {
                  overrideComponent: () => (
                    <div className="flex items-center justify-center h-full">
                      <Loader2 className="h-10 w-10 animate-spin text-primary" />
                      <span className="ml-2">Loading document...</span>
                    </div>
                  )
                }
              }}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              No documents to display
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentViewer;
