
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface PageSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
}

export const PageSearch = ({ searchQuery, setSearchQuery, handleSearch }: PageSearchProps) => {
  return (
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
  );
};
