import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Code, 
  Component, 
  Share, 
  Star, 
  GitBranch, 
  CalendarDays, 
  Users, 
  BookMarked,
  PencilIcon,
  PackageIcon,
  FileIcon,
  GalleryHorizontalEndIcon,
  Bug
} from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import ShareDialog from "@/components/common/ShareDialog";
import { FEATURES } from "@/config/config";

const projectData = {
  id: "proj123",
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
      description: "User authentication and authorization"
    },
    {
      name: "Dashboard",
      description: "User dashboard with analytics"
    }
  ],
  guidelines: {
    content: "Follow these guidelines when contributing to the project...",
    lastUpdated: "2024-03-01T10:30:00Z"
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
          code: "// No code needed for this solution"
        }
      ],
      tags: ["authentication", "login"],
      lastUpdated: "2024-03-20T00:00:00Z"
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
          code: "// Example code for pagination"
        }
      ],
      tags: ["performance", "dashboard"],
      lastUpdated: "2024-03-18T00:00:00Z"
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

const components = [
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

const guides = [
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

const ProjectDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const { isFavorite, toggleFavorite, isLoading: isFavoriteLoading } = useFavorites('projects');
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const handleViewComponent = (componentId: string) => {
    console.log(`Navigate to component detail: ${componentId}`);
  };

  const handleReadGuide = (guideId: string) => {
    console.log(`Navigate to guide detail: ${guideId}`);
  };

  return (
    <div className="container py-10 animate-fade-in">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Link to="/projects" className="text-sm text-muted-foreground hover:text-foreground">
                Projects
              </Link>
              <span className="text-sm text-muted-foreground">/</span>
              <span className="text-sm font-medium">{projectData.name}</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">{projectData.name}</h1>
            <p className="text-muted-foreground">{projectData.description}</p>
          </div>
          
          <div className="flex items-center gap-2">
            {FEATURES.ENABLE_FAVORITES && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => toggleFavorite(projectData.id, projectData.name)}
                disabled={isFavoriteLoading}
              >
                <Star 
                  className={`mr-1 h-4 w-4 ${isFavorite(projectData.id) ? "fill-yellow-400 text-yellow-400" : ""}`} 
                />
                {isFavorite(projectData.id) ? "Favorited" : "Favorite"}
              </Button>
            )}
            
            {FEATURES.ENABLE_SHARING && (
              <ShareDialog
                title={projectData.name}
                type="Project"
                id={projectData.id}
                path={`/projects/${projectData.id}`}
                description="Share this project with your team or colleagues"
              />
            )}
            
            <Button variant="default" size="sm" asChild>
              <Link to={`/projects/${id}/edit`}>
                <PencilIcon className="mr-1 h-4 w-4" /> Edit Project
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {projectData.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <div className="border-b overflow-x-auto">
          <TabsList className="w-full justify-start h-auto p-0 bg-transparent">
            <TabsTrigger
              value="overview"
              className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="architecture"
              className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              Architecture
            </TabsTrigger>
            <TabsTrigger
              value="structure"
              className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              Structure
            </TabsTrigger>
            <TabsTrigger
              value="frameworks"
              className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              Frameworks
            </TabsTrigger>
            <TabsTrigger
              value="modules"
              className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              Modules
            </TabsTrigger>
            <TabsTrigger
              value="guidelines"
              className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              Guidelines
            </TabsTrigger>
            <TabsTrigger
              value="components"
              className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              Components
            </TabsTrigger>
            <TabsTrigger
              value="resources"
              className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              Resources
            </TabsTrigger>
            <TabsTrigger
              value="troubleshooting"
              className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              Troubleshooting
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="overview" className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Project Overview</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                  <p>{projectData.overview}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Project Structure</CardTitle>
                  <CardDescription>{projectData.structure.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {projectData.structure.folders.map((folder, idx) => (
                      <div key={idx} className="p-3 bg-muted/50 rounded-md">
                        <div className="font-mono text-sm">{folder.path}</div>
                        <div className="text-sm text-muted-foreground mt-1">{folder.purpose}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Custom Frameworks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {projectData.customFrameworks.map((framework, idx) => (
                      <div key={idx} className="p-4 border rounded-lg">
                        <h3 className="text-lg font-medium mb-2">{framework.name}</h3>
                        <p className="text-muted-foreground mb-4">{framework.description}</p>
                        <div className="bg-muted p-3 rounded-md overflow-auto">
                          <pre className="text-sm font-mono">{framework.examples[0].code}</pre>
                        </div>
                        <p className="text-sm mt-2">{framework.examples[0].description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Team</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {projectData.team.map((member, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                          {member.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-xs text-muted-foreground">{member.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Project Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CalendarDays className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <div className="text-sm font-medium">Created</div>
                        <div className="text-sm text-muted-foreground">
                          {formatDate(projectData.createdAt)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <CalendarDays className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <div className="text-sm font-medium">Last Updated</div>
                        <div className="text-sm text-muted-foreground">
                          {formatDate(projectData.updatedAt)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <div className="text-sm font-medium">Team Members</div>
                        <div className="text-sm text-muted-foreground">
                          {projectData.team.length} contributors
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Component className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <div className="text-sm font-medium">Components</div>
                        <div className="text-sm text-muted-foreground">
                          {components.length} components
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <BookOpen className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <div className="text-sm font-medium">Guides</div>
                        <div className="text-sm text-muted-foreground">
                          {guides.length} implementation guides
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="p-4 rounded-lg glass-morphism">
                <h3 className="font-medium mb-2">Need help?</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  If you have questions about this project, reach out to the team lead.
                </p>
                <Button size="sm" variant="outline" className="w-full">
                  Contact Team
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="architecture" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Architecture</CardTitle>
              <CardDescription>{projectData.architecture.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center p-10">
              <div className="p-10 border-2 border-dashed border-muted-foreground/20 rounded-md text-center w-full">
                <div className="mb-4 text-muted-foreground">Architecture Diagram</div>
                <Button variant="outline" size="sm">
                  <BookMarked className="mr-2 h-4 w-4" />
                  View Full Diagram
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Component Dependencies</CardTitle>
              <CardDescription>How components interact with each other</CardDescription>
            </CardHeader>
            <CardContent className="prose dark:prose-invert">
              <p>
                The Customer Portal uses a hierarchical component structure with clear boundaries
                between features. Components communicate through props and context API, with minimal
                global state management.
              </p>
              <div className="p-4 bg-muted/50 rounded-md mt-4">
                <h4 className="text-lg font-medium">Key Dependencies</h4>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>React Router for navigation</li>
                  <li>React Query for data fetching</li>
                  <li>Zod for schema validation</li>
                  <li>Custom hooks for shared functionality</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="structure" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Structure</CardTitle>
              <CardDescription>{projectData.structure.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projectData.structure.folders.map((folder, idx) => (
                  <div key={idx} className="p-3 bg-muted/50 rounded-md">
                    <div className="font-mono text-sm">{folder.path}</div>
                    <div className="text-sm text-muted-foreground mt-1">{folder.purpose}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="frameworks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Custom Frameworks</CardTitle>
              <CardDescription>Custom utilities and frameworks used in this project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projectData.customFrameworks.map((framework, idx) => (
                  <div key={idx} className="p-4 border rounded-lg">
                    <h3 className="text-lg font-medium mb-2">{framework.name}</h3>
                    <p className="text-muted-foreground mb-4">{framework.description}</p>
                    <div className="bg-muted p-3 rounded-md overflow-auto">
                      <pre className="text-sm font-mono">{framework.examples[0].code}</pre>
                    </div>
                    <p className="text-sm mt-2">{framework.examples[0].description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="modules" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Modules</CardTitle>
              <CardDescription>Main functional modules in this project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projectData.modules.map((module, idx) => (
                  <div key={idx} className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <PackageIcon className="h-5 w-5 text-muted-foreground" />
                      <h3 className="text-lg font-medium">{module.name}</h3>
                    </div>
                    <p className="text-muted-foreground mt-2">{module.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="guidelines" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Guidelines</CardTitle>
              <CardDescription>Best practices and development standards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none">
                <p>{projectData.guidelines.content}</p>
              </div>
              
              <div className="text-sm text-muted-foreground mt-4">
                Last updated: {formatDate(projectData.guidelines.lastUpdated)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="components" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Project Components</h2>
            <Button size="sm">
              <Component className="mr-2 h-4 w-4" />
              New Component
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {components.map((component) => (
              <Card key={component.id} className="h-full overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{component.name}</CardTitle>
                  <CardDescription>{component.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    {component.variants} {component.variants === 1 ? 'variant' : 'variants'}
                  </div>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-primary mt-2"
                    onClick={() => handleViewComponent(component.id)}
                  >
                    View Component
                    <Code className="ml-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="resources" className="space-y-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Project Resources</h2>
            <Button size="sm">
              <FileIcon className="mr-2 h-4 w-4" />
              Add Resource
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {projectData.resources.map((resource, index) => (
              <Card key={index} className="h-full overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    {resource.type === "link" && <GalleryHorizontalEndIcon className="h-5 w-5 text-blue-500" />}
                    {resource.type === "pdf" && <FileIcon className="h-5 w-5 text-red-500" />}
                    {resource.type === "video" && <BookOpen className="h-5 w-5 text-green-500" />}
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{resource.description}</p>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-primary"
                    onClick={() => window.open(resource.url, "_blank")}
                  >
                    Access Resource
                    <GitBranch className="ml-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="troubleshooting" className="space-y-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold flex items-center">
              <Bug className="mr-2 h-5 w-5 text-amber-500" />
              Troubleshooting
            </h2>
            <Button variant="default" size="sm" asChild>
              <Link to={`/projects/${id}/edit?tab=troubleshooting`}>
                <PencilIcon className="mr-1 h-4 w-4" /> Manage Issues
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {projectData.troubleshooting.map((issue) => (
              <Card key={issue.id} className="h-full hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 mb-1">
                    <Bug className="h-5 w-5 text-amber-500" />
                    <CardTitle className="text-lg">{issue.issue}</CardTitle>
                  </div>
                  <CardDescription>{issue.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium mb-1">Symptoms</h4>
                      <ul className="list-disc list-inside text-sm text-muted-foreground">
                        {issue.symptoms.map((symptom, index) => (
                          <li key={index}>{symptom}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {issue.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                      <div className="flex items-center">
                        <CalendarDays className="h-3 w-3 mr-1" />
                        {formatDate(issue.lastUpdated)}
                      </div>
                      <Button 
                        variant="link" 
                        size="sm" 
                        className="p-0 h-auto"
                        asChild
                      >
                        <Link to={`/projects/${id}/troubleshooting/${issue.id}`}>
                          View Solutions
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectDetail;
