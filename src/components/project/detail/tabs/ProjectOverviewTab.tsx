
import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { CalendarDays, Users, Component, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectData } from "@/types/project";

interface ProjectOverviewTabProps {
  project: ProjectData;
  formatDate: (dateString: string) => string;
  components: Array<{
    id: string;
    name: string;
    description: string;
    variants: number;
  }>;
  guides: Array<{
    id: string;
    title: string;
    description: string;
  }>;
}

const ProjectOverviewTab: React.FC<ProjectOverviewTabProps> = ({
  project,
  formatDate,
  components,
  guides
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Overview</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>{project.overview}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Project Structure</CardTitle>
            <CardDescription>{project.structure.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {project.structure.folders.map((folder, idx) => (
                <div key={idx} className="p-3 bg-muted/50 rounded-md">
                  <div className="font-mono text-sm">{folder.path}</div>
                  <div className="text-sm text-muted-foreground mt-1">{folder.purpose}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Custom Frameworks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {project.customFrameworks.map((framework, idx) => (
                <div key={idx} className="p-4 border rounded-lg">
                  <h3 className="text-lg font-medium mb-2">{framework.name}</h3>
                  <p className="text-muted-foreground mb-4">{framework.description}</p>
                  <div className="bg-muted p-3 rounded-md overflow-auto">
                    <pre className="text-sm font-mono">{framework.examples[0].code}</pre>
                  </div>
                  <p className="text-sm mt-2">{framework.examples[0].description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Team</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {project.team.map((member, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium">{member.name}</div>
                    <div className="text-xs text-muted-foreground">{member.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Project Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CalendarDays className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <div className="text-sm font-medium">Created</div>
                  <div className="text-sm text-muted-foreground">
                    {formatDate(project.createdAt)}
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CalendarDays className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <div className="text-sm font-medium">Last Updated</div>
                  <div className="text-sm text-muted-foreground">
                    {formatDate(project.updatedAt)}
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <div className="text-sm font-medium">Team Members</div>
                  <div className="text-sm text-muted-foreground">
                    {project.team.length} contributors
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Component className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <div className="text-sm font-medium">Components</div>
                  <div className="text-sm text-muted-foreground">
                    {components.length} components
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <BookOpen className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <div className="text-sm font-medium">Guides</div>
                  <div className="text-sm text-muted-foreground">
                    {guides.length} implementation guides
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="p-4 rounded-lg glass-morphism">
          <h3 className="font-medium mb-2">Need help?</h3>
          <p className="text-sm text-muted-foreground mb-3">
            If you have questions about this project, reach out to the team lead.
          </p>
          <Button size="sm" variant="outline" className="w-full">
            Contact Team
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectOverviewTab;
