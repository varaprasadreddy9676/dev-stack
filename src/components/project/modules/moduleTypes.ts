
export interface ModuleType {
  name: string;
  description: string;
  documentation: string;
  dependencies: string[];
}

export interface ModuleFormData {
  name: string;
  description: string;
  documentation: string;
  dependencies: string; // string for form, converted to array on save
}
