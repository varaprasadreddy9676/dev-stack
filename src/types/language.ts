
export interface Language {
  id: string;
  name: string;
  description: string;
  updatedAt: string;
  tags: string[];
}

export type LanguageFormValues = {
  name: string;
  description: string;
  tags: string;
};

// Enhanced types for the detailed language data
export interface LanguageExample {
  title: string;
  code: string;
  description: string;
  improvement?: string;
}

export interface LanguageResource {
  title: string;
  type: string;
  url: string;
  description: string;
}

export interface LanguageGuidelines {
  content: string;
  lastUpdated: Date;
  updatedBy: string;
}

export interface LanguageData {
  _id: string;
  name: string;
  description: string;
  guidelines: LanguageGuidelines;
  examples: {
    good: LanguageExample[];
    bad: LanguageExample[];
  };
  resources: LanguageResource[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}
