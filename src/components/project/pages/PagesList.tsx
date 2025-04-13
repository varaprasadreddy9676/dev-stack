
import { PageCard } from "./PageCard";
import { EmptyPageState } from "./EmptyPageState";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PageSummary } from "@/types";

interface PagesListProps {
  pages: PageSummary[];
  loading: boolean;
  projectId: string;
  activeTab?: string;
}

export const PagesList = ({ pages, loading, projectId, activeTab = "all" }: PagesListProps) => {
  if (loading) {
    return (
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
    );
  }

  if (pages.length === 0) {
    return <EmptyPageState projectId={projectId} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {pages.map((page) => (
        <PageCard key={page._id} page={page} />
      ))}
    </div>
  );
};
