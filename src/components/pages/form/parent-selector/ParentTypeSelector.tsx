
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { 
  FormControl,
  FormItem,
  FormLabel,
  FormMessage 
} from "@/components/ui/form";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { PageParentType } from "@/types";

interface ParentTypeSelectorProps {
  form: UseFormReturn<any>;
}

export const ParentTypeSelector: React.FC<ParentTypeSelectorProps> = ({ form }) => {
  const parentType = form.watch("parentType");
  
  return (
    <FormItem>
      <FormLabel>Parent Type</FormLabel>
      <Select 
        onValueChange={(value) => {
          form.setValue("parentType", value as PageParentType);
          form.setValue("parentId", null);
        }}
        value={parentType}
      >
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select a parent type" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="root">Root (No Parent)</SelectItem>
          <SelectItem value="project">Project</SelectItem>
          <SelectItem value="module">Module</SelectItem>
          <SelectItem value="component">Component</SelectItem>
          <SelectItem value="language">Language</SelectItem>
          <SelectItem value="guide">Guide</SelectItem>
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  );
};
