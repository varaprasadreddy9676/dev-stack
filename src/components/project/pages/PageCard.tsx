
import { Link } from "react-router-dom";
import { FileText, CalendarDays } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageSummary } from "@/types";
import { formatDate } from "@/utils/dateUtils";

interface PageCardProps {
  page: PageSummary;
}

export const PageCard = ({ page }: PageCardProps) => (
  <Card className="h-full hover:shadow-md transition-shadow">
    <CardHeader className="pb-2">
      <div className="flex items-center gap-2 mb-1">
        <FileText className="h-5 w-5 text-primary" />
        <Link 
          to={`/pages/${page._id}`}
          className="text-lg font-medium hover:text-primary transition-colors"
        >
          {page.title}
        </Link>
      </div>
      {page.snippet && (
        <CardDescription className="line-clamp-2">{page.snippet}</CardDescription>
      )}
    </CardHeader>
    <CardContent>
      <div className="flex flex-wrap gap-1 mb-3">
        {page.tags && page.tags.map(tag => (
          <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
        ))}
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
        <div className="flex items-center">
          <CalendarDays className="h-3 w-3 mr-1" />
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
