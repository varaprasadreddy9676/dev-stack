
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useLanguageData } from "@/hooks/useLanguageData";
import { formatDate } from "@/utils/formatUtils";
import PageBreadcrumb from "@/components/common/PageBreadcrumb";
import LanguageHeader from "@/components/languages/LanguageHeader";
import LanguageTabs from "@/components/languages/LanguageTabs";
import LanguageGuidelinesLoading from "@/components/languages/LanguageGuidelinesLoading";
import LanguageNotFound from "@/components/languages/LanguageNotFound";

const LanguageGuidelines = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("guidelines");
  
  const { language, loading, saveGuidelinesContent } = useLanguageData(id);

  // Loading state
  if (loading) {
    return <LanguageGuidelinesLoading />;
  }

  // No language data
  if (!language) {
    return <LanguageNotFound />;
  }

  const breadcrumbItems = [
    { label: "Dashboard", href: "/" },
    { label: "Coding Guidelines", href: "/guidelines" },
    { label: language.name }
  ];

  const handleSaveGuidelines = (updatedContent: string) => {
    saveGuidelinesContent(updatedContent);
  };

  return (
    <div className="container py-10 animate-fade-in">
      {/* Breadcrumb Navigation */}
      <PageBreadcrumb items={breadcrumbItems} />
      
      {/* Language Header */}
      <LanguageHeader
        name={language.name}
        description={language.description}
        tags={language.tags}
        lastUpdated={language.guidelines.lastUpdated}
        formatDate={formatDate}
      />

      {/* Content Tabs */}
      <LanguageTabs 
        language={language}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        formatDate={formatDate}
        handleSaveGuidelines={handleSaveGuidelines}
      />
    </div>
  );
};

export default LanguageGuidelines;
