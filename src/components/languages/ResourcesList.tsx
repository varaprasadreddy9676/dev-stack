
import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileText, Code, Eye } from "lucide-react";
import DocumentViewer, { DocumentFile } from "@/components/common/DocumentViewer";

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
    case 'doc':
    case 'docx':
    case 'ppt':
    case 'pptx':
    case 'xls':
    case 'xlsx':
    case 'txt':
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
    case 'doc':
    case 'docx':
    case 'txt':
      return 'bg-red-500/5 bg-red-500/10 text-red-500';
    case 'ppt':
    case 'pptx':
      return 'bg-orange-500/5 bg-orange-500/10 text-orange-500';
    case 'xls':
    case 'xlsx':
      return 'bg-green-500/5 bg-green-500/10 text-green-500';
    case 'video':
      return 'bg-purple-500/5 bg-purple-500/10 text-purple-500';
    default:
      return 'bg-card/50 bg-primary/10 text-primary';
  }
};

const isViewableDocument = (type: string): boolean => {
  const viewableTypes = ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'txt'];
  return viewableTypes.includes(type.toLowerCase());
};

const ResourceItem: React.FC<{ resource: Resource }> = ({ resource }) => {
  const [showDocViewer, setShowDocViewer] = useState(false);
  const typeClasses = getResourceTypeClasses(resource.type);
  const canViewDocument = isViewableDocument(resource.type);
  
  return (
    <div className={`p-4 border rounded-lg flex items-start gap-4 ${typeClasses.split(' ')[0]}`}>
      <div className={`rounded-full p-2 ${typeClasses.split(' ').slice(1).join(' ')}`}>
        <ResourceIcon type={resource.type} />
      </div>
      
      <div className="flex-1">
        <h3 className="font-medium mb-1">
          {resource.title}
        </h3>
        <p className="text-sm text-muted-foreground">{resource.description}</p>
        <div className="mt-2 flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {resource.type}
          </Badge>
          
          <div className="flex gap-2 mt-1">
            {canViewDocument && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs h-7 px-2"
                onClick={() => setShowDocViewer(true)}
              >
                <Eye className="h-3.5 w-3.5 mr-1" />
                View
              </Button>
            )}
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs h-7 px-2"
              onClick={() => window.open(resource.url, "_blank")}
            >
              <ExternalLink className="h-3.5 w-3.5 mr-1" />
              Open
            </Button>
          </div>
        </div>
      </div>

      {showDocViewer && (
        <DocumentViewer
          isOpen={showDocViewer}
          onClose={() => setShowDocViewer(false)}
          documents={[
            {
              uri: resource.url,
              fileName: resource.title,
              fileType: resource.type
            }
          ]}
          title={resource.title}
        />
      )}
    </div>
  );
};

const ResourcesList: React.FC<ResourcesListProps> = ({ resources, languageName }) => {
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
            <ResourceItem key={index} resource={resource} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourcesList;
