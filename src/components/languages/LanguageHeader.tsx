
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";

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
    <div className="mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <div className="space-y-1">
          <Button variant="ghost" size="sm" className="-ml-2 mb-2" asChild>
            <Link to="/guidelines">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Guidelines
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">{name}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>
      
      <div className="text-sm text-muted-foreground">
        Last updated on {formatDate(lastUpdated)}
      </div>
    </div>
  );
};

export default LanguageHeader;
