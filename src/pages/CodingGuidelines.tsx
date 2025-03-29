
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowRight, FileText, Search } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

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

type LanguageFormValues = z.infer<typeof languageFormSchema>;

// Sample languages data
const languages = [
  {
    id: "typescript",
    name: "TypeScript",
    description: "Type-safe JavaScript for large-scale applications",
    updatedAt: "2024-03-15T14:20:00Z",
    tags: ["frontend", "backend", "typed", "javascript"]
  },
  {
    id: "javascript",
    name: "JavaScript",
    description: "Dynamic language for web development and beyond",
    updatedAt: "2024-03-10T09:15:00Z",
    tags: ["frontend", "backend", "scripting"]
  },
  {
    id: "python",
    name: "Python",
    description: "General-purpose language emphasizing readability and simplicity",
    updatedAt: "2024-03-05T14:30:00Z",
    tags: ["backend", "data", "scripting"]
  },
  {
    id: "java",
    name: "Java",
    description: "Object-oriented programming language for enterprise applications",
    updatedAt: "2024-02-28T11:20:00Z",
    tags: ["backend", "enterprise", "object-oriented"]
  },
  {
    id: "csharp",
    name: "C#",
    description: "Modern, object-oriented language for the .NET platform",
    updatedAt: "2024-02-20T10:05:00Z",
    tags: ["backend", "microsoft", "object-oriented"]
  },
  {
    id: "ruby",
    name: "Ruby",
    description: "Dynamic language focused on simplicity and productivity",
    updatedAt: "2024-02-15T09:30:00Z",
    tags: ["backend", "web", "scripting"]
  }
];

const CodingGuidelines = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };
  
  // Filter languages based on search term and active filter
  const filteredLanguages = languages.filter(lang => {
    const matchesSearch = 
      lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lang.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lang.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (activeFilter === "all") return matchesSearch;
    return matchesSearch && lang.tags.includes(activeFilter);
  });
  
  // Extract unique tags for filtering
  const uniqueTags = Array.from(new Set(languages.flatMap(lang => lang.tags)));
  
  // Form for creating new language guide
  const form = useForm<LanguageFormValues>({
    resolver: zodResolver(languageFormSchema),
    defaultValues: {
      name: "",
      description: "",
      tags: ""
    }
  });
  
  // Handle form submission
  const onSubmit = (data: LanguageFormValues) => {
    // Process tags
    const processedData = {
      ...data,
      tags: data.tags ? data.tags.split(",").map(tag => tag.trim()) : []
    };
    
    // In a real application, this would make an API call to create the language guide
    console.log("Creating language guide:", processedData);
    
    // Show success toast
    toast.success("Language guide created successfully");
    
    // Close dialog and reset form
    setIsDialogOpen(false);
    form.reset();
    
    // Navigate to the new language guide
    // For demo purposes, we'll navigate to TypeScript guide
    navigate(`/guidelines/typescript`);
  };

  return (
    <div className="container py-10 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Coding Guidelines</h1>
          <p className="text-muted-foreground">Language-specific standards and best practices</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              New Language Guide
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Create New Language Guide</DialogTitle>
              <DialogDescription>
                Add a new language guide to the developer portal. Fill in the details below to get started.
              </DialogDescription>
            </DialogHeader>
            
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
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-64 space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search languages..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="bg-card border rounded-lg p-4 space-y-4">
            <h3 className="font-medium">Filter by Tag</h3>
            <div className="flex flex-wrap gap-2">
              <Badge 
                variant={activeFilter === "all" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setActiveFilter("all")}
              >
                All
              </Badge>
              {uniqueTags.map(tag => (
                <Badge 
                  key={tag} 
                  variant={activeFilter === tag ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setActiveFilter(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Guidelines define how we write code across the organization. They help maintain consistency and quality.
              </p>
              <p className="text-sm text-muted-foreground">
                Contact your team lead if you have questions about implementing these guidelines.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex-1">
          <Tabs defaultValue="grid" className="mb-6">
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                {filteredLanguages.length} {filteredLanguages.length === 1 ? "language" : "languages"} found
              </div>
              <TabsList>
                <TabsTrigger value="grid">Grid</TabsTrigger>
                <TabsTrigger value="list">List</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="grid" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredLanguages.map(language => (
                  <Card key={language.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">
                        <Link to={`/guidelines/${language.id}`} className="hover:text-primary transition-colors">
                          {language.name}
                        </Link>
                      </CardTitle>
                      <CardDescription>{language.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {language.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-0">
                      <div className="text-xs text-muted-foreground">
                        Updated {formatDate(language.updatedAt)}
                      </div>
                      <Button variant="link" size="sm" className="p-0 h-auto text-primary" asChild>
                        <Link to={`/guidelines/${language.id}`}>
                          View Guidelines
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="list" className="mt-6">
              <div className="space-y-4">
                {filteredLanguages.map(language => (
                  <Card key={language.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>
                            <Link to={`/guidelines/${language.id}`} className="hover:text-primary transition-colors">
                              {language.name}
                            </Link>
                          </CardTitle>
                          <CardDescription className="mt-1">{language.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {language.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <div className="text-xs text-muted-foreground">
                          Updated {formatDate(language.updatedAt)}
                        </div>
                        <Button variant="link" className="p-0 h-auto text-primary" asChild>
                          <Link to={`/guidelines/${language.id}`}>
                            View Guidelines
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CodingGuidelines;
