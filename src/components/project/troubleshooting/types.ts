
import { TroubleshootingIssue } from "@/types/troubleshooting";

export interface ProjectTroubleshootingProps {
  project: {
    _id: string;
    name: string;
  };
  onSave: (updatedData: any) => Promise<void>;
}

export interface TroubleshootingCardProps {
  issue: TroubleshootingIssue;
  formatDate: (dateString: string) => string;
  onSelect: (issueId: string) => void;
}
