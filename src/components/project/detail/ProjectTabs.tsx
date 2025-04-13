
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectOverviewTab from "./tabs/ProjectOverviewTab";
import ProjectArchitectureTab from "./tabs/ProjectArchitectureTab";
import ProjectStructureTab from "./tabs/ProjectStructureTab";
import ProjectFrameworksTab from "./tabs/ProjectFrameworksTab";
import ProjectModulesTab from "./tabs/ProjectModulesTab";
import ProjectGuidelinesTab from "./tabs/ProjectGuidelinesTab";
import ProjectComponentsTab from "./tabs/ProjectComponentsTab";
import ProjectResourcesTab from "./tabs/ProjectResourcesTab";
import ProjectTroubleshootingTab from "./tabs/ProjectTroubleshootingTab";
import { ProjectPages } from "@/components/project/ProjectPages";
import { ProjectData } from "@/types/project";

interface ProjectTabsProps {
  project: ProjectData;
  id: string;
  activeTab: string;
  setActiveTab: (value: string) => void;
  formatDate: (dateString: string) => string;
  components: Array<{
    id: string;
    name: string;
    description: string;
    variants: number;
  }>;
  guides: Array<{
    id: string;
    title: string;
    description: string;
  }>;
  handleViewComponent: (componentId: string) => void;
  handleReadGuide: (guideId: string) => void;
}

const ProjectTabs: React.FC<ProjectTabsProps> = ({
  project,
  id,
  activeTab,
  setActiveTab,
  formatDate,
  components,
  guides,
  handleViewComponent,
  handleReadGuide
}) => {
  return (
    <Tabs
      defaultValue="overview"
      value={activeTab}
      onValueChange={setActiveTab}
      className="space-y-6"
    >
      <div className="border-b overflow-x-auto">
        <TabsList className="w-full justify-start h-auto p-0 bg-transparent">
          <TabsTrigger
            value="overview"
            className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="architecture"
            className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
          >
            Architecture
          </TabsTrigger>
          <TabsTrigger
            value="structure"
            className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
          >
            Structure
          </TabsTrigger>
          <TabsTrigger
            value="frameworks"
            className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
          >
            Frameworks
          </TabsTrigger>
          <TabsTrigger
            value="modules"
            className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
          >
            Modules
          </TabsTrigger>
          <TabsTrigger
            value="guidelines"
            className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
          >
            Guidelines
          </TabsTrigger>
          <TabsTrigger
            value="components"
            className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
          >
            Components
          </TabsTrigger>
          <TabsTrigger
            value="resources"
            className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
          >
            Resources
          </TabsTrigger>
          <TabsTrigger
            value="troubleshooting"
            className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
          >
            Troubleshooting
          </TabsTrigger>
          <TabsTrigger
            value="pages"
            className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
          >
            Pages
          </TabsTrigger>
        </TabsList>
      </div>
      
      <TabsContent value="overview">
        <ProjectOverviewTab 
          project={project} 
          formatDate={formatDate} 
          components={components} 
          guides={guides} 
        />
      </TabsContent>
      
      <TabsContent value="architecture">
        <ProjectArchitectureTab project={project} />
      </TabsContent>
      
      <TabsContent value="structure">
        <ProjectStructureTab structure={project.structure} />
      </TabsContent>
      
      <TabsContent value="frameworks">
        <ProjectFrameworksTab frameworks={project.customFrameworks} />
      </TabsContent>
      
      <TabsContent value="modules">
        <ProjectModulesTab modules={project.modules} />
      </TabsContent>
      
      <TabsContent value="guidelines">
        <ProjectGuidelinesTab guidelines={project.guidelines} formatDate={formatDate} />
      </TabsContent>
      
      <TabsContent value="components">
        <ProjectComponentsTab components={components} handleViewComponent={handleViewComponent} />
      </TabsContent>
      
      <TabsContent value="resources">
        <ProjectResourcesTab resources={project.resources} />
      </TabsContent>
      
      <TabsContent value="troubleshooting">
        <ProjectTroubleshootingTab troubleshooting={project.troubleshooting} id={id} formatDate={formatDate} />
      </TabsContent>
      
      <TabsContent value="pages">
        <ProjectPages />
      </TabsContent>
    </Tabs>
  );
};

export default ProjectTabs;
