
import { useState, useEffect } from 'react';

// Sample project data - in a real app, this would come from an API
const sampleProject = {
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
    lastUpdated: new Date("2024-03-15"),
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
  tags: ["react", "typescript", "customer-facing"],
  createdAt: new Date("2024-02-15"),
  updatedAt: new Date("2024-03-10")
};

export interface ProjectData {
  _id: string;
  name: string;
  description: string;
  overview: string;
  architecture: {
    description: string;
    diagrams: Array<{
      title: string;
      imageUrl: string;
      description: string;
    }>;
  };
  structure: {
    description: string;
    folders: Array<{
      path: string;
      purpose: string;
    }>;
  };
  customFrameworks: Array<{
    name: string;
    description: string;
    documentation: string;
    examples: Array<{
      title: string;
      code: string;
      description: string;
    }>;
  }>;
  modules: Array<{
    name: string;
    description: string;
    documentation: string;
    dependencies: string[];
  }>;
  guidelines: {
    content: string;
    lastUpdated: Date;
    updatedBy: string;
  };
  components: string[];
  resources: Array<{
    title: string;
    type: string;
    url: string;
    description: string;
  }>;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export const useProjectData = (projectId: string | undefined) => {
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        // For now, we'll just return the sample project if IDs match
        if (projectId === sampleProject._id) {
          setProject(sampleProject as ProjectData);
        } else {
          // Project not found
          setProject(null);
        }
      } catch (error) {
        console.error("Error fetching project:", error);
        setProject(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  const saveProject = async (updatedData: Partial<ProjectData>) => {
    if (!project) return;
    
    try {
      // In a real app, this would be an API call
      console.log("Saving project data:", updatedData);
      
      // Create a new project object with the updated data
      const updatedProject = { ...project, ...updatedData };
      setProject(updatedProject);
      
      return updatedProject;
    } catch (error) {
      console.error("Error saving project:", error);
      throw error;
    }
  };

  return { project, loading, saveProject };
};
