
import React from "react";
import { Solution } from "@/types/troubleshooting";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link, FileText, Video } from "lucide-react";

interface TroubleshootingSolutionProps {
  solution: Solution;
  index: number;
}

const TroubleshootingSolution: React.FC<TroubleshootingSolutionProps> = ({ solution, index }) => {
  return (
    <Card className="mt-4">
      <CardContent className="pt-6 space-y-4">
        <h3 className="font-medium">Solution {index + 1}</h3>
        
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <p>{solution.steps}</p>
        </div>
        
        {solution.code && (
          <div className="bg-muted p-3 rounded-md overflow-auto">
            <pre className="text-xs font-mono whitespace-pre-wrap">{solution.code}</pre>
          </div>
        )}
        
        {solution.screenshots && solution.screenshots.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Screenshots</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {solution.screenshots.map((screenshot, idx) => (
                <div key={idx} className="border rounded-md overflow-hidden">
                  <div className="aspect-video bg-muted relative">
                    <img 
                      src={screenshot.imageUrl} 
                      alt={screenshot.caption} 
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-2 text-xs text-center">
                    {screenshot.caption}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {solution.resources && solution.resources.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">Resources</h4>
            <div className="space-y-2">
              {solution.resources.map((resource, idx) => (
                <a 
                  key={idx} 
                  href={resource.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  {resource.type === "link" && <Link className="h-4 w-4" />}
                  {resource.type === "pdf" && <FileText className="h-4 w-4" />}
                  {resource.type === "video" && <Video className="h-4 w-4" />}
                  {resource.title}
                </a>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TroubleshootingSolution;
