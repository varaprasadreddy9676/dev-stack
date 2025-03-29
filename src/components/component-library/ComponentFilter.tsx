
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ComponentFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  activeTab: string;
  onTabChange: (tag: string) => void;
  uniqueTags: string[];
}

const ComponentFilter = ({
  searchTerm,
  onSearchChange,
  activeTab,
  onTabChange,
  uniqueTags
}: ComponentFilterProps) => {
  return (
    <div className="w-full lg:w-64 space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search components..."
          className="pl-9"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="bg-card border rounded-lg p-4 space-y-4">
        <h3 className="font-medium">Filter by Tag</h3>
        <div className="flex flex-wrap gap-2">
          <Badge 
            variant={activeTab === "all" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => onTabChange("all")}
          >
            All
          </Badge>
          {uniqueTags.map((tag) => (
            <Badge 
              key={tag} 
              variant={activeTab === tag ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => onTabChange(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComponentFilter;
