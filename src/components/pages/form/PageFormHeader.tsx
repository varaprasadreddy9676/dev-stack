
import React from "react";

interface PageFormHeaderProps {
  mode: "create" | "edit";
}

export const PageFormHeader: React.FC<PageFormHeaderProps> = ({ mode }) => {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight mb-2">
        {mode === "create" ? "Create New Page" : "Edit Page"}
      </h1>
      <p className="text-muted-foreground">
        {mode === "create" 
          ? "Create a new page with rich content to document your project." 
          : "Update the page content and metadata."}
      </p>
    </>
  );
};
