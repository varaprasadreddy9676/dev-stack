
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import EnhancedRichTextEditor from "@/components/EnhancedRichTextEditor";
import { ModuleFormData } from "./moduleTypes";

interface ModuleFormProps {
  moduleData: ModuleFormData;
  setModuleForm: React.Dispatch<React.SetStateAction<ModuleFormData>>;
  onCancel: () => void;
  onSave: () => void;
  isNew: boolean;
}

const ModuleForm: React.FC<ModuleFormProps> = ({ 
  moduleData, 
  setModuleForm, 
  onCancel, 
  onSave,
  isNew
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">
        {isNew ? "Add New Module" : "Edit Module"}
      </h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="module-name">Module Name</Label>
          <Input 
            id="module-name" 
            value={moduleData.name} 
            onChange={(e) => setModuleForm(prev => ({ ...prev, name: e.target.value }))}
            placeholder="e.g., Authentication"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="module-description">Short Description</Label>
          <Textarea 
            id="module-description" 
            value={moduleData.description} 
            onChange={(e) => setModuleForm(prev => ({ ...prev, description: e.target.value }))}
            rows={2}
            placeholder="Brief description of what this module does"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="module-documentation">Documentation</Label>
          <EnhancedRichTextEditor 
            id="module-documentation" 
            value={moduleData.documentation} 
            onChange={(value) => setModuleForm(prev => ({ ...prev, documentation: value }))}
            minHeight={250}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="module-dependencies">Dependencies (comma-separated)</Label>
          <Input 
            id="module-dependencies" 
            value={moduleData.dependencies} 
            onChange={(e) => setModuleForm(prev => ({ ...prev, dependencies: e.target.value }))}
            placeholder="e.g., axios, react-query, redux"
          />
        </div>
      </div>
      
      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button 
          variant="ghost"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button 
          variant="default"
          onClick={onSave}
          disabled={!moduleData.name || !moduleData.description}
        >
          {isNew ? "Add" : "Update"} Module
        </Button>
      </div>
    </div>
  );
};

export default ModuleForm;
