
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Layout, Code, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { ComponentPreview } from "@/components/ComponentPreview";

// Component form schema
const componentFormSchema = z.object({
  name: z.string().min(3, {
    message: "Component name must be at least 3 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  variants: z.string().min(1, {
    message: "Please specify the number of variants.",
  }),
  tags: z.string().optional(),
});

type ComponentFormValues = z.infer<typeof componentFormSchema>;

// Sample component data
const componentsData = [
  {
    id: "comp1",
    name: "Button",
    description: "Interactive button elements with various styles and states",
    usage: "Use buttons to trigger actions or navigation. Choose the appropriate variant based on visual hierarchy.",
    variants: 4,
    tags: ["ui", "interactive", "core"],
    updatedAt: "2024-03-15T14:20:00Z"
  },
  {
    id: "comp2",
    name: "Form Controls",
    description: "Input components with validation and error handling",
    usage: "Use form controls for user input with built-in validation.",
    variants: 6,
    tags: ["ui", "form", "input"],
    updatedAt: "2024-03-10T09:15:00Z"
  },
  {
    id: "comp3",
    name: "DataTable",
    description: "Sortable and filterable data table component",
    usage: "Use data tables to display tabular data with sorting and filtering capabilities.",
    variants: 2,
    tags: ["ui", "data", "table"],
    updatedAt: "2024-03-05T14:30:00Z"
  },
  {
    id: "comp4",
    name: "Modal Dialog",
    description: "Responsive modal dialog with customizable content",
    usage: "Use modals to display important information or capture user input without navigating away from the current page.",
    variants: 3,
    tags: ["ui", "modal", "overlay"],
    updatedAt: "2024-03-01T11:20:00Z"
  },
  {
    id: "comp5",
    name: "Navigation Bar",
    description: "Responsive navigation component with mobile support",
    usage: "Use navigation bars for primary navigation in your application.",
    variants: 2,
    tags: ["ui", "navigation", "layout"],
    updatedAt: "2024-02-25T16:45:00Z"
  },
  {
    id: "comp6",
    name: "Card",
    description: "Versatile card component for displaying content",
    usage: "Use cards to group related content and actions in a visually appealing way.",
    variants: 5,
    tags: ["ui", "layout", "container"],
    updatedAt: "2024-02-20T13:10:00Z"
  }
];

const Components = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [viewTab, setViewTab] = useState("grid");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<any>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [currentVariant, setCurrentVariant] = useState(0);
  
  // Filter components based on search term and active tab
  const filteredComponents = componentsData.filter(component => {
    const matchesSearch = 
      component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      component.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      component.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (activeTab === "all") return matchesSearch;
    return matchesSearch && component.tags.includes(activeTab.toLowerCase());
  });
  
  // Extract unique tags for filtering
  const uniqueTags = Array.from(new Set(componentsData.flatMap(comp => comp.tags)));
  
  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  // Form for creating new component
  const form = useForm<ComponentFormValues>({
    resolver: zodResolver(componentFormSchema),
    defaultValues: {
      name: "",
      description: "",
      variants: "1",
      tags: ""
    }
  });
  
  // Handle form submission
  const onSubmit = (data: ComponentFormValues) => {
    // Process tags
    const processedData = {
      ...data,
      variants: parseInt(data.variants),
      tags: data.tags ? data.tags.split(",").map(tag => tag.trim()) : []
    };
    
    // In a real application, this would make an API call to create the component
    console.log("Creating component:", processedData);
    
    // Show success toast
    toast.success("Component created successfully");
    
    // Close dialog and reset form
    setIsDialogOpen(false);
    form.reset();
  };

  // Handle view component
  const handleViewComponent = (component: any) => {
    setSelectedComponent(component);
    setCurrentVariant(0); // Reset to first variant
    setIsViewDialogOpen(true);
  };

  return (
    <div className="container py-10 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Component Library</h1>
          <p className="text-muted-foreground">Browse and use standardized UI components across projects</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Component
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Create New Component</DialogTitle>
              <DialogDescription>
                Add a new component to the library. Fill in the details below to get started.
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Component Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter component name" {...field} />
                      </FormControl>
                      <FormDescription>
                        For example: Button, Card, DataTable, etc.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Brief description of the component" 
                          {...field} 
                          rows={3}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="variants"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Variants</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="1"
                          placeholder="Number of variants" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        How many visual or functional variants does this component have?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="ui, form, layout (comma separated)" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Comma-separated list of tags for easier searching.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button type="submit">Create Component</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
        
        {/* Dialog for viewing component details */}
        {selectedComponent && (
          <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
            <DialogContent className="sm:max-w-[700px]">
              <DialogHeader>
                <DialogTitle className="flex justify-between items-center">
                  {selectedComponent.name}
                  <Badge className="ml-2">
                    {selectedComponent.variants} {selectedComponent.variants === 1 ? 'variant' : 'variants'}
                  </Badge>
                </DialogTitle>
                <DialogDescription>{selectedComponent.description}</DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedComponent.tags.map((tag: string) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Usage Guidelines</h3>
                  <p className="text-sm text-muted-foreground">{selectedComponent.usage}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Last Updated</h3>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(selectedComponent.updatedAt)}
                  </p>
                </div>
                
                <ComponentPreview 
                  name={selectedComponent.name}
                  variants={selectedComponent.variants}
                  currentVariant={currentVariant}
                  onVariantChange={setCurrentVariant}
                />
              </div>
              
              <DialogFooter>
                <Button>Edit Component</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-64 space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search components..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="bg-card border rounded-lg p-4 space-y-4">
            <h3 className="font-medium">Filter by Tag</h3>
            <div className="flex flex-wrap gap-2">
              <Badge 
                variant={activeTab === "all" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setActiveTab("all")}
              >
                All
              </Badge>
              {uniqueTags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant={activeTab === tag ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setActiveTab(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex-1">
          <Tabs defaultValue="grid" value={viewTab} onValueChange={setViewTab} className="mb-6">
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                {filteredComponents.length} {filteredComponents.length === 1 ? "component" : "components"}
              </div>
              <TabsList>
                <TabsTrigger value="grid">
                  <Layout className="h-4 w-4 mr-2" />
                  Grid
                </TabsTrigger>
                <TabsTrigger value="list">
                  <Code className="h-4 w-4 mr-2" />
                  List
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="grid" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredComponents.map((component) => (
                  <Card key={component.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex justify-between items-center text-lg">
                        {component.name}
                        <span className="text-xs bg-primary/10 text-primary rounded-full px-2 py-1 cursor-pointer"
                              onClick={() => handleViewComponent(component)}>
                          {component.variants} {component.variants === 1 ? 'variant' : 'variants'}
                        </span>
                      </CardTitle>
                      <CardDescription>{component.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {component.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">
                        Updated {formatDate(component.updatedAt)}
                      </div>
                      <Button 
                        variant="link" 
                        className="p-0 h-auto text-primary mt-2"
                        onClick={() => handleViewComponent(component)}
                      >
                        View Component
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="list" className="mt-6">
              <div className="space-y-4">
                {filteredComponents.map((component) => (
                  <Card key={component.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{component.name}</CardTitle>
                          <CardDescription className="mt-1">{component.description}</CardDescription>
                        </div>
                        <span className="text-xs bg-primary/10 text-primary rounded-full px-2 py-1 cursor-pointer"
                              onClick={() => handleViewComponent(component)}>
                          {component.variants} {component.variants === 1 ? 'variant' : 'variants'}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {component.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <div className="text-xs text-muted-foreground">
                          Updated {formatDate(component.updatedAt)}
                        </div>
                        <Button 
                          variant="link" 
                          className="p-0 h-auto text-primary"
                          onClick={() => handleViewComponent(component)}
                        >
                          View Component
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Components;
