
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { TroubleshootingFormValues } from "./schema";

interface BaseInfoFieldsProps {
  form: UseFormReturn<TroubleshootingFormValues>;
}

const BaseInfoFields: React.FC<BaseInfoFieldsProps> = ({ form }) => {
  return (
    <>
      <FormField
        control={form.control}
        name="issue"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Issue Title</FormLabel>
            <FormControl>
              <Input placeholder="e.g., API Connection Error" {...field} />
            </FormControl>
            <FormDescription>
              A clear, concise title describing the issue
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describe the issue in detail..." 
                className="min-h-[100px]"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default BaseInfoFields;
