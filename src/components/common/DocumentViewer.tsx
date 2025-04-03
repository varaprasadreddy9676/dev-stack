
import React from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ExternalLink } from "lucide-react";

interface DocumentViewerProps {
  isOpen: boolean;
  onClose: () => void;
  document: {
    title: string;
    url: string;
    description?: string;
    type?: string;
  };
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({
  isOpen,
  onClose,
  document
}) => {
  const docs = [{ uri: document.url }];
  
  // Check if the document URL is external (starts with http or https)
  const isExternalUrl = document.url.startsWith('http://') || document.url.startsWith('https://');
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex flex-row items-center justify-between pr-0">
          <div className="flex-1 mr-2">
            <DialogTitle className="text-xl">{document.title}</DialogTitle>
            {document.description && (
              <DialogDescription className="text-sm mt-1">
                {document.description}
              </DialogDescription>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open(document.url, "_blank")}
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              Open in New Tab
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="flex-1 overflow-auto rounded-md border bg-background">
          {isExternalUrl ? (
            <DocViewer
              documents={docs}
              pluginRenderers={DocViewerRenderers}
              config={{
                header: {
                  disableHeader: true,
                  disableFileName: true,
                  retainURLParams: false
                }
              }}
              style={{ height: '100%' }}
            />
          ) : (
            <div className="flex items-center justify-center h-full p-8 text-center">
              <div>
                <p className="mb-4 text-muted-foreground">
                  This document cannot be previewed.
                </p>
                <Button
                  onClick={() => window.open(document.url, "_blank")}
                >
                  Download Document
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentViewer;
