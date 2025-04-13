
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { usePageData } from "@/hooks/usePageData";
import { PageSummary } from "@/types";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, FilePlus } from "lucide-react";
import { 
  PageCard, 
  EmptyPageState, 
  PagesSearch, 
  PagesPagination, 
  PagesList 
} from "./pages";

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

  // Define categories for tabs
  const getPagesByCategory = (tabValue: string) => {
    if (tabValue === "all") return pages;
    
    // Filter by tags as an alternative
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

          <PagesSearch 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            handleSearch={handleSearch} 
          />
        </div>

        <TabsContent value="all" className="mt-2">
          <PagesList 
            pages={pages} 
            loading={loading} 
            projectId={id || ""} 
          />
        </TabsContent>

        {["documentation", "implementation", "reference"].map((tabValue) => (
          <TabsContent key={tabValue} value={tabValue} className="mt-2">
            <PagesList 
              pages={getPagesByCategory(tabValue)} 
              loading={false} 
              projectId={id || ""} 
              activeTab={tabValue}
            />
          </TabsContent>
        ))}
      </Tabs>

      <PagesPagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        setCurrentPage={setCurrentPage} 
      />
    </div>
  );
};

// Add a default export to prevent the TypeScript error
export default ProjectPages;
