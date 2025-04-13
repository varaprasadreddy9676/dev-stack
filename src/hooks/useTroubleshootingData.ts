
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { services } from "@/services/serviceFactory";
import { TroubleshootingIssue } from "@/types/troubleshooting";

export interface UseTroubleshootingDataProps {
  projectId: string;
}

export const useTroubleshootingData = ({ projectId }: UseTroubleshootingDataProps) => {
  const [issues, setIssues] = useState<TroubleshootingIssue[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedIssue, setSelectedIssue] = useState<TroubleshootingIssue | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "detail" | "add" | "edit">("list");
  
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        setLoading(true);
        if (projectId) {
          const data = await services.projects.getTroubleshootingIssues(projectId);
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
  }, [projectId]);
  
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
      if (projectId) {
        const newIssue = await services.projects.createTroubleshootingIssue(projectId, issueData);
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
    if (!selectedIssue || !projectId) return;
    
    try {
      const updatedIssue = await services.projects.updateTroubleshootingIssue(
        projectId, 
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
      if (projectId) {
        await services.projects.deleteTroubleshootingIssue(projectId, issueId);
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
  
  return {
    issues,
    filteredIssues,
    loading,
    viewMode,
    selectedIssue,
    searchQuery,
    activeTab,
    uniqueTags,
    setSearchQuery,
    setActiveTab,
    setViewMode,
    handleSelectIssue,
    handleAddIssue,
    handleUpdateIssue,
    handleDeleteIssue,
    formatDate
  };
};
