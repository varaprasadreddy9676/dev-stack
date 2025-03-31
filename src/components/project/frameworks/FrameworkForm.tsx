
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PlusIcon, TrashIcon, PencilIcon } from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";
import CodeEditor from "@/components/CodeEditor";
import { FrameworkType, ExampleType } from "@/types/framework";

interface FrameworkFormProps {
  frameworkForm: FrameworkType;
  setFrameworkForm: React.Dispatch<React.SetStateAction<FrameworkType>>;
  saveFramework: () => void;
  cancelEdit: () => void;
  currentFrameworkIndex: number | null;
}

interface ExampleFormProps {
  exampleForm: ExampleType;
  setExampleForm: React.Dispatch<React.SetStateAction<ExampleType>>;
  saveExample: () => void;
  cancelEdit: () => void;
  currentExampleIndex: number | null;
}

export const ExampleForm: React.FC<ExampleFormProps> = ({
  exampleForm,
  setExampleForm,
  saveExample,
  cancelEdit,
  currentExampleIndex
}) => {
  return (
    <div className="border p-4 rounded-md mt-4 bg-muted/30">
      <h5 className="font-medium mb-3">
        {currentExampleIndex === null ? "Add Example" : "Edit Example"}
      </h5>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="example-title">Title</Label>
          <Input 
            id="example-title" 
            value={exampleForm.title} 
            onChange={(e) => setExampleForm(prev => ({ ...prev, title: e.target.value }))}
            placeholder="e.g., Basic Usage"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="example-description">Description</Label>
          <Textarea 
            id="example-description" 
            value={exampleForm.description} 
            onChange={(e) => setExampleForm(prev => ({ ...prev, description: e.target.value }))}
            rows={2}
            placeholder="Brief description of this example"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="example-code">Code</Label>
          <CodeEditor 
            id="example-code" 
            value={exampleForm.code} 
            onChange={(value) => setExampleForm(prev => ({ ...prev, code: value }))}
            language="javascript"
          />
        </div>
        
        <div className="flex justify-end gap-2">
          <Button 
            type="button" 
            variant="ghost"
            onClick={cancelEdit}
          >
            Cancel
          </Button>
          <Button 
            type="button" 
            variant="outline"
            onClick={saveExample}
            disabled={!exampleForm.title || !exampleForm.code}
          >
            {currentExampleIndex === null ? "Add" : "Update"} Example
          </Button>
        </div>
      </div>
    </div>
  );
};

export const ExamplesList: React.FC<{
  examples: ExampleType[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}> = ({ examples, onEdit, onDelete }) => {
  return (
    <div className="space-y-4">
      {examples.map((example, index) => (
        <div key={index} className="border p-3 rounded-md">
          <div className="flex justify-between">
            <h5 className="font-medium">{example.title}</h5>
            <div className="flex gap-1">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onEdit(index)}
              >
                <PencilIcon className="h-3 w-3" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onDelete(index)}
              >
                <TrashIcon className="h-3 w-3 text-destructive" />
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
            {example.description}
          </p>
        </div>
      ))}
    </div>
  );
};

const FrameworkForm: React.FC<FrameworkFormProps> = ({
  frameworkForm,
  setFrameworkForm,
  saveFramework,
  cancelEdit,
  currentFrameworkIndex
}) => {
  const [currentExampleIndex, setCurrentExampleIndex] = React.useState<number | null>(null);
  const [showExampleForm, setShowExampleForm] = React.useState<boolean>(false);
  const [exampleForm, setExampleForm] = React.useState<ExampleType>({
    title: "",
    code: "",
    description: ""
  });

  const startEditExample = (exampleIndex: number | null) => {
    if (exampleIndex === null) {
      // Adding new example
      setExampleForm({
        title: "",
        code: "",
        description: ""
      });
    } else {
      // Editing existing example
      setExampleForm({ ...frameworkForm.examples[exampleIndex] });
    }
    setCurrentExampleIndex(exampleIndex);
    setShowExampleForm(true);
  };

  const cancelExampleEdit = () => {
    setShowExampleForm(false);
    setCurrentExampleIndex(null);
  };

  const saveExample = () => {
    const updatedFrameworkForm = { ...frameworkForm };
    
    if (currentExampleIndex === null) {
      // Adding new example
      updatedFrameworkForm.examples = [...updatedFrameworkForm.examples, { ...exampleForm }];
    } else {
      // Updating existing example
      updatedFrameworkForm.examples = [...updatedFrameworkForm.examples];
      updatedFrameworkForm.examples[currentExampleIndex] = { ...exampleForm };
    }
    
    setFrameworkForm(updatedFrameworkForm);
    setShowExampleForm(false);
    setCurrentExampleIndex(null);
  };

  const deleteExample = (exampleIndex: number) => {
    const updatedFrameworkForm = { ...frameworkForm };
    updatedFrameworkForm.examples = updatedFrameworkForm.examples.filter((_, i) => i !== exampleIndex);
    setFrameworkForm(updatedFrameworkForm);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">
        {currentFrameworkIndex === null ? "Add New Framework" : "Edit Framework"}
      </h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="framework-name">Framework Name</Label>
          <Input 
            id="framework-name" 
            value={frameworkForm.name} 
            onChange={(e) => setFrameworkForm(prev => ({ ...prev, name: e.target.value }))}
            placeholder="e.g., DataFetcherHOC"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="framework-description">Short Description</Label>
          <Textarea 
            id="framework-description" 
            value={frameworkForm.description} 
            onChange={(e) => setFrameworkForm(prev => ({ ...prev, description: e.target.value }))}
            rows={2}
            placeholder="Brief description of what this framework does"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="framework-documentation">Documentation</Label>
          <RichTextEditor 
            id="framework-documentation" 
            value={frameworkForm.documentation} 
            onChange={(value) => setFrameworkForm(prev => ({ ...prev, documentation: value }))}
          />
        </div>
        
        <div className="border-t pt-4 mt-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium">Examples</h4>
            {!showExampleForm && (
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={() => startEditExample(null)}
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Example
              </Button>
            )}
          </div>
          
          {frameworkForm.examples.length === 0 && !showExampleForm ? (
            <p className="text-muted-foreground italic">No examples added yet.</p>
          ) : (
            <ExamplesList 
              examples={frameworkForm.examples} 
              onEdit={startEditExample}
              onDelete={deleteExample}
            />
          )}
          
          {showExampleForm && (
            <ExampleForm 
              exampleForm={exampleForm}
              setExampleForm={setExampleForm}
              saveExample={saveExample}
              cancelEdit={cancelExampleEdit}
              currentExampleIndex={currentExampleIndex}
            />
          )}
        </div>
      </div>
      
      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button 
          variant="ghost"
          onClick={cancelEdit}
        >
          Cancel
        </Button>
        <Button 
          variant="default"
          onClick={saveFramework}
          disabled={!frameworkForm.name || !frameworkForm.description}
        >
          {currentFrameworkIndex === null ? "Add" : "Update"} Framework
        </Button>
      </div>
    </div>
  );
};

export default FrameworkForm;
