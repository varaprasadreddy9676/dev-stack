
import { API_BASE_URL } from "../baseService";
import { mockProjects } from "../mockProjects";
import { findMockIssue } from "./utils";

export const deleteTroubleshootingIssue = async (projectId: string, issueId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}/troubleshooting/${issueId}`, {
      method: "DELETE",
    });
    
    if (!response.ok) {
      console.warn("API call failed, using mock data");
      return deleteMockIssue(projectId, issueId);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to delete troubleshooting issue ${issueId} for project ${projectId}:`, error);
    return deleteMockIssue(projectId, issueId);
  }
};

// Helper function to delete a mock issue
const deleteMockIssue = (projectId: string, issueId: string) => {
  const { found, projectIndex, issueIndex } = findMockIssue(projectId, issueId);
  
  if (!found) {
    throw new Error("Issue not found");
  }
  
  mockProjects[projectIndex].troubleshooting!.splice(issueIndex, 1);
  return { success: true };
};
