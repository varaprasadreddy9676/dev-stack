
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckIcon, PencilIcon, PlusIcon, TrashIcon, SaveIcon, XIcon } from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";
import CodeEditor from "@/components/CodeEditor";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Sample project data - in a real app, this would come from an API
const sampleProject = {
  _id: "proj123",
  name: "Customer Portal",
  description: "Frontend application for customer account management and service requests",
  overview: "The Customer Portal serves as the primary interface for customers to manage their accounts, submit service requests, and view usage analytics. It's built with a focus on user experience and performance.",
  architecture: {
    description: "Microservices architecture with React frontend",
    diagrams: [
      {
        title: "Architecture Overview",
        imageUrl: "/images/customer-portal-architecture.svg",
        description: "High-level architecture showing service integrations"
      }
    ]
  },
  structure: {
    description: "Feature-based organization with shared components",
    folders: [
      {
        path: "/src/features",
        purpose: "Feature-specific components and logic"
      },
      {
        path: "/src/shared",
        purpose: "Cross-feature shared components and utilities"
      }
    ]
  },
  customFrameworks: [
    {
      name: "DataFetcherHOC",
      description: "Higher-order component for data fetching with loading states",
      documentation: "# DataFetcherHOC\n\nThis HOC simplifies data fetching patterns across the application.",
      examples: [
        {
          title: "Basic Usage",
          code: "const EnhancedComponent = withDataFetcher(MyComponent, {\n  fetchData: (props) => api.fetchData(props.id)\n});",
          description: "Wraps a component with data fetching capability"
        }
      ]
    }
  ],
  modules: [
    {
      name: "Authentication",
      description: "Handles user authentication and authorization",
      documentation: "# Authentication Module\n\nProvides login, logout, and permission checking capabilities.",
      dependencies: ["axios", "jwt-decode"]
    }
  ],
  guidelines: {
    content: "# Project Guidelines\n\n## Coding Standards\n\n- Use TypeScript for all new code\n- Follow the project's ESLint configuration\n- Write unit tests for all business logic",
    lastUpdated: new Date("2024-03-15"),
    updatedBy: "user123"
  },
  components: ["comp1", "comp2", "comp3"],
  resources: [
    {
      title: "API Documentation",
      type: "link",
      url: "https://api-docs.example.com",
      description: "Official API documentation for the backend services"
    },
    {
      title: "Design System",
      type: "link",
      url: "https://design.example.com",
      description: "Company design system and component library"
    }
  ],
  tags: ["react", "typescript", "customer-facing"],
  createdAt: new Date("2024-02-15"),
  updatedAt: new Date("2024-03-10")
};

// UI Section Components

const ProjectManagement = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(sampleProject);
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveProject = async (updatedData) => {
    setIsLoading(true);

    try {
      // In a real app, this would be an API call
      console.log("Saving project data:", updatedData);
      setProject({ ...project, ...updatedData });
      toast.success("Project saved successfully");
    } catch (error) {
      toast.error("Failed to save project");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-8 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
          <p className="text-muted-foreground">{project.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => navigate(`/projects/${id}`)}>View Project</Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags.map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>

      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <div className="border-b">
          <TabsList className="w-full justify-start h-auto p-0 bg-transparent">
            <TabsTrigger
              value="overview"
              className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="architecture"
              className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              Architecture
            </TabsTrigger>
            <TabsTrigger
              value="structure"
              className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              Structure
            </TabsTrigger>
            <TabsTrigger
              value="frameworks"
              className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              Frameworks
            </TabsTrigger>
            <TabsTrigger
              value="modules"
              className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              Modules
            </TabsTrigger>
            <TabsTrigger
              value="guidelines"
              className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              Guidelines
            </TabsTrigger>
            <TabsTrigger
              value="components"
              className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              Components
            </TabsTrigger>
            <TabsTrigger
              value="resources"
              className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              Resources
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Overview Section */}
        <TabsContent value="overview">
          <OverviewSection project={project} onSave={handleSaveProject} />
        </TabsContent>

        {/* Architecture Section */}
        <TabsContent value="architecture">
          <ArchitectureSection project={project} onSave={handleSaveProject} />
        </TabsContent>

        {/* Structure Section */}
        <TabsContent value="structure">
          <StructureSection project={project} onSave={handleSaveProject} />
        </TabsContent>

        {/* Custom Frameworks Section */}
        <TabsContent value="frameworks">
          <FrameworksSection project={project} onSave={handleSaveProject} />
        </TabsContent>

        {/* Modules Section */}
        <TabsContent value="modules">
          <ModulesSection project={project} onSave={handleSaveProject} />
        </TabsContent>

        {/* Guidelines Section */}
        <TabsContent value="guidelines">
          <GuidelinesSection project={project} onSave={handleSaveProject} />
        </TabsContent>

        {/* Components Section */}
        <TabsContent value="components">
          <ComponentsSection project={project} onSave={handleSaveProject} />
        </TabsContent>

        {/* Resources Section */}
        <TabsContent value="resources">
          <ResourcesSection project={project} onSave={handleSaveProject} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Section Components

const OverviewSection = ({ project, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: project.name,
    description: project.description,
    overview: project.overview,
    tags: project.tags.join(", ")
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProject = {
      ...project,
      name: formData.name,
      description: formData.description,
      overview: formData.overview,
      tags: formData.tags.split(",").map(tag => tag.trim()).filter(Boolean)
    };
    onSave(updatedProject);
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Project Overview</CardTitle>
          <CardDescription>Basic information about the project</CardDescription>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? <XIcon className="h-4 w-4 mr-2" /> : <PencilIcon className="h-4 w-4 mr-2" />}
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name</Label>
              <Input 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Project Description</Label>
              <Textarea 
                id="description" 
                name="description" 
                value={formData.description} 
                onChange={handleChange}
                rows={2}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="overview">Project Overview</Label>
              <RichTextEditor 
                id="overview" 
                value={formData.overview} 
                onChange={(value) => setFormData(prev => ({ ...prev, overview: value }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input 
                id="tags" 
                name="tags" 
                value={formData.tags} 
                onChange={handleChange}
              />
            </div>
            
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" type="button" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button type="submit">
                <SaveIcon className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Project Name</h3>
              <p>{project.name}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium">Description</h3>
              <p>{project.description}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium">Overview</h3>
              <div className="prose max-w-none dark:prose-invert">
                <p>{project.overview}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium">Tags</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const ArchitectureSection = ({ project, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    description: project.architecture.description,
    diagrams: [...project.architecture.diagrams]
  });
  const [newDiagram, setNewDiagram] = useState({
    title: "",
    imageUrl: "",
    description: ""
  });
  const [showNewDiagramForm, setShowNewDiagramForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProject = {
      ...project,
      architecture: formData
    };
    onSave(updatedProject);
    setIsEditing(false);
  };

  const handleDiagramChange = (index, field, value) => {
    const updatedDiagrams = [...formData.diagrams];
    updatedDiagrams[index] = { ...updatedDiagrams[index], [field]: value };
    setFormData(prev => ({ ...prev, diagrams: updatedDiagrams }));
  };

  const handleAddDiagram = () => {
    if (newDiagram.title && newDiagram.imageUrl) {
      setFormData(prev => ({
        ...prev,
        diagrams: [...prev.diagrams, { ...newDiagram }]
      }));
      setNewDiagram({ title: "", imageUrl: "", description: "" });
      setShowNewDiagramForm(false);
    }
  };

  const handleRemoveDiagram = (index) => {
    const updatedDiagrams = formData.diagrams.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, diagrams: updatedDiagrams }));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Architecture</CardTitle>
          <CardDescription>System architecture and diagrams</CardDescription>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? <XIcon className="h-4 w-4 mr-2" /> : <PencilIcon className="h-4 w-4 mr-2" />}
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="arch-description">Architecture Description</Label>
              <Textarea 
                id="arch-description" 
                value={formData.description} 
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Diagrams</h3>
                {!showNewDiagramForm && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowNewDiagramForm(true)}
                  >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add Diagram
                  </Button>
                )}
              </div>
              
              {formData.diagrams.map((diagram, index) => (
                <div key={index} className="border p-4 rounded-md mb-4">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-medium">Diagram {index + 1}</h4>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleRemoveDiagram(index)}
                    >
                      <TrashIcon className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                  
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`diagram-title-${index}`}>Title</Label>
                      <Input 
                        id={`diagram-title-${index}`} 
                        value={diagram.title} 
                        onChange={(e) => handleDiagramChange(index, "title", e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`diagram-image-${index}`}>Image URL</Label>
                      <Input 
                        id={`diagram-image-${index}`} 
                        value={diagram.imageUrl} 
                        onChange={(e) => handleDiagramChange(index, "imageUrl", e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`diagram-desc-${index}`}>Description</Label>
                      <Textarea 
                        id={`diagram-desc-${index}`} 
                        value={diagram.description} 
                        onChange={(e) => handleDiagramChange(index, "description", e.target.value)}
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              {showNewDiagramForm && (
                <div className="border p-4 rounded-md mb-4 bg-muted/30">
                  <h4 className="font-medium mb-3">New Diagram</h4>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-diagram-title">Title</Label>
                      <Input 
                        id="new-diagram-title" 
                        value={newDiagram.title} 
                        onChange={(e) => setNewDiagram(prev => ({ ...prev, title: e.target.value }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="new-diagram-image">Image URL</Label>
                      <Input 
                        id="new-diagram-image" 
                        value={newDiagram.imageUrl} 
                        onChange={(e) => setNewDiagram(prev => ({ ...prev, imageUrl: e.target.value }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="new-diagram-desc">Description</Label>
                      <Textarea 
                        id="new-diagram-desc" 
                        value={newDiagram.description} 
                        onChange={(e) => setNewDiagram(prev => ({ ...prev, description: e.target.value }))}
                        rows={2}
                      />
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <Button 
                        type="button" 
                        variant="ghost"
                        onClick={() => {
                          setShowNewDiagramForm(false);
                          setNewDiagram({ title: "", imageUrl: "", description: "" });
                        }}
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={handleAddDiagram}
                        disabled={!newDiagram.title || !newDiagram.imageUrl}
                      >
                        Add Diagram
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" type="button" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button type="submit">
                <SaveIcon className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Architecture Description</h3>
              <p>{project.architecture.description}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Diagrams</h3>
              
              {project.architecture.diagrams.length === 0 ? (
                <p className="text-muted-foreground italic">No diagrams added yet.</p>
              ) : (
                <div className="grid gap-6">
                  {project.architecture.diagrams.map((diagram, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">{diagram.title}</h4>
                      <div className="bg-muted rounded-md p-6 text-center mb-3">
                        {diagram.imageUrl ? (
                          <img 
                            src={diagram.imageUrl} 
                            alt={diagram.title}
                            className="max-h-64 mx-auto"
                          />
                        ) : (
                          <div className="text-muted-foreground">Image placeholder</div>
                        )}
                      </div>
                      <p className="text-sm">{diagram.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const StructureSection = ({ project, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    description: project.structure.description,
    folders: [...project.structure.folders]
  });
  const [newFolder, setNewFolder] = useState({
    path: "",
    purpose: ""
  });
  const [showNewFolderForm, setShowNewFolderForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProject = {
      ...project,
      structure: formData
    };
    onSave(updatedProject);
    setIsEditing(false);
  };

  const handleFolderChange = (index, field, value) => {
    const updatedFolders = [...formData.folders];
    updatedFolders[index] = { ...updatedFolders[index], [field]: value };
    setFormData(prev => ({ ...prev, folders: updatedFolders }));
  };

  const handleAddFolder = () => {
    if (newFolder.path && newFolder.purpose) {
      setFormData(prev => ({
        ...prev,
        folders: [...prev.folders, { ...newFolder }]
      }));
      setNewFolder({ path: "", purpose: "" });
      setShowNewFolderForm(false);
    }
  };

  const handleRemoveFolder = (index) => {
    const updatedFolders = formData.folders.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, folders: updatedFolders }));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Project Structure</CardTitle>
          <CardDescription>File and folder organization</CardDescription>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? <XIcon className="h-4 w-4 mr-2" /> : <PencilIcon className="h-4 w-4 mr-2" />}
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="structure-description">Structure Description</Label>
              <Textarea 
                id="structure-description" 
                value={formData.description} 
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Folders</h3>
                {!showNewFolderForm && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowNewFolderForm(true)}
                  >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add Folder
                  </Button>
                )}
              </div>
              
              {formData.folders.map((folder, index) => (
                <div key={index} className="border p-4 rounded-md mb-4">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-medium font-mono">{folder.path}</h4>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleRemoveFolder(index)}
                    >
                      <TrashIcon className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                  
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`folder-path-${index}`}>Path</Label>
                      <Input 
                        id={`folder-path-${index}`} 
                        value={folder.path} 
                        onChange={(e) => handleFolderChange(index, "path", e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`folder-purpose-${index}`}>Purpose</Label>
                      <Textarea 
                        id={`folder-purpose-${index}`} 
                        value={folder.purpose} 
                        onChange={(e) => handleFolderChange(index, "purpose", e.target.value)}
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              {showNewFolderForm && (
                <div className="border p-4 rounded-md mb-4 bg-muted/30">
                  <h4 className="font-medium mb-3">New Folder</h4>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-folder-path">Path</Label>
                      <Input 
                        id="new-folder-path" 
                        value={newFolder.path} 
                        onChange={(e) => setNewFolder(prev => ({ ...prev, path: e.target.value }))}
                        placeholder="/src/components"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="new-folder-purpose">Purpose</Label>
                      <Textarea 
                        id="new-folder-purpose" 
                        value={newFolder.purpose} 
                        onChange={(e) => setNewFolder(prev => ({ ...prev, purpose: e.target.value }))}
                        rows={2}
                        placeholder="What this folder contains"
                      />
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <Button 
                        type="button" 
                        variant="ghost"
                        onClick={() => {
                          setShowNewFolderForm(false);
                          setNewFolder({ path: "", purpose: "" });
                        }}
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={handleAddFolder}
                        disabled={!newFolder.path || !newFolder.purpose}
                      >
                        Add Folder
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" type="button" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button type="submit">
                <SaveIcon className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Structure Description</h3>
              <p>{project.structure.description}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Folders</h3>
              
              {project.structure.folders.length === 0 ? (
                <p className="text-muted-foreground italic">No folders defined yet.</p>
              ) : (
                <div className="space-y-4">
                  {project.structure.folders.map((folder, index) => (
                    <div key={index} className="p-3 bg-muted/50 rounded-md">
                      <div className="font-mono text-sm">{folder.path}</div>
                      <div className="text-sm text-muted-foreground mt-1">{folder.purpose}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const FrameworksSection = ({ project, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [frameworks, setFrameworks] = useState([...project.customFrameworks]);
  const [currentFrameworkIndex, setCurrentFrameworkIndex] = useState(null);
  const [showFrameworkForm, setShowFrameworkForm] = useState(false);
  const [frameworkForm, setFrameworkForm] = useState({
    name: "",
    description: "",
    documentation: "",
    examples: []
  });
  const [currentExampleIndex, setCurrentExampleIndex] = useState(null);
  const [exampleForm, setExampleForm] = useState({
    title: "",
    code: "",
    description: ""
  });
  const [showExampleForm, setShowExampleForm] = useState(false);

  const handleSave = () => {
    const updatedProject = {
      ...project,
      customFrameworks: frameworks
    };
    onSave(updatedProject);
    setIsEditing(false);
  };

  const startEditFramework = (index) => {
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
      const updatedFrameworks = [...frameworks];
      updatedFrameworks[currentFrameworkIndex] = { ...frameworkForm };
      setFrameworks(updatedFrameworks);
    }
    
    setShowFrameworkForm(false);
    setCurrentFrameworkIndex(null);
  };

  const deleteFramework = (index) => {
    const updatedFrameworks = frameworks.filter((_, i) => i !== index);
    setFrameworks(updatedFrameworks);
  };

  const startEditExample = (frameworkIndex, exampleIndex) => {
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
      updatedFrameworkForm.examples = [...updatedFrameworkForm.examples];
      updatedFrameworkForm.examples[currentExampleIndex] = { ...exampleForm };
    }
    
    setFrameworkForm(updatedFrameworkForm);
    setShowExampleForm(false);
    setCurrentExampleIndex(null);
  };

  const deleteExample = (exampleIndex) => {
    const updatedFrameworkForm = { ...frameworkForm };
    updatedFrameworkForm.examples = updatedFrameworkForm.examples.filter((_, i) => i !== exampleIndex);
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
              Save All
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <>
            {!showFrameworkForm && (
              <div className="mb-6">
                <Button 
                  onClick={() => startEditFramework(null)} 
                  className="w-full"
                  variant="outline"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add New Framework
                </Button>
              </div>
            )}
            
            {showFrameworkForm ? (
              <div className="border rounded-lg p-4 mb-6">
                <h3 className="text-lg font-medium mb-4">
                  {currentFrameworkIndex === null ? "Add New Framework" : "Edit Framework"}
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="framework-name">Name</Label>
                    <Input 
                      id="framework-name" 
                      value={frameworkForm.name} 
                      onChange={(e) => setFrameworkForm(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="framework-desc">Description</Label>
                    <Textarea 
                      id="framework-desc" 
                      value={frameworkForm.description} 
                      onChange={(e) => setFrameworkForm(prev => ({ ...prev, description: e.target.value }))}
                      rows={2}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="framework-docs">Documentation (Markdown)</Label>
                    <RichTextEditor 
                      id="framework-docs" 
                      value={frameworkForm.documentation} 
                      onChange={(value) => setFrameworkForm(prev => ({ ...prev, documentation: value }))}
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label>Examples</Label>
                      {!showExampleForm && (
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          onClick={() => startEditExample(currentFrameworkIndex, null)}
                        >
                          <PlusIcon className="h-4 w-4 mr-2" />
                          Add Example
                        </Button>
                      )}
                    </div>
                    
                    {showExampleForm ? (
                      <div className="border rounded-md p-4 bg-muted/30">
                        <h4 className="text-md font-medium mb-3">
                          {currentExampleIndex === null ? "Add New Example" : "Edit Example"}
                        </h4>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="example-title">Title</Label>
                            <Input 
                              id="example-title" 
                              value={exampleForm.title} 
                              onChange={(e) => setExampleForm(prev => ({ ...prev, title: e.target.value }))}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="example-code">Code</Label>
                            <CodeEditor
                              id="example-code"
                              language="javascript"
                              value={exampleForm.code}
                              onChange={(value) => setExampleForm(prev => ({ ...prev, code: value }))}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="example-desc">Description</Label>
                            <Textarea 
                              id="example-desc" 
                              value={exampleForm.description} 
                              onChange={(e) => setExampleForm(prev => ({ ...prev, description: e.target.value }))}
                              rows={2}
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
                              {currentExampleIndex === null ? "Add Example" : "Update Example"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {frameworkForm.examples.map((example, index) => (
                          <div key={index} className="border rounded-md p-3 bg-muted/10">
                            <div className="flex justify-between items-start mb-2">
                              <h5 className="font-medium">{example.title}</h5>
                              <div className="flex gap-1">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => startEditExample(currentFrameworkIndex, index)}
                                >
                                  <PencilIcon className="h-3.5 w-3.5" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => deleteExample(index)}
                                >
                                  <TrashIcon className="h-3.5 w-3.5 text-destructive" />
                                </Button>
                              </div>
                            </div>
                            <div className="text-sm">{example.description}</div>
                          </div>
                        ))}
                        {frameworkForm.examples.length === 0 && (
                          <p className="text-muted-foreground text-sm italic">No examples added yet.</p>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-end gap-2 pt-4">
                    <Button 
                      type="button" 
                      variant="ghost"
                      onClick={() => {
                        setShowFrameworkForm(false);
                        setCurrentFrameworkIndex(null);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={saveFramework}
                      disabled={!frameworkForm.name || !frameworkForm.description}
                    >
                      {currentFrameworkIndex === null ? "Add Framework" : "Update Framework"}
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {frameworks.map((framework, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-medium">{framework.name}</h3>
                        <p className="text-muted-foreground">{framework.description}</p>
                      </div>
                      <div className="flex gap-1">
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
                    <div className="flex gap-2 text-sm text-muted-foreground mb-3">
                      <Badge variant="outline">
                        {framework.examples.length} Example{framework.examples.length !== 1 ? "s" : ""}
                      </Badge>
                    </div>
                  </div>
                ))}
                {frameworks.length === 0 && (
                  <div className="text-center p-8 border rounded-lg">
                    <p className="text-muted-foreground mb-4">No custom frameworks defined yet.</p>
                    <Button 
                      variant="outline" 
                      onClick={() => startEditFramework(null)}
                    >
                      <PlusIcon className="h-4 w-4 mr-2" />
                      Add Framework
                    </Button>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="space-y-8">
            {project.customFrameworks.length === 0 ? (
              <div className="text-center p-8 border rounded-lg">
                <p className="text-muted-foreground">No custom frameworks defined yet.</p>
              </div>
            ) : (
              project.customFrameworks.map((framework, index) => (
                <div key={index} className="p-6 border rounded-md">
                  <h3 className="text-xl font-medium mb-2">{framework.name}</h3>
                  <p className="text-muted-foreground mb-4">{framework.description}</p>
                  
                  <div className="prose dark:prose-invert max-w-none mb-6">
                    <div className="bg-muted p-4 rounded-md">
                      {framework.documentation}
                    </div>
                  </div>
                  
                  <h4 className="text-lg font-medium mb-3">Examples</h4>
                  <div className="space-y-4">
                    {framework.examples.map((example, exIndex) => (
                      <div key={exIndex} className="border rounded-md p-4">
                        <h5 className="font-medium mb-2">{example.title}</h5>
                        <div className="bg-muted p-3 rounded-md font-mono text-sm overflow-x-auto mb-3">
                          <pre>{example.code}</pre>
                        </div>
                        <p className="text-sm">{example.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const ModulesSection = ({ project, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [modules, setModules] = useState([...project.modules]);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(null);
  const [showModuleForm, setShowModuleForm] = useState(false);
  const [moduleForm, setModuleForm] = useState({
    name: "",
    description: "",
    documentation: "",
    dependencies: []
  });

  const handleSave = () => {
    const updatedProject = {
      ...project,
      modules: modules
    };
    onSave(updatedProject);
    setIsEditing(false);
  };

  const startEditModule = (index) => {
    if (index === null) {
      // Adding new module
      setModuleForm({
        name: "",
        description: "",
        documentation: "",
        dependencies: []
      });
    } else {
      // Editing existing module
      setModuleForm({
        ...modules[index],
        dependencies: modules[index].dependencies.join(", ")
      });
    }
    setCurrentModuleIndex(index);
    setShowModuleForm(true);
  };

  const saveModule = () => {
    const formattedModule = {
      ...moduleForm,
      dependencies: moduleForm.dependencies.split(",").map(dep => dep.trim()).filter(Boolean)
    };
    
    if (currentModuleIndex === null) {
      // Adding new module
      setModules([...modules, formattedModule]);
    } else {
      // Updating existing module
      const updatedModules = [...modules];
      updatedModules[currentModuleIndex] = formattedModule;
      setModules(updatedModules);
    }
    
    setShowModuleForm(false);
    setCurrentModuleIndex(null);
  };

  const deleteModule = (index) => {
    const updatedModules = modules.filter((_, i) => i !== index);
    setModules(updatedModules);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Modules</CardTitle>
          <CardDescription>Project modules and their dependencies</CardDescription>
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
              Save All
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <>
            {!showModuleForm && (
              <div className="mb-6">
                <Button 
                  onClick={() => startEditModule(null)} 
                  className="w-full"
                  variant="outline"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add New Module
                </Button>
              </div>
            )}
            
            {showModuleForm ? (
              <div className="border rounded-lg p-4 mb-6">
                <h3 className="text-lg font-medium mb-4">
                  {currentModuleIndex === null ? "Add New Module" : "Edit Module"}
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="module-name">Name</Label>
                    <Input 
                      id="module-name" 
                      value={moduleForm.name} 
                      onChange={(e) => setModuleForm(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="module-desc">Description</Label>
                    <Textarea 
                      id="module-desc" 
                      value={moduleForm.description} 
                      onChange={(e) => setModuleForm(prev => ({ ...prev, description: e.target.value }))}
                      rows={2}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="module-docs">Documentation (Markdown)</Label>
                    <RichTextEditor 
                      id="module-docs" 
                      value={moduleForm.documentation} 
                      onChange={(value) => setModuleForm(prev => ({ ...prev, documentation: value }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="module-deps">Dependencies (comma-separated)</Label>
                    <Input 
                      id="module-deps" 
                      value={moduleForm.dependencies} 
                      onChange={(e) => setModuleForm(prev => ({ ...prev, dependencies: e.target.value }))}
                      placeholder="react, lodash, axios"
                    />
                  </div>
                  
                  <div className="flex justify-end gap-2 pt-4">
                    <Button 
                      type="button" 
                      variant="ghost"
                      onClick={() => {
                        setShowModuleForm(false);
                        setCurrentModuleIndex(null);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={saveModule}
                      disabled={!moduleForm.name || !moduleForm.description}
                    >
                      {currentModuleIndex === null ? "Add Module" : "Update Module"}
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {modules.map((module, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-medium">{module.name}</h3>
                        <p className="text-muted-foreground">{module.description}</p>
                      </div>
                      <div className="flex gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => startEditModule(index)}
                        >
                          <PencilIcon className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => deleteModule(index)}
                        >
                          <TrashIcon className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {Array.isArray(module.dependencies) && module.dependencies.map((dep, depIndex) => (
                        <Badge key={depIndex} variant="outline">{dep}</Badge>
                      ))}
                    </div>
                  </div>
                ))}
                {modules.length === 0 && (
                  <div className="text-center p-8 border rounded-lg">
                    <p className="text-muted-foreground mb-4">No modules defined yet.</p>
                    <Button 
                      variant="outline" 
                      onClick={() => startEditModule(null)}
                    >
                      <PlusIcon className="h-4 w-4 mr-2" />
                      Add Module
                    </Button>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="space-y-8">
            {project.modules.length === 0 ? (
              <div className="text-center p-8 border rounded-lg">
                <p className="text-muted-foreground">No modules defined yet.</p>
              </div>
            ) : (
              project.modules.map((module, index) => (
                <div key={index} className="p-6 border rounded-md">
                  <h3 className="text-xl font-medium mb-2">{module.name}</h3>
                  <p className="text-muted-foreground mb-4">{module.description}</p>
                  
                  <div className="prose dark:prose-invert max-w-none mb-6">
                    <div className="bg-muted p-4 rounded-md">
                      {module.documentation}
                    </div>
                  </div>
                  
                  <h4 className="text-lg font-medium mb-3">Dependencies</h4>
                  <div className="flex flex-wrap gap-2">
                    {module.dependencies.map((dep, depIndex) => (
                      <Badge key={depIndex} variant="secondary">{dep}</Badge>
                    ))}
                    {module.dependencies.length === 0 && (
                      <p className="text-muted-foreground text-sm italic">No dependencies listed.</p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const GuidelinesSection = ({ project, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(project.guidelines.content);

  const handleSave = () => {
    const updatedProject = {
      ...project,
      guidelines: {
        ...project.guidelines,
        content,
        lastUpdated: new Date()
      }
    };
    onSave(updatedProject);
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Project Guidelines</CardTitle>
          <CardDescription>
            Last updated: {new Date(project.guidelines.lastUpdated).toLocaleDateString()}
          </CardDescription>
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
              onClick={() => {
                setContent(project.guidelines.content);
                setIsEditing(false);
              }}
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
        {isEditing ? (
          <div className="space-y-4">
            <Label htmlFor="guidelines-content">Guidelines Content (Markdown)</Label>
            <RichTextEditor 
              id="guidelines-content" 
              value={content} 
              onChange={setContent}
            />
          </div>
        ) : (
          <div className="prose dark:prose-invert max-w-none">
            <div className="p-4 bg-muted/40 rounded-lg">
              {project.guidelines.content}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const ComponentsSection = ({ project, onSave }) => {
  // Sample component data since we're working with a mock
  const sampleComponents = [
    {
      id: "comp1",
      name: "Button",
      description: "Interactive button elements with various styles",
      variants: 4
    },
    {
      id: "comp2",
      name: "Form Controls",
      description: "Input components with validation",
      variants: 6
    },
    {
      id: "comp3",
      name: "DataTable",
      description: "Sortable and filterable data table",
      variants: 2
    }
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Components</CardTitle>
          <CardDescription>Reusable UI components used in this project</CardDescription>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Component
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sampleComponents.map((component) => (
            <div key={component.id} className="border rounded-lg p-4">
              <h3 className="text-lg font-medium mb-1">{component.name}</h3>
              <p className="text-muted-foreground text-sm mb-3">{component.description}</p>
              <div className="flex items-center justify-between">
                <Badge variant="outline">
                  {component.variants} variant{component.variants !== 1 ? 's' : ''}
                </Badge>
                <Button variant="ghost" size="sm">View Details</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const ResourcesSection = ({ project, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [resources, setResources] = useState([...project.resources]);
  const [showResourceForm, setShowResourceForm] = useState(false);
  const [resourceForm, setResourceForm] = useState({
    title: "",
    type: "link",
    url: "",
    description: ""
  });
  const [currentIndex, setCurrentIndex] = useState(null);

  const handleSave = () => {
    const updatedProject = {
      ...project,
      resources
    };
    onSave(updatedProject);
    setIsEditing(false);
  };

  const startEditResource = (index) => {
    if (index === null) {
      // Adding new resource
      setResourceForm({
        title: "",
        type: "link",
        url: "",
        description: ""
      });
    } else {
      // Editing existing resource
      setResourceForm({ ...resources[index] });
    }
    
    setCurrentIndex(index);
    setShowResourceForm(true);
  };

  const saveResource = () => {
    if (currentIndex === null) {
      // Adding new resource
      setResources([...resources, { ...resourceForm }]);
    } else {
      // Updating existing resource
      const updatedResources = [...resources];
      updatedResources[currentIndex] = { ...resourceForm };
      setResources(updatedResources);
    }
    
    setShowResourceForm(false);
    setCurrentIndex(null);
  };

  const deleteResource = (index) => {
    const updatedResources = resources.filter((_, i) => i !== index);
    setResources(updatedResources);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Resources</CardTitle>
          <CardDescription>Links and documentation related to the project</CardDescription>
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
              Save All
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <>
            {!showResourceForm && (
              <div className="mb-6">
                <Button 
                  onClick={() => startEditResource(null)} 
                  className="w-full"
                  variant="outline"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add New Resource
                </Button>
              </div>
            )}
            
            {showResourceForm ? (
              <div className="border rounded-lg p-4 mb-6">
                <h3 className="text-lg font-medium mb-4">
                  {currentIndex === null ? "Add New Resource" : "Edit Resource"}
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="resource-title">Title</Label>
                    <Input 
                      id="resource-title" 
                      value={resourceForm.title} 
                      onChange={(e) => setResourceForm(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="resource-type">Type</Label>
                    <select
                      id="resource-type"
                      className="w-full h-10 px-3 py-2 text-sm rounded-md border border-input bg-background"
                      value={resourceForm.type}
                      onChange={(e) => setResourceForm(prev => ({ ...prev, type: e.target.value }))}
                    >
                      <option value="link">Link</option>
                      <option value="pdf">PDF</option>
                      <option value="video">Video</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="resource-url">URL</Label>
                    <Input 
                      id="resource-url" 
                      value={resourceForm.url} 
                      onChange={(e) => setResourceForm(prev => ({ ...prev, url: e.target.value }))}
                      type="url"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="resource-desc">Description</Label>
                    <Textarea 
                      id="resource-desc" 
                      value={resourceForm.description} 
                      onChange={(e) => setResourceForm(prev => ({ ...prev, description: e.target.value }))}
                      rows={2}
                    />
                  </div>
                  
                  <div className="flex justify-end gap-2 pt-4">
                    <Button 
                      type="button" 
                      variant="ghost"
                      onClick={() => {
                        setShowResourceForm(false);
                        setCurrentIndex(null);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={saveResource}
                      disabled={!resourceForm.title || !resourceForm.url}
                    >
                      {currentIndex === null ? "Add Resource" : "Update Resource"}
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {resources.map((resource, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-medium">{resource.title}</h3>
                        <p className="text-muted-foreground text-sm">{resource.description}</p>
                      </div>
                      <div className="flex gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => startEditResource(index)}
                        >
                          <PencilIcon className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => deleteResource(index)}
                        >
                          <TrashIcon className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline">{resource.type}</Badge>
                      <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary underline truncate">
                        {resource.url}
                      </a>
                    </div>
                  </div>
                ))}
                {resources.length === 0 && (
                  <div className="text-center p-8 border rounded-lg">
                    <p className="text-muted-foreground mb-4">No resources defined yet.</p>
                    <Button 
                      variant="outline" 
                      onClick={() => startEditResource(null)}
                    >
                      <PlusIcon className="h-4 w-4 mr-2" />
                      Add Resource
                    </Button>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="space-y-6">
            {project.resources.length === 0 ? (
              <div className="text-center p-8 border rounded-lg">
                <p className="text-muted-foreground">No resources added yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.resources.map((resource, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-muted p-2 rounded">
                        {resource.type === "link" && <LinkIcon className="h-5 w-5" />}
                        {resource.type === "pdf" && <FileTextIcon className="h-5 w-5" />}
                        {resource.type === "video" && <PlayIcon className="h-5 w-5" />}
                      </div>
                      <div>
                        <h3 className="font-medium">{resource.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                        <a 
                          href={resource.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-sm text-primary underline inline-flex items-center gap-1"
                        >
                          View Resource <ExternalLinkIcon className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
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

export default ProjectManagement;
