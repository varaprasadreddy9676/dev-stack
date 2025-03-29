
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, LayoutGrid, Monitor, Code, FileText, Folder } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Define project type
type Project = {
  id: string;
  name: string;
  description: string;
  type: string;
  tags: string[];
  updatedAt: string;
  components: number;
  guides: number;
};

interface RecentProjectsProps {
  projects: Project[];
  formatDate: (dateString: string) => string;
}

const getProjectTypeIcon = (type: string) => {
  switch (type) {
    case "frontend":
      return <Monitor className="h-4 w-4" />;
    case "backend":
      return <Code className="h-4 w-4" />;
    case "fullstack":
      return <LayoutGrid className="h-4 w-4" />;
    case "mobile":
      return <Folder className="h-4 w-4" />;
    case "library":
      return <FileText className="h-4 w-4" />;
    default:
      return <Folder className="h-4 w-4" />;
  }
};

export const RecentProjects = ({ projects, formatDate }: RecentProjectsProps) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Recent Projects</h2>
        <Button variant="outline" size="sm" asChild>
          <Link to="/projects">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle>
                <Link to={`/projects/${project.id}`} className="hover:text-primary transition-colors">
                  {project.name}
                </Link>
              </CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge className="flex items-center gap-1">
                  {getProjectTypeIcon(project.type)}
                  <span>{project.type}</span>
                </Badge>
                {project.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
                {project.tags.length > 2 && (
                  <Badge variant="outline">+{project.tags.length - 2}</Badge>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-0">
              <div className="text-xs text-muted-foreground">
                Updated {formatDate(project.updatedAt)}
              </div>
              <div className="flex gap-3 text-xs text-muted-foreground">
                <span className="flex items-center">
                  <LayoutGrid className="h-3.5 w-3.5 mr-1" />
                  {project.components}
                </span>
                <span className="flex items-center">
                  <BookOpen className="h-3.5 w-3.5 mr-1" />
                  {project.guides}
                </span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
