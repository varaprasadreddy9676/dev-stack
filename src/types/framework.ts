
export interface ExampleType {
  title: string;
  code: string;
  description: string;
}

export interface FrameworkType {
  name: string;
  description: string;
  documentation: string;
  examples: ExampleType[];
}
