
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProjectManagement from "@/components/project/ProjectManagement";
import { toast } from "sonner";

const ProjectManagementPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    console.error("No project ID provided");
    toast.error("No project ID provided");
    navigate("/projects");
    return null;
  }

  // Adding better error handling when rendering the ProjectManagement component
  return (
    <React.Suspense fallback={<div className="container py-8">Loading project data...</div>}>
      <ProjectManagement projectId={id} />
    </React.Suspense>
  );
};

export default ProjectManagementPage;
