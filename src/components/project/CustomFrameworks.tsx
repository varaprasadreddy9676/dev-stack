
import React, { useState } from "react";
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  PencilIcon, 
  XIcon, 
  PlusIcon, 
  TrashIcon, 
  ChevronDownIcon, 
  ChevronUpIcon, 
  SaveIcon 
} from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";
import CodeEditor from "@/components/CodeEditor";
import { ProjectData } from "@/hooks/useProjectData";
import { updateArrayItem, removeArrayItem } from "@/utils/projectHelpers";

interface CustomFrameworksProps {
  project: ProjectData;
  onSave: (updatedData: Partial<ProjectData>) => Promise<void>;
}

interface FrameworkType {
  name: string;
  description: string;
  documentation: string;
  examples: Array<{
    title: string;
    code: string;
    description: string;
  }>;
}

interface ExampleType {
  title: string;
  code: string;
  description: string;
}

const CustomFrameworks: React.FC<CustomFrameworksProps> = ({ project, onSave }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [frameworks, setFrameworks] = useState<FrameworkType[]>([...project.customFrameworks]);
  const [currentFrameworkIndex, setCurrentFrameworkIndex] = useState<number | null>(null);
  const [showFrameworkForm, setShowFrameworkForm] = useState<boolean>(false);
  const [frameworkForm, setFrameworkForm] = useState<FrameworkType>({
    name: "",
    description: "",
    documentation: "",
    examples: []
  });
  const [currentExampleIndex, setCurrentExampleIndex] = useState<number | null>(null);
  const [exampleForm, setExampleForm] = useState<ExampleType>({
    title: "",
    code: "",
    description: ""
  });
  const [showExampleForm, setShowExampleForm] = useState<boolean>(false);

  const handleSave = async () => {
    const updatedProject = {
      customFrameworks: frameworks
    };
    
    await onSave(updatedProject);
    setIsEditing(false);
  };

  const startEditFramework = (index: number | null) => {
    if (index === null) {
      // Adding new framework
      setFrameworkForm({
        name: "",
        description: "",
        documentation: "",
        examples: []
      });
    } else {
      // Editing existing framework
      setFrameworkForm({ ...frameworks[index] });
    }
    setCurrentFrameworkIndex(index);
    setShowFrameworkForm(true);
  };

  const saveFramework = () => {
    if (currentFrameworkIndex === null) {
      // Adding new framework
      setFrameworks([...frameworks, { ...frameworkForm }]);
    } else {
      // Updating existing framework
      const updatedFrameworks = updateArrayItem(
        frameworks,
        currentFrameworkIndex,
        { ...frameworkForm }
      );
      setFrameworks(updatedFrameworks);
    }
    
    setShowFrameworkForm(false);
    setCurrentFrameworkIndex(null);
  };

  const deleteFramework = (index: number) => {
    const updatedFrameworks = removeArrayItem(frameworks, index);
    setFrameworks(updatedFrameworks);
  };

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

  const saveExample = () => {
    const updatedFrameworkForm = { ...frameworkForm };
    
    if (currentExampleIndex === null) {
      // Adding new example
      updatedFrameworkForm.examples = [...updatedFrameworkForm.examples, { ...exampleForm }];
    } else {
      // Updating existing example
      updatedFrameworkForm.examples = updateArrayItem(
        updatedFrameworkForm.examples,
        currentExampleIndex,
        { ...exampleForm }
      );
    }
    
    setFrameworkForm(updatedFrameworkForm);
    setShowExampleForm(false);
    setCurrentExampleIndex(null);
  };

  const deleteExample = (exampleIndex: number) => {
    const updatedFrameworkForm = { ...frameworkForm };
    updatedFrameworkForm.examples = removeArrayItem(
      updatedFrameworkForm.examples,
      exampleIndex
    );
    setFrameworkForm(updatedFrameworkForm);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Custom Frameworks</CardTitle>
          <CardDescription>Project-specific libraries and utilities</CardDescription>
        </div>
        {!isEditing ? (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsEditing(true)}
          >
            <PencilIcon className="h-4 w-4 mr-2" />
            Edit
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsEditing(false)}
            >
              <XIcon className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              onClick={handleSave}
            >
              <SaveIcon className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {isEditing && !showFrameworkForm ? (
          <div className="space-y-6">
            <Button 
              variant="outline" 
              onClick={() => startEditFramework(null)}
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Add New Framework
            </Button>
            
            {frameworks.length === 0 ? (
              <p className="text-muted-foreground italic">No frameworks defined yet.</p>
            ) : (
              <div className="space-y-4">
                {frameworks.map((framework, index) => (
                  <div key={index} className="border rounded-md p-4">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-medium">{framework.name}</h3>
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => startEditFramework(index)}
                        >
                          <PencilIcon className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => deleteFramework(index)}
                        >
                          <TrashIcon className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-muted-foreground mt-1">{framework.description}</p>
                    <p className="text-sm mt-2">
                      {framework.examples.length} example{framework.examples.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : isEditing && showFrameworkForm ? (
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
                  <div className="space-y-4">
                    {frameworkForm.examples.map((example, index) => (
                      <div key={index} className="border p-3 rounded-md">
                        <div className="flex justify-between">
                          <h5 className="font-medium">{example.title}</h5>
                          <div className="flex gap-1">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => startEditExample(index)}
                            >
                              <PencilIcon className="h-3 w-3" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => deleteExample(index)}
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
                )}
                
                {showExampleForm && (
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
                          onClick={() => {
                            setShowExampleForm(false);
                            setCurrentExampleIndex(null);
                          }}
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
                )}
              </div>
            </div>
            
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button 
                variant="ghost"
                onClick={() => {
                  setShowFrameworkForm(false);
                  setCurrentFrameworkIndex(null);
                }}
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
        ) : (
          // View mode
          <div className="space-y-6">
            {project.customFrameworks.length === 0 ? (
              <p className="text-muted-foreground italic">No custom frameworks defined for this project.</p>
            ) : (
              <div className="divide-y">
                {project.customFrameworks.map((framework, index) => (
                  <div key={index} className="py-6 first:pt-0 last:pb-0">
                    <h3 className="text-xl font-semibold mb-2">{framework.name}</h3>
                    <p className="mb-4">{framework.description}</p>
                    
                    <div className="mb-6">
                      <h4 className="text-lg font-medium mb-2">Documentation</h4>
                      <div className="prose max-w-none dark:prose-invert bg-muted/30 p-4 rounded-md">
                        <p>{framework.documentation}</p>
                      </div>
                    </div>
                    
                    {framework.examples.length > 0 && (
                      <div>
                        <h4 className="text-lg font-medium mb-3">Examples</h4>
                        <div className="space-y-4">
                          {framework.examples.map((example, exampleIndex) => (
                            <div key={exampleIndex} className="border rounded-md overflow-hidden">
                              <div className="bg-muted p-3 border-b">
                                <h5 className="font-medium">{example.title}</h5>
                                <p className="text-sm text-muted-foreground mt-1">{example.description}</p>
                              </div>
                              <div className="p-4 bg-muted/50 font-mono text-sm overflow-x-auto">
                                <pre>{example.code}</pre>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CustomFrameworks;
