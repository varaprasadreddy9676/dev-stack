
// Mock data for all entities in the application
import { ProjectData } from "@/types/project";
import { TroubleshootingIssue } from "@/types/troubleshooting";

// Sample project data
export const mockProjects: ProjectData[] = [
  {
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
        description: "Handles user authentication and authorization",
        documentation: "# Authentication Module\n\nProvides login, logout, and permission checking capabilities.",
        dependencies: ["axios", "jwt-decode"]
      }
    ],
    guidelines: {
      content: "# Project Guidelines\n\n## Coding Standards\n\n- Use TypeScript for all new code\n- Follow the project's ESLint configuration\n- Write unit tests for all business logic",
      lastUpdated: "2024-03-15T00:00:00Z",
      updatedBy: "user123"
    },
    components: ["comp1", "comp2", "comp3"],
    resources: [
      {
        title: "API Documentation",
        type: "link",
        url: "https://api-docs.example.com",
        description: "Official API documentation for the backend services"
      },
      {
        title: "Design System",
        type: "link",
        url: "https://design.example.com",
        description: "Company design system and component library"
      }
    ],
    troubleshooting: [
      {
        id: "issue1",
        issue: "Authentication Failure",
        description: "Users unable to log in despite using correct credentials",
        symptoms: [
          "Login form returns 'Invalid credentials' error",
          "Authentication tokens not being stored",
          "Automatic session renewal fails"
        ],
        solutions: [
          {
            steps: "Clear browser cookies and cache, then attempt login again",
            code: "// No code needed for this solution"
          },
          {
            steps: "Verify that the authentication service is configured correctly",
            code: "// Check authentication configuration\nconst authConfig = {\n  baseUrl: process.env.AUTH_API_URL,\n  clientId: process.env.AUTH_CLIENT_ID\n};\n\nconsole.log('Using auth config:', authConfig);",
            resources: [
              {
                title: "Authentication Troubleshooting Guide",
                type: "pdf",
                url: "https://example.com/auth-troubleshooting.pdf"
              }
            ]
          }
        ],
        relatedIssues: [],
        tags: ["authentication", "login", "user-account"],
        lastUpdated: "2024-03-20T00:00:00Z",
        updatedBy: "user123"
      },
      {
        id: "issue2",
        issue: "Slow Dashboard Loading",
        description: "Dashboard takes more than 10 seconds to load for some users",
        symptoms: [
          "Dashboard shows loading spinner for extended periods",
          "Browser console shows multiple timeouts",
          "Network requests take longer than expected"
        ],
        solutions: [
          {
            steps: "Implement data pagination to reduce initial load",
            code: "// Modify the data fetching to use pagination\nconst fetchDashboardData = async (page = 1, limit = 10) => {\n  const response = await api.get(`/dashboard?page=${page}&limit=${limit}`);\n  return response.data;\n};"
          },
          {
            steps: "Use React.memo and useMemo to optimize rendering",
            code: "// Optimize with memo\nconst DashboardItem = React.memo(({ data }) => {\n  // Component code\n});\n\n// Use memoization for expensive calculations\nconst processedData = useMemo(() => {\n  return expensiveDataProcessing(rawData);\n}, [rawData]);"
          }
        ],
        relatedIssues: [],
        tags: ["performance", "dashboard", "optimization"],
        lastUpdated: "2024-03-18T00:00:00Z",
        updatedBy: "user456"
      }
    ],
    tags: ["react", "typescript", "customer-facing"],
    createdAt: "2024-02-15T00:00:00Z",
    updatedAt: "2024-03-10T00:00:00Z"
  },
  {
    _id: "proj456",
    name: "Admin Dashboard",
    description: "Internal tool for managing system settings and user accounts",
    overview: "The Admin Dashboard provides administrative capabilities for internal staff. It enables user management, system configuration, and monitoring of application performance.",
    architecture: {
      description: "Monolithic architecture with React frontend",
      diagrams: [
        {
          title: "Dashboard Components",
          imageUrl: "/images/admin-dashboard-components.svg",
          description: "Component hierarchy and data flow"
        }
      ]
    },
    structure: {
      description: "Module-based organization",
      folders: [
        {
          path: "/src/modules",
          purpose: "Feature modules with components and logic"
        },
        {
          path: "/src/core",
          purpose: "Core application functionality"
        }
      ]
    },
    customFrameworks: [],
    modules: [
      {
        name: "User Management",
        description: "Handles user creation, editing, and permission assignment",
        documentation: "# User Management Module\n\nProvides CRUD operations for user accounts.",
        dependencies: ["axios", "react-hook-form"]
      }
    ],
    guidelines: {
      content: "# Admin Dashboard Guidelines\n\n## Security Considerations\n\n- All API calls must include the admin token\n- Implement proper input validation\n- Log all administrative actions",
      lastUpdated: "2024-02-28T00:00:00Z",
      updatedBy: "user456"
    },
    components: ["UserTable", "PermissionEditor", "ActivityLog"],
    resources: [
      {
        title: "Admin API Documentation",
        type: "link",
        url: "https://admin-api-docs.example.com",
        description: "Documentation for admin-specific API endpoints"
      }
    ],
    troubleshooting: [
      {
        id: "issue3",
        issue: "Permission Denied Errors",
        description: "Administrators receiving permission denied errors when accessing certain features",
        symptoms: [
          "403 Forbidden responses from API",
          "Features disabled in the UI despite having admin role",
          "Console errors related to authorization"
        ],
        solutions: [
          {
            steps: "Verify the user has the correct role assignments in the database",
            code: "// SQL query to check user roles\n-- SELECT u.username, r.role_name\n-- FROM users u\n-- JOIN user_roles ur ON u.id = ur.user_id\n-- JOIN roles r ON r.id = ur.role_id\n-- WHERE u.username = 'admin@example.com';"
          },
          {
            steps: "Clear the user's session and have them log in again",
            code: "// Client-side logout function\nconst forceLogout = () => {\n  localStorage.removeItem('auth_token');\n  sessionStorage.removeItem('user_data');\n  window.location.href = '/login';\n};"
          }
        ],
        relatedIssues: [],
        tags: ["permissions", "authorization", "admin"],
        lastUpdated: "2024-03-05T00:00:00Z",
        updatedBy: "user789"
      }
    ],
    tags: ["react", "admin", "internal-tool"],
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-02-28T00:00:00Z"
  }
];

// Mock data for languages, components, guidelines, etc. can be added here
export const mockLanguages = [
  {
    id: "lang1",
    name: "JavaScript",
    description: "A lightweight, interpreted programming language.",
    guidelines: "# JavaScript Guidelines\n\n## Best Practices\n\n- Use ES6+ features\n- Implement proper error handling\n- Write unit tests"
  },
  {
    id: "lang2",
    name: "TypeScript",
    description: "A strongly typed programming language that builds on JavaScript.",
    guidelines: "# TypeScript Guidelines\n\n## Best Practices\n\n- Define interfaces for all data structures\n- Use union types instead of enums\n- Implement proper error handling"
  }
];

export const mockComponents = [
  {
    id: "comp1",
    name: "Button",
    description: "A customizable button component",
    usage: "import { Button } from '@/components/ui/button';\n\n<Button variant='primary'>Click Me</Button>"
  },
  {
    id: "comp2",
    name: "Card",
    description: "A container component for displaying content",
    usage: "import { Card } from '@/components/ui/card';\n\n<Card>\n  <CardHeader>Title</CardHeader>\n  <CardContent>Content</CardContent>\n</Card>"
  }
];

export const mockGuides = [
  {
    id: "guide1",
    title: "Getting Started",
    content: "# Getting Started\n\nThis guide will help you set up your development environment."
  },
  {
    id: "guide2",
    title: "Component Library",
    content: "# Component Library\n\nThis guide explains how to use the component library."
  }
];
