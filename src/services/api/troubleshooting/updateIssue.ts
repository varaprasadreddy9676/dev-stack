
import { TroubleshootingIssue } from "@/types/troubleshooting";
import { API_BASE_URL } from "../baseService";
import { mockProjects } from "../mockProjects";
import { normalizeSolution, findMockIssue } from "./utils";

export const updateTroubleshootingIssue = async (
  projectId: string, 
  issueId: string, 
  updatedData: Partial<Omit<TroubleshootingIssue, "id" | "lastUpdated">>
) => {
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
      return updateMockIssue(projectId, issueId, updatedData);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to update troubleshooting issue ${issueId} for project ${projectId}:`, error);
    return updateMockIssue(projectId, issueId, updatedData);
  }
};

// Helper function to update a mock issue
const updateMockIssue = (
  projectId: string, 
  issueId: string, 
  updatedData: Partial<Omit<TroubleshootingIssue, "id" | "lastUpdated">>
): TroubleshootingIssue => {
  const { found, projectIndex, issueIndex } = findMockIssue(projectId, issueId);
  
  if (!found) {
    throw new Error("Issue not found");
  }
  
  // Create a properly typed updated issue
  const currentIssue = mockProjects[projectIndex].troubleshooting![issueIndex];
  const updatedIssue: TroubleshootingIssue = {
    id: currentIssue.id,
    issue: updatedData.issue || currentIssue.issue,
    description: updatedData.description || currentIssue.description,
    symptoms: updatedData.symptoms || currentIssue.symptoms,
    solutions: updatedData.solutions 
      ? updatedData.solutions.map(s => normalizeSolution(s)) 
      : currentIssue.solutions,
    relatedIssues: updatedData.relatedIssues || currentIssue.relatedIssues,
    tags: updatedData.tags || currentIssue.tags,
    lastUpdated: new Date().toISOString(),
    updatedBy: updatedData.updatedBy || currentIssue.updatedBy
  };
  
  mockProjects[projectIndex].troubleshooting![issueIndex] = updatedIssue;
  return updatedIssue;
};
