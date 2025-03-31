
import React from "react";
import { FrameworkType } from "@/types/framework";

interface FrameworkDisplayProps {
  frameworks: FrameworkType[];
}

const ExampleDisplay: React.FC<{ example: { title: string; description: string; code: string } }> = ({ example }) => {
  return (
    <div className="border rounded-md overflow-hidden">
      <div className="bg-muted p-3 border-b">
        <h5 className="font-medium">{example.title}</h5>
        <p className="text-sm text-muted-foreground mt-1">{example.description}</p>
      </div>
      <div className="p-4 bg-muted/50 font-mono text-sm overflow-x-auto">
        <pre>{example.code}</pre>
      </div>
    </div>
  );
};

const FrameworkDisplay: React.FC<FrameworkDisplayProps> = ({ frameworks }) => {
  if (frameworks.length === 0) {
    return <p className="text-muted-foreground italic">No custom frameworks defined for this project.</p>;
  }

  return (
    <div className="divide-y">
      {frameworks.map((framework, index) => (
        <div key={index} className="py-6 first:pt-0 last:pb-0">
          <h3 className="text-xl font-semibold mb-2">{framework.name}</h3>
          <p className="mb-4">{framework.description}</p>
          
          <div className="mb-6">
            <h4 className="text-lg font-medium mb-2">Documentation</h4>
            <div className="prose max-w-none dark:prose-invert bg-muted/30 p-4 rounded-md">
              <div dangerouslySetInnerHTML={{ __html: framework.documentation }} />
            </div>
          </div>
          
          {framework.examples.length > 0 && (
            <div>
              <h4 className="text-lg font-medium mb-3">Examples</h4>
              <div className="space-y-4">
                {framework.examples.map((example, exampleIndex) => (
                  <ExampleDisplay key={exampleIndex} example={example} />
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FrameworkDisplay;
