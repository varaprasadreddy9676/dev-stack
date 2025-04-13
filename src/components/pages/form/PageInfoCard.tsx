
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PageInfoCardProps {
  createdBy: string;
}

export const PageInfoCard: React.FC<PageInfoCardProps> = ({ createdBy }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Page Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div>
          <p className="font-medium">Created By</p>
          <p className="text-muted-foreground">{createdBy}</p>
        </div>
        <div>
          <p className="font-medium">Date</p>
          <p className="text-muted-foreground">{new Date().toLocaleDateString()}</p>
        </div>
        <div>
          <p className="font-medium">Status</p>
          <p className="text-muted-foreground">Draft</p>
        </div>
        <div className="pt-4 border-t">
          <p className="text-xs text-muted-foreground">
            Pages support Markdown formatting and HTML content
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
