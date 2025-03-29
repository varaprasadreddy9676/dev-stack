
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProjectManagement from "@/components/project/ProjectManagement";
import { toast } from "sonner";

const ProjectManagementPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    navigate("/projects");
    return null;
  }

  // We'll add a try/catch to handle the case where the project is not found
  return (
    <React.Suspense fallback={<div className="container py-8">Loading project data...</div>}>
      <ProjectManagement projectId={id} />
    </React.Suspense>
  );
};

export default ProjectManagementPage;
