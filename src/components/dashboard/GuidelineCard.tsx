
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Language } from "@/types/language";

interface GuidelineCardProps {
  guideline: Language;
  formatDate: (dateString: string) => string;
}

const GuidelineCard = ({ guideline, formatDate }: GuidelineCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">
          <Link to={`/guidelines/${guideline.id}`} className="hover:text-primary transition-colors">
            {guideline.name}
          </Link>
        </CardTitle>
        <CardDescription>{guideline.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-2">
          {guideline.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="text-xs text-muted-foreground">
          Updated {formatDate(guideline.updatedAt)}
        </div>
      </CardFooter>
    </Card>
  );
};

export default GuidelineCard;
