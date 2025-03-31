
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
