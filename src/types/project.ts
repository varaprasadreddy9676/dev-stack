
export interface ProjectData {
  _id: string;
  name: string;
  description: string;
  overview?: string;
  architecture: {
    description: string;
    diagrams: Array<{
      title: string;
      imageUrl: string;
      description: string;
    }>;
  };
  structure: {
    description: string;
    folders: Array<{
      path: string;
      purpose: string;
    }>;
  };
  customFrameworks: Array<{
    name: string;
    description: string;
    documentation: string;
    examples: Array<{
      title: string;
      code: string;
      description: string;
    }>;
  }>;
  modules: Array<{
    name: string;
    description: string;
    documentation: string;
    dependencies: string[];
  }>;
  guidelines: {
    content: string;
    lastUpdated: string;
    updatedBy: string;
  };
  components: string[];
  resources: Array<{
    title: string;
    type: string;
    url: string;
    description: string;
  }>;
  troubleshooting?: Array<import('./troubleshooting').TroubleshootingIssue>;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  team: any[]; // Changed from optional to required
}
