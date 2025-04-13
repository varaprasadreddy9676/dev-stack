
import React, { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { 
  FormControl,
  FormDescription,
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown, Folder } from "lucide-react";
import { cn } from "@/lib/utils";
import { services } from "@/services/serviceFactory";
import { PageParentType } from "@/types";

interface ParentOption {
  id: string;
  name: string;
  description?: string;
}

interface ParentSelectorProps {
  form: UseFormReturn<any>;
  initialParentType?: PageParentType;
  initialParentId?: string | null;
}

export const ParentSelector: React.FC<ParentSelectorProps> = ({ 
  form,
  initialParentType = "root",
  initialParentId = null
}) => {
  const [availableParents, setAvailableParents] = useState<ParentOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const parentType = form.watch("parentType");
  const parentId = form.watch("parentId");
  
  // Function to fetch available parents based on the selected type
  const fetchAvailableParents = async (type: PageParentType) => {
    if (type === "root") {
      form.setValue("parentId", null);
      setAvailableParents([]);
      return;
    }
    
    setLoading(true);
    try {
      let parentOptions: ParentOption[] = [];
      
      switch (type) {
        case "project":
          const projects = await services.projects.getProjects();
          parentOptions = projects.map((project: any) => ({
            id: project._id,
            name: project.name,
            description: project.description
          }));
          break;
          
        // Add other entity types as needed (module, component, etc.)
        default:
          parentOptions = [];
      }
      
      setAvailableParents(parentOptions);
      
      // If initialParentId is set and matches one of the fetched parents, select it
      if (initialParentId && parentOptions.some(p => p.id === initialParentId)) {
        form.setValue("parentId", initialParentId);
      } else if (parentOptions.length > 0) {
        // Just clear the parentId if it doesn't match
        if (parentId) {
          form.setValue("parentId", null);
        }
      }
    } catch (error) {
      console.error("Error fetching parent options:", error);
      setAvailableParents([]);
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch parents when parent type changes
  useEffect(() => {
    fetchAvailableParents(parentType);
  }, [parentType]);
  
  // Select parent from URL params on initial load
  useEffect(() => {
    if (initialParentType && initialParentId) {
      form.setValue("parentType", initialParentType);
      setTimeout(() => {
        form.setValue("parentId", initialParentId);
      }, 100); // Small delay to ensure parents are fetched
    }
  }, [initialParentType, initialParentId]);
  
  const selectedParent = availableParents.find(p => p.id === parentId);

  return (
    <div className="space-y-4">
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

      {parentType !== "root" && (
        <FormItem>
          <FormLabel>Select Parent</FormLabel>
          <FormControl>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <button
                  aria-expanded={open}
                  className={cn(
                    "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
                    !parentId && "text-muted-foreground"
                  )}
                  disabled={loading}
                >
                  <div className="flex items-center gap-2">
                    {parentId ? (
                      <>
                        <Folder className="h-4 w-4 text-primary" />
                        {selectedParent?.name || "Select parent"}
                      </>
                    ) : (
                      "Select parent"
                    )}
                  </div>
                  <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0" align="start">
                <Command>
                  <CommandInput placeholder={`Search ${parentType}...`} />
                  <CommandEmpty>No {parentType} found.</CommandEmpty>
                  <CommandGroup>
                    {availableParents.map((parent) => (
                      <CommandItem
                        key={parent.id}
                        value={parent.name}
                        onSelect={() => {
                          form.setValue("parentId", parent.id);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            parentId === parent.id ? "opacity-100" : "opacity-0"
                          )}
                        />
                        <div className="flex flex-col">
                          <span>{parent.name}</span>
                          {parent.description && (
                            <span className="text-xs text-muted-foreground line-clamp-1">
                              {parent.description}
                            </span>
                          )}
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormDescription>
            Select the {parentType} this page belongs to
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    </div>
  );
};
