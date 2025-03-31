
import { Language } from "@/types/language";
import LanguageListItem from "./LanguageListItem";

interface LanguageListProps {
  languages: Language[];
  formatDate: (dateString: string) => string;
}

const LanguageList = ({ languages, formatDate }: LanguageListProps) => {
  return (
    <div className="space-y-4">
      {languages.map(language => (
        <LanguageListItem 
          key={language.id} 
          language={language} 
          formatDate={formatDate} 
        />
      ))}
    </div>
  );
};

export default LanguageList;
