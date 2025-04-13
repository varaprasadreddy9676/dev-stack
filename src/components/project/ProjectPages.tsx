
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePageData } from "@/hooks/usePageData";
import { 
  PagesList,
  PagesSearch,
  PagesPagination 
} from "./pages";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, FilePlus } from "lucide-react";
import { Link } from "react-router-dom";
import { PageSummary } from "@/types";

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
        try {
          let result;
          if (searchQuery) {
            result = await searchPages({
              q: searchQuery,
              parent: `project:${id}`,
              page: currentPage,
              limit: 10
            });
          } else {
            result = await getPagesByParent("project", id, currentPage, 10);
          }
          
          // Ensure pages is an array
          const fetchedPages = Array.isArray(result.data) ? result.data : [];
          setPages(fetchedPages);
          setTotalPages(Math.ceil((result.total || 0) / 10));
        } catch (error) {
          console.error("Error fetching project pages:", error);
          setPages([]);
          setTotalPages(0);
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
    
    // Make sure pages is an array before filtering
    if (!Array.isArray(pages)) {
      return [];
    }
    
    // Filter by tags as an alternative
    return pages.filter(page => 
      page.tags && page.tags.some(tag => tag.toLowerCase() === tabValue)
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

export default ProjectPages;
