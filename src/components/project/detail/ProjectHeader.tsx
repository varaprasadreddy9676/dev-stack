
import React from "react";
import { Badge } from "@/components/ui/badge";

interface ProjectHeaderProps {
  id: string;
  name: string;
  description: string;
  tags: string[];
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({ id, name, description, tags }) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold tracking-tight mb-2">{name}</h1>
      <p className="text-lg text-muted-foreground mb-4">{description}</p>
      
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default ProjectHeader;
