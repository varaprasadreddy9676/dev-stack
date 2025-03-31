
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import LanguageHeader from "@/components/languages/LanguageHeader";
import GuidelinesEditor from "@/components/languages/GuidelinesEditor";
import CodeExamplesSection from "@/components/languages/CodeExamplesSection";
import ResourcesList from "@/components/languages/ResourcesList";

// Sample language data based on the provided interface
const languageData = {
  _id: "typescript",
  name: "TypeScript",
  description: "Type-safe JavaScript for large-scale applications",
  guidelines: {
    content: `
      # TypeScript Coding Guidelines
      
      TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. It offers classes, modules, and interfaces to help you build robust components.
      
      ## General Guidelines
      
      - Always define explicit types for variables, parameters, and return values
      - Use interfaces for complex object structures
      - Enable strict mode in tsconfig.json
      - Prefer type inference where the type is obvious
      - Use union types instead of enum when appropriate
      
      ## Naming Conventions
      
      - Use PascalCase for interface, type, class, and enum names
      - Use camelCase for variable and function names
      - Use UPPER_CASE for constants
      
      ## Project Structure
      
      - Organize files by feature or domain
      - Keep related files close to each other
      - Use barrel files (index.ts) to simplify imports
      - Separate interface declarations into separate .d.ts files when appropriate
    `,
    lastUpdated: new Date("2024-03-15T14:20:00Z"),
    updatedBy: "user123"
  },
  examples: {
    good: [
      {
        title: "Type-safe function",
        code: `// Clear parameter and return types
function calculateTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}`,
        description: "This function has clear parameter and return types, making it self-documenting and type-safe."
      },
      {
        title: "Interface for complex objects",
        code: `// Define interface for complex objects
interface User {
  id: string;
  name: string;
  email: string;
  preferences: {
    theme: 'light' | 'dark';
    notifications: boolean;
  };
}

// Use the interface
function updateUserPreferences(user: User, theme: 'light' | 'dark'): User {
  return {
    ...user,
    preferences: {
      ...user.preferences,
      theme
    }
  };
}`,
        description: "Using interfaces for complex objects creates self-documenting code and enables IDE auto-completion."
      },
      {
        title: "Generic typing",
        code: `// Generic component with proper typing
function createCache<T>(): {
  get: (key: string) => T | undefined;
  set: (key: string, value: T) => void;
} {
  const cache: Record<string, T> = {};
  
  return {
    get: (key) => cache[key],
    set: (key, value) => { cache[key] = value; }
  };
}

// Usage
const numberCache = createCache<number>();
numberCache.set('age', 30); // OK
numberCache.set('name', 'John'); // Error: Argument of type 'string' is not assignable to parameter of type 'number'`,
        description: "Generic typing allows you to create flexible, reusable components while maintaining type safety."
      }
    ],
    bad: [
      {
        title: "Using any type",
        code: `// Avoid using 'any' type
function processData(data: any) {
  return data.value * 2;
}`,
        description: "Using 'any' defeats the purpose of TypeScript's type checking and can lead to runtime errors.",
        improvement: "Define a specific interface or type for the data parameter to leverage TypeScript's type checking."
      },
      {
        title: "Type assertions without validation",
        code: `// Unsafe type assertion
const userData = JSON.parse(response) as User;
console.log(userData.preferences.theme);`,
        description: "Type assertions without validation can lead to runtime errors if the shape of the data doesn't match the expected type.",
        improvement: "Validate the data before asserting its type, or use type guards to check properties before accessing them."
      },
      {
        title: "String literal union vs enum",
        code: `// Using enum for simple string literals
enum Theme {
  Light = 'light',
  Dark = 'dark'
}

function setTheme(theme: Theme) {
  document.body.dataset.theme = theme;
}`,
        description: "Using enums for simple string literals adds unnecessary complexity and bundle size.",
        improvement: "Use string literal unions for simple cases: `type Theme = 'light' | 'dark'`"
      }
    ]
  },
  resources: [
    {
      title: "TypeScript Official Documentation",
      type: "link",
      url: "https://www.typescriptlang.org/docs/",
      description: "Official documentation and guides from the TypeScript team"
    },
    {
      title: "TypeScript Deep Dive",
      type: "link",
      url: "https://basarat.gitbook.io/typescript/",
      description: "Comprehensive free book on TypeScript concepts and best practices"
    },
    {
      title: "TS Config Options Reference",
      type: "link",
      url: "https://www.typescriptlang.org/tsconfig",
      description: "Complete reference for TypeScript configuration options"
    },
    {
      title: "TypeScript and React Best Practices",
      type: "pdf",
      url: "/resources/typescript-react-best-practices.pdf",
      description: "Internal guide for using TypeScript with React projects"
    }
  ],
  tags: ["frontend", "backend", "typed", "javascript"],
  createdAt: new Date("2023-10-15T08:30:00Z"),
  updatedAt: new Date("2024-03-15T14:20:00Z")
};

const LanguageGuidelines = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("guidelines");
  
  // In a real application, you would fetch the language data based on the ID
  const language = languageData;
  
  // Format date for display
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const handleSaveGuidelines = (updatedContent: string) => {
    // In a real application, this would make an API call to update the guidelines
    languageData.guidelines.content = updatedContent;
    languageData.guidelines.lastUpdated = new Date();
  };

  return (
    <div className="container py-10 animate-fade-in">
      {/* Breadcrumb Navigation */}
      <Breadcrumb className="mb-6">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/guidelines">Coding Guidelines</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink>{language.name}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      
      {/* Language Header */}
      <LanguageHeader
        name={language.name}
        description={language.description}
        tags={language.tags}
        lastUpdated={language.guidelines.lastUpdated}
        formatDate={formatDate}
      />

      {/* Content Tabs */}
      <Tabs
        defaultValue={activeTab}
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <div className="border-b">
          <TabsList className="w-full justify-start h-auto p-0 bg-transparent">
            <TabsTrigger
              value="guidelines"
              className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              Guidelines
            </TabsTrigger>
            <TabsTrigger
              value="examples"
              className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              Code Examples
            </TabsTrigger>
            <TabsTrigger
              value="resources"
              className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              Resources
            </TabsTrigger>
          </TabsList>
        </div>
        
        {/* Guidelines Tab */}
        <TabsContent value="guidelines" className="space-y-6">
          <GuidelinesEditor
            content={language.guidelines.content}
            lastUpdated={language.guidelines.lastUpdated}
            onSave={handleSaveGuidelines}
            formatDate={formatDate}
          />
        </TabsContent>
        
        {/* Examples Tab */}
        <TabsContent value="examples" className="space-y-8">
          <CodeExamplesSection
            goodExamples={language.examples.good}
            badExamples={language.examples.bad}
          />
        </TabsContent>
        
        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-6">
          <ResourcesList 
            resources={language.resources}
            languageName={language.name}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LanguageGuidelines;
