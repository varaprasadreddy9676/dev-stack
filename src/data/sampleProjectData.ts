
// Sample project data for development and testing purposes
import { ProjectData } from "@/types/project";
import { TroubleshootingIssue } from "@/types/troubleshooting";

export const sampleProjectData: ProjectData = {
  _id: "proj123",
  name: "Customer Portal",
  description: "Frontend application for customer account management and service requests",
  overview: "The Customer Portal serves as the primary interface for customers to manage their accounts, submit service requests, and view usage analytics. It's built with a focus on user experience and performance.",
  architecture: {
    description: "Microservices architecture with React frontend",
    diagrams: [
      {
        title: "Architecture Overview",
        imageUrl: "/images/customer-portal-architecture.svg",
        description: "High-level architecture showing service integrations"
      }
    ]
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
  customFrameworks: [
    {
      name: "DataFetcherHOC",
      description: "Higher-order component for data fetching with loading states",
      documentation: "# DataFetcherHOC\n\nThis HOC simplifies data fetching patterns across the application.",
      examples: [
        {
          title: "Basic Usage",
          code: "const EnhancedComponent = withDataFetcher(MyComponent, {\n  fetchData: (props) => api.fetchData(props.id)\n});",
          description: "Wraps a component with data fetching capability"
        }
      ]
    }
  ],
  modules: [
    {
      name: "Authentication",
      description: "User authentication and authorization",
      documentation: "# Authentication Module\n\nProvides login, logout, and permission checking capabilities.",
      dependencies: ["axios", "jwt-decode"]
    },
    {
      name: "Dashboard",
      description: "User dashboard with analytics",
      documentation: "# Dashboard Module\n\nProvides user dashboard and analytics visualization.",
      dependencies: ["recharts", "d3"]
    }
  ],
  guidelines: {
    content: "Follow these guidelines when contributing to the project...",
    lastUpdated: "2024-03-01T10:30:00Z",
    updatedBy: "user123"
  },
  components: [
    "Button",
    "Form Controls",
    "DataTable"
  ],
  resources: [
    {
      title: "API Documentation",
      description: "Reference for backend API endpoints",
      url: "https://api-docs.example.com",
      type: "link"
    },
    {
      title: "Design System",
      description: "UI component design guidelines",
      url: "https://design.example.com",
      type: "link"
    }
  ],
  troubleshooting: [
    {
      id: "issue1",
      issue: "Authentication Failure",
      description: "Users unable to log in despite using correct credentials",
      symptoms: [
        "Login form returns 'Invalid credentials' error", 
        "Authentication tokens not being stored"
      ],
      solutions: [
        {
          steps: "Clear browser cookies and cache, then attempt login again",
          code: "// No code needed for this solution",
          resources: []
        }
      ],
      relatedIssues: [],
      tags: ["authentication", "login"],
      lastUpdated: "2024-03-20T00:00:00Z",
      updatedBy: "user123"
    },
    {
      id: "issue2",
      issue: "Slow Dashboard Loading",
      description: "Dashboard takes more than 10 seconds to load for some users",
      symptoms: [
        "Dashboard shows loading spinner for extended periods", 
        "Network requests take longer than expected"
      ],
      solutions: [
        {
          steps: "Implement data pagination to reduce initial load",
          code: "// Example code for pagination",
          resources: []
        }
      ],
      relatedIssues: [],
      tags: ["performance", "dashboard"],
      lastUpdated: "2024-03-18T00:00:00Z",
      updatedBy: "user456"
    }
  ],
  tags: ["react", "typescript", "customer-facing"],
  createdAt: "2024-02-15T12:00:00Z",
  updatedAt: "2024-03-10T09:15:00Z",
  team: [
    { name: "John Doe", role: "Tech Lead" },
    { name: "Jane Smith", role: "UX Designer" },
    { name: "Bob Johnson", role: "Frontend Developer" }
  ]
};

export const sampleComponents = [
  {
    id: "comp1",
    name: "Button",
    description: "Interactive button elements with various styles",
    variants: 4
  },
  {
    id: "comp2",
    name: "Form Controls",
    description: "Input components with validation",
    variants: 6
  },
  {
    id: "comp3",
    name: "DataTable",
    description: "Sortable and filterable data table",
    variants: 2
  }
];

export const sampleGuides = [
  {
    id: "guide1",
    title: "Getting Started",
    description: "How to set up the project locally"
  },
  {
    id: "guide2",
    title: "Authentication Flow",
    description: "Implementing user authentication"
  },
  {
    id: "guide3",
    title: "Deployment Process",
    description: "How to deploy the application"
  }
];
