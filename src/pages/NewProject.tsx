
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ProjectForm } from "@/components/dashboard/ProjectForm";
import { projectService } from "@/services/serviceFactory";
import { tagsStringToArray } from "@/utils/projectHelpers";

const NewProject: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateProject = async (projectData) => {
    try {
      // Process tags from string to array
      const processedData = {
        ...projectData,
        tags: projectData.tags ? tagsStringToArray(projectData.tags) : []
      };
      
      const createdProject = await projectService.createProject(processedData);
      toast.success("Project created successfully");
      navigate(`/projects/${createdProject._id}`);
    } catch (error) {
      toast.error("Failed to create project");
      console.error(error);
    }
  };

  return (
    <div className="container py-8 animate-fade-in">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Create New Project</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>
              Enter the basic information for your new project.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProjectForm onSubmit={handleCreateProject} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NewProject;
