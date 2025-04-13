
import React from "react";
import { 
  Card, 
  CardContent, 
  CardFooter
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { TroubleshootingIssue } from "@/types/troubleshooting";
import {
  BaseInfoFields,
  SymptomFields,
  TagFields,
  SolutionFields,
  FormHeader,
  useTroubleshootingForm
} from "./form";

interface TroubleshootingFormProps {
  projectId: string;
  onSubmit: (data: Omit<TroubleshootingIssue, "id" | "lastUpdated">) => Promise<void>;
  onCancel: () => void;
  initialData?: TroubleshootingIssue;
}

const TroubleshootingForm: React.FC<TroubleshootingFormProps> = ({
  projectId,
  onSubmit,
  onCancel,
  initialData
}) => {
  const {
    form,
    handleAddSymptom,
    handleRemoveSymptom,
    handleAddSolution,
    handleRemoveSolution,
    handleFormSubmit
  } = useTroubleshootingForm({
    initialData,
    onSubmit
  });
  
  return (
    <Card>
      <FormHeader initialData={initialData} />
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
            <BaseInfoFields form={form} />
            
            <SymptomFields 
              form={form}
              onAddSymptom={handleAddSymptom}
              onRemoveSymptom={handleRemoveSymptom}
            />
            
            <TagFields form={form} />
            
            <SolutionFields 
              form={form}
              onAddSolution={handleAddSolution}
              onRemoveSolution={handleRemoveSolution}
            />
            
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit">
                {initialData ? "Update Issue" : "Create Issue"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default TroubleshootingForm;
