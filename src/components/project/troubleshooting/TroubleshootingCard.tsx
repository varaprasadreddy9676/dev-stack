
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bug, ChevronRight, Calendar } from "lucide-react";
import { TroubleshootingIssue } from "@/types/troubleshooting";

interface TroubleshootingCardProps {
  issue: TroubleshootingIssue;
  formatDate: (dateString: string) => string;
  onSelect: (issueId: string) => void;
}

const TroubleshootingCard: React.FC<TroubleshootingCardProps> = ({
  issue,
  formatDate,
  onSelect
}) => {
  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 mb-1">
          <Bug className="h-5 w-5 text-amber-500" />
          <CardTitle className="text-lg">{issue.issue}</CardTitle>
        </div>
        <CardDescription>{issue.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium mb-1">Symptoms</h4>
            <ul className="list-disc list-inside text-sm text-muted-foreground">
              {issue.symptoms.slice(0, 3).map((symptom, index) => (
                <li key={index}>{symptom}</li>
              ))}
              {issue.symptoms.length > 3 && <li>...</li>}
            </ul>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {issue.tags.map(tag => (
              <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="flex items-center text-xs text-muted-foreground">
          <Calendar className="h-3 w-3 mr-1" />
          {formatDate(issue.lastUpdated)}
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-primary" 
          onClick={() => onSelect(issue.id)}
        >
          View Solutions
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TroubleshootingCard;
