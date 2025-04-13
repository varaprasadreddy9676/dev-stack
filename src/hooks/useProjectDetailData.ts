
import { useState } from "react";
import { useParams } from "react-router-dom";
import { formatDate } from "@/utils/dateFormatUtils";
import { sampleProjectData, sampleComponents, sampleGuides } from "@/data/sampleProjectData";
import { ProjectData } from "@/types/project";

export interface ProjectDetailData {
  project: ProjectData;
  components: Array<{
    id: string;
    name: string;
    description: string;
    variants: number;
  }>;
  guides: Array<{
    id: string;
    title: string;
    description: string;
  }>;
  activeTab: string;
  setActiveTab: (value: string) => void;
  formatDateString: (dateString: string) => string;
  handleViewComponent: (componentId: string) => void;
  handleReadGuide: (guideId: string) => void;
}

export const useProjectDetailData = (): ProjectDetailData => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  
  // In a real app, we would fetch this data from an API based on the ID
  // For now, we'll use the sample data
  
  // Format date function
  const formatDateString = (dateString: string) => {
    return formatDate(dateString);
  };

  const handleViewComponent = (componentId: string) => {
    console.log(`Navigate to component detail: ${componentId}`);
  };

  const handleReadGuide = (guideId: string) => {
    console.log(`Navigate to guide detail: ${guideId}`);
  };

  // Add defensive checks to ensure we have arrays
  const project = {
    ...sampleProjectData,
    components: Array.isArray(sampleProjectData.components) ? sampleProjectData.components : [],
    resources: Array.isArray(sampleProjectData.resources) ? sampleProjectData.resources : [],
    troubleshooting: Array.isArray(sampleProjectData.troubleshooting) ? sampleProjectData.troubleshooting : []
  };

  return {
    project,
    components: sampleComponents,
    guides: sampleGuides,
    activeTab,
    setActiveTab,
    formatDateString,
    handleViewComponent,
    handleReadGuide
  };
};
