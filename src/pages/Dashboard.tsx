import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RecentProjects } from "@/components/dashboard/RecentProjects";
import { CodingGuidelines } from "@/components/dashboard/CodingGuidelines";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { ProjectForm, ProjectFormValues } from "@/components/dashboard/ProjectForm";
import { useIsMobile } from "@/hooks/use-mobile";

// Sample data
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
  const isMobile = useIsMobile();
  
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
  
  const handleProjectSubmit = (data: ProjectFormValues) => {
    console.log("Project submitted:", data);
    setIsDialogOpen(false);
  };

  return (
    <div className="py-2 sm:py-4 md:py-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-4 md:mb-6 px-2 md:px-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-0 md:mb-1">Developer Portal</h1>
          <p className="text-base md:text-base text-muted-foreground">Centralized hub for all development resources</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size={isMobile ? "default" : "default"} className="mt-2 md:mt-0">
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
            
            <ProjectForm onSubmit={handleProjectSubmit} />
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-6 px-2 md:px-0">
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          <RecentProjects 
            projects={recentProjects} 
            formatDate={formatDate}
          />
          
          <CodingGuidelines 
            guidelines={codingGuidelines} 
            formatDate={formatDate}
          />
        </div>
        
        <div>
          <ActivityFeed 
            recentActivity={recentActivity} 
            allActivity={allActivity} 
            formatRelativeTime={formatRelativeTime}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
