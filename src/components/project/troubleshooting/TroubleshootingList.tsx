
import React from "react";
import { TroubleshootingIssue } from "@/types/troubleshooting";
import TroubleshootingCard from "./TroubleshootingCard";
import TroubleshootingEmptyState from "./TroubleshootingEmptyState";
import TroubleshootingSearch from "./TroubleshootingSearch";

interface TroubleshootingListProps {
  issues: TroubleshootingIssue[];
  filteredIssues: TroubleshootingIssue[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  formatDate: (dateString: string) => string;
  onSelectIssue: (issueId: string) => void;
  onAddIssue: () => void;
}

const TroubleshootingList: React.FC<TroubleshootingListProps> = ({
  issues,
  filteredIssues,
  searchQuery,
  setSearchQuery,
  formatDate,
  onSelectIssue,
  onAddIssue
}) => {
  return (
    <div className="flex-1">
      <TroubleshootingSearch 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />
      
      {filteredIssues.length === 0 ? (
        <TroubleshootingEmptyState 
          hasIssues={issues.length > 0} 
          onAddIssue={onAddIssue} 
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredIssues.map(issue => (
            <TroubleshootingCard
              key={issue.id}
              issue={issue}
              formatDate={formatDate}
              onSelect={onSelectIssue}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TroubleshootingList;
