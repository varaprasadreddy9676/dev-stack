
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, CalendarDays } from "lucide-react";

interface LanguageHeaderProps {
  name: string;
  description: string;
  tags: string[];
  lastUpdated: Date;
  formatDate: (date: Date) => string;
}

const LanguageHeader: React.FC<LanguageHeaderProps> = ({
  name,
  description,
  tags,
  lastUpdated,
  formatDate
}) => {
  return (
    <div className="mb-6 md:mb-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-4 mb-3 md:mb-4">
        <div className="space-y-1 md:space-y-2">
          <Button variant="ghost" size="sm" className="-ml-2 mb-1 h-9 touch-friendly" asChild>
            <Link to="/guidelines" className="flex items-center">
              <ArrowLeft className="mr-1.5 h-4 w-4" />
              <span className="text-sm">Back to Guidelines</span>
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-muted-foreground hidden md:block" />
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{name}</h1>
          </div>
          <p className="text-sm md:text-base text-muted-foreground">{description}</p>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="text-xs md:text-sm px-2 py-0.5">
            {tag}
          </Badge>
        ))}
      </div>
      
      <div className="text-xs md:text-sm text-muted-foreground flex items-center">
        <CalendarDays className="h-3.5 w-3.5 mr-1.5" />
        Last updated on {formatDate(lastUpdated)}
      </div>
    </div>
  );
};

export default LanguageHeader;
