
import { TroubleshootingIssue, Solution } from "@/types/troubleshooting";
import { API_BASE_URL, handleApiError } from "./baseService";
import { mockProjects } from "./mockProjects";

export const troubleshootingService = {
  getTroubleshootingIssues: async (projectId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/${projectId}/troubleshooting`);
      
      if (!response.ok) {
        console.warn("API call failed, using mock data");
        const mockProject = mockProjects.find(p => p._id === projectId);
        if (!mockProject) {
          throw new Error("Project not found");
        }
        return mockProject.troubleshooting || [];
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Failed to fetch troubleshooting issues for project ${projectId}:`, error);
      
      // Try to find in mock data
      const mockProject = mockProjects.find(p => p._id === projectId);
      if (mockProject) return mockProject.troubleshooting || [];
      
      return [];
    }
  },
  
  createTroubleshootingIssue: async (projectId: string, issueData: Omit<TroubleshootingIssue, "id" | "lastUpdated">) => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/${projectId}/troubleshooting`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(issueData),
      });
      
      if (!response.ok) {
        console.warn("API call failed, using mock data");
        // Create a mock issue
        const newIssue: TroubleshootingIssue = {
          id: `issue-${Date.now()}`,
          ...issueData,
          // Ensure solutions have required fields
          solutions: issueData.solutions.map(solution => ({
            steps: solution.steps,
            code: solution.code || "", // Provide default for code
            screenshots: solution.screenshots || [],
            resources: solution.resources || []
          })),
          lastUpdated: new Date().toISOString(),
        };
        
        // Add to mock project
        const projectIndex = mockProjects.findIndex(p => p._id === projectId);
        if (projectIndex !== -1) {
          if (!mockProjects[projectIndex].troubleshooting) {
            mockProjects[projectIndex].troubleshooting = [];
          }
          mockProjects[projectIndex].troubleshooting.push(newIssue);
        }
        
        return newIssue;
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Failed to create troubleshooting issue for project ${projectId}:`, error);
      
      // Create a mock issue
      const newIssue: TroubleshootingIssue = {
        id: `issue-${Date.now()}`,
        ...issueData,
        // Ensure solutions have required fields
        solutions: issueData.solutions.map(solution => ({
          steps: solution.steps,
          code: solution.code || "", // Provide default for code
          screenshots: solution.screenshots || [],
          resources: solution.resources || []
        })),
        lastUpdated: new Date().toISOString(),
      };
      
      // Add to mock project
      const projectIndex = mockProjects.findIndex(p => p._id === projectId);
      if (projectIndex !== -1) {
        if (!mockProjects[projectIndex].troubleshooting) {
          mockProjects[projectIndex].troubleshooting = [];
        }
        mockProjects[projectIndex].troubleshooting.push(newIssue);
      }
      
      return newIssue;
    }
  },
  
  updateTroubleshootingIssue: async (projectId: string, issueId: string, updatedData: Partial<Omit<TroubleshootingIssue, "id" | "lastUpdated">>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/${projectId}/troubleshooting/${issueId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      
      if (!response.ok) {
        console.warn("API call failed, using mock data");
        
        // For mock updates, find the project and update the issue
        const projectIndex = mockProjects.findIndex(p => p._id === projectId);
        if (projectIndex === -1 || !mockProjects[projectIndex].troubleshooting) {
          throw new Error("Project or issue not found");
        }
        
        const issueIndex = mockProjects[projectIndex].troubleshooting.findIndex(i => i.id === issueId);
        if (issueIndex === -1) {
          throw new Error("Issue not found");
        }
        
        // Create a properly typed updated issue
        const currentIssue = mockProjects[projectIndex].troubleshooting[issueIndex];
        const updatedIssue: TroubleshootingIssue = {
          id: currentIssue.id,
          issue: updatedData.issue || currentIssue.issue,
          description: updatedData.description || currentIssue.description,
          symptoms: updatedData.symptoms || currentIssue.symptoms,
          solutions: updatedData.solutions ? updatedData.solutions.map(s => ({
            steps: s.steps,
            code: s.code || "", // Ensure code is always defined
            screenshots: s.screenshots || [],
            resources: s.resources || []
          })) : currentIssue.solutions,
          relatedIssues: updatedData.relatedIssues || currentIssue.relatedIssues,
          tags: updatedData.tags || currentIssue.tags,
          lastUpdated: new Date().toISOString(),
          updatedBy: updatedData.updatedBy || currentIssue.updatedBy
        };
        
        mockProjects[projectIndex].troubleshooting[issueIndex] = updatedIssue;
        return updatedIssue;
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Failed to update troubleshooting issue ${issueId} for project ${projectId}:`, error);
      
      // For mock updates, find the project and update the issue
      const projectIndex = mockProjects.findIndex(p => p._id === projectId);
      if (projectIndex === -1 || !mockProjects[projectIndex].troubleshooting) {
        throw new Error("Project or issue not found");
      }
      
      const issueIndex = mockProjects[projectIndex].troubleshooting.findIndex(i => i.id === issueId);
      if (issueIndex === -1) {
        throw new Error("Issue not found");
      }
      
      // Create a properly typed updated issue
      const currentIssue = mockProjects[projectIndex].troubleshooting[issueIndex];
      const updatedIssue: TroubleshootingIssue = {
        id: currentIssue.id,
        issue: updatedData.issue || currentIssue.issue,
        description: updatedData.description || currentIssue.description,
        symptoms: updatedData.symptoms || currentIssue.symptoms,
        solutions: updatedData.solutions ? updatedData.solutions.map(s => ({
          steps: s.steps,
          code: s.code || "", // Ensure code is always defined
          screenshots: s.screenshots || [],
          resources: s.resources || []
        })) : currentIssue.solutions,
        relatedIssues: updatedData.relatedIssues || currentIssue.relatedIssues,
        tags: updatedData.tags || currentIssue.tags,
        lastUpdated: new Date().toISOString(),
        updatedBy: updatedData.updatedBy || currentIssue.updatedBy
      };
      
      mockProjects[projectIndex].troubleshooting[issueIndex] = updatedIssue;
      return updatedIssue;
    }
  },
  
  deleteTroubleshootingIssue: async (projectId: string, issueId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/${projectId}/troubleshooting/${issueId}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        console.warn("API call failed, using mock data");
        
        // For mock deletion, find the project and remove the issue
        const projectIndex = mockProjects.findIndex(p => p._id === projectId);
        if (projectIndex === -1 || !mockProjects[projectIndex].troubleshooting) {
          throw new Error("Project or issue not found");
        }
        
        const issueIndex = mockProjects[projectIndex].troubleshooting.findIndex(i => i.id === issueId);
        if (issueIndex === -1) {
          throw new Error("Issue not found");
        }
        
        mockProjects[projectIndex].troubleshooting.splice(issueIndex, 1);
        return { success: true };
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Failed to delete troubleshooting issue ${issueId} for project ${projectId}:`, error);
      
      // For mock deletion, find the project and remove the issue
      const projectIndex = mockProjects.findIndex(p => p._id === projectId);
      if (projectIndex === -1 || !mockProjects[projectIndex].troubleshooting) {
        throw new Error("Project or issue not found");
      }
      
      const issueIndex = mockProjects[projectIndex].troubleshooting.findIndex(i => i.id === issueId);
      if (issueIndex === -1) {
        throw new Error("Issue not found");
      }
      
      mockProjects[projectIndex].troubleshooting.splice(issueIndex, 1);
      return { success: true };
    }
  }
};
