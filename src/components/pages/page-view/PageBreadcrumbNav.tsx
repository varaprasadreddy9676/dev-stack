
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Page } from "@/types";

interface PageBreadcrumbNavProps {
  page: Page;
  navigateBack: () => void;
}

export const PageBreadcrumbNav = ({ page, navigateBack }: PageBreadcrumbNavProps) => {
  const getParentPath = () => {
    if (!page?.parent) return "/";
    
    const { type, id } = page.parent;
    if (!id) return "/";
    
    switch (type) {
      case "project":
        return `/projects/${id}`;
      case "module":
        return `/modules/${id}`;
      case "component":
        return `/components/${id}`;
      case "language":
        return `/languages/${id}`;
      case "guide":
        return `/guides/${id}`;
      default:
        return "/";
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-6">
      <Button 
        variant="ghost" 
        size="sm"
        onClick={navigateBack} 
        className="px-2"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        Back
      </Button>
      <span>/</span>
      <Link to={getParentPath()} className="hover:text-foreground">
        {page.parent.type.charAt(0).toUpperCase() + page.parent.type.slice(1)}
      </Link>
      <span>/</span>
      <span className="font-medium text-foreground">{page.title}</span>
    </div>
  );
};
