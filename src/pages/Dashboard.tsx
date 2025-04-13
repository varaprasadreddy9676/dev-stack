
import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { RecentProjects } from "@/components/dashboard/RecentProjects";
import { CodingGuidelines } from "@/components/dashboard/CodingGuidelines";
import { RecentActivityWidget } from "@/components/dashboard/RecentActivityWidget";
import { RecentPages } from "@/components/dashboard/RecentPages";
import { formatDate, formatRelativeTime } from "@/utils/dateFormatUtils";
import { recentProjects, codingGuidelines, recentActivity, allActivity } from "@/data/dashboardData";
import { ProjectFormValues } from "@/components/dashboard/ProjectForm";

const Dashboard = () => {
  const handleProjectSubmit = (data: ProjectFormValues) => {
    console.log("Project submitted:", data);
  };

  return (
    <div className="py-2 sm:py-4 md:py-6 animate-fade-in">
      <DashboardHeader onProjectSubmit={handleProjectSubmit} />
      
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
        
        <div className="space-y-4 md:space-y-6">
          <RecentActivityWidget 
            recentActivity={recentActivity} 
            allActivity={allActivity}
          />
          
          <RecentPages />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
