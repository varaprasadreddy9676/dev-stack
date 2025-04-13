
import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { 
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage 
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
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
import { PageParentType } from "@/types";
import { ParentOption } from "@/hooks/useParentOptions";

interface ParentEntitySelectorProps {
  form: UseFormReturn<any>;
  availableParents: ParentOption[];
  loading: boolean;
}

export const ParentEntitySelector: React.FC<ParentEntitySelectorProps> = ({ 
  form,
  availableParents,
  loading
}) => {
  const [open, setOpen] = useState(false);
  
  const parentType = form.watch("parentType");
  const parentId = form.watch("parentId");
  
  const selectedParent = availableParents.find(p => p.id === parentId);

  return (
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
  );
};
