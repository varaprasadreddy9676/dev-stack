
import React from "react";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bug } from "lucide-react";
import { TroubleshootingIssue } from "@/types/troubleshooting";

interface FormHeaderProps {
  initialData?: TroubleshootingIssue;
}

const FormHeader: React.FC<FormHeaderProps> = ({ initialData }) => {
  return (
    <CardHeader>
      <div className="flex items-center gap-2">
        <Bug className="h-5 w-5 text-amber-500" />
        <CardTitle>
          {initialData ? "Edit Troubleshooting Issue" : "Add Troubleshooting Issue"}
        </CardTitle>
      </div>
      <CardDescription>
        Document common issues and their solutions to help users troubleshoot problems.
      </CardDescription>
    </CardHeader>
  );
};

export default FormHeader;
