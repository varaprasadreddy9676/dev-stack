
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useLanguageData } from "@/hooks/useLanguageData";
import PageBreadcrumb from "@/components/common/PageBreadcrumb";
import LanguageHeader from "@/components/languages/LanguageHeader";
import LanguageTabs from "@/components/languages/LanguageTabs";
import { Skeleton } from "@/components/ui/skeleton";

// Format date for display
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
};

const LanguageGuidelines = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("guidelines");
  
  const { language, loading, saveGuidelinesContent } = useLanguageData(id);

  // Loading state
  if (loading) {
    return (
      <div className="container py-10">
        <Skeleton className="h-8 w-64 mb-6" />
        <Skeleton className="h-20 w-full mb-8" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  // No language data
  if (!language) {
    return (
      <div className="container py-10">
        <h1 className="text-2xl font-bold mb-4">Language Not Found</h1>
        <p>The requested language guidelines could not be found.</p>
      </div>
    );
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
