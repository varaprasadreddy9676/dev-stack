
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const LanguageGuidelinesLoading = () => {
  return (
    <div className="container py-10">
      <Skeleton className="h-8 w-64 mb-6" />
      <Skeleton className="h-20 w-full mb-8" />
      <Skeleton className="h-96 w-full" />
    </div>
  );
};

export default LanguageGuidelinesLoading;
