
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GalleryHorizontalEndIcon, FileIcon, BookOpen, GitBranch } from "lucide-react";

interface Resource {
  title: string;
  description: string;
  url: string;
  type: string;
}

interface ProjectResourcesTabProps {
  resources: Resource[];
}

const ProjectResourcesTab: React.FC<ProjectResourcesTabProps> = ({ resources }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Project Resources</h2>
        <Button size="sm">
          <FileIcon className="mr-2 h-4 w-4" />
          Add Resource
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {resources.map((resource, index) => (
          <Card key={index} className="h-full overflow-hidden hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                {resource.type === "link" && <GalleryHorizontalEndIcon className="h-5 w-5 text-blue-500" />}
                {resource.type === "pdf" && <FileIcon className="h-5 w-5 text-red-500" />}
                {resource.type === "video" && <BookOpen className="h-5 w-5 text-green-500" />}
                <CardTitle className="text-lg">{resource.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{resource.description}</p>
              <Button
                variant="link"
                className="p-0 h-auto text-primary"
                onClick={() => window.open(resource.url, "_blank")}
              >
                Access Resource
                <GitBranch className="ml-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectResourcesTab;
