
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RichTextEditor from "@/components/RichTextEditor";
import { FileText, Save } from "lucide-react";

interface PageDetailsCardProps {
  form: UseFormReturn<any>;
  onSubmit: (values: any) => Promise<void>;
  loading: boolean;
}

export const PageDetailsCard: React.FC<PageDetailsCardProps> = ({ 
  form, 
  onSubmit, 
  loading 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="mr-2 h-5 w-5" />
          Page Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Page title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <RichTextEditor 
                      value={field.value} 
                      onChange={field.onChange} 
                      allowHtml={true}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button 
                type="submit" 
                disabled={loading}
                className="min-w-[120px]"
              >
                <Save className="mr-2 h-4 w-4" />
                {loading ? "Saving..." : "Save Page"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
