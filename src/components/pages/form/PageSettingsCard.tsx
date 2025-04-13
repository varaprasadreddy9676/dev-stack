
import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface PageSettingsCardProps {
  form: UseFormReturn<any>;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

export const PageSettingsCard: React.FC<PageSettingsCardProps> = ({ 
  form, 
  tags, 
  setTags 
}) => {
  const [tagInput, setTagInput] = useState("");

  const addTag = () => {
    if (tagInput.trim() !== "" && !tags.includes(tagInput.trim())) {
      const newTags = [...tags, tagInput.trim()];
      setTags(newTags);
      form.setValue("tags", newTags);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter(tag => tag !== tagToRemove);
    setTags(newTags);
    form.setValue("tags", newTags);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Page Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="parentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parent Type</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                    value={field.value}
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
              )}
            />

            <FormField
              control={form.control}
              name="parentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parent ID</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter parent ID" 
                      {...field} 
                      value={field.value || ""} 
                      disabled={form.watch("parentType") === "root"}
                    />
                  </FormControl>
                  <FormDescription>
                    ID of the parent entity this page belongs to
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="visibility"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Visibility</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select visibility" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="team">Team Only</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Who can see this page
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={() => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <Input
                        placeholder="Add a tag"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addTag();
                          }
                        }}
                      />
                    </FormControl>
                    <Button type="button" onClick={addTag} size="sm">
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="rounded-full hover:bg-muted ml-1 p-1"
                        >
                          <X className="h-2 w-2" />
                          <span className="sr-only">Remove {tag} tag</span>
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <FormDescription>
                    Tags help with categorization and searching
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Form>
      </CardContent>
    </Card>
  );
};
