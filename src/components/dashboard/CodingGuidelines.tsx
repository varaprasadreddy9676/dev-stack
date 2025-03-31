
import { Language } from "@/types/language";
import GuidelinesSection from "./GuidelinesSection";

interface CodingGuidelinesProps {
  guidelines: Language[];
  formatDate: (dateString: string) => string;
}

export const CodingGuidelines = ({ guidelines, formatDate }: CodingGuidelinesProps) => {
  return (
    <GuidelinesSection guidelines={guidelines} formatDate={formatDate} />
  );
};
