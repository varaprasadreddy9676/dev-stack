
import { ProjectData } from "@/types/project";
import { TroubleshootingIssue } from "@/types/troubleshooting";

// Mock project data (fallback for when API is unavailable)
export const mockProjects: ProjectData[] = [
  {
    _id: "proj123",
    name: "Customer Portal",
    description: "Frontend application for customer account management and service requests",
    tags: ["react", "typescript", "customer-facing"],
    updatedAt: "2024-03-10T09:15:00Z",
    createdAt: "2024-02-10T09:15:00Z",
    architecture: {
      description: "Microservices architecture with React frontend",
      diagrams: []
    },
    structure: {
      description: "Feature-based organization with shared components",
      folders: [
        {
          path: "/src/features",
          purpose: "Feature-specific components and logic"
        },
        {
          path: "/src/shared",
          purpose: "Cross-feature shared components and utilities"
        }
      ]
    },
    customFrameworks: [],
    modules: [],
    guidelines: {
      content: "Follow these guidelines when contributing...",
      lastUpdated: "2024-03-01T10:30:00Z",
      updatedBy: "Admin"
    },
    components: [],
    resources: [],
    team: [], // Added as required field
    troubleshooting: [
      {
        id: "issue1",
        issue: "API Connection Error",
        description: "Users are experiencing API connection errors when submitting forms",
        symptoms: ["Form submission fails", "Console shows 403 error", "User gets error toast"],
        solutions: [
          {
            steps: "Verify API credentials in configuration",
            code: "// Check if API keys are correctly set\nconst apiKey = config.API_KEY;\nconsole.log('Using API key:', apiKey);",
            resources: [
              {
                title: "API Documentation",
                type: "link",
                url: "https://api-docs.example.com"
              }
            ]
          }
        ],
        relatedIssues: [],
        tags: ["api", "forms", "configuration"],
        lastUpdated: "2024-03-15T14:30:00Z",
        updatedBy: "user123"
      }
    ]
  },
  {
    _id: "proj456",
    name: "Admin Dashboard",
    description: "Internal tool for system administration",
    tags: ["react", "redux", "internal"],
    updatedAt: "2024-03-05T14:30:00Z",
    createdAt: "2024-02-05T14:30:00Z",
    architecture: {
      description: "Single-page application architecture",
      diagrams: []
    },
    structure: {
      description: "Feature-based organization",
      folders: []
    },
    customFrameworks: [],
    modules: [],
    guidelines: {
      content: "Admin dashboard guidelines...",
      lastUpdated: "2024-03-01T10:30:00Z",
      updatedBy: "Admin"
    },
    components: [],
    resources: [],
    team: [], // Added as required field
    troubleshooting: []
  },
  {
    _id: "proj101",
    name: "Test Project",
    description: "Test project for troubleshooting",
    tags: ["test", "demo"],
    updatedAt: "2024-04-01T09:15:00Z",
    createdAt: "2024-03-15T09:15:00Z",
    architecture: {
      description: "Test architecture",
      diagrams: []
    },
    structure: {
      description: "Test structure",
      folders: []
    },
    customFrameworks: [],
    modules: [],
    guidelines: {
      content: "Test guidelines",
      lastUpdated: "2024-03-20T10:30:00Z",
      updatedBy: "Admin"
    },
    components: [],
    resources: [],
    team: [], // Added as required field
    troubleshooting: [
      {
        id: "issue-test1",
        issue: "Test Issue 1",
        description: "This is a test troubleshooting issue",
        symptoms: ["Symptom 1", "Symptom 2"],
        solutions: [
          {
            steps: "These are the steps to fix the issue",
            code: "// Sample code\nconsole.log('Testing');",
            resources: [] // Added as required field
          }
        ],
        relatedIssues: [],
        tags: ["test", "demo"],
        lastUpdated: "2024-04-01T10:00:00Z",
        updatedBy: "tester"
      }
    ]
  }
];
