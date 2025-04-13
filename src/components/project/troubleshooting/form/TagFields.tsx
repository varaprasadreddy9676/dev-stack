
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Minus } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { TroubleshootingFormValues } from "./schema";

interface TagFieldsProps {
  form: UseFormReturn<TroubleshootingFormValues>;
}

const TagFields: React.FC<TagFieldsProps> = ({ form }) => {
  const [tagInput, setTagInput] = useState("");
  
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
  
  return (
    <div>
      <div className="font-medium mb-2">Tags</div>
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
  );
};

export default TagFields;
