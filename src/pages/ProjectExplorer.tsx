
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Folder, Grid3X3, List, Search, ArrowUpDown, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

// Sample project data
const projects = [
  {
    id: "proj123",
    name: "Customer Portal",
    description: "Frontend application for customer account management and service requests",
    tags: ["react", "typescript", "customer-facing"],
    updatedAt: "2024-03-10T09:15:00Z"
  },
  {
    id: "proj456",
    name: "Admin Dashboard",
    description: "Internal tool for system administration",
    tags: ["react", "redux", "internal"],
    updatedAt: "2024-03-05T14:30:00Z"
  },
  {
    id: "proj789",
    name: "API Gateway",
    description: "Centralized API gateway for microservices",
    tags: ["node.js", "express", "microservices"],
    updatedAt: "2024-02-28T11:20:00Z"
  },
  {
    id: "proj101",
    name: "Mobile App",
    description: "Cross-platform mobile application for customer engagement",
    tags: ["react-native", "expo", "mobile"],
    updatedAt: "2024-03-12T16:45:00Z"
  },
  {
    id: "proj102",
    name: "Analytics Dashboard",
    description: "Data visualization and analytics platform",
    tags: ["react", "d3.js", "data-visualization"],
    updatedAt: "2024-03-08T13:10:00Z"
  },
  {
    id: "proj103",
    name: "Content Management System",
    description: "Custom CMS for managing digital content",
    tags: ["react", "graphql", "content"],
    updatedAt: "2024-03-01T10:25:00Z"
  }
];

const ProjectExplorer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"name" | "updatedAt">("updatedAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get all unique tags from projects
  const allTags = Array.from(
    new Set(projects.flatMap(project => project.tags))
  ).sort();

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  // Sort projects
  const sortProjects = (a: typeof projects[0], b: typeof projects[0]) => {
    if (sortBy === "name") {
      return sortDir === "asc" 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name);
    } else {
      return sortDir === "asc" 
        ? new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
        : new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    }
  };

  // Filter projects by search term and tags
  const filteredProjects = projects
    .filter(project => {
      // Search term filter
      const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           project.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Tags filter
      const matchesTags = selectedTags.length === 0 || 
                          selectedTags.every(tag => project.tags.includes(tag));
      
      return matchesSearch && matchesTags;
    })
    .sort(sortProjects);

  // Toggle sort direction or change sort field
  const toggleSort = (field: "name" | "updatedAt") => {
    if (sortBy === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDir("asc");
    }
  };

  return (
    <div className="container py-10 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground mt-1">
            Browse and discover all projects and their documentation
          </p>
        </div>
        <Button className="shrink-0" asChild>
          <Link to="/projects/new">New Project</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-6">
        {/* Filters Sidebar */}
        <div className="space-y-6">
          <div className="flex items-center mb-4">
            <Filter className="h-5 w-5 mr-2" />
            <h2 className="font-semibold">Filters</h2>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/20"
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Search & Controls */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search projects..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => toggleSort("name")}
                className="h-10 w-10 shrink-0"
                title="Sort by name"
              >
                <ArrowUpDown className="h-4 w-4" />
              </Button>
              <Tabs
                value={viewMode}
                onValueChange={(v) => setViewMode(v as "grid" | "list")}
                className="h-10"
              >
                <TabsList className="h-full">
                  <TabsTrigger value="grid" className="h-full px-3">
                    <Grid3X3 className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger value="list" className="h-full px-3">
                    <List className="h-4 w-4" />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-sm text-muted-foreground">
            Showing {filteredProjects.length} of {projects.length} projects
            {selectedTags.length > 0 && ` with tags: ${selectedTags.join(', ')}`}
          </div>

          {/* Projects Grid/List */}
          <Tabs value={viewMode} defaultValue="grid">
            <TabsContent value="grid" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredProjects.map((project) => (
                  <Link 
                    key={project.id} 
                    to={`/projects/${project.id}`}
                    className="hover-scale"
                  >
                    <Card className="h-full overflow-hidden border">
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Folder className="h-5 w-5 text-primary" />
                          {project.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {project.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="text-xs text-muted-foreground border-t pt-4">
                        Updated {formatDate(project.updatedAt)}
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="list" className="mt-0">
              <div className="space-y-3">
                {filteredProjects.map((project) => (
                  <Link
                    key={project.id}
                    to={`/projects/${project.id}`}
                  >
                    <Card className={cn(
                      "hover:border-primary/50 transition-all duration-200",
                      "flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4"
                    )}>
                      <div className="flex-shrink-0 p-2 rounded-md bg-primary/10">
                        <Folder className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-grow min-w-0">
                        <h3 className="font-medium">{project.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {project.description}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2 sm:min-w-32">
                        <div className="flex flex-wrap gap-1 justify-end">
                          {project.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {project.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{project.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(project.updatedAt)}
                        </span>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {filteredProjects.length === 0 && (
            <div className="text-center py-10">
              <h3 className="text-lg font-medium">No matching projects</h3>
              <p className="text-muted-foreground mt-2">
                Try adjusting your search or filters to find what you're looking for
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedTags([]);
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectExplorer;
