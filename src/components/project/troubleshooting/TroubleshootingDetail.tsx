
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Bug, Calendar, ArrowLeft, Link, FileText, Video, Edit, Trash2, Star, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { TroubleshootingIssue } from "@/types/troubleshooting";
import TroubleshootingSolution from "./TroubleshootingSolution";
import ShareDialog from "@/components/common/ShareDialog";
import { useFavorites } from "@/hooks/useFavorites";
import { FEATURES } from "@/config/config";

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
  const [expandedSolution, setExpandedSolution] = useState<number | null>(null);
  const { isFavorite, toggleFavorite, isLoading: isFavoriteLoading } = useFavorites('guides');

  const toggleSolution = (index: number) => {
    if (expandedSolution === index) {
      setExpandedSolution(null);
    } else {
      setExpandedSolution(index);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Issues
        </Button>
        
        <div className="flex gap-2">
          {FEATURES.ENABLE_FAVORITES && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => toggleFavorite(issue.id, issue.issue)}
              disabled={isFavoriteLoading}
            >
              <Star 
                className={`h-4 w-4 mr-1 ${isFavorite(issue.id) ? "fill-yellow-400 text-yellow-400" : ""}`} 
              />
              {isFavorite(issue.id) ? "Favorited" : "Favorite"}
            </Button>
          )}
          
          {FEATURES.ENABLE_SHARING && (
            <ShareDialog
              title={issue.issue}
              type="Troubleshooting Issue"
              id={issue.id}
              path={`/troubleshooting/${issue.id}`}
              description="Share this troubleshooting issue with your team"
            />
          )}
          
          {onEdit && onDelete && (
            <>
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
            </>
          )}
        </div>
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
            <div className="space-y-4">
              {issue.solutions.map((solution, index) => (
                <div key={index} className="border rounded-md">
                  <Button
                    variant="ghost"
                    className="w-full flex items-center justify-between p-4 h-auto"
                    onClick={() => toggleSolution(index)}
                  >
                    <span className="font-medium">Solution {index + 1}</span>
                    {expandedSolution === index ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                  
                  {expandedSolution === index && (
                    <TroubleshootingSolution solution={solution} index={index} />
                  )}
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
