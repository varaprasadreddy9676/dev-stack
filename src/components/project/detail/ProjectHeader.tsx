
import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PencilIcon, Star, Share } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import ShareDialog from "@/components/common/ShareDialog";
import { FEATURES } from "@/config/config";

interface ProjectHeaderProps {
  id: string;
  name: string;
  description: string;
  tags: string[];
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({ id, name, description, tags }) => {
  const { isFavorite, toggleFavorite, isLoading: isFavoriteLoading } = useFavorites('projects');
  
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link to="/projects" className="text-sm text-muted-foreground hover:text-foreground">
              Projects
            </Link>
            <span className="text-sm text-muted-foreground">/</span>
            <span className="text-sm font-medium">{name}</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">{name}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        
        <div className="flex items-center gap-2">
          {FEATURES.ENABLE_FAVORITES && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => toggleFavorite(id, name)}
              disabled={isFavoriteLoading}
            >
              <Star 
                className={`mr-1 h-4 w-4 ${isFavorite(id) ? "fill-yellow-400 text-yellow-400" : ""}`} 
              />
              {isFavorite(id) ? "Favorited" : "Favorite"}
            </Button>
          )}
          
          {FEATURES.ENABLE_SHARING && (
            <ShareDialog
              title={name}
              type="Project"
              id={id}
              path={`/projects/${id}`}
              description="Share this project with your team or colleagues"
            />
          )}
          
          <Button variant="default" size="sm" asChild>
            <Link to={`/projects/${id}/edit`}>
              <PencilIcon className="mr-1 h-4 w-4" /> Edit Project
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
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
