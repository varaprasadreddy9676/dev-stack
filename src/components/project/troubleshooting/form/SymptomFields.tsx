
import React from "react";
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { TroubleshootingFormValues } from "./schema";

interface SymptomFieldsProps {
  form: UseFormReturn<TroubleshootingFormValues>;
  onAddSymptom: () => void;
  onRemoveSymptom: (index: number) => void;
}

const SymptomFields: React.FC<SymptomFieldsProps> = ({
  form,
  onAddSymptom,
  onRemoveSymptom
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <div className="font-medium">Symptoms</div>
        <Button type="button" variant="outline" size="sm" onClick={onAddSymptom}>
          <Plus className="h-4 w-4 mr-1" />
          Add Symptom
        </Button>
      </div>
      
      {form.getValues("symptoms").map((_, index) => (
        <FormField
          key={index}
          control={form.control}
          name={`symptoms.${index}`}
          render={({ field }) => (
            <FormItem className="mb-2">
              <div className="flex gap-2">
                <FormControl>
                  <Input placeholder="e.g., Form submission fails" {...field} />
                </FormControl>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon"
                  onClick={() => onRemoveSymptom(index)}
                  disabled={form.getValues("symptoms").length <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </div>
  );
};

export default SymptomFields;
