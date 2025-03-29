
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Code } from "lucide-react";

interface ComponentPreviewProps {
  name: string;
  variants: number;
  currentVariant?: number;
  onVariantChange?: (variant: number) => void;
}

export const ComponentPreview = ({ 
  name, 
  variants,
  currentVariant = 0,
  onVariantChange
}: ComponentPreviewProps) => {
  const [activeTab, setActiveTab] = useState<"preview" | "html" | "ts" | "css">("preview");
  
  const handleVariantClick = (index: number) => {
    if (onVariantChange) {
      onVariantChange(index);
    }
  };

  // Mock code examples for demonstration
  const mockHtmlCode = `<div class="component ${name.toLowerCase()}">
  <div class="component-header">
    <h3>${name}</h3>
  </div>
  <div class="component-content">
    <!-- ${name} component content for variant ${currentVariant + 1} -->
  </div>
</div>`;

  const mockTsCode = `import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-${name.toLowerCase()}',
  templateUrl: './${name.toLowerCase()}.component.html',
  styleUrls: ['./${name.toLowerCase()}.component.css']
})
export class ${name}Component implements OnInit {
  // Properties for variant ${currentVariant + 1}
  
  constructor() { }

  ngOnInit(): void {
    // Initialization logic
  }
}`;

  const mockCssCode = `.${name.toLowerCase()} {
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.${name.toLowerCase()} .component-header {
  margin-bottom: 12px;
}

/* Styles for variant ${currentVariant + 1} */`;

  // Create variant examples based on the current variant
  const getVariantPreview = () => {
    switch (currentVariant) {
      case 0:
        return (
          <div className="p-4 border rounded">
            <h3 className="text-lg font-medium mb-2">{name} - Primary Variant</h3>
            <div className="bg-primary text-primary-foreground p-3 rounded">
              Standard implementation
            </div>
          </div>
        );
      case 1:
        return (
          <div className="p-4 border rounded">
            <h3 className="text-lg font-medium mb-2">{name} - Secondary Variant</h3>
            <div className="bg-secondary text-secondary-foreground p-3 rounded">
              Alternative implementation
            </div>
          </div>
        );
      case 2:
        return (
          <div className="p-4 border rounded">
            <h3 className="text-lg font-medium mb-2">{name} - Outline Variant</h3>
            <div className="border-2 border-primary text-primary p-3 rounded">
              Outline implementation
            </div>
          </div>
        );
      default:
        return (
          <div className="p-4 border rounded">
            <h3 className="text-lg font-medium mb-2">{name} - Custom Variant {currentVariant + 1}</h3>
            <div className="bg-muted p-3 rounded">
              Custom implementation for variant {currentVariant + 1}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-4">
      {variants > 1 && (
        <div className="flex flex-wrap gap-2 mb-2">
          <p className="text-sm text-muted-foreground mr-2">Variants:</p>
          {Array.from({ length: variants }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleVariantClick(index)}
              className={`inline-flex h-7 items-center justify-center rounded-full px-3 text-xs font-medium transition-colors
                ${currentVariant === index 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted hover:bg-muted/80"}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
      
      <Tabs defaultValue="preview" value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
        <TabsList className="mb-4">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="html">HTML</TabsTrigger>
          <TabsTrigger value="ts">TypeScript</TabsTrigger>
          <TabsTrigger value="css">CSS</TabsTrigger>
        </TabsList>
        
        <TabsContent value="preview" className="mt-0">
          <div className="bg-card border rounded-md p-8 flex items-center justify-center min-h-[200px]">
            {getVariantPreview()}
          </div>
        </TabsContent>
        
        <TabsContent value="html" className="mt-0">
          <div className="relative bg-muted rounded-md">
            <pre className="p-4 overflow-x-auto text-sm">
              <code>{mockHtmlCode}</code>
            </pre>
            <button 
              className="absolute top-2 right-2 p-1.5 rounded-md bg-muted-foreground/10 hover:bg-muted-foreground/20"
              onClick={() => navigator.clipboard.writeText(mockHtmlCode)}
            >
              <Code className="h-4 w-4" />
            </button>
          </div>
        </TabsContent>
        
        <TabsContent value="ts" className="mt-0">
          <div className="relative bg-muted rounded-md">
            <pre className="p-4 overflow-x-auto text-sm">
              <code>{mockTsCode}</code>
            </pre>
            <button 
              className="absolute top-2 right-2 p-1.5 rounded-md bg-muted-foreground/10 hover:bg-muted-foreground/20"
              onClick={() => navigator.clipboard.writeText(mockTsCode)}
            >
              <Code className="h-4 w-4" />
            </button>
          </div>
        </TabsContent>
        
        <TabsContent value="css" className="mt-0">
          <div className="relative bg-muted rounded-md">
            <pre className="p-4 overflow-x-auto text-sm">
              <code>{mockCssCode}</code>
            </pre>
            <button 
              className="absolute top-2 right-2 p-1.5 rounded-md bg-muted-foreground/10 hover:bg-muted-foreground/20"
              onClick={() => navigator.clipboard.writeText(mockCssCode)}
            >
              <Code className="h-4 w-4" />
            </button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
