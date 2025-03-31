
export interface Screenshot {
  imageUrl: string;
  caption: string;
}

export interface Resource {
  title: string;
  type: "link" | "pdf" | "video";
  url: string;
}

export interface Solution {
  steps: string;
  code?: string;
  screenshots?: Screenshot[];
  resources?: Resource[];
}

export interface TroubleshootingIssue {
  id: string;
  issue: string;
  description: string;
  symptoms: string[];
  solutions: Solution[];
  relatedIssues: string[]; // References to other troubleshooting entries
  tags: string[];
  lastUpdated: string;
  updatedBy: string; // Reference to User
}
