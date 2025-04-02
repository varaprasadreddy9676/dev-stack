
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FEATURES, APP_CONFIG } from "@/config/config";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

export default function Settings() {
  const [showBadge, setShowBadge] = useState(true);
  const [enableAnalytics, setEnableAnalytics] = useState(FEATURES.ENABLE_ANALYTICS);
  
  const handleBadgeToggle = () => {
    setShowBadge(!showBadge);
    toast({
      title: "Badge visibility updated",
      description: !showBadge ? "Badge will be displayed on your app" : "Badge has been hidden from your app",
    });
  };

  const handleAnalyticsToggle = () => {
    setEnableAnalytics(!enableAnalytics);
    toast({
      title: "Analytics settings updated",
      description: !enableAnalytics ? "Analytics are now enabled" : "Analytics are now disabled",
    });
  };

  const clearLocalStorage = () => {
    localStorage.clear();
    toast({
      title: "Local storage cleared",
      description: "All local data has been cleared successfully",
    });
  };

  return (
    <div className="container max-w-4xl py-6 space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Settings</h1>
      
      <Tabs defaultValue="app">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="app">App Settings</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        <TabsContent value="app">
          <Card>
            <CardHeader>
              <CardTitle>App Configuration</CardTitle>
              <CardDescription>Manage your application settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="badge-toggle">Show App Badge</Label>
                    <p className="text-sm text-muted-foreground">
                      Toggle the visibility of the app badge on the site
                    </p>
                  </div>
                  <Switch
                    id="badge-toggle"
                    checked={showBadge}
                    onCheckedChange={handleBadgeToggle}
                  />
                </div>
                
                {FEATURES.ENABLE_ANALYTICS && (
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="analytics-toggle">Enable Analytics</Label>
                      <p className="text-sm text-muted-foreground">
                        Collect anonymous usage data to improve the app
                      </p>
                    </div>
                    <Switch
                      id="analytics-toggle"
                      checked={enableAnalytics}
                      onCheckedChange={handleAnalyticsToggle}
                    />
                  </div>
                )}
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">App Information</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-muted-foreground">App Name:</div>
                  <div>{APP_CONFIG.APP_NAME}</div>
                  <div className="text-muted-foreground">Version:</div>
                  <div>{APP_CONFIG.APP_VERSION}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize how the application looks</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                You can adjust the theme using the theme toggle in the top navigation bar.
              </p>
              
              <div className="flex items-center justify-between py-2">
                <div className="space-y-0.5">
                  <Label htmlFor="sidebar-collapsed">Collapsed Sidebar</Label>
                  <p className="text-sm text-muted-foreground">
                    Remember sidebar collapsed state between sessions
                  </p>
                </div>
                <Switch
                  id="sidebar-collapsed"
                  defaultChecked={localStorage.getItem("sidebar-collapsed") === "true"}
                  onCheckedChange={(checked) => {
                    localStorage.setItem("sidebar-collapsed", checked.toString());
                    toast({
                      title: "Sidebar preference saved",
                      description: "Your sidebar preference has been updated",
                    });
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>Advanced configuration options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Clear Local Data</h3>
                <p className="text-sm text-muted-foreground">
                  Clear all locally stored data including preferences and cached information.
                </p>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={clearLocalStorage}
                >
                  Clear Local Storage
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
