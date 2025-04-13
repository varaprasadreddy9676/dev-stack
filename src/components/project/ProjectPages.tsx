
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { usePageData } from "@/hooks/usePageData";
import { PageSummary } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, FilePlus, FileText, Search } from "lucide-react";
import { formatDate } from "@/utils/dateUtils";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

export const ProjectPages = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("all");
  const [pages, setPages] = useState<PageSummary[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { loading, getPagesByParent, searchPages } = usePageData();

  useEffect(() => {
    const fetchPages = async () => {
      if (id) {
        if (searchQuery) {
          const result = await searchPages({
            q: searchQuery,
            parent: `project:${id}`,
            page: currentPage,
            limit: 10
          });
          setPages(result.data);
          setTotalPages(Math.ceil(result.total / 10));
        } else {
          const result = await getPagesByParent("project", id, currentPage, 10);
          setPages(result.data);
          setTotalPages(Math.ceil(result.total / 10));
        }
      }
    };

    fetchPages();
  }, [id, currentPage, searchQuery, getPagesByParent, searchPages]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const PageCard = ({ page }: { page: PageSummary }) => (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 mb-1">
          <FileText className="h-5 w-5 text-primary" />
          <Link 
            to={`/pages/${page._id}`}
            className="text-lg font-medium hover:text-primary transition-colors"
          >
            {page.title}
          </Link>
        </div>
        {page.snippet && (
          <CardDescription className="line-clamp-2">{page.snippet}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-1 mb-3">
          {page.tags && page.tags.map(tag => (
            <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
          ))}
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
          <div className="flex items-center">
            <CalendarDays className="h-3 w-3 mr-1" />
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
  );

  // Define categories for tabs
  const getPagesByCategory = (tabValue: string) => {
    if (tabValue === "all") return pages;
    
    // Since relatedEntities might not exist on PageSummary type,
    // we'll filter by tags as an alternative
    return pages.filter(page => 
      page.tags.some(tag => tag.toLowerCase() === tabValue)
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold flex items-center">
          <FileText className="mr-2 h-5 w-5 text-primary" />
          Project Pages
        </h2>
        <Button variant="default" size="sm" asChild>
          <Link to={`/projects/${id}/new-page`}>
            <FilePlus className="mr-1 h-4 w-4" /> Create Page
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">All Pages</TabsTrigger>
            <TabsTrigger value="documentation">Documentation</TabsTrigger>
            <TabsTrigger value="implementation">Implementation</TabsTrigger>
            <TabsTrigger value="reference">Reference</TabsTrigger>
          </TabsList>

          <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="search"
              placeholder="Search pages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9"
            />
            <Button type="submit" size="sm" className="h-9">
              <Search className="h-4 w-4 mr-1" />
              Search
            </Button>
          </form>
        </div>

        <TabsContent value="all" className="mt-2">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {Array(4).fill(0).map((_, index) => (
                <Card key={index}>
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-2/3 mt-2" />
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-1 mb-3">
                      <Skeleton className="h-5 w-16" />
                      <Skeleton className="h-5 w-16" />
                    </div>
                    <Skeleton className="h-4 w-full mt-5" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : pages.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
              <h3 className="mt-4 text-lg font-medium">No Pages Found</h3>
              <p className="text-muted-foreground mt-2">
                This project doesn't have any pages yet. Create the first one!
              </p>
              <Button variant="outline" className="mt-4" asChild>
                <Link to={`/projects/${id}/new-page`}>
                  <FilePlus className="mr-2 h-4 w-4" /> Create New Page
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {pages.map((page) => (
                <PageCard key={page._id} page={page} />
              ))}
            </div>
          )}
        </TabsContent>

        {["documentation", "implementation", "reference"].map((tabValue) => (
          <TabsContent key={tabValue} value={tabValue} className="mt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {getPagesByCategory(tabValue).map((page) => (
                <PageCard key={page._id} page={page} />
              ))}
            </div>
            {getPagesByCategory(tabValue).length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No {tabValue} pages found.</p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <Button 
            variant="outline" 
            size="sm" 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </Button>
          <span className="mx-4 flex items-center text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <Button 
            variant="outline" 
            size="sm" 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProjectPages;
