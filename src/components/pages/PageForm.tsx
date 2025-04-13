import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePageData } from "@/hooks/usePageData";
import { useAuth } from "@/contexts/auth";
import { 
  CreatePageRequest, 
  UpdatePageRequest, 
  PageParentType, 
  PageVisibility, 
  ObjectId 
} from "@/types";
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
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RichTextEditor from "@/components/RichTextEditor";
import { FileText, Save, ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  parentType: z.enum(["project", "module", "language", "component", "guide", "root"] as const),
  parentId: z.string().nullable(),
  visibility: z.enum(["public", "team", "private"] as const),
  tags: z.array(z.string()).optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface PageFormProps {
  pageId?: string;
  initialParentType?: PageParentType;
  initialParentId?: string;
  mode: "create" | "edit";
}

export const PageForm = ({ 
  pageId, 
  initialParentType = "root",
  initialParentId = null,
  mode 
}: PageFormProps) => {
  const { getPage, createPage, updatePage } = usePageData();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      parentType: initialParentType,
      parentId: initialParentId,
      visibility: "team",
      tags: [],
    },
  });

  useEffect(() => {
    const fetchPageData = async () => {
      if (mode === "edit" && pageId) {
        setLoading(true);
        const page = await getPage(pageId);
        if (page) {
          form.reset({
            title: page.title,
            content: page.content,
            parentType: page.parent.type,
            parentId: page.parent.id,
            visibility: page.visibility,
            tags: page.tags,
          });
          setTags(page.tags);
        }
        setLoading(false);
      }
    };

    fetchPageData();
  }, [pageId, mode, getPage, form]);

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

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      if (mode === "create") {
        const requestData: CreatePageRequest = {
          title: values.title,
          content: values.content,
          parent: {
            type: values.parentType,
            id: values.parentId,
          },
          visibility: values.visibility as PageVisibility,
          tags: values.tags,
        };
        
        const newPage = await createPage(requestData);
        if (newPage) {
          navigate(`/pages/${newPage._id}`);
        }
      } else if (mode === "edit" && pageId) {
        const requestData: UpdatePageRequest = {
          title: values.title,
          content: values.content,
          parent: {
            type: values.parentType,
            id: values.parentId,
          },
          visibility: values.visibility as PageVisibility,
          tags: values.tags,
        };
        
        const updatedPage = await updatePage(pageId, requestData);
        if (updatedPage) {
          navigate(`/pages/${updatedPage._id}`);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-10 animate-fade-in">
      <div className="mb-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)} 
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          {mode === "create" ? "Create New Page" : "Edit Page"}
        </h1>
        <p className="text-muted-foreground">
          {mode === "create" 
            ? "Create a new page with rich content to document your project." 
            : "Update the page content and metadata."}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                {mode === "create" ? "Page Details" : "Edit Page"}
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
        </div>

        <div className="space-y-6">
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

          <Card>
            <CardHeader>
              <CardTitle>Page Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <p className="font-medium">Created By</p>
                <p className="text-muted-foreground">{user?.id || "Current User"}</p>
              </div>
              <div>
                <p className="font-medium">Date</p>
                <p className="text-muted-foreground">{new Date().toLocaleDateString()}</p>
              </div>
              <div>
                <p className="font-medium">Status</p>
                <p className="text-muted-foreground">Draft</p>
              </div>
              <div className="pt-4 border-t">
                <p className="text-xs text-muted-foreground">
                  Pages support Markdown formatting and HTML content
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
