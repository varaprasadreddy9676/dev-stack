
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Language } from "@/types/language";

interface LanguageCardProps {
  language: Language;
  formatDate: (dateString: string) => string;
}

const LanguageCard = ({ language, formatDate }: LanguageCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">
          <Link to={`/guidelines/${language.id}`} className="hover:text-primary transition-colors">
            {language.name}
          </Link>
        </CardTitle>
        <CardDescription>{language.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-2 mb-3">
          {language.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        <div className="text-xs text-muted-foreground">
          Updated {formatDate(language.updatedAt)}
        </div>
        <Button variant="link" size="sm" className="p-0 h-auto text-primary" asChild>
          <Link to={`/guidelines/${language.id}`}>
            View Guidelines
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LanguageCard;
