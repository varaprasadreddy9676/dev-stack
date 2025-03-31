
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { Language } from "@/types/language";

interface LanguageSearchProps {
  languages: Language[];
  searchTerm: string;
  activeFilter: string;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: string) => void;
}

const LanguageSearch = ({
  languages,
  searchTerm,
  activeFilter,
  onSearchChange,
  onFilterChange,
}: LanguageSearchProps) => {
  // Extract unique tags for filtering
  const [uniqueTags, setUniqueTags] = useState<string[]>([]);
  
  useEffect(() => {
    setUniqueTags(Array.from(new Set(languages.flatMap(lang => lang.tags))));
  }, [languages]);

  return (
    <div className="w-full lg:w-64 space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search languages..."
          className="pl-9"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="bg-card border rounded-lg p-4 space-y-4">
        <h3 className="font-medium">Filter by Tag</h3>
        <div className="flex flex-wrap gap-2">
          <Badge 
            variant={activeFilter === "all" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => onFilterChange("all")}
          >
            All
          </Badge>
          {uniqueTags.map(tag => (
            <Badge 
              key={tag} 
              variant={activeFilter === tag ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => onFilterChange(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSearch;
