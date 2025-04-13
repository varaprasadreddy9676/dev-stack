
import React, { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { PageParentType } from "@/types";
import { ParentTypeSelector } from "./ParentTypeSelector";
import { ParentEntitySelector } from "./ParentEntitySelector";
import { useParentOptions } from "@/hooks/useParentOptions";

interface ParentSelectorProps {
  form: UseFormReturn<any>;
  initialParentType?: PageParentType;
  initialParentId?: string | null;
}

export const ParentSelector: React.FC<ParentSelectorProps> = ({ 
  form,
  initialParentType = "root",
  initialParentId = null
}) => {
  const parentType = form.watch("parentType");
  
  const { availableParents, loading } = useParentOptions(parentType);
  
  // Select parent from URL params on initial load
  useEffect(() => {
    if (initialParentType && initialParentId) {
      form.setValue("parentType", initialParentType);
      setTimeout(() => {
        form.setValue("parentId", initialParentId);
      }, 100); // Small delay to ensure parents are fetched
    }
  }, [initialParentType, initialParentId, form]);
  
  // When parent type changes and it's set to "root", clear the parentId
  useEffect(() => {
    if (parentType === "root") {
      form.setValue("parentId", null);
    }
  }, [parentType, form]);
  
  // If initialParentId is set and matches one of the fetched parents, select it
  useEffect(() => {
    if (initialParentId && availableParents.some(p => p.id === initialParentId)) {
      form.setValue("parentId", initialParentId);
    }
  }, [availableParents, initialParentId, form]);

  return (
    <div className="space-y-4">
      <ParentTypeSelector form={form} />

      {parentType !== "root" && (
        <ParentEntitySelector 
          form={form}
          availableParents={availableParents}
          loading={loading}
        />
      )}
    </div>
  );
};

export default ParentSelector;
