
import { Button } from "@/components/ui/button";

interface PagesPaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

export const PagesPagination = ({ currentPage, totalPages, setCurrentPage }: PagesPaginationProps) => {
  if (totalPages <= 1) return null;
  
  return (
    <div className="flex justify-center mt-6">
      <Button 
        variant="outline" 
        size="sm" 
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
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
        onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
      >
        Next
      </Button>
    </div>
  );
};
