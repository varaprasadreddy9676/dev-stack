
import { Link } from "react-router-dom";
import { FileText, Clock } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageSummary, PageParentType } from "@/types";
import { formatDate } from "@/utils/dateUtils";

interface PageCardProps {
  page: PageSummary;
}

export const PageCard = ({ page }: PageCardProps) => {
  const getParentTypeDisplay = (type: PageParentType) => {
    switch (type) {
      case "project":
        return "Project";
      case "module":
        return "Module";
      case "component":
        return "Component";
      case "language":
        return "Language";
      case "guide":
        return "Guide";
      case "root":
        return "Root";
      default:
        return type;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary flex-shrink-0" />
          <CardTitle className="text-lg truncate">
            <Link 
              to={`/pages/${page._id}`}
              className="hover:text-primary hover:underline transition-colors"
            >
              {page.title}
            </Link>
          </CardTitle>
        </div>
        
        <CardDescription className="flex items-center gap-1">
          <span>{getParentTypeDisplay(page.parent.type)}</span>
          {page.parent.id && (
            <Badge variant="outline" className="font-mono text-xs">
              {page.parent.id.toString().substring(0, 8)}
            </Badge>
          )}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {page.tags && page.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {page.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        
        {page.snippet && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {page.snippet}
          </p>
        )}
        
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t">
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {formatDate(page.metadata.lastUpdatedAt.toString())}
          </div>
          <Button
            variant="link"
            size="sm"
            className="p-0 h-auto"
            asChild
          >
            <Link to={`/pages/${page._id}`}>
              View Page
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
