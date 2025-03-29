import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Star, GitBranch, Code, BookOpen, ArrowRight, Folder } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const recentProjects = [
    {
      id: "proj123",
      name: "Customer Portal",
      description: "Frontend application for customer account management and service requests",
      tags: ["react", "typescript", "customer-facing"],
      updatedAt: "2024-03-10T09:15:00Z"
    },
    {
      id: "proj456",
      name: "Admin Dashboard",
      description: "Internal tool for system administration",
      tags: ["react", "redux", "internal"],
      updatedAt: "2024-03-05T14:30:00Z"
    },
    {
      id: "proj789",
      name: "API Gateway",
      description: "Centralized API gateway for microservices",
      tags: ["node.js", "express", "microservices"],
      updatedAt: "2024-02-28T11:20:00Z"
    }
  ];

  const recentGuides = [
    {
      id: "guide123",
      title: "Implementing OAuth Authentication",
      description: "How to integrate OAuth in Customer Portal",
      project: "Customer Portal"
    },
    {
      id: "guide456",
      title: "Creating Reusable Components",
      description: "Best practices for component design",
      project: "Admin Dashboard"
    }
  ];

  const popularComponents = [
    {
      id: "comp123",
      name: "Button",
      description: "Interactive button elements with various styles",
      variants: 4
    },
    {
      id: "comp456",
      name: "DataTable",
      description: "Sortable and filterable data table component",
      variants: 2
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="container py-10 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Welcome to DevHub</h1>
        <p className="text-muted-foreground mt-2">
          Your centralized development knowledge hub
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <Folder className="mr-2 h-5 w-5 text-primary" />
              Projects
            </CardTitle>
            <CardDescription>All project documentation</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">24</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <BookOpen className="mr-2 h-5 w-5 text-secondary" />
              Guides
            </CardTitle>
            <CardDescription>Implementation guides</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">86</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <Code className="mr-2 h-5 w-5 text-accent" />
              Components
            </CardTitle>
            <CardDescription>Reusable UI components</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">132</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center text-lg">
                <Clock className="mr-2 h-5 w-5 text-primary" />
                Recent Projects
              </CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/projects" className="text-xs flex items-center">
                  View all <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div key={project.id} className="flex flex-col space-y-2 p-3 rounded-lg hover-scale bg-muted/50">
                  <div className="flex justify-between">
                    <Link to={`/projects/${project.id}`} className="font-medium hover:text-primary">
                      {project.name}
                    </Link>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(project.updatedAt)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="col-span-1 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center text-lg">
                  <BookOpen className="mr-2 h-5 w-5 text-secondary" />
                  Recent Guides
                </CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/guides" className="text-xs flex items-center">
                    View all <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentGuides.map((guide) => (
                  <div key={guide.id} className="flex flex-col space-y-1 p-3 rounded-lg hover-scale bg-muted/50">
                    <Link to={`/guides/${guide.id}`} className="font-medium hover:text-secondary">
                      {guide.title}
                    </Link>
                    <p className="text-xs text-muted-foreground">{guide.project}</p>
                    <p className="text-sm text-muted-foreground">{guide.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center text-lg">
                  <Code className="mr-2 h-5 w-5 text-accent" />
                  Popular Components
                </CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/components" className="text-xs flex items-center">
                    View all <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {popularComponents.map((component) => (
                  <div key={component.id} className="flex flex-col space-y-1 p-3 rounded-lg hover-scale bg-muted/50">
                    <Link to={`/components/${component.id}`} className="font-medium hover:text-accent">
                      {component.name}
                    </Link>
                    <p className="text-sm text-muted-foreground">{component.description}</p>
                    <p className="text-xs text-muted-foreground">{component.variants} variants</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-lg">
            <Star className="mr-2 h-5 w-5 text-accent" />
            Featured Content
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg glass-morphism hover-scale">
              <h3 className="font-semibold mb-2">Getting Started Guide</h3>
              <p className="text-sm text-muted-foreground mb-3">
                A complete introduction to using the DevHub platform
              </p>
              <Button size="sm" asChild>
                <Link to="/guides/getting-started">Read Guide</Link>
              </Button>
            </div>
            <div className="p-4 rounded-lg glass-morphism hover-scale">
              <h3 className="font-semibold mb-2">Component Design System</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Learn about our UI component design principles
              </p>
              <Button size="sm" variant="secondary" asChild>
                <Link to="/guides/design-system">View System</Link>
              </Button>
            </div>
            <div className="p-4 rounded-lg glass-morphism hover-scale">
              <h3 className="font-semibold mb-2">Architecture Patterns</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Recommended patterns for project architecture
              </p>
              <Button size="sm" variant="outline" asChild>
                <Link to="/guides/architecture">Explore</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-lg p-6 bg-gradient-to-br from-primary/20 to-secondary/20 border">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Need to add documentation?</h2>
            <p className="text-muted-foreground">
              Contribute to the knowledge base by adding new guides, components, or code snippets.
            </p>
          </div>
          <Button size="lg" className="whitespace-nowrap" asChild>
            <Link to="/contribute">
              <GitBranch className="mr-2 h-5 w-5" />
              Contribute
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
