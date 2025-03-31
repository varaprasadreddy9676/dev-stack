
import React from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageBreadcrumbProps {
  items: BreadcrumbItem[];
}

const PageBreadcrumb: React.FC<PageBreadcrumbProps> = ({ items }) => {
  return (
    <Breadcrumb className="mb-6">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <BreadcrumbItem>
            {item.href ? (
              <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
            ) : (
              <BreadcrumbLink>{item.label}</BreadcrumbLink>
            )}
          </BreadcrumbItem>
          {index < items.length - 1 && <BreadcrumbSeparator />}
        </React.Fragment>
      ))}
    </Breadcrumb>
  );
};

export default PageBreadcrumb;
