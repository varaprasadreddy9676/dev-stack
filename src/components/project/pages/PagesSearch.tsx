
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PagesSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
}

export const PagesSearch = ({ searchQuery, setSearchQuery, handleSearch }: PagesSearchProps) => (
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
);
