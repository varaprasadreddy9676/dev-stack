
import { Language } from "@/types/language";
import LanguageCard from "./LanguageCard";

interface LanguageGridProps {
  languages: Language[];
  formatDate: (dateString: string) => string;
}

const LanguageGrid = ({ languages, formatDate }: LanguageGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {languages.map(language => (
        <LanguageCard 
          key={language.id} 
          language={language} 
          formatDate={formatDate} 
        />
      ))}
    </div>
  );
};

export default LanguageGrid;
