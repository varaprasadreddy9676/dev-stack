
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Language } from "@/types/language";

interface LanguageListItemProps {
  language: Language;
  formatDate: (dateString: string) => string;
}

const LanguageListItem = ({ language, formatDate }: LanguageListItemProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>
              <Link to={`/guidelines/${language.id}`} className="hover:text-primary transition-colors">
                {language.name}
              </Link>
            </CardTitle>
            <CardDescription className="mt-1">{language.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-3">
          {language.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="text-xs text-muted-foreground">
            Updated {formatDate(language.updatedAt)}
          </div>
          <Button variant="link" className="p-0 h-auto text-primary" asChild>
            <Link to={`/guidelines/${language.id}`}>
              View Guidelines
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LanguageListItem;
