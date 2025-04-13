
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { usePageData } from "@/hooks/usePageData";
import { Button } from "@/components/ui/button";
import { FileText, Plus, Settings } from "lucide-react";
import { useAuth } from "@/contexts/auth";
import {
  PageList,
  PageSearch,
  PageTabs
} from "@/components/pages/page-list";
import { PageSummary } from "@/types";

const Pages = () => {
  const [pages, setPages] = useState<PageSummary[]>([]); // Ensure pages is always initialized as an array
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const { searchPages, getRecentPages } = usePageData();
  const { user, hasPermission } = useAuth();
  
  // Check if user has permission to create pages
  const canCreatePages = hasPermission(['admin', 'content_manager', 'editor']) || true; // Default to true for dev

  useEffect(() => {
    const fetchPages = async () => {
      setLoading(true);
      try {
        let fetchedPages = [];
        
        if (searchQuery) {
          const results = await searchPages({ q: searchQuery });
          fetchedPages = Array.isArray(results.data) ? results.data : [];
        } else if (activeTab === "all") {
          const results = await searchPages({});
          fetchedPages = Array.isArray(results.data) ? results.data : [];
        } else if (activeTab === "recent") {
          const results = await getRecentPages(20);
          fetchedPages = Array.isArray(results.data) ? results.data : [];
        } else if (activeTab === "my-pages") {
          // This would need to be implemented server-side
          // For now, we'll just return all pages as a mock
          const results = await searchPages({});
          fetchedPages = Array.isArray(results.data) ? results.data : [];
        }
        
        setPages(fetchedPages); // Ensure we set an array even if the API call fails
      } catch (error) {
        console.error("Error fetching pages:", error);
        setPages([]); // Set empty array in case of error
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

  const FavoritesComingSoon = () => (
    <div className="text-center py-10">
      <Settings className="h-16 w-16 mx-auto text-muted-foreground opacity-30 mb-4" />
      <h2 className="text-xl font-medium mb-2">Favorites Feature Coming Soon</h2>
      <p className="text-muted-foreground mb-6">
        The ability to favorite pages will be available in a future update.
      </p>
    </div>
  );

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
          <PageSearch 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            handleSearch={handleSearch} 
          />
          
          {canCreatePages && (
            <Button asChild>
              <Link to="/pages/create">
                <Plus className="mr-1 h-4 w-4" /> New Page
              </Link>
            </Button>
          )}
        </div>
      </div>
      
      <PageTabs activeTab={activeTab} setActiveTab={setActiveTab}>
        {{
          all: <PageList pages={pages} loading={loading} searchQuery={searchQuery} activeTab={activeTab} />,
          recent: <PageList pages={pages} loading={loading} searchQuery={searchQuery} activeTab={activeTab} />,
          myPages: <PageList pages={pages} loading={loading} searchQuery={searchQuery} activeTab={activeTab} />,
          favorites: loading ? <PageList pages={[]} loading={loading} searchQuery={searchQuery} activeTab={activeTab} /> : <FavoritesComingSoon />
        }}
      </PageTabs>
    </div>
  );
};

export default Pages;
