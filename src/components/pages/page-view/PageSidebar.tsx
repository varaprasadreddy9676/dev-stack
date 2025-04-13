
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { LinkIcon, Tags } from "lucide-react";
import { Page } from "@/types";

interface PageSidebarProps {
  page: Page;
}

export const PageSidebar = ({ page }: PageSidebarProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Page Information</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Visibility</h4>
              <p className="mt-1">{page.visibility.charAt(0).toUpperCase() + page.visibility.slice(1)}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Version</h4>
              <p className="mt-1">{page.metadata.version}</p>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="text-sm font-medium text-muted-foreground flex items-center">
                <LinkIcon className="h-4 w-4 mr-1" /> Related Entities
              </h4>
              
              {page.relatedEntities.length > 0 ? (
                <ul className="mt-2 space-y-2">
                  {page.relatedEntities.map((entity, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <span className="capitalize mr-2">{entity.type}:</span>
                      <Badge variant="outline" className="font-mono text-xs">
                        {entity.id.toString()}
                      </Badge>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground mt-2">No related entities</p>
              )}
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-muted-foreground flex items-center">
                <Tags className="h-4 w-4 mr-1" /> Tags
              </h4>
              
              {page.tags && page.tags.length > 0 ? (
                <div className="flex flex-wrap gap-1 mt-2">
                  {page.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground mt-2">No tags</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-2">Contributors</h3>
          
          {page.metadata.contributors.length > 0 ? (
            <div className="space-y-3 mt-4">
              {page.metadata.contributors.map((contributor, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    {contributor.toString().charAt(0)}
                  </div>
                  <div className="text-sm">
                    {contributor.toString()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No contributors yet</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
