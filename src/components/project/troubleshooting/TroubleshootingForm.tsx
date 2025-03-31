
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Minus, Bug } from "lucide-react";
import { useForm } from "react-hook-form";
import { TroubleshootingIssue, Solution } from "@/types/troubleshooting";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const troubleshootingSchema = z.object({
  issue: z.string().min(5, "Issue title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  symptoms: z.array(z.string().min(3, "Symptom must be at least 3 characters")).min(1, "Add at least one symptom"),
  tags: z.array(z.string()),
  solutions: z.array(z.object({
    steps: z.string().min(10, "Solution steps must be at least 10 characters"),
    code: z.string().optional(),
  })).min(1, "Add at least one solution"),
});

type TroubleshootingFormValues = z.infer<typeof troubleshootingSchema>;

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
  const [tagInput, setTagInput] = useState("");
  
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
  
  const handleAddTag = () => {
    if (tagInput.trim()) {
      const currentTags = form.getValues("tags");
      if (!currentTags.includes(tagInput.trim())) {
        form.setValue("tags", [...currentTags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };
  
  const handleRemoveTag = (tag: string) => {
    const currentTags = form.getValues("tags");
    form.setValue("tags", currentTags.filter(t => t !== tag));
  };
  
  const handleFormSubmit = async (values: TroubleshootingFormValues) => {
    // Convert form values to TroubleshootingIssue format
    const troubleshootingData: Omit<TroubleshootingIssue, "id" | "lastUpdated"> = {
      issue: values.issue,
      description: values.description,
      symptoms: values.symptoms,
      tags: values.tags,
      relatedIssues: initialData?.relatedIssues || [],
      solutions: values.solutions.map(solution => ({
        steps: solution.steps,
        code: solution.code,
        screenshots: [],
        resources: []
      })),
      updatedBy: "current-user" // This would be dynamically set in a real app
    };
    
    await onSubmit(troubleshootingData);
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Bug className="h-5 w-5 text-amber-500" />
          <CardTitle>
            {initialData ? "Edit Troubleshooting Issue" : "Add Troubleshooting Issue"}
          </CardTitle>
        </div>
        <CardDescription>
          Document common issues and their solutions to help users troubleshoot problems.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
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
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <FormLabel>Symptoms</FormLabel>
                <Button type="button" variant="outline" size="sm" onClick={handleAddSymptom}>
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
                          onClick={() => handleRemoveSymptom(index)}
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
            
            <div>
              <FormLabel>Tags</FormLabel>
              <div className="flex flex-wrap gap-2 mb-2">
                {form.getValues("tags").map((tag) => (
                  <div key={tag} className="flex items-center bg-muted rounded-md px-2 py-1">
                    <span className="text-sm">{tag}</span>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      className="h-5 w-5 ml-1"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input 
                  placeholder="Add a tag..." 
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                />
                <Button type="button" variant="outline" onClick={handleAddTag}>
                  Add
                </Button>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-4">
                <FormLabel>Solutions</FormLabel>
                <Button type="button" variant="outline" size="sm" onClick={handleAddSolution}>
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
                      onClick={() => handleRemoveSolution(index)}
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
                        <FormLabel>Code Example (Optional)</FormLabel>
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
