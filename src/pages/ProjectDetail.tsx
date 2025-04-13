
import ProjectHeader from "@/components/project/detail/ProjectHeader";
import ProjectTabs from "@/components/project/detail/ProjectTabs";
import { useProjectDetailData } from "@/hooks/useProjectDetailData";

const ProjectDetail = () => {
  const {
    project,
    components,
    guides,
    activeTab,
    setActiveTab,
    formatDateString,
    handleViewComponent,
    handleReadGuide
  } = useProjectDetailData();
  
  return (
    <div className="container py-10 animate-fade-in">
      <ProjectHeader
        id={project._id}
        name={project.name}
        description={project.description}
        tags={Array.isArray(project.tags) ? project.tags : []}
      />
      
      <ProjectTabs
        project={project}
        id={project._id}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        formatDate={formatDateString}
        components={components}
        guides={guides}
        handleViewComponent={handleViewComponent}
        handleReadGuide={handleReadGuide}
      />
    </div>
  );
};

export default ProjectDetail;
