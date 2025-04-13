
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TroubleshootingIssue } from "@/types/troubleshooting";
import { troubleshootingSchema, TroubleshootingFormValues } from "./schema";

interface UseTroubleshootingFormProps {
  initialData?: TroubleshootingIssue;
  onSubmit: (data: Omit<TroubleshootingIssue, "id" | "lastUpdated">) => Promise<void>;
}

export const useTroubleshootingForm = ({ initialData, onSubmit }: UseTroubleshootingFormProps) => {
  const form = useForm<TroubleshootingFormValues>({
    resolver: zodResolver(troubleshootingSchema),
    defaultValues: {
      issue: initialData?.issue || "",
      description: initialData?.description || "",
      symptoms: initialData?.symptoms || [""],
      tags: initialData?.tags || [],
      solutions: initialData?.solutions ? 
        initialData.solutions.map(s => ({ 
          steps: s.steps, 
          code: s.code || ""
        })) : 
        [{ steps: "", code: "" }],
    },
  });
  
  const handleAddSymptom = () => {
    const currentSymptoms = form.getValues("symptoms");
    form.setValue("symptoms", [...currentSymptoms, ""]);
  };
  
  const handleRemoveSymptom = (index: number) => {
    const currentSymptoms = form.getValues("symptoms");
    if (currentSymptoms.length > 1) {
      form.setValue("symptoms", currentSymptoms.filter((_, i) => i !== index));
    }
  };
  
  const handleAddSolution = () => {
    const currentSolutions = form.getValues("solutions");
    form.setValue("solutions", [...currentSolutions, { steps: "", code: "" }]);
  };
  
  const handleRemoveSolution = (index: number) => {
    const currentSolutions = form.getValues("solutions");
    if (currentSolutions.length > 1) {
      form.setValue("solutions", currentSolutions.filter((_, i) => i !== index));
    }
  };
  
  const handleFormSubmit = async (values: TroubleshootingFormValues) => {
    const troubleshootingData: Omit<TroubleshootingIssue, "id" | "lastUpdated"> = {
      issue: values.issue,
      description: values.description,
      symptoms: values.symptoms,
      tags: values.tags,
      relatedIssues: initialData?.relatedIssues || [],
      solutions: values.solutions.map(solution => ({
        steps: solution.steps,
        code: solution.code || "",
        screenshots: [],
        resources: []
      })),
      updatedBy: "current-user"
    };
    
    await onSubmit(troubleshootingData);
  };
  
  return {
    form,
    handleAddSymptom,
    handleRemoveSymptom,
    handleAddSolution,
    handleRemoveSolution,
    handleFormSubmit
  };
};
