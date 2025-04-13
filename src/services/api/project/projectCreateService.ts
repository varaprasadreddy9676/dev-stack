
import { ProjectData } from "@/types/project";
import { API_BASE_URL } from "../baseService";
import { mockProjects } from "../mockProjects";

export const projectCreateService = {
  createProject: async (projectData: Omit<ProjectData, "_id" | "createdAt" | "updatedAt">) => {
    try {
      console.log("Creating new project with data:", projectData);
      const response = await fetch(`${API_BASE_URL}/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });
      
      if (!response.ok) {
        console.warn("API call failed, creating mock project");
        // Fix: Ensure createdAt and updatedAt are strings
        const now = new Date().toISOString();
        const newProject = {
          _id: `proj-${Date.now()}`,
          ...projectData,
          createdAt: now,
          updatedAt: now,
          architecture: projectData.architecture || {
            description: "",
            diagrams: []
          },
          structure: projectData.structure || {
            description: "",
            folders: []
          },
          customFrameworks: projectData.customFrameworks || [],
          modules: projectData.modules || [],
          guidelines: projectData.guidelines || {
            content: "",
            lastUpdated: now,
            updatedBy: "System"
          },
          components: projectData.components || [],
          resources: projectData.resources || [],
          team: projectData.team || [], // Ensure team is always present
          troubleshooting: projectData.troubleshooting || []
        };
        // Add to mock projects
        mockProjects.push(newProject);
        return newProject;
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to create project:", error);
      // Fix: Ensure createdAt and updatedAt are strings
      const now = new Date().toISOString();
      const newProject = {
          _id: `proj-${Date.now()}`,
          ...projectData,
          createdAt: now,
          updatedAt: now,
          architecture: projectData.architecture || {
            description: "",
            diagrams: []
          },
          structure: projectData.structure || {
            description: "",
            folders: []
          },
          customFrameworks: projectData.customFrameworks || [],
          modules: projectData.modules || [],
          guidelines: projectData.guidelines || {
            content: "",
            lastUpdated: now,
            updatedBy: "System"
          },
          components: projectData.components || [],
          resources: projectData.resources || [],
          team: projectData.team || [], // Ensure team is always present
          troubleshooting: projectData.troubleshooting || []
      };
      // Add to mock projects
      mockProjects.push(newProject);
      return newProject;
    }
  }
};
