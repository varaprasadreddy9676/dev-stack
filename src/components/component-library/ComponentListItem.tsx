
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ComponentListItemProps {
  id: string;
  name: string;
  description: string;
  variants: number;
  tags: string[];
  updatedAt: string;
  formatDate: (dateString: string) => string;
  onView: (component: any) => void;
}

const ComponentListItem = ({
  id,
  name,
  description,
  variants,
  tags,
  updatedAt,
  formatDate,
  onView
}: ComponentListItemProps) => {
  const component = { id, name, description, variants, tags, updatedAt };

  return (
    <Card key={id} className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{name}</CardTitle>
            <CardDescription className="mt-1">{description}</CardDescription>
          </div>
          <span 
            className="text-xs bg-primary/10 text-primary rounded-full px-2 py-1 cursor-pointer"
            onClick={() => onView(component)}
          >
            {variants} {variants === 1 ? 'variant' : 'variants'}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="text-xs text-muted-foreground">
            Updated {formatDate(updatedAt)}
          </div>
          <Button 
            variant="link" 
            className="p-0 h-auto text-primary"
            onClick={() => onView(component)}
          >
            View Component
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComponentListItem;
