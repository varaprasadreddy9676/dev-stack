
import { TroubleshootingIssue } from "@/types/troubleshooting";
import { API_BASE_URL } from "../baseService";
import { mockProjects } from "../mockProjects";
import { normalizeSolution, findMockProject } from "./utils";

export const createTroubleshootingIssue = async (
  projectId: string, 
  issueData: Omit<TroubleshootingIssue, "id" | "lastUpdated">
) => {
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
      return createMockIssue(projectId, issueData);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to create troubleshooting issue for project ${projectId}:`, error);
    return createMockIssue(projectId, issueData);
  }
};

// Helper function to create a mock issue
const createMockIssue = (
  projectId: string, 
  issueData: Omit<TroubleshootingIssue, "id" | "lastUpdated">
): TroubleshootingIssue => {
  // Create a mock issue
  const newIssue: TroubleshootingIssue = {
    id: `issue-${Date.now()}`,
    ...issueData,
    solutions: issueData.solutions.map(solution => normalizeSolution(solution)),
    lastUpdated: new Date().toISOString(),
  };
  
  // Add to mock project
  const { found, projectIndex } = findMockProject(projectId);
  if (found) {
    if (!mockProjects[projectIndex].troubleshooting) {
      mockProjects[projectIndex].troubleshooting = [];
    }
    mockProjects[projectIndex].troubleshooting.push(newIssue);
  }
  
  return newIssue;
};
