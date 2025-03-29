
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
  GitFork, 
  Share, 
  Star, 
  GitBranch, 
  CalendarDays, 
  Users, 
  BookMarked
} from "lucide-react";

// Sample project data
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
  tags: ["react", "typescript", "customer-facing"],
  createdAt: "2024-02-15T12:00:00Z",
  updatedAt: "2024-03-10T09:15:00Z",
  team: [
    { name: "John Doe", role: "Tech Lead" },
    { name: "Jane Smith", role: "UX Designer" },
    { name: "Bob Johnson", role: "Frontend Developer" }
  ]
};

// Sample components data
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

// Sample guides data
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
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="container py-10 animate-fade-in">
      {/* Project Header */}
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
            <Button variant="outline" size="sm">
              <Star className="mr-1 h-4 w-4" /> Star
            </Button>
            <Button variant="outline" size="sm">
              <GitFork className="mr-1 h-4 w-4" /> Fork
            </Button>
            <Button variant="outline" size="sm">
              <Share className="mr-1 h-4 w-4" /> Share
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

      {/* Project Tabs Navigation */}
      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <div className="border-b">
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
              value="components"
              className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              Components
            </TabsTrigger>
            <TabsTrigger
              value="guides"
              className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              Implementation Guides
            </TabsTrigger>
          </TabsList>
        </div>
        
        {/* Overview Tab */}
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
        
        {/* Architecture Tab */}
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
        
        {/* Components Tab */}
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
              <Link
                to={`/projects/${id}/components/${component.id}`}
                key={component.id}
                className="hover-scale"
              >
                <Card className="h-full overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{component.name}</CardTitle>
                    <CardDescription>{component.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">
                      {component.variants} {component.variants === 1 ? 'variant' : 'variants'}
                    </div>
                    <Button variant="link" className="p-0 h-auto text-primary mt-2">
                      View Component
                      <Code className="ml-1 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>
        
        {/* Guides Tab */}
        <TabsContent value="guides" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Implementation Guides</h2>
            <Button size="sm">
              <BookOpen className="mr-2 h-4 w-4" />
              New Guide
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {guides.map((guide) => (
              <Link
                to={`/projects/${id}/guides/${guide.id}`}
                key={guide.id}
                className="hover-scale"
              >
                <Card className="h-full overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{guide.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{guide.description}</p>
                    <Button variant="link" className="p-0 h-auto text-secondary">
                      Read Guide
                      <GitBranch className="ml-1 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectDetail;
