
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Language, LanguageFormValues } from "@/types/language";
import { sampleLanguages } from "@/data/sampleLanguages";
import { formatDate } from "@/utils/dateUtils";
import LanguageSearch from "@/components/languages/LanguageSearch";
import LanguageGrid from "@/components/languages/LanguageGrid";
import LanguageList from "@/components/languages/LanguageList";
import NewLanguageForm from "@/components/languages/NewLanguageForm";
import HelpCard from "@/components/languages/HelpCard";

const CodingGuidelines = () => {
  const navigate = useNavigate();
  const [languages] = useState<Language[]>(sampleLanguages);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Filter languages based on search term and active filter
  const filteredLanguages = languages.filter(lang => {
    const matchesSearch = 
      lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lang.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lang.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (activeFilter === "all") return matchesSearch;
    return matchesSearch && lang.tags.includes(activeFilter);
  });
  
  // Handle form submission
  const onSubmit = (data: LanguageFormValues) => {
    // Process tags
    const processedData = {
      ...data,
      tags: data.tags ? data.tags.split(",").map(tag => tag.trim()) : []
    };
    
    // In a real application, this would make an API call to create the language guide
    console.log("Creating language guide:", processedData);
    
    // Show success toast
    toast.success("Language guide created successfully");
    
    // Close dialog and reset form
    setIsDialogOpen(false);
    
    // Navigate to the new language guide
    // For demo purposes, we'll navigate to TypeScript guide
    navigate(`/guidelines/typescript`);
  };

  return (
    <div className="container py-10 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Coding Guidelines</h1>
          <p className="text-muted-foreground">Language-specific standards and best practices</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              New Language Guide
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Create New Language Guide</DialogTitle>
              <DialogDescription>
                Add a new language guide to the developer portal. Fill in the details below to get started.
              </DialogDescription>
            </DialogHeader>
            
            <NewLanguageForm onSubmit={onSubmit} />
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        <LanguageSearch 
          languages={languages}
          searchTerm={searchTerm}
          activeFilter={activeFilter}
          onSearchChange={setSearchTerm}
          onFilterChange={setActiveFilter}
        />
        
        <div className="flex-1">
          <Tabs defaultValue="grid" className="mb-6">
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                {filteredLanguages.length} {filteredLanguages.length === 1 ? "language" : "languages"} found
              </div>
              <TabsList>
                <TabsTrigger value="grid">Grid</TabsTrigger>
                <TabsTrigger value="list">List</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="grid" className="mt-6">
              <LanguageGrid languages={filteredLanguages} formatDate={formatDate} />
            </TabsContent>
            
            <TabsContent value="list" className="mt-6">
              <LanguageList languages={filteredLanguages} formatDate={formatDate} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CodingGuidelines;
