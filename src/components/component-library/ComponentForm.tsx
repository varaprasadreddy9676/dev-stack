
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const componentFormSchema = z.object({
  name: z.string().min(3, {
    message: "Component name must be at least 3 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  variants: z.string().min(1, {
    message: "Please specify the number of variants.",
  }),
  tags: z.string().optional(),
});

export type ComponentFormValues = z.infer<typeof componentFormSchema>;

interface ComponentFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ComponentFormValues) => void;
  initialValues?: ComponentFormValues;
}

const ComponentForm = ({ isOpen, onOpenChange, onSubmit, initialValues }: ComponentFormProps) => {
  const isEditing = !!initialValues;
  
  const form = useForm<ComponentFormValues>({
    resolver: zodResolver(componentFormSchema),
    defaultValues: initialValues || {
      name: "",
      description: "",
      variants: "1",
      tags: ""
    }
  });
  
  const handleSubmit = (data: ComponentFormValues) => {
    onSubmit(data);
    if (!isEditing) {
      form.reset();
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Component' : 'Create New Component'}</DialogTitle>
          <DialogDescription>
            {isEditing 
              ? 'Update the component details below.'
              : 'Add a new component to the library. Fill in the details below to get started.'}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Component Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter component name" {...field} />
                  </FormControl>
                  <FormDescription>
                    For example: Button, Card, DataTable, etc.
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
                      placeholder="Brief description of the component" 
                      {...field} 
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="variants"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Variants</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="1"
                      placeholder="Number of variants" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    How many visual or functional variants does this component have?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="ui, form, layout (comma separated)" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Comma-separated list of tags for easier searching.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="submit">{isEditing ? 'Save Changes' : 'Create Component'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ComponentForm;
