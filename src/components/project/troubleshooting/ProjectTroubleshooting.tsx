
import React from "react";
import { useTroubleshootingData } from "@/hooks/useTroubleshootingData";
import TroubleshootingHeader from "./TroubleshootingHeader";
import TroubleshootingList from "./TroubleshootingList";
import TroubleshootingTabs from "./TroubleshootingTabs";
import TroubleshootingDetail from "./TroubleshootingDetail";
import TroubleshootingForm from "./TroubleshootingForm";
import { ProjectTroubleshootingProps } from "./types";

const ProjectTroubleshooting: React.FC<ProjectTroubleshootingProps> = ({ project }) => {
  const {
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
  } = useTroubleshootingData({ 
    projectId: project._id 
  });
  
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
      <TroubleshootingHeader onAddIssue={() => setViewMode("add")} />
      
      <div className="flex flex-col-reverse md:flex-row gap-4">
        <TroubleshootingTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tags={uniqueTags}
        />
        
        <TroubleshootingList
          issues={issues}
          filteredIssues={filteredIssues}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          formatDate={formatDate}
          onSelectIssue={handleSelectIssue}
          onAddIssue={() => setViewMode("add")}
        />
      </div>
    </div>
  );
};

export default ProjectTroubleshooting;
