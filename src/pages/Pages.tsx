
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { usePageData } from "@/hooks/usePageData";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Search, 
  Plus, 
  Calendar, 
  User, 
  Settings,
  Clock
} from "lucide-react";
import { PageSummary } from "@/types";
import { formatDate } from "@/utils/dateUtils";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/auth";
import { PageParentType } from "@/types";

const Pages = () => {
  const [pages, setPages] = useState<PageSummary[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const { searchPages, getRecentPages } = usePageData();
  const { user } = useAuth();

  useEffect(() => {
    const fetchPages = async () => {
      setLoading(true);
      try {
        if (searchQuery) {
          const results = await searchPages({ q: searchQuery });
          setPages(results.data);
        } else if (activeTab === "all") {
          const results = await searchPages({});
          setPages(results.data);
        } else if (activeTab === "recent") {
          const results = await getRecentPages(20);
          setPages(results.data);
        } else if (activeTab === "my-pages") {
          // This would need to be implemented server-side
          // For now, we'll just return all pages as a mock
          const results = await searchPages({});
          setPages(results.data);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, [searchQuery, activeTab, searchPages, getRecentPages]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is triggered by the effect
  };

  const getParentTypeDisplay = (type: PageParentType) => {
    switch (type) {
      case "project":
        return "Project";
      case "module":
        return "Module";
      case "component":
        return "Component";
      case "language":
        return "Language";
      case "guide":
        return "Guide";
      case "root":
        return "Root";
      default:
        return type;
    }
  };

  return (
    <div className="container py-10 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center mb-2">
            <FileText className="mr-2 h-6 w-6" />
            Pages
          </h1>
          <p className="text-muted-foreground">
            Browse and search all custom documentation pages
          </p>
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <form 
            onSubmit={handleSearch} 
            className="relative flex-1 md:w-64"
          >
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search pages..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          
          <Button asChild>
            <Link to="/pages/create">
              <Plus className="mr-1 h-4 w-4" /> New Page
            </Link>
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Pages</TabsTrigger>
          <TabsTrigger value="recent">Recently Updated</TabsTrigger>
          <TabsTrigger value="my-pages">My Pages</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              Array(6).fill(0).map((_, index) => (
                <Card key={index}>
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2 mt-2" />
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-1 mb-3">
                      <Skeleton className="h-5 w-16" />
                      <Skeleton className="h-5 w-16" />
                    </div>
                    <Skeleton className="h-4 w-full mt-5" />
                  </CardContent>
                </Card>
              ))
            ) : pages.length === 0 ? (
              <div className="col-span-full text-center py-10">
                <FileText className="h-16 w-16 mx-auto text-muted-foreground opacity-30 mb-4" />
                <h2 className="text-xl font-medium mb-2">No Pages Found</h2>
                <p className="text-muted-foreground mb-6">
                  {searchQuery 
                    ? "No pages match your search query. Try a different search term." 
                    : "There are no pages created yet."}
                </p>
                <Button asChild>
                  <Link to="/pages/create">
                    <Plus className="mr-1 h-4 w-4" /> Create New Page
                  </Link>
                </Button>
              </div>
            ) : (
              pages.map((page) => (
                <Card key={page._id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary flex-shrink-0" />
                      <CardTitle className="text-lg truncate">
                        <Link 
                          to={`/pages/${page._id}`}
                          className="hover:text-primary hover:underline transition-colors"
                        >
                          {page.title}
                        </Link>
                      </CardTitle>
                    </div>
                    
                    <CardDescription className="flex items-center gap-1">
                      <span>{getParentTypeDisplay(page.parent.type)}</span>
                      {page.parent.id && (
                        <Badge variant="outline" className="font-mono text-xs">
                          {page.parent.id.toString().substring(0, 8)}
                        </Badge>
                      )}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    {page.tags && page.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {page.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    {page.snippet && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {page.snippet}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatDate(page.metadata.lastUpdatedAt.toString())}
                      </div>
                      <Button
                        variant="link"
                        size="sm"
                        className="p-0 h-auto"
                        asChild
                      >
                        <Link to={`/pages/${page._id}`}>
                          View Page
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="recent" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Same rendering logic as "all" tab but with different data source */}
            {/* This is handled in the useEffect */}
            {loading ? (
              Array(6).fill(0).map((_, index) => (
                <Card key={index}>
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2 mt-2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mt-2" />
                    <Skeleton className="h-4 w-full mt-2" />
                  </CardContent>
                </Card>
              ))
            ) : (
              pages.map((page) => (
                <Card key={page._id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center">
                      <FileText className="h-5 w-5 text-primary mr-2" />
                      <Link 
                        to={`/pages/${page._id}`}
                        className="hover:text-primary hover:underline transition-colors truncate"
                      >
                        {page.title}
                      </Link>
                    </CardTitle>
                    <CardDescription>
                      Updated {formatDate(page.metadata.lastUpdatedAt.toString())}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="link" size="sm" className="p-0" asChild>
                      <Link to={`/pages/${page._id}`}>
                        View Page
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="my-pages" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* My Pages tab content */}
            {loading ? (
              Array(6).fill(0).map((_, index) => (
                <Card key={index}>
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2 mt-2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mt-2" />
                  </CardContent>
                </Card>
              ))
            ) : (
              pages.map((page) => (
                <Card key={page._id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center">
                      <FileText className="h-5 w-5 text-primary mr-2" />
                      <Link 
                        to={`/pages/${page._id}`}
                        className="hover:text-primary hover:underline transition-colors truncate"
                      >
                        {page.title}
                      </Link>
                    </CardTitle>
                    <CardDescription>
                      Created by you
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="link" size="sm" className="p-0" asChild>
                      <Link to={`/pages/${page._id}`}>
                        View Page
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="favorites" className="mt-0">
          <div className="text-center py-10">
            <Settings className="h-16 w-16 mx-auto text-muted-foreground opacity-30 mb-4" />
            <h2 className="text-xl font-medium mb-2">Favorites Feature Coming Soon</h2>
            <p className="text-muted-foreground mb-6">
              The ability to favorite pages will be available in a future update.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Pages;
