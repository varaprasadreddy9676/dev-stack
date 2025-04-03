
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
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
    <Card className="hover:shadow-md transition-shadow h-full">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-start gap-2">
          <BookOpen className="h-4 w-4 text-muted-foreground mt-1" />
          <div>
            <CardTitle className="text-base md:text-lg">
              <Link to={`/guidelines/${guideline.id}`} className="hover:text-primary transition-colors">
                {guideline.name}
              </Link>
            </CardTitle>
            <CardDescription className="text-xs md:text-sm mt-1">{guideline.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2 pb-2">
        <div className="flex flex-wrap gap-1.5 mt-2">
          {guideline.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-2 flex items-center justify-between">
        <div className="text-xs text-muted-foreground">
          Updated {formatDate(guideline.updatedAt)}
        </div>
        <Button variant="ghost" size="sm" asChild className="p-0 h-6">
          <Link to={`/guidelines/${guideline.id}`} className="flex items-center text-xs text-primary">
            View <ArrowRight className="h-3 w-3 ml-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GuidelineCard;
