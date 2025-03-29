import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Folder, Code, BookOpen, LayoutGrid, Plus, ArrowRight, FileText, Monitor } from "lucide-react";

const projectFormSchema = z.object({
  name: z.string().min(3, {
    message: "Project name must be at least 3 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  type: z.enum(["frontend", "backend", "fullstack", "mobile", "library"], {
    required_error: "Please select a project type.",
  }),
  tags: z.string().optional(),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

const recentProjects = [
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

const codingGuidelines = [
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

const recentActivity = [
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

const allActivity = [
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

const Dashboard = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isActivityDialogOpen, setIsActivityDialogOpen] = useState(false);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };
  
  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    
    return formatDate(dateString);
  };
  
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      name: "",
      description: "",
      tags: ""
    }
  });
  
  const onSubmit = (data: ProjectFormValues) => {
    const processedData = {
      ...data,
      tags: data.tags ? data.tags.split(",").map(tag => tag.trim()) : []
    };
    
    console.log("Creating project:", processedData);
    
    toast({
      title: "Project created",
      description: `${data.name} has been created successfully.`,
    });
    
    setIsDialogOpen(false);
    form.reset();
  };

  const getProjectTypeIcon = (type: string) => {
    switch (type) {
      case "frontend":
        return <Monitor className="h-4 w-4" />;
      case "backend":
        return <Code className="h-4 w-4" />;
      case "fullstack":
        return <LayoutGrid className="h-4 w-4" />;
      case "mobile":
        return <Folder className="h-4 w-4" />;
      case "library":
        return <FileText className="h-4 w-4" />;
      default:
        return <Folder className="h-4 w-4" />;
    }
  };
  
  const getActivityTypeIcon = (type: string) => {
    switch (type) {
      case "component":
        return <LayoutGrid className="h-4 w-4" />;
      case "guide":
        return <BookOpen className="h-4 w-4" />;
      case "guideline":
        return <FileText className="h-4 w-4" />;
      case "project":
        return <Folder className="h-4 w-4" />;
      case "module":
        return <Code className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="container py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Developer Portal</h1>
          <p className="text-muted-foreground">Centralized hub for all development resources</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>
                Add a new project to the developer portal. Fill in the details below to get started.
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter project name" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is the name that will be displayed across the portal.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Brief description of the project" 
                          {...field} 
                          rows={3}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Type</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select project type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="frontend">Frontend</SelectItem>
                          <SelectItem value="backend">Backend</SelectItem>
                          <SelectItem value="fullstack">Full Stack</SelectItem>
                          <SelectItem value="mobile">Mobile</SelectItem>
                          <SelectItem value="library">Library</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="react, typescript, api (comma separated)" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Comma-separated list of tags for easier searching.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button type="submit">Create Project</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recent Projects</h2>
              <Button variant="outline" size="sm" asChild>
                <Link to="/projects">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentProjects.map((project) => (
                <Card key={project.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle>
                      <Link to={`/projects/${project.id}`} className="hover:text-primary transition-colors">
                        {project.name}
                      </Link>
                    </CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge className="flex items-center gap-1">
                        {getProjectTypeIcon(project.type)}
                        <span>{project.type}</span>
                      </Badge>
                      {project.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                      {project.tags.length > 2 && (
                        <Badge variant="outline">+{project.tags.length - 2}</Badge>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-0">
                    <div className="text-xs text-muted-foreground">
                      Updated {formatDate(project.updatedAt)}
                    </div>
                    <div className="flex gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center">
                        <LayoutGrid className="h-3.5 w-3.5 mr-1" />
                        {project.components}
                      </span>
                      <span className="flex items-center">
                        <BookOpen className="h-3.5 w-3.5 mr-1" />
                        {project.guides}
                      </span>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Coding Guidelines</h2>
              <Button variant="outline" size="sm" asChild>
                <Link to="/guidelines">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {codingGuidelines.map((guideline) => (
                <Card key={guideline.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">
                      <Link to={`/guidelines/${guideline.id}`} className="hover:text-primary transition-colors">
                        {guideline.name}
                      </Link>
                    </CardTitle>
                    <CardDescription>{guideline.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex flex-wrap gap-2">
                      {guideline.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <div className="text-xs text-muted-foreground">
                      Updated {formatDate(guideline.updatedAt)}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates across the portal</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex gap-4 items-start">
                    <div className="bg-primary/10 text-primary rounded-full p-2 mt-0.5">
                      {getActivityTypeIcon(activity.type)}
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">{activity.title}</p>
                      <div className="text-sm text-muted-foreground">
                        {activity.project ? (
                          <>in <span className="font-medium">{activity.project}</span> by </>
                        ) : (
                          <>by </>
                        )}
                        <span className="font-medium">{activity.user}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {formatRelativeTime(activity.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Dialog open={isActivityDialogOpen} onOpenChange={setIsActivityDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full" size="sm">
                    View All Activity
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] max-h-[80vh]">
                  <DialogHeader>
                    <DialogTitle>All Activity</DialogTitle>
                    <DialogDescription>
                      Recent activity across all projects and resources
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-6 overflow-y-auto pr-2" style={{ maxHeight: "calc(80vh - 180px)" }}>
                    {allActivity.map((activity) => (
                      <div key={activity.id} className="flex gap-4 items-start border-b pb-4 last:border-0">
                        <div className="bg-primary/10 text-primary rounded-full p-2 mt-0.5">
                          {getActivityTypeIcon(activity.type)}
                        </div>
                        <div className="space-y-1">
                          <p className="font-medium">{activity.title}</p>
                          <div className="text-sm text-muted-foreground">
                            {activity.project ? (
                              <>in <span className="font-medium">{activity.project}</span> by </>
                            ) : (
                              <>by </>
                            )}
                            <span className="font-medium">{activity.user}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {formatRelativeTime(activity.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
