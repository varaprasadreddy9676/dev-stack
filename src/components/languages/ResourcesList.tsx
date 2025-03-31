
import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, FileText, Code } from "lucide-react";

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

const ResourceItem: React.FC<{ resource: Resource }> = ({ resource }) => {
  const typeClasses = getResourceTypeClasses(resource.type);
  
  return (
    <div className={`p-4 border rounded-lg flex items-start gap-4 ${typeClasses.split(' ')[0]}`}>
      <div className={`rounded-full p-2 ${typeClasses.split(' ').slice(1).join(' ')}`}>
        <ResourceIcon type={resource.type} />
      </div>
      
      <div className="flex-1">
        <h3 className="font-medium mb-1">
          <a 
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors flex items-center gap-1"
          >
            {resource.title}
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </h3>
        <p className="text-sm text-muted-foreground">{resource.description}</p>
        <div className="mt-2">
          <Badge variant="outline" className="text-xs">
            {resource.type}
          </Badge>
        </div>
      </div>
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
