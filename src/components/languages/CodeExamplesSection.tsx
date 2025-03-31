
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Check, X } from "lucide-react";

interface Example {
  title: string;
  code: string;
  description: string;
  improvement?: string;
}

interface CodeExamplesSectionProps {
  goodExamples: Example[];
  badExamples: Example[];
}

const GoodExample: React.FC<{ example: Example }> = ({ example }) => (
  <Card className="overflow-hidden">
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
);

const BadExample: React.FC<{ example: Example }> = ({ example }) => (
  <Card className="overflow-hidden">
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
      
      {example.improvement && (
        <div className="bg-green-500/10 border border-green-500/20 rounded-md p-4">
          <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
            <Check className="h-4 w-4 text-green-500" />
            Improvement
          </h3>
          <p className="text-sm">{example.improvement}</p>
        </div>
      )}
    </CardContent>
  </Card>
);

const CodeExamplesSection: React.FC<CodeExamplesSectionProps> = ({ goodExamples, badExamples }) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Good Examples</h2>
        <div className="space-y-6">
          {goodExamples.map((example, index) => (
            <GoodExample key={index} example={example} />
          ))}
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-4">Bad Examples</h2>
        <div className="space-y-6">
          {badExamples.map((example, index) => (
            <BadExample key={index} example={example} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CodeExamplesSection;
