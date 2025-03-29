
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { componentsData } from "@/components/component-library/constants";
import { formatDate, filterComponents, getUniqueTags } from "@/components/component-library/utils";
import ComponentForm, { ComponentFormValues } from "@/components/component-library/ComponentForm";
import ComponentFilter from "@/components/component-library/ComponentFilter";
import ComponentList from "@/components/component-library/ComponentList";
import ComponentDetailView from "@/components/component-library/ComponentDetailView";

const Components = () => {
  // State for filtered components
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [viewTab, setViewTab] = useState("grid");
  
  // State for components data
  const [components, setComponents] = useState([...componentsData]);
  
  // State for dialogs
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<any>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [currentVariant, setCurrentVariant] = useState(0);
  
  const filteredComponents = filterComponents(components, searchTerm, activeTab);
  const uniqueTags = getUniqueTags(components);

  const handleViewComponent = (component: any) => {
    setSelectedComponent(component);
    setCurrentVariant(0);
    setIsViewDialogOpen(true);
  };

  const handleEditComponent = (updatedComponent: any) => {
    // Replace the component in the array with the updated one
    const updatedComponents = components.map(comp => 
      comp.id === updatedComponent.id ? updatedComponent : comp
    );
    
    setComponents(updatedComponents);
    toast.success("Component updated successfully");
  };
  
  const handleCreateComponent = (data: ComponentFormValues) => {
    const processedData = {
      id: `component-${Date.now()}`, // Generate a simple ID
      ...data,
      variants: parseInt(data.variants),
      tags: data.tags ? data.tags.split(",").map(tag => tag.trim()) : [],
      usage: "Standard component usage guidelines. Follow accessibility best practices.",
      updatedAt: new Date().toISOString()
    };
    
    // Add the new component to the state
    setComponents([processedData, ...components]);
    
    toast.success("Component created successfully");
    setIsDialogOpen(false);
  };

  return (
    <div className="container py-10 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Component Library</h1>
          <p className="text-muted-foreground">Browse and use standardized UI components across projects</p>
        </div>
        
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Component
        </Button>
        
        <ComponentForm 
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onSubmit={handleCreateComponent}
        />
        
        {selectedComponent && (
          <ComponentDetailView
            component={selectedComponent}
            isOpen={isViewDialogOpen}
            onOpenChange={setIsViewDialogOpen}
            currentVariant={currentVariant}
            onVariantChange={setCurrentVariant}
            onEdit={handleEditComponent}
            formatDate={formatDate}
          />
        )}
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        <ComponentFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          uniqueTags={uniqueTags}
        />
        
        <ComponentList
          viewTab={viewTab}
          onViewTabChange={setViewTab}
          filteredComponents={filteredComponents}
          formatDate={formatDate}
          onViewComponent={handleViewComponent}
        />
      </div>
    </div>
  );
};

export default Components;
