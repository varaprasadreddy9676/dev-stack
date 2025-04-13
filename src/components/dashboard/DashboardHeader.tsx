
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ProjectForm, ProjectFormValues } from "@/components/dashboard/ProjectForm";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardHeaderProps {
  onProjectSubmit: (data: ProjectFormValues) => void;
}

export const DashboardHeader = ({ onProjectSubmit }: DashboardHeaderProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const handleProjectSubmit = (data: ProjectFormValues) => {
    onProjectSubmit(data);
    setIsDialogOpen(false);
  };

  return (
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
  );
};
