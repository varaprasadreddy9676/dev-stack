
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { useProjectData } from "@/hooks/useProjectData";
import { services } from "@/services/serviceFactory";
import { TroubleshootingIssue } from "@/types/troubleshooting";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bug, Search, Plus, AlertTriangle } from "lucide-react";
import TroubleshootingCard from "./TroubleshootingCard";
import TroubleshootingDetail from "./TroubleshootingDetail";
import TroubleshootingForm from "./TroubleshootingForm";

interface ProjectTroubleshootingProps {
  project: {
    _id: string;
    name: string;
  };
  onSave: (updatedData: any) => Promise<void>;
}

type ViewMode = "list" | "detail" | "add" | "edit";

const ProjectTroubleshooting: React.FC<ProjectTroubleshootingProps> = ({ project, onSave }) => {
  const [issues, setIssues] = useState<TroubleshootingIssue[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedIssue, setSelectedIssue] = useState<TroubleshootingIssue | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        setLoading(true);
        if (project && project._id) {
          const data = await services.projects.getTroubleshootingIssues(project._id);
          setIssues(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Error fetching troubleshooting issues:", error);
        toast.error("Failed to load troubleshooting issues");
        setIssues([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchIssues();
  }, [project._id]);
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };
  
  const handleSelectIssue = (issueId: string) => {
    const issue = issues.find(i => i.id === issueId);
    if (issue) {
      setSelectedIssue(issue);
      setViewMode("detail");
    }
  };
  
  const handleAddIssue = async (issueData: Omit<TroubleshootingIssue, "id" | "lastUpdated">) => {
    try {
      if (project && project._id) {
        const newIssue = await services.projects.createTroubleshootingIssue(project._id, issueData);
        if (newIssue) {
          setIssues([...issues, newIssue]);
          toast.success("Troubleshooting issue created successfully");
          setViewMode("list");
        }
      }
    } catch (error) {
      console.error("Error creating troubleshooting issue:", error);
      toast.error("Failed to create troubleshooting issue");
    }
  };
  
  const handleUpdateIssue = async (issueData: Omit<TroubleshootingIssue, "id" | "lastUpdated">) => {
    if (!selectedIssue || !project || !project._id) return;
    
    try {
      const updatedIssue = await services.projects.updateTroubleshootingIssue(
        project._id, 
        selectedIssue.id, 
        issueData
      );
      
      if (updatedIssue) {
        setIssues(issues.map(i => i.id === selectedIssue.id ? updatedIssue : i));
        setSelectedIssue(updatedIssue);
        toast.success("Troubleshooting issue updated successfully");
        setViewMode("detail");
      }
    } catch (error) {
      console.error("Error updating troubleshooting issue:", error);
      toast.error("Failed to update troubleshooting issue");
    }
  };
  
  const handleDeleteIssue = async (issueId: string) => {
    try {
      if (project && project._id) {
        await services.projects.deleteTroubleshootingIssue(project._id, issueId);
        setIssues(issues.filter(i => i.id !== issueId));
        toast.success("Troubleshooting issue deleted successfully");
        if (selectedIssue?.id === issueId) {
          setSelectedIssue(null);
          setViewMode("list");
        }
      }
    } catch (error) {
      console.error("Error deleting troubleshooting issue:", error);
      toast.error("Failed to delete troubleshooting issue");
    }
  };
  
  // Filter issues based on search and active tab
  const filteredIssues = issues.filter(issue => {
    const matchesSearch = 
      searchQuery === "" || 
      issue.issue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.symptoms.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      issue.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      
    const matchesTab = 
      activeTab === "all" || 
      issue.tags.includes(activeTab);
      
    return matchesSearch && matchesTab;
  });
  
  // Get unique tags for tab filtering
  const uniqueTags = Array.from(new Set(issues.flatMap(issue => issue.tags)));
  
  if (loading) {
    return <div className="flex justify-center p-10">Loading troubleshooting issues...</div>;
  }
  
  if (viewMode === "detail" && selectedIssue) {
    return (
      <TroubleshootingDetail 
        issue={selectedIssue} 
        formatDate={formatDate}
        onBack={() => setViewMode("list")}
        onEdit={() => setViewMode("edit")}
        onDelete={handleDeleteIssue}
      />
    );
  }
  
  if (viewMode === "add") {
    return (
      <TroubleshootingForm 
        projectId={project._id}
        onSubmit={handleAddIssue}
        onCancel={() => setViewMode("list")}
      />
    );
  }
  
  if (viewMode === "edit" && selectedIssue) {
    return (
      <TroubleshootingForm 
        projectId={project._id}
        initialData={selectedIssue}
        onSubmit={handleUpdateIssue}
        onCancel={() => setViewMode("detail")}
      />
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
        <div>
          <h2 className="text-2xl font-bold mb-1 flex items-center">
            <Bug className="mr-2 h-5 w-5 text-amber-500" />
            Troubleshooting
          </h2>
          <p className="text-muted-foreground">
            Document and solve common issues that users might encounter.
          </p>
        </div>
        
        <Button onClick={() => setViewMode("add")}>
          <Plus className="mr-1 h-4 w-4" /> Add Issue
        </Button>
      </div>
      
      <div className="flex flex-col-reverse md:flex-row gap-4">
        <Tabs 
          defaultValue="all" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full md:w-auto md:flex-shrink-0 md:min-w-[150px]"
        >
          <TabsList className="h-auto flex flex-row md:flex-col bg-muted/50 p-1 rounded-md w-full md:w-[150px]">
            <TabsTrigger 
              value="all" 
              className="flex-1 md:justify-start"
            >
              All Issues
            </TabsTrigger>
            {uniqueTags.map(tag => (
              <TabsTrigger 
                key={tag} 
                value={tag} 
                className="flex-1 md:justify-start"
              >
                {tag}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        
        <div className="flex-1">
          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search issues..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {filteredIssues.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 px-4 text-center border-2 border-dashed rounded-lg">
              <AlertTriangle className="h-10 w-10 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-1">No issues found</h3>
              <p className="text-muted-foreground mb-4">
                {issues.length === 0 
                  ? "No troubleshooting issues have been added yet." 
                  : "No issues match your current search or filter."}
              </p>
              {issues.length === 0 && (
                <Button onClick={() => setViewMode("add")}>
                  <Plus className="mr-1 h-4 w-4" /> Add First Issue
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredIssues.map(issue => (
                <TroubleshootingCard
                  key={issue.id}
                  issue={issue}
                  formatDate={formatDate}
                  onSelect={handleSelectIssue}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectTroubleshooting;
