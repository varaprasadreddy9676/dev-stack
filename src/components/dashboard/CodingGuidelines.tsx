
import { Language } from "@/types/language";
import GuidelinesSection from "./GuidelinesSection";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CodeIcon } from "lucide-react";
import GuidelineCard from "./GuidelineCard";

interface CodingGuidelinesProps {
  guidelines: Language[];
  formatDate: (dateString: string) => string;
}

export const CodingGuidelines = ({ guidelines, formatDate }: CodingGuidelinesProps) => {
  if (!guidelines || guidelines.length === 0) {
    return (
      <Card className="shadow-sm">
        <CardHeader className="p-4 md:p-6">
          <div className="flex items-center gap-2">
            <CodeIcon className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-lg md:text-xl">Coding Guidelines</CardTitle>
          </div>
          <CardDescription className="text-sm md:text-base">
            No guidelines available at this time
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="p-4 md:p-6 pb-2 md:pb-4">
        <div className="flex items-center gap-2">
          <CodeIcon className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-lg md:text-xl">Coding Guidelines</CardTitle>
        </div>
        <CardDescription className="text-sm md:text-base">
          Standards and best practices for development
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 md:p-6 pt-2 md:pt-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {guidelines.map((guideline) => (
            <GuidelineCard 
              key={guideline.id} 
              guideline={guideline} 
              formatDate={formatDate} 
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
