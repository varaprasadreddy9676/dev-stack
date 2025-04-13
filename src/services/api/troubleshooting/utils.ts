
import { TroubleshootingIssue, Solution } from "@/types/troubleshooting";
import { mockProjects } from "../mockProjects";

// Helper to ensure solutions have all required fields
export const normalizeSolution = (solution: Partial<Solution>): Solution => ({
  steps: solution.steps || "",
  code: solution.code || "",
  screenshots: solution.screenshots || [],
  resources: solution.resources || []
});

// Helper to find a project in mock data
export const findMockProject = (projectId: string) => {
  const projectIndex = mockProjects.findIndex(p => p._id === projectId);
  if (projectIndex === -1) {
    return { found: false, projectIndex: -1 };
  }
  return { found: true, projectIndex };
};

// Helper to find an issue in a project
export const findMockIssue = (projectId: string, issueId: string) => {
  const { found, projectIndex } = findMockProject(projectId);
  
  if (!found || !mockProjects[projectIndex].troubleshooting) {
    return { found: false, projectIndex: -1, issueIndex: -1 };
  }
  
  const issueIndex = mockProjects[projectIndex].troubleshooting!.findIndex(i => i.id === issueId);
  if (issueIndex === -1) {
    return { found: false, projectIndex, issueIndex: -1 };
  }
  
  return { found: true, projectIndex, issueIndex };
};
