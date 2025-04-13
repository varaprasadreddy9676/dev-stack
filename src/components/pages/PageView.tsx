import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { usePageData } from "@/hooks/usePageData";
import { Page } from "@/types";
import { 
  Card, 
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";  // Corrected import
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  Clock,
  Edit,
  FileText,
  Link as LinkIcon,
  Share,
  Tags,
  Trash,
  User,
  ArrowLeft,
} from "lucide-react";
import { formatDate } from "@/utils/dateUtils";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { useAuth } from "@/contexts/auth";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const PageView = () => {
  const { id } = useParams<{ id: string }>();
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const { getPage, deletePage } = usePageData();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchPage = async () => {
      if (id) {
        setLoading(true);
        const fetchedPage = await getPage(id);
        if (fetchedPage) {
          setPage(fetchedPage);
        }
        setLoading(false);
      }
    };

    fetchPage();
  }, [id, getPage]);

  const handleDelete = async () => {
    if (id) {
      const success = await deletePage(id);
      if (success) {
        navigate(-1);
      }
    }
  };

  const canEdit = page?.permissions.canEdit.includes("admin") || 
                  (user?.role && page?.permissions.canEdit.includes(user.role));

  const getParentPath = () => {
    if (!page?.parent) return "/";
    
    const { type, id } = page.parent;
    if (!id) return "/";
    
    switch (type) {
      case "project":
        return `/projects/${id}`;
      case "module":
        return `/modules/${id}`;
      case "component":
        return `/components/${id}`;
      case "language":
        return `/languages/${id}`;
      case "guide":
        return `/guides/${id}`;
      default:
        return "/";
    }
  };

  if (loading) {
    return (
      <div className="container py-10 space-y-8">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-6" />
          <Skeleton className="h-6 w-24" />
        </div>
        <Skeleton className="h-12 w-3/4" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-32" />
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!page) {
    return (
      <div className="container py-20 text-center">
        <FileText className="h-16 w-16 mx-auto text-muted-foreground opacity-30" />
        <h1 className="mt-6 text-2xl font-bold">Page Not Found</h1>
        <p className="mt-2 text-muted-foreground">
          The page you're looking for doesn't exist or you don't have permission to view it.
        </p>
        <Button className="mt-6" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-10 animate-fade-in">
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-6">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate(-1)} 
            className="px-2"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back
          </Button>
          <span>/</span>
          <Link to={getParentPath()} className="hover:text-foreground">
            {page.parent.type.charAt(0).toUpperCase() + page.parent.type.slice(1)}
          </Link>
          <span>/</span>
          <span className="font-medium text-foreground">{page.title}</span>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight">{page.title}</h1>
          
          <div className="flex items-center gap-2">
            {canEdit && (
              <>
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/pages/${id}/edit`}>
                    <Edit className="mr-1 h-4 w-4" /> Edit
                  </Link>
                </Button>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm" className="text-destructive">
                      <Trash className="mr-1 h-4 w-4" /> Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the page and remove it from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            )}
            
            <Button variant="outline" size="sm">
              <Share className="mr-1 h-4 w-4" /> Share
            </Button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {page.tags?.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <User className="h-4 w-4 mr-1" />
            <span>Created by: {page.metadata.createdBy.toString()}</span>
          </div>
          <div className="flex items-center">
            <CalendarDays className="h-4 w-4 mr-1" />
            <span>Created: {formatDate(page.metadata.createdAt.toString())}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>Last updated: {formatDate(page.metadata.lastUpdatedAt.toString())}</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="pt-6">
              <div className="prose dark:prose-invert max-w-none">
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                  {page.content}
                </ReactMarkdown>
              </div>
            </CardContent>
          </Card>
          
          {/* Related content or comments could go here */}
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Page Information</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Visibility</h4>
                  <p className="mt-1">{page.visibility.charAt(0).toUpperCase() + page.visibility.slice(1)}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Version</h4>
                  <p className="mt-1">{page.metadata.version}</p>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground flex items-center">
                    <LinkIcon className="h-4 w-4 mr-1" /> Related Entities
                  </h4>
                  
                  {page.relatedEntities.length > 0 ? (
                    <ul className="mt-2 space-y-2">
                      {page.relatedEntities.map((entity, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <span className="capitalize mr-2">{entity.type}:</span>
                          <Badge variant="outline" className="font-mono text-xs">
                            {entity.id.toString()}
                          </Badge>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground mt-2">No related entities</p>
                  )}
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground flex items-center">
                    <Tags className="h-4 w-4 mr-1" /> Tags
                  </h4>
                  
                  {page.tags && page.tags.length > 0 ? (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {page.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground mt-2">No tags</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-2">Contributors</h3>
              
              {page.metadata.contributors.length > 0 ? (
                <div className="space-y-3 mt-4">
                  {page.metadata.contributors.map((contributor, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        {contributor.toString().charAt(0)}
                      </div>
                      <div className="text-sm">
                        {contributor.toString()}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No contributors yet</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
