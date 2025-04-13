
import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Bug, CalendarDays, PencilIcon } from "lucide-react";
import { TroubleshootingIssue } from "@/types/troubleshooting";

interface ProjectTroubleshootingTabProps {
  troubleshooting?: TroubleshootingIssue[];
  id: string;
  formatDate: (dateString: string) => string;
}

const ProjectTroubleshootingTab: React.FC<ProjectTroubleshootingTabProps> = ({ 
  troubleshooting = [], 
  id, 
  formatDate 
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold flex items-center">
          <Bug className="mr-2 h-5 w-5 text-amber-500" />
          Troubleshooting
        </h2>
        <Button variant="default" size="sm" asChild>
          <Link to={`/projects/${id}/edit?tab=troubleshooting`}>
            <PencilIcon className="mr-1 h-4 w-4" /> Manage Issues
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {troubleshooting.map((issue) => (
          <Card key={issue.id} className="h-full hover:shadow-md transition-shadow">
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
                    {issue.symptoms.map((symptom, index) => (
                      <li key={index}>{symptom}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {issue.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                  <div className="flex items-center">
                    <CalendarDays className="h-3 w-3 mr-1" />
                    {formatDate(issue.lastUpdated)}
                  </div>
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="p-0 h-auto"
                    asChild
                  >
                    <Link to={`/projects/${id}/troubleshooting/${issue.id}`}>
                      View Solutions
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectTroubleshootingTab;
