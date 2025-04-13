
import React from "react";
import { FormField, FormItem, FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { TroubleshootingFormValues } from "./schema";

interface SolutionFieldsProps {
  form: UseFormReturn<TroubleshootingFormValues>;
  onAddSolution: () => void;
  onRemoveSolution: (index: number) => void;
}

const SolutionFields: React.FC<SolutionFieldsProps> = ({
  form,
  onAddSolution,
  onRemoveSolution
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="font-medium">Solutions</div>
        <Button type="button" variant="outline" size="sm" onClick={onAddSolution}>
          <Plus className="h-4 w-4 mr-1" />
          Add Solution
        </Button>
      </div>
      
      {form.getValues("solutions").map((_, index) => (
        <div key={index} className="border rounded-md p-4 mb-4">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium">Solution {index + 1}</h4>
            <Button 
              type="button" 
              variant="ghost" 
              size="icon"
              onClick={() => onRemoveSolution(index)}
              disabled={form.getValues("solutions").length <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
          </div>
          
          <FormField
            control={form.control}
            name={`solutions.${index}.steps`}
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel>Steps</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe the solution steps..." 
                    className="min-h-[100px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name={`solutions.${index}.code`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code Example</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="// Add code example if applicable" 
                    className="min-h-[100px] font-mono text-sm"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      ))}
    </div>
  );
};

export default SolutionFields;
