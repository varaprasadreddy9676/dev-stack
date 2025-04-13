
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface TroubleshootingSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const TroubleshootingSearch: React.FC<TroubleshootingSearchProps> = ({
  searchQuery,
  setSearchQuery
}) => {
  return (
    <div className="relative mb-4">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search issues..."
        className="pl-8"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default TroubleshootingSearch;
