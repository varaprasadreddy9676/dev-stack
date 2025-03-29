
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Define guideline type
type Guideline = {
  id: string;
  name: string;
  description: string;
  updatedAt: string;
  tags: string[];
};

interface CodingGuidelinesProps {
  guidelines: Guideline[];
  formatDate: (dateString: string) => string;
}

export const CodingGuidelines = ({ guidelines, formatDate }: CodingGuidelinesProps) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Coding Guidelines</h2>
        <Button variant="outline" size="sm" asChild>
          <Link to="/guidelines">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {guidelines.map((guideline) => (
          <Card key={guideline.id} className="hover:shadow-md transition-shadow">
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
        ))}
      </div>
    </div>
  );
};
