
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DialogFooter } from "@/components/ui/dialog";
import { LanguageFormValues } from "@/types/language";

// Define form schema for new language guide
const languageFormSchema = z.object({
  name: z.string().min(2, {
    message: "Language name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  tags: z.string().optional(),
});

interface NewLanguageFormProps {
  onSubmit: (data: LanguageFormValues) => void;
}

const NewLanguageForm = ({ onSubmit }: NewLanguageFormProps) => {
  const form = useForm<LanguageFormValues>({
    resolver: zodResolver(languageFormSchema),
    defaultValues: {
      name: "",
      description: "",
      tags: ""
    }
  });
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Language Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter language name" {...field} />
              </FormControl>
              <FormDescription>
                For example: JavaScript, Python, Java, etc.
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
                  placeholder="Brief description of the language" 
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
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input 
                  placeholder="frontend, backend, typed (comma separated)" 
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
          <Button type="submit">Create Language Guide</Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default NewLanguageForm;
