
// Sample projects data
export const recentProjects = [
  {
    id: "proj123",
    name: "Customer Portal",
    description: "Frontend application for customer account management and service requests",
    type: "frontend",
    tags: ["react", "typescript", "customer-facing"],
    updatedAt: "2024-03-10T09:15:00Z",
    components: 12,
    guides: 5
  },
  {
    id: "proj456",
    name: "API Gateway",
    description: "Backend service for API management and request routing",
    type: "backend",
    tags: ["node.js", "express", "microservices"],
    updatedAt: "2024-03-05T14:30:00Z",
    components: 5,
    guides: 3
  },
  {
    id: "proj789",
    name: "Admin Dashboard",
    description: "Internal tool for system administration and monitoring",
    type: "fullstack",
    tags: ["react", "node.js", "internal"],
    updatedAt: "2024-02-28T11:20:00Z",
    components: 18,
    guides: 7
  }
];

// Sample coding guidelines data
export const codingGuidelines = [
  {
    id: "lang1",
    name: "TypeScript",
    description: "Guidelines for TypeScript development",
    updatedAt: "2024-03-15T14:20:00Z",
    tags: ["frontend", "backend", "typing"]
  },
  {
    id: "lang2",
    name: "JavaScript",
    description: "Best practices for JavaScript development",
    updatedAt: "2024-03-10T09:15:00Z",
    tags: ["frontend", "backend", "scripting"]
  },
  {
    id: "lang3",
    name: "Python",
    description: "Standards for Python development",
    updatedAt: "2024-03-05T14:30:00Z",
    tags: ["backend", "data", "scripting"]
  }
];

// Sample activity data
export const recentActivity = [
  {
    id: "act1",
    title: "Updated Button Component",
    project: "Customer Portal",
    user: "John Doe",
    type: "component",
    timestamp: "2024-03-18T10:30:00Z"
  },
  {
    id: "act2",
    title: "Added Authentication Guide",
    project: "API Gateway",
    user: "Jane Smith",
    type: "guide",
    timestamp: "2024-03-17T15:45:00Z"
  },
  {
    id: "act3",
    title: "Updated TypeScript Coding Guidelines",
    project: null,
    user: "Bob Johnson",
    type: "guideline",
    timestamp: "2024-03-16T09:20:00Z"
  }
];

export const allActivity = [
  ...recentActivity,
  {
    id: "act4",
    title: "Created New Project Structure",
    project: "Admin Dashboard",
    user: "Alice Williams",
    type: "project",
    timestamp: "2024-03-15T11:30:00Z"
  },
  {
    id: "act5",
    title: "Updated Navigation Component",
    project: "Customer Portal",
    user: "John Doe",
    type: "component",
    timestamp: "2024-03-14T13:20:00Z"
  },
  {
    id: "act6",
    title: "Added Deployment Guide",
    project: "API Gateway",
    user: "Jane Smith",
    type: "guide",
    timestamp: "2024-03-13T09:15:00Z"
  },
  {
    id: "act7",
    title: "Updated Python Guidelines",
    project: null,
    user: "Bob Johnson",
    type: "guideline",
    timestamp: "2024-03-12T14:45:00Z"
  },
  {
    id: "act8",
    title: "Added Error Handling Module",
    project: "API Gateway",
    user: "Jane Smith",
    type: "module",
    timestamp: "2024-03-11T10:30:00Z"
  }
];
