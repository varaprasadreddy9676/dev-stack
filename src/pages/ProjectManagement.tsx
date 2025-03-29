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
import { 
  CheckIcon, 
  PencilIcon, 
  PlusIcon, 
  TrashIcon, 
  SaveIcon, 
  XIcon,
  Link as LinkIcon,
  FileText as FileTextIcon,
  Play as PlayIcon,
  ExternalLink as ExternalLinkIcon
} from "lucide-react";
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
