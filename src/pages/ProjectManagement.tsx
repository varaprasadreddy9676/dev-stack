
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProjectManagement from "@/components/project/ProjectManagement";

const ProjectManagementPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    navigate("/projects");
    return null;
  }

  return <ProjectManagement />;
};

export default ProjectManagementPage;
