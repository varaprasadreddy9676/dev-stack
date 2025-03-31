
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GuidelinesEditor from "@/components/languages/GuidelinesEditor";
import CodeExamplesSection from "@/components/languages/CodeExamplesSection";
import ResourcesList from "@/components/languages/ResourcesList";
import { LanguageData } from "@/types/language";

interface LanguageTabsProps {
  language: LanguageData;
  activeTab: string;
  setActiveTab: (value: string) => void;
  formatDate: (date: Date) => string;
  handleSaveGuidelines: (content: string) => void;
}

const LanguageTabs: React.FC<LanguageTabsProps> = ({
  language,
  activeTab,
  setActiveTab,
  formatDate,
  handleSaveGuidelines
}) => {
  return (
    <Tabs
      defaultValue={activeTab}
      value={activeTab}
      onValueChange={setActiveTab}
      className="space-y-6"
    >
      <div className="border-b">
        <TabsList className="w-full justify-start h-auto p-0 bg-transparent">
          <TabsTrigger
            value="guidelines"
            className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
          >
            Guidelines
          </TabsTrigger>
          <TabsTrigger
            value="examples"
            className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
          >
            Code Examples
          </TabsTrigger>
          <TabsTrigger
            value="resources"
            className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
          >
            Resources
          </TabsTrigger>
        </TabsList>
      </div>
      
      {/* Guidelines Tab */}
      <TabsContent value="guidelines" className="space-y-6">
        <GuidelinesEditor
          content={language.guidelines.content}
          lastUpdated={language.guidelines.lastUpdated}
          onSave={handleSaveGuidelines}
          formatDate={formatDate}
        />
      </TabsContent>
      
      {/* Examples Tab */}
      <TabsContent value="examples" className="space-y-8">
        <CodeExamplesSection
          goodExamples={language.examples.good}
          badExamples={language.examples.bad}
        />
      </TabsContent>
      
      {/* Resources Tab */}
      <TabsContent value="resources" className="space-y-6">
        <ResourcesList 
          resources={language.resources}
          languageName={language.name}
        />
      </TabsContent>
    </Tabs>
  );
};

export default LanguageTabs;
