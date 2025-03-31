
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Language } from "@/types/language";
import GuidelineCard from "./GuidelineCard";

interface GuidelinesSectionProps {
  guidelines: Language[];
  formatDate: (dateString: string) => string;
}

const GuidelinesSection = ({ guidelines, formatDate }: GuidelinesSectionProps) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Coding Guidelines</h2>
        <Button variant="outline" size="sm" asChild>
          <Link to="/guidelines">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {guidelines.map((guideline) => (
          <GuidelineCard 
            key={guideline.id} 
            guideline={guideline} 
            formatDate={formatDate} 
          />
        ))}
      </div>
    </div>
  );
};

export default GuidelinesSection;
