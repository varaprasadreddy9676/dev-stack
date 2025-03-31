
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Bug, Calendar, ArrowLeft, Link, FileText, Video, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { TroubleshootingIssue } from "@/types/troubleshooting";

interface TroubleshootingDetailProps {
  issue: TroubleshootingIssue;
  formatDate: (dateString: string) => string;
  onBack: () => void;
  onEdit?: () => void;
  onDelete?: (issueId: string) => void;
}

const TroubleshootingDetail: React.FC<TroubleshootingDetailProps> = ({
  issue,
  formatDate,
  onBack,
  onEdit,
  onDelete
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Issues
        </Button>
        
        {onEdit && onDelete && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onEdit}>
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the troubleshooting issue.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onDelete(issue.id)}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 mb-1">
            <Bug className="h-6 w-6 text-amber-500" />
            <CardTitle>{issue.issue}</CardTitle>
          </div>
          <CardDescription className="text-base">{issue.description}</CardDescription>
          
          <div className="flex flex-wrap gap-1 mt-2">
            {issue.tags.map(tag => (
              <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
          </div>
          
          <div className="text-sm text-muted-foreground mt-2 flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            Last updated: {formatDate(issue.lastUpdated)}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Symptoms</h3>
            <ul className="list-disc list-inside space-y-1">
              {issue.symptoms.map((symptom, index) => (
                <li key={index} className="text-muted-foreground">{symptom}</li>
              ))}
            </ul>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-lg font-medium mb-4">Solutions</h3>
            <div className="space-y-6">
              {issue.solutions.map((solution, index) => (
                <div key={index} className="space-y-3">
                  <div className="rounded-md border p-4">
                    <h4 className="font-medium mb-2">Solution {index + 1}</h4>
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <p>{solution.steps}</p>
                    </div>
                    
                    {solution.code && (
                      <div className="mt-3 bg-muted p-3 rounded-md">
                        <pre className="text-xs font-mono whitespace-pre-wrap">
                          {solution.code}
                        </pre>
                      </div>
                    )}
                    
                    {solution.screenshots && solution.screenshots.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <h5 className="text-sm font-medium">Screenshots</h5>
                        <div className="grid grid-cols-1 gap-4">
                          {solution.screenshots.map((screenshot, idx) => (
                            <div key={idx} className="border rounded-md overflow-hidden">
                              <div className="aspect-video bg-muted relative">
                                <img 
                                  src={screenshot.imageUrl} 
                                  alt={screenshot.caption} 
                                  className="object-cover w-full h-full"
                                />
                              </div>
                              <div className="p-2 text-xs text-center">
                                {screenshot.caption}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {solution.resources && solution.resources.length > 0 && (
                      <div className="mt-4">
                        <h5 className="text-sm font-medium mb-2">Resources</h5>
                        <div className="space-y-2">
                          {solution.resources.map((resource, idx) => (
                            <a 
                              key={idx} 
                              href={resource.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-primary hover:underline"
                            >
                              {resource.type === "link" && <Link className="h-4 w-4" />}
                              {resource.type === "pdf" && <FileText className="h-4 w-4" />}
                              {resource.type === "video" && <Video className="h-4 w-4" />}
                              {resource.title}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {issue.relatedIssues.length > 0 && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-medium mb-2">Related Issues</h3>
                <div className="text-muted-foreground">
                  {/* Here we would show related issues, but for simplicity we're just showing a placeholder */}
                  <p>This issue is related to other troubleshooting entries.</p>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TroubleshootingDetail;
