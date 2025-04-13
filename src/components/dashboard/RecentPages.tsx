
import { useState, useEffect } from "react";
import { usePageData } from "@/hooks/usePageData";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, FileText, ChevronRight } from "lucide-react";
import { formatDate } from "@/utils/dateUtils";
import { PageSummary } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

export const RecentPages = () => {
  const [pages, setPages] = useState<PageSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const { getRecentPages } = usePageData();

  useEffect(() => {
    const fetchRecentPages = async () => {
      setLoading(true);
      try {
        const result = await getRecentPages(5);
        setPages(result.data);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentPages();
  }, [getRecentPages]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-lg font-medium">Recent Pages</CardTitle>
          <CardDescription>
            Recently updated documentation pages
          </CardDescription>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/pages">
            View all
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="flex items-start space-x-4">
                <Skeleton className="h-10 w-10 rounded" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : pages.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto opacity-20 mb-3" />
            <p>No pages have been created yet</p>
            <Button variant="outline" size="sm" className="mt-4" asChild>
              <Link to="/pages/create">Create your first page</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {pages.map((page) => (
              <Link
                key={page._id}
                to={`/pages/${page._id}`}
                className="flex items-start space-x-4 rounded-lg p-2 transition-colors hover:bg-muted/50"
              >
                <div className="flex-shrink-0 rounded-md bg-primary/10 p-2 mt-1">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium leading-none">{page.title}</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <CalendarDays className="mr-1 h-3 w-3" />
                    <span>Updated {formatDate(page.metadata.lastUpdatedAt.toString())}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
