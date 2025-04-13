
import { User, CalendarDays, Clock } from "lucide-react";
import { PageMetadata as PageMetadataType } from "@/types";
import { formatDate } from "@/utils/dateUtils";

interface PageMetadataProps {
  metadata: PageMetadataType;
}

export const PageMetadataDisplay = ({ metadata }: PageMetadataProps) => {
  return (
    <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
      <div className="flex items-center">
        <User className="h-4 w-4 mr-1" />
        <span>Created by: {metadata.createdBy.toString()}</span>
      </div>
      <div className="flex items-center">
        <CalendarDays className="h-4 w-4 mr-1" />
        <span>Created: {formatDate(metadata.createdAt.toString())}</span>
      </div>
      <div className="flex items-center">
        <Clock className="h-4 w-4 mr-1" />
        <span>Last updated: {formatDate(metadata.lastUpdatedAt.toString())}</span>
      </div>
    </div>
  );
};
