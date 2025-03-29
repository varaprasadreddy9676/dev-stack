
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Layout, Code, Plus } from "lucide-react";

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

  return (
    <div className="container py-10 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Component Library</h1>
          <p className="text-muted-foreground">Browse and use standardized UI components across projects</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Component
        </Button>
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
              {uniqueTags.map(tag => (
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
          <Tabs defaultValue="grid" className="mb-6">
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
                {filteredComponents.map(component => (
                  <Card key={component.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex justify-between items-center text-lg">
                        {component.name}
                        <span className="text-xs bg-primary/10 text-primary rounded-full px-2 py-1">
                          {component.variants} {component.variants === 1 ? 'variant' : 'variants'}
                        </span>
                      </CardTitle>
                      <CardDescription>{component.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {component.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">
                        Updated {formatDate(component.updatedAt)}
                      </div>
                      <Button variant="link" className="p-0 h-auto text-primary mt-2">
                        View Component
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="list" className="mt-6">
              <div className="space-y-4">
                {filteredComponents.map(component => (
                  <Card key={component.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{component.name}</CardTitle>
                          <CardDescription className="mt-1">{component.description}</CardDescription>
                        </div>
                        <span className="text-xs bg-primary/10 text-primary rounded-full px-2 py-1">
                          {component.variants} {component.variants === 1 ? 'variant' : 'variants'}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {component.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <div className="text-xs text-muted-foreground">
                          Updated {formatDate(component.updatedAt)}
                        </div>
                        <Button variant="link" className="p-0 h-auto text-primary">
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
