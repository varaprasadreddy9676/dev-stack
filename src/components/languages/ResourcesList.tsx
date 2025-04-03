
import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileText, Code } from "lucide-react";
import DocumentViewer from "@/components/common/DocumentViewer";

interface Resource {
  title: string;
  type: string;
  url: string;
  description: string;
}

interface ResourcesListProps {
  resources: Resource[];
  languageName: string;
}

const ResourceIcon: React.FC<{ type: string }> = ({ type }) => {
  switch(type) {
    case 'link':
      return <ExternalLink className="h-5 w-5" />;
    case 'pdf':
      return <FileText className="h-5 w-5" />;
    case 'video':
      return <Code className="h-5 w-5" />;
    default:
      return <FileText className="h-5 w-5" />;
  }
};

const getResourceTypeClasses = (type: string) => {
  switch(type) {
    case 'link':
      return 'bg-blue-500/5 bg-blue-500/10 text-blue-500';
    case 'pdf':
      return 'bg-red-500/5 bg-red-500/10 text-red-500';
    case 'video':
      return 'bg-purple-500/5 bg-purple-500/10 text-purple-500';
    default:
      return 'bg-card/50 bg-primary/10 text-primary';
  }
};

const ResourcesList: React.FC<ResourcesListProps> = ({ resources, languageName }) => {
  const [viewDocument, setViewDocument] = useState<Resource | null>(null);
  
  const handleViewResource = (resource: Resource) => {
    setViewDocument(resource);
  };
  
  const closeDocumentViewer = () => {
    setViewDocument(null);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Learning Resources</CardTitle>
        <CardDescription>
          Helpful documentation, tutorials, and tools for {languageName}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {resources.map((resource, index) => (
            <div key={index} className={`p-4 border rounded-lg flex items-start gap-4 ${getResourceTypeClasses(resource.type).split(' ')[0]}`}>
              <div className={`rounded-full p-2 ${getResourceTypeClasses(resource.type).split(' ').slice(1).join(' ')}`}>
                <ResourceIcon type={resource.type} />
              </div>
              
              <div className="flex-1">
                <h3 className="font-medium mb-1">
                  {resource.title}
                </h3>
                <p className="text-sm text-muted-foreground">{resource.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleViewResource(resource)}
                  >
                    View Document
                  </Button>
                  <a 
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm hover:text-primary transition-colors gap-1"
                  >
                    Open in new tab
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
                <div className="mt-2">
                  <Badge variant="outline" className="text-xs">
                    {resource.type}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      
      {/* Document Viewer */}
      {viewDocument && (
        <DocumentViewer
          isOpen={!!viewDocument}
          onClose={closeDocumentViewer}
          document={viewDocument}
        />
      )}
    </Card>
  );
};

export default ResourcesList;
