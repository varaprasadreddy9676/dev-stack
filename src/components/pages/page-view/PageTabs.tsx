
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, FilePlus } from "lucide-react";
import { Page } from "@/types";

interface PageTabsProps {
  projectId: string;
  pages: Page[];
}

export const PageTabs = ({ projectId, pages }: PageTabsProps) => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold flex items-center">
          <FileText className="mr-2 h-5 w-5 text-primary" />
          Project Pages
        </h2>
        <Button variant="default" size="sm" asChild>
          <Link to={`/projects/${projectId}/new-page`}>
            <FilePlus className="mr-1 h-4 w-4" /> Create Page
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">All Pages</TabsTrigger>
            <TabsTrigger value="documentation">Documentation</TabsTrigger>
            <TabsTrigger value="implementation">Implementation</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-2">
          {pages && pages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {pages.map((page) => (
                <Card key={page._id} className="hover:shadow-md transition-shadow">
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
                    <CardDescription className="line-clamp-2">
                      {page.content.substring(0, 100)}...
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {page.tags && page.tags.map(tag => (
                        <span key={tag} className="text-xs bg-muted px-2 py-1 rounded-md">{tag}</span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
              <h3 className="mt-4 text-lg font-medium">No Pages Found</h3>
              <p className="text-muted-foreground mt-2">
                This project doesn't have any pages yet. Create the first one!
              </p>
              <Button variant="outline" className="mt-4" asChild>
                <Link to={`/projects/${projectId}/new-page`}>
                  <FilePlus className="mr-2 h-4 w-4" /> Create New Page
                </Link>
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="documentation" className="mt-2">
          <div className="text-center py-8">
            <p className="text-muted-foreground">No documentation pages found.</p>
          </div>
        </TabsContent>

        <TabsContent value="implementation" className="mt-2">
          <div className="text-center py-8">
            <p className="text-muted-foreground">No implementation pages found.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
