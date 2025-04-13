
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TroubleshootingTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  tags: string[];
}

const TroubleshootingTabs: React.FC<TroubleshootingTabsProps> = ({
  activeTab,
  setActiveTab,
  tags
}) => {
  return (
    <Tabs 
      defaultValue="all" 
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full md:w-auto md:flex-shrink-0 md:min-w-[150px]"
    >
      <TabsList className="h-auto flex flex-row md:flex-col bg-muted/50 p-1 rounded-md w-full md:w-[150px]">
        <TabsTrigger 
          value="all" 
          className="flex-1 md:justify-start"
        >
          All Issues
        </TabsTrigger>
        {tags.map(tag => (
          <TabsTrigger 
            key={tag} 
            value={tag} 
            className="flex-1 md:justify-start"
          >
            {tag}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default TroubleshootingTabs;
