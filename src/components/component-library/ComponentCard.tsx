
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ComponentCardProps {
  id: string;
  name: string;
  description: string;
  variants: number;
  tags: string[];
  updatedAt: string;
  formatDate: (dateString: string) => string;
  onView: (component: any) => void;
}

const ComponentCard = ({
  id,
  name,
  description,
  variants,
  tags,
  updatedAt,
  formatDate,
  onView
}: ComponentCardProps) => {
  const component = { id, name, description, variants, tags, updatedAt };
  
  return (
    <Card key={id} className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center text-lg">
          {name}
          <span 
            className="text-xs bg-primary/10 text-primary rounded-full px-2 py-1 cursor-pointer"
            onClick={() => onView(component)}
          >
            {variants} {variants === 1 ? 'variant' : 'variants'}
          </span>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="text-xs text-muted-foreground mt-2">
          Updated {formatDate(updatedAt)}
        </div>
        <Button 
          variant="link" 
          className="p-0 h-auto text-primary mt-2"
          onClick={() => onView(component)}
        >
          View Component
        </Button>
      </CardContent>
    </Card>
  );
};

export default ComponentCard;
