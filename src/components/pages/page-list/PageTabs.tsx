
import { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PageTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  children: {
    all: ReactNode;
    recent: ReactNode;
    myPages: ReactNode;
    favorites: ReactNode;
  };
}

export const PageTabs = ({ activeTab, setActiveTab, children }: PageTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="mb-6">
        <TabsTrigger value="all">All Pages</TabsTrigger>
        <TabsTrigger value="recent">Recently Updated</TabsTrigger>
        <TabsTrigger value="my-pages">My Pages</TabsTrigger>
        <TabsTrigger value="favorites">Favorites</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all" className="mt-0">
        {children.all}
      </TabsContent>
      
      <TabsContent value="recent" className="mt-0">
        {children.recent}
      </TabsContent>
      
      <TabsContent value="my-pages" className="mt-0">
        {children.myPages}
      </TabsContent>
      
      <TabsContent value="favorites" className="mt-0">
        {children.favorites}
      </TabsContent>
    </Tabs>
  );
};
