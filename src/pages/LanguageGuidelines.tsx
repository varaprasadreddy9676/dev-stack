import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { FileText, Code, ArrowLeft, Check, X, ExternalLink, PencilIcon, SaveIcon } from "lucide-react";
import EnhancedRichTextEditor from "@/components/EnhancedRichTextEditor";
import { toast } from "sonner";

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
  const [isEditing, setIsEditing] = useState(false);
  const [guidelinesContent, setGuidelinesContent] = useState(languageData.guidelines.content);
  
  const language = languageData;
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const handleSaveGuidelines = () => {
    languageData.guidelines.content = guidelinesContent;
    languageData.guidelines.lastUpdated = new Date();
    
    toast.success("Guidelines updated successfully");
    setIsEditing(false);
  };

  return (
    <div className="container py-10 animate-fade-in">
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
      
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div className="space-y-1">
            <Button variant="ghost" size="sm" className="-ml-2 mb-2" asChild>
              <Link to="/guidelines">
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to Guidelines
              </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">{language.name}</h1>
            <p className="text-muted-foreground">{language.description}</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {language.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="text-sm text-muted-foreground">
          Last updated on {formatDate(language.guidelines.lastUpdated)}
        </div>
      </div>

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
        
        <TabsContent value="guidelines" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Coding Guidelines</CardTitle>
                <CardDescription>
                  Standards and best practices for {language.name} development
                </CardDescription>
              </div>
              {isEditing ? (
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setIsEditing(false)}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button 
                    variant="default" 
                    size="sm" 
                    onClick={handleSaveGuidelines}
                  >
                    <SaveIcon className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setIsEditing(true)}
                >
                  <PencilIcon className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              )}
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              {isEditing ? (
                <EnhancedRichTextEditor 
                  value={guidelinesContent} 
                  onChange={setGuidelinesContent} 
                  allowHtml={true}
                  minHeight={400}
                />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: language.guidelines.content }} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="examples" className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Good Examples</h2>
            <div className="space-y-6">
              {language.examples.good.map((example, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="bg-green-500/5 border-b">
                    <div className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500" />
                      <CardTitle className="text-lg">{example.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="mb-4 text-muted-foreground">{example.description}</p>
                    <div className="bg-card/50 border rounded-md p-4 overflow-auto">
                      <pre className="text-sm font-mono whitespace-pre">
                        <code>{example.code}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">Bad Examples</h2>
            <div className="space-y-6">
              {language.examples.bad.map((example, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="bg-red-500/5 border-b">
                    <div className="flex items-center gap-2">
                      <X className="h-5 w-5 text-red-500" />
                      <CardTitle className="text-lg">{example.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="mb-4 text-muted-foreground">{example.description}</p>
                    <div className="bg-card/50 border rounded-md p-4 overflow-auto mb-4">
                      <pre className="text-sm font-mono whitespace-pre">
                        <code>{example.code}</code>
                      </pre>
                    </div>
                    
                    <div className="bg-green-500/10 border border-green-500/20 rounded-md p-4">
                      <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        Improvement
                      </h3>
                      <p className="text-sm">{example.improvement}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="resources" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Learning Resources</CardTitle>
              <CardDescription>
                Helpful documentation, tutorials, and tools for {language.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {language.resources.map((resource, index) => (
                  <div 
                    key={index} 
                    className={`p-4 border rounded-lg flex items-start gap-4
                      ${resource.type === 'link' ? 'bg-blue-500/5' : 
                        resource.type === 'pdf' ? 'bg-red-500/5' : 
                        resource.type === 'video' ? 'bg-purple-500/5' : 'bg-card/50'}`}
                  >
                    <div className={`rounded-full p-2 
                      ${resource.type === 'link' ? 'bg-blue-500/10 text-blue-500' : 
                        resource.type === 'pdf' ? 'bg-red-500/10 text-red-500' : 
                        resource.type === 'video' ? 'bg-purple-500/10 text-purple-500' : 'bg-primary/10 text-primary'}`}
                    >
                      {resource.type === 'link' ? <ExternalLink className="h-5 w-5" /> : 
                       resource.type === 'pdf' ? <FileText className="h-5 w-5" /> : 
                       resource.type === 'video' ? <Code className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">
                        <a 
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary transition-colors flex items-center gap-1"
                        >
                          {resource.title}
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </h3>
                      <p className="text-sm text-muted-foreground">{resource.description}</p>
                      <div className="mt-2">
                        <Badge variant="outline" className="text-xs">
                          {resource.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LanguageGuidelines;
