
import { PageCard } from "./PageCard";
import { EmptyPageState } from "./EmptyPageState";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PageSummary } from "@/types";

interface PageListProps {
  pages: PageSummary[];
  loading: boolean;
  searchQuery: string;
  activeTab: string;
}

export const PageList = ({ pages, loading, searchQuery, activeTab }: PageListProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(6).fill(0).map((_, index) => (
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
        ))}
      </div>
    );
  }

  if (pages.length === 0) {
    if (searchQuery) {
      return (
        <div className="col-span-full text-center py-10">
          <h2 className="text-xl font-medium mb-2">No Results Found</h2>
          <p className="text-muted-foreground mb-6">
            No pages match your search query. Try a different search term.
          </p>
        </div>
      );
    }
    
    return <EmptyPageState type={activeTab as "all" | "recent" | "my-pages" | "favorites"} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {pages.map((page) => (
        <PageCard key={page._id} page={page} />
      ))}
    </div>
  );
};
