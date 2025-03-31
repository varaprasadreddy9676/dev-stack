
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

interface ProjectManagementProps {
  projectId: string;
}

const ProjectManagement: React.FC<ProjectManagementProps> = ({ projectId }) => {
  const navigate = useNavigate();
  const { project, loading, saveProject } = useProjectData(projectId);
  const [activeTab, setActiveTab] = useState("overview");

  if (loading) {
    return <div className="container py-8">Loading project data...</div>;
  }

  if (!project) {
    return <div className="container py-8">Project not found</div>;
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
    <div className="container py-8 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
          <p className="text-muted-foreground">{project.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => navigate(`/projects/${projectId}`)}>View Project</Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags.map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>

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
          </TabsList>
        </div>

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
