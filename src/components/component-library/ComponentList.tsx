
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Layout } from "lucide-react";
import ComponentCard from "./ComponentCard";
import ComponentListItem from "./ComponentListItem";

interface ComponentListProps {
  viewTab: string;
  onViewTabChange: (value: string) => void;
  filteredComponents: any[];
  formatDate: (dateString: string) => string;
  onViewComponent: (component: any) => void;
}

const ComponentList = ({
  viewTab,
  onViewTabChange,
  filteredComponents,
  formatDate,
  onViewComponent
}: ComponentListProps) => {
  return (
    <div className="flex-1">
      <Tabs defaultValue="grid" value={viewTab} onValueChange={onViewTabChange} className="mb-6">
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            {filteredComponents.length} {filteredComponents.length === 1 ? "component" : "components"}
          </div>
          <TabsList>
            <TabsTrigger value="grid">
              <Layout className="h-4 w-4 mr-2" />
              Grid
            </TabsTrigger>
            <TabsTrigger value="list">
              <Code className="h-4 w-4 mr-2" />
              List
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="grid" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredComponents.map((component) => (
              <ComponentCard
                key={component.id}
                id={component.id}
                name={component.name}
                description={component.description}
                variants={component.variants}
                tags={component.tags}
                updatedAt={component.updatedAt}
                formatDate={formatDate}
                onView={onViewComponent}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="list" className="mt-6">
          <div className="space-y-4">
            {filteredComponents.map((component) => (
              <ComponentListItem
                key={component.id}
                id={component.id}
                name={component.name}
                description={component.description}
                variants={component.variants}
                tags={component.tags}
                updatedAt={component.updatedAt}
                formatDate={formatDate}
                onView={onViewComponent}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComponentList;
