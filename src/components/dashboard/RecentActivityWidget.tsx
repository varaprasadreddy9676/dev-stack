
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Activity, BookOpen, Code, FileText, Folder, LayoutGrid, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatRelativeTime } from "@/utils/dateFormatUtils";

// Define activity type
type ActivityItem = {
  id: string;
  title: string;
  project: string | null;
  user: string;
  type: string;
  timestamp: string;
};

interface RecentActivityWidgetProps {
  recentActivity: ActivityItem[];
  allActivity: ActivityItem[];
  maxItems?: number;
}

export const RecentActivityWidget = ({ 
  recentActivity, 
  allActivity, 
  maxItems = 3 
}: RecentActivityWidgetProps) => {
  const [isActivityDialogOpen, setIsActivityDialogOpen] = useState(false);
  
  const displayedActivities = recentActivity.slice(0, maxItems);
  
  const getActivityTypeIcon = (type: string) => {
    switch (type) {
      case "component":
        return <LayoutGrid className="h-4 w-4" />;
      case "guide":
        return <BookOpen className="h-4 w-4" />;
      case "guideline":
        return <FileText className="h-4 w-4" />;
      case "project":
        return <Folder className="h-4 w-4" />;
      case "module":
        return <Code className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getActivityTypeColor = (type: string) => {
    switch (type) {
      case "component":
        return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400";
      case "guide":
        return "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400";
      case "guideline":
        return "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400";
      case "project":
        return "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400";
      case "module":
        return "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400";
      default:
        return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </div>
          <Badge variant="outline" className="flex gap-1 items-center">
            <Clock className="h-3 w-3" />
            <span>Live</span>
          </Badge>
        </div>
        <CardDescription>Latest updates across projects</CardDescription>
      </CardHeader>
      
      <CardContent className="pt-2">
        <div className="space-y-4">
          {displayedActivities.map((activity) => (
            <div key={activity.id} className="flex gap-3 items-start group">
              <div className={`rounded-full p-2 mt-0.5 ${getActivityTypeColor(activity.type)}`}>
                {getActivityTypeIcon(activity.type)}
              </div>
              <div className="space-y-1 flex-1">
                <p className="font-medium group-hover:text-primary transition-colors">{activity.title}</p>
                <div className="text-sm text-muted-foreground">
                  {activity.project ? (
                    <>in <span className="font-medium">{activity.project}</span> by </>
                  ) : (
                    <>by </>
                  )}
                  <span className="font-medium">{activity.user}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {formatRelativeTime(activity.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Dialog open={isActivityDialogOpen} onOpenChange={setIsActivityDialogOpen}>
          <Button 
            variant="ghost" 
            className="w-full justify-center text-sm hover:bg-muted/50" 
            onClick={() => setIsActivityDialogOpen(true)}
          >
            View All Activity
          </Button>
          
          <DialogContent className="sm:max-w-[600px] max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>All Activity</DialogTitle>
              <DialogDescription>
                Recent activity across all projects and resources
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 overflow-y-auto pr-2" style={{ maxHeight: "calc(80vh - 180px)" }}>
              {allActivity.map((activity) => (
                <div key={activity.id} className="flex gap-3 items-start border-b pb-4 last:border-0">
                  <div className={`rounded-full p-2 mt-0.5 ${getActivityTypeColor(activity.type)}`}>
                    {getActivityTypeIcon(activity.type)}
                  </div>
                  <div className="space-y-1 flex-1">
                    <p className="font-medium">{activity.title}</p>
                    <div className="text-sm text-muted-foreground">
                      {activity.project ? (
                        <>in <span className="font-medium">{activity.project}</span> by </>
                      ) : (
                        <>by </>
                      )}
                      <span className="font-medium">{activity.user}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {formatRelativeTime(activity.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};
