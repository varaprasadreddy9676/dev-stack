
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Folder, 
  BookOpen, 
  Code, 
  Filter,
  Component,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

// Sample search results data
const searchResults = {
  projects: [
    {
      id: "proj123",
      name: "Customer Portal",
      description: "Frontend application for customer account management and service requests",
      tags: ["react", "typescript"],
      relevance: 0.95
    },
    {
      id: "proj456",
      name: "Admin Dashboard",
      description: "Internal tool for system administration",
      tags: ["react", "redux"],
      relevance: 0.82
    }
  ],
  guides: [
    {
      id: "guide123",
      title: "Implementing OAuth Authentication",
      description: "How to integrate OAuth in Customer Portal",
      projectId: "proj123",
      projectName: "Customer Portal",
      relevance: 0.89
    },
    {
      id: "guide456",
      title: "Creating Reusable Components",
      description: "Best practices for component design",
      projectId: "proj456",
      projectName: "Admin Dashboard",
      relevance: 0.75
    }
  ],
  components: [
    {
      id: "comp789",
      name: "LoginForm",
      description: "Authentication form component with validation",
      projectId: "proj123",
      projectName: "Customer Portal",
      relevance: 0.92
    },
    {
      id: "comp101",
      name: "Button",
      description: "Interactive button elements with various styles",
      projectId: "proj123",
      projectName: "Customer Portal",
      relevance: 0.68
    }
  ],
  snippets: [
    {
      id: "snip123",
      title: "API Authentication",
      language: "javascript",
      code: "const fetchWithAuth = async (url) => {\n  const token = getAuthToken();\n  return fetch(url, {\n    headers: { Authorization: `Bearer ${token}` }\n  });\n};",
      projectId: "proj123",
      projectName: "Customer Portal",
      relevance: 0.85
    }
  ]
};

const SearchResults = () => {
  const [searchTerm, setSearchTerm] = useState("authentication");
  const [activeTab, setActiveTab] = useState("all");
  const [filters, setFilters] = useState<string[]>([]);

  // Toggle filter selection
  const toggleFilter = (filter: string) => {
    if (filters.includes(filter)) {
      setFilters(filters.filter(f => f !== filter));
    } else {
      setFilters([...filters, filter]);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters([]);
  };

  // Filter results based on selected filters
  const filteredResults = {
    projects: searchResults.projects.filter(item => {
      if (filters.length === 0) return true;
      return filters.some(filter => item.tags.includes(filter));
    }),
    guides: searchResults.guides.filter(item => {
      if (filters.length === 0) return true;
      // In a real app, this would filter based on guide tags or project
      return true;
    }),
    components: searchResults.components.filter(item => {
      if (filters.length === 0) return true;
      // In a real app, this would filter based on component tags or project
      return true;
    }),
    snippets: searchResults.snippets.filter(item => {
      if (filters.length === 0) return true;
      // In a real app, this would filter based on snippet language or project
      return true;
    })
  };

  // Get total count of filtered results
  const totalResults = 
    filteredResults.projects.length + 
    filteredResults.guides.length + 
    filteredResults.components.length + 
    filteredResults.snippets.length;

  // Highlight search term in text
  const highlightText = (text: string, term: string) => {
    if (!term.trim()) return text;
    
    const regex = new RegExp(`(${term})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, i) => 
      regex.test(part) ? 
        <span key={i} className="bg-yellow-300 dark:bg-yellow-800 text-black dark:text-white font-medium px-0.5 rounded-sm">{part}</span> : 
        part
    );
  };

  return (
    <div className="container py-10 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Search Results</h1>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button className="shrink-0">
            Search
          </Button>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        <h2 className="text-lg font-medium">Results for: </h2>
        <span className="font-bold text-primary">"{searchTerm}"</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-6">
        {/* Filters Sidebar */}
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              <h2 className="font-semibold">Filters</h2>
            </div>
            
            {filters.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearFilters}
                className="h-8 px-2 text-xs"
              >
                Clear all
              </Button>
            )}
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {["react", "typescript", "redux", "node.js"].map(tag => (
                <Badge
                  key={tag}
                  variant={filters.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/20"
                  onClick={() => toggleFilter(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Content Type</h3>
            <div className="flex flex-col gap-2">
              <Button
                variant={filters.includes("project") ? "secondary" : "ghost"}
                size="sm"
                className="justify-start h-8"
                onClick={() => toggleFilter("project")}
              >
                <Folder className="h-4 w-4 mr-2" />
                Projects
              </Button>
              <Button
                variant={filters.includes("guide") ? "secondary" : "ghost"}
                size="sm"
                className="justify-start h-8"
                onClick={() => toggleFilter("guide")}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Guides
              </Button>
              <Button
                variant={filters.includes("component") ? "secondary" : "ghost"}
                size="sm"
                className="justify-start h-8"
                onClick={() => toggleFilter("component")}
              >
                <Component className="h-4 w-4 mr-2" />
                Components
              </Button>
              <Button
                variant={filters.includes("snippet") ? "secondary" : "ghost"}
                size="sm"
                className="justify-start h-8"
                onClick={() => toggleFilter("snippet")}
              >
                <Code className="h-4 w-4 mr-2" />
                Code Snippets
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Tabs for result types */}
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">
                All Results ({totalResults})
              </TabsTrigger>
              <TabsTrigger value="projects">
                Projects ({filteredResults.projects.length})
              </TabsTrigger>
              <TabsTrigger value="guides">
                Guides ({filteredResults.guides.length})
              </TabsTrigger>
              <TabsTrigger value="components">
                Components ({filteredResults.components.length})
              </TabsTrigger>
              <TabsTrigger value="snippets">
                Code Snippets ({filteredResults.snippets.length})
              </TabsTrigger>
            </TabsList>

            {/* All Results Tab */}
            <TabsContent value="all" className="space-y-8 mt-6">
              {totalResults === 0 ? (
                <div className="text-center py-10">
                  <h3 className="text-lg font-medium">No results found</h3>
                  <p className="text-muted-foreground mt-2">
                    Try adjusting your search term or filters
                  </p>
                </div>
              ) : (
                <>
                  {filteredResults.projects.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold flex items-center">
                          <Folder className="mr-2 h-5 w-5 text-primary" />
                          Projects
                        </h3>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to="/search?type=projects">View all</Link>
                        </Button>
                      </div>
                      <div className="space-y-3">
                        {filteredResults.projects.map((project) => (
                          <Link key={project.id} to={`/projects/${project.id}`}>
                            <Card className="hover:border-primary/50 transition-all duration-200">
                              <CardHeader className="py-4">
                                <CardTitle className="text-base flex items-center">
                                  {highlightText(project.name, searchTerm)}
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="pt-0 pb-4">
                                <p className="text-sm text-muted-foreground mb-2">
                                  {highlightText(project.description, searchTerm)}
                                </p>
                                <div className="flex gap-1">
                                  {project.tags.map(tag => (
                                    <Badge key={tag} variant="outline" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {filteredResults.guides.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold flex items-center">
                          <BookOpen className="mr-2 h-5 w-5 text-secondary" />
                          Guides
                        </h3>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to="/search?type=guides">View all</Link>
                        </Button>
                      </div>
                      <div className="space-y-3">
                        {filteredResults.guides.map((guide) => (
                          <Link key={guide.id} to={`/projects/${guide.projectId}/guides/${guide.id}`}>
                            <Card className="hover:border-secondary/50 transition-all duration-200">
                              <CardHeader className="py-4">
                                <CardTitle className="text-base flex items-center">
                                  {highlightText(guide.title, searchTerm)}
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="pt-0 pb-4">
                                <p className="text-sm text-muted-foreground mb-2">
                                  {highlightText(guide.description, searchTerm)}
                                </p>
                                <Badge variant="outline" className="text-xs">
                                  {guide.projectName}
                                </Badge>
                              </CardContent>
                            </Card>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {filteredResults.components.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold flex items-center">
                          <Component className="mr-2 h-5 w-5 text-accent" />
                          Components
                        </h3>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to="/search?type=components">View all</Link>
                        </Button>
                      </div>
                      <div className="space-y-3">
                        {filteredResults.components.map((component) => (
                          <Link key={component.id} to={`/projects/${component.projectId}/components/${component.id}`}>
                            <Card className="hover:border-accent/50 transition-all duration-200">
                              <CardHeader className="py-4">
                                <CardTitle className="text-base flex items-center">
                                  {highlightText(component.name, searchTerm)}
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="pt-0 pb-4">
                                <p className="text-sm text-muted-foreground mb-2">
                                  {highlightText(component.description, searchTerm)}
                                </p>
                                <Badge variant="outline" className="text-xs">
                                  {component.projectName}
                                </Badge>
                              </CardContent>
                            </Card>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {filteredResults.snippets.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold flex items-center">
                          <Code className="mr-2 h-5 w-5 text-primary" />
                          Code Snippets
                        </h3>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to="/search?type=snippets">View all</Link>
                        </Button>
                      </div>
                      <div className="space-y-3">
                        {filteredResults.snippets.map((snippet) => (
                          <Link key={snippet.id} to={`/projects/${snippet.projectId}/snippets/${snippet.id}`}>
                            <Card className="hover:border-primary/50 transition-all duration-200">
                              <CardHeader className="py-4">
                                <CardTitle className="text-base flex items-center">
                                  {highlightText(snippet.title, searchTerm)}
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="pt-0 pb-4">
                                <div className="bg-muted p-3 rounded-md overflow-auto mb-2">
                                  <pre className="text-sm font-mono">{snippet.code}</pre>
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  {snippet.projectName}
                                </Badge>
                                <Badge variant="outline" className="text-xs ml-1">
                                  {snippet.language}
                                </Badge>
                              </CardContent>
                            </Card>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </TabsContent>

            {/* Projects Tab */}
            <TabsContent value="projects" className="space-y-4 mt-6">
              {filteredResults.projects.length === 0 ? (
                <div className="text-center py-10">
                  <h3 className="text-lg font-medium">No projects found</h3>
                  <p className="text-muted-foreground mt-2">
                    Try adjusting your search term or filters
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredResults.projects.map((project) => (
                    <Link key={project.id} to={`/projects/${project.id}`}>
                      <Card className="hover:border-primary/50 transition-all duration-200">
                        <CardHeader className="py-4">
                          <CardTitle className="text-base flex items-center">
                            <Folder className="mr-2 h-5 w-5 text-primary" />
                            {highlightText(project.name, searchTerm)}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0 pb-4">
                          <p className="text-sm text-muted-foreground mb-2">
                            {highlightText(project.description, searchTerm)}
                          </p>
                          <div className="flex gap-1">
                            {project.tags.map(tag => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Similar implementations for other tabs */}
            <TabsContent value="guides" className="space-y-4 mt-6">
              {filteredResults.guides.length === 0 ? (
                <div className="text-center py-10">
                  <h3 className="text-lg font-medium">No guides found</h3>
                  <p className="text-muted-foreground mt-2">
                    Try adjusting your search term or filters
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredResults.guides.map((guide) => (
                    <Link key={guide.id} to={`/projects/${guide.projectId}/guides/${guide.id}`}>
                      <Card className="hover:border-secondary/50 transition-all duration-200">
                        <CardHeader className="py-4">
                          <CardTitle className="text-base flex items-center">
                            <BookOpen className="mr-2 h-5 w-5 text-secondary" />
                            {highlightText(guide.title, searchTerm)}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0 pb-4">
                          <p className="text-sm text-muted-foreground mb-2">
                            {highlightText(guide.description, searchTerm)}
                          </p>
                          <Badge variant="outline" className="text-xs">
                            {guide.projectName}
                          </Badge>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="components" className="space-y-4 mt-6">
              {filteredResults.components.length === 0 ? (
                <div className="text-center py-10">
                  <h3 className="text-lg font-medium">No components found</h3>
                  <p className="text-muted-foreground mt-2">
                    Try adjusting your search term or filters
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredResults.components.map((component) => (
                    <Link key={component.id} to={`/projects/${component.projectId}/components/${component.id}`}>
                      <Card className="hover:border-accent/50 transition-all duration-200">
                        <CardHeader className="py-4">
                          <CardTitle className="text-base flex items-center">
                            <Component className="mr-2 h-5 w-5 text-accent" />
                            {highlightText(component.name, searchTerm)}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0 pb-4">
                          <p className="text-sm text-muted-foreground mb-2">
                            {highlightText(component.description, searchTerm)}
                          </p>
                          <Badge variant="outline" className="text-xs">
                            {component.projectName}
                          </Badge>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="snippets" className="space-y-4 mt-6">
              {filteredResults.snippets.length === 0 ? (
                <div className="text-center py-10">
                  <h3 className="text-lg font-medium">No code snippets found</h3>
                  <p className="text-muted-foreground mt-2">
                    Try adjusting your search term or filters
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredResults.snippets.map((snippet) => (
                    <Link key={snippet.id} to={`/projects/${snippet.projectId}/snippets/${snippet.id}`}>
                      <Card className="hover:border-primary/50 transition-all duration-200">
                        <CardHeader className="py-4">
                          <CardTitle className="text-base flex items-center">
                            <Code className="mr-2 h-5 w-5 text-primary" />
                            {highlightText(snippet.title, searchTerm)}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0 pb-4">
                          <div className="bg-muted p-3 rounded-md overflow-auto mb-2">
                            <pre className="text-sm font-mono">{snippet.code}</pre>
                          </div>
                          <div className="flex gap-1">
                            <Badge variant="outline" className="text-xs">
                              {snippet.projectName}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {snippet.language}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
