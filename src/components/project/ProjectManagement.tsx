
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ProjectOverview from "./ProjectOverview";
import ProjectArchitecture from "./ProjectArchitecture";
import ProjectStructure from "./ProjectStructure";
import CustomFrameworks from "./CustomFrameworks";
import ProjectModules from "./ProjectModules";
import ProjectGuidelines from "./ProjectGuidelines";
import ProjectComponents from "./ProjectComponents";
import ProjectResources from "./ProjectResources";
import ProjectTroubleshooting from "./troubleshooting/ProjectTroubleshooting";
import { useProjectData } from "@/hooks/useProjectData";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProjectManagementProps {
  projectId: string;
}

const ProjectManagement: React.FC<ProjectManagementProps> = ({ projectId }) => {
  const navigate = useNavigate();
  const { project, loading, saveProject } = useProjectData(projectId);
  const [activeTab, setActiveTab] = useState("overview");
  const isMobile = useIsMobile();

  if (loading) {
    return <div className="py-4 px-3 md:py-8 md:px-0">Loading project data...</div>;
  }

  if (!project) {
    return <div className="py-4 px-3 md:py-8 md:px-0">Project not found</div>;
  }

  const handleSaveProject = async (updatedData) => {
    try {
      await saveProject(updatedData);
      toast.success("Project saved successfully");
    } catch (error) {
      toast.error("Failed to save project");
      console.error(error);
    }
  };

  return (
    <div className="py-4 px-3 md:py-8 md:px-0 animate-fade-in">
      <div className="flex justify-between items-start md:items-center flex-col md:flex-row mb-4 md:mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{project.name}</h1>
          <p className="text-base text-muted-foreground">{project.description}</p>
        </div>
        <div className="flex items-center gap-2 mt-3 md:mt-0">
          <Button onClick={() => navigate(`/projects/${projectId}`)}>View Project</Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 md:gap-2 mb-4 md:mb-6">
        {project.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="text-xs md:text-sm">
            {tag}
          </Badge>
        ))}
      </div>

      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4 md:space-y-6"
      >
        <div className="border-b overflow-x-auto scrollbar-none -mx-3 px-3 md:mx-0 md:px-0">
          <TabsList className="w-full justify-start h-auto p-0 bg-transparent">
            <TabsTrigger
              value="overview"
              className="py-2 md:py-3 px-3 md:px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none text-sm"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="architecture"
              className="py-2 md:py-3 px-3 md:px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none text-sm"
            >
              Architecture
            </TabsTrigger>
            <TabsTrigger
              value="structure"
              className="py-2 md:py-3 px-3 md:px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none text-sm"
            >
              Structure
            </TabsTrigger>
            <TabsTrigger
              value="frameworks"
              className="py-2 md:py-3 px-3 md:px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none text-sm"
            >
              Frameworks
            </TabsTrigger>
            <TabsTrigger
              value="modules"
              className="py-2 md:py-3 px-3 md:px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none text-sm"
            >
              Modules
            </TabsTrigger>
            <TabsTrigger
              value="guidelines"
              className="py-2 md:py-3 px-3 md:px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none text-sm"
            >
              Guidelines
            </TabsTrigger>
            <TabsTrigger
              value="components"
              className="py-2 md:py-3 px-3 md:px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none text-sm"
            >
              Components
            </TabsTrigger>
            <TabsTrigger
              value="resources"
              className="py-2 md:py-3 px-3 md:px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none text-sm"
            >
              Resources
            </TabsTrigger>
            <TabsTrigger
              value="troubleshooting"
              className="py-2 md:py-3 px-3 md:px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none text-sm"
            >
              Trouble
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Tab content */}
        <TabsContent value="overview">
          <ProjectOverview project={project} onSave={handleSaveProject} />
        </TabsContent>

        <TabsContent value="architecture">
          <ProjectArchitecture project={project} onSave={handleSaveProject} />
        </TabsContent>

        <TabsContent value="structure">
          <ProjectStructure project={project} onSave={handleSaveProject} />
        </TabsContent>

        <TabsContent value="frameworks">
          <CustomFrameworks project={project} onSave={handleSaveProject} />
        </TabsContent>

        <TabsContent value="modules">
          <ProjectModules project={project} onSave={handleSaveProject} />
        </TabsContent>

        <TabsContent value="guidelines">
          <ProjectGuidelines project={project} onSave={handleSaveProject} />
        </TabsContent>

        <TabsContent value="components">
          <ProjectComponents project={project} onSave={handleSaveProject} />
        </TabsContent>

        <TabsContent value="resources">
          <ProjectResources project={project} onSave={handleSaveProject} />
        </TabsContent>
        
        <TabsContent value="troubleshooting">
          <ProjectTroubleshooting 
            project={{ _id: project._id, name: project.name }} 
            onSave={handleSaveProject} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectManagement;
