
import { useState } from "react";
import { BookOpen, Code, FileText, Folder, LayoutGrid } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Define activity type
type Activity = {
  id: string;
  title: string;
  project: string | null;
  user: string;
  type: string;
  timestamp: string;
};

interface ActivityFeedProps {
  recentActivity: Activity[];
  allActivity: Activity[];
  formatRelativeTime: (dateString: string) => string;
}

export const ActivityFeed = ({ recentActivity, allActivity, formatRelativeTime }: ActivityFeedProps) => {
  const [isActivityDialogOpen, setIsActivityDialogOpen] = useState(false);
  
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest updates across the portal</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex gap-4 items-start">
              <div className="bg-primary/10 text-primary rounded-full p-2 mt-0.5">
                {getActivityTypeIcon(activity.type)}
              </div>
              <div className="space-y-1">
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
      </CardContent>
      <CardFooter>
        <Dialog open={isActivityDialogOpen} onOpenChange={setIsActivityDialogOpen}>
          <Button variant="outline" className="w-full" size="sm" onClick={() => setIsActivityDialogOpen(true)}>
            View All Activity
          </Button>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>All Activity</DialogTitle>
              <DialogDescription>
                Recent activity across all projects and resources
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 overflow-y-auto pr-2" style={{ maxHeight: "calc(80vh - 180px)" }}>
              {allActivity.map((activity) => (
                <div key={activity.id} className="flex gap-4 items-start border-b pb-4 last:border-0">
                  <div className="bg-primary/10 text-primary rounded-full p-2 mt-0.5">
                    {getActivityTypeIcon(activity.type)}
                  </div>
                  <div className="space-y-1">
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
