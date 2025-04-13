
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePageData } from "@/hooks/usePageData";
import { useAuth } from "@/contexts/auth";
import { 
  CreatePageRequest, 
  UpdatePageRequest, 
  ObjectId,
  PageParentType
} from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { PageFormHeader } from "./PageFormHeader";
import { PageDetailsCard } from "./PageDetailsCard";
import { PageSettingsCard } from "./PageSettingsCard";
import { PageInfoCard } from "./PageInfoCard";

// Form schema definition
const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  parentType: z.enum(["project", "module", "language", "component", "guide", "root"] as const),
  parentId: z.string().nullable(),
  visibility: z.enum(["public", "team", "private"] as const),
  tags: z.array(z.string()).optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface PageFormContainerProps {
  pageId?: string;
  initialParentType?: PageParentType;
  initialParentId?: string | null;
  mode: "create" | "edit";
}

export const PageFormContainer = ({ 
  pageId, 
  initialParentType = "root",
  initialParentId = null,
  mode 
}: PageFormContainerProps) => {
  const { getPage, createPage, updatePage } = usePageData();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id: routeId, entityType } = useParams<{ id: string; entityType?: string }>();
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  
  // Determine parent context from route
  const contextParentType = entityType as PageParentType | undefined || initialParentType;
  const contextParentId = routeId || initialParentId;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      parentType: contextParentType,
      parentId: contextParentId,
      visibility: "team",
      tags: [],
    },
  });

  // Load page data for edit mode
  useEffect(() => {
    const fetchPageData = async () => {
      if (mode === "edit" && pageId) {
        setLoading(true);
        try {
          const page = await getPage(pageId);
          if (page) {
            form.reset({
              title: page.title,
              content: page.content || "",
              parentType: page.parent?.type || "root",
              parentId: page.parent?.id || null,
              visibility: page.visibility || "team",
              tags: page.tags || [],
            });
            setTags(page.tags || []);
          }
        } catch (error) {
          console.error("Error loading page data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPageData();
  }, [pageId, mode, getPage, form]);

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      if (mode === "create") {
        const requestData: CreatePageRequest = {
          title: values.title,
          content: values.content,
          parent: {
            type: values.parentType,
            id: values.parentId,
          },
          visibility: values.visibility,
          tags: values.tags || [],
        };
        
        const newPage = await createPage(requestData);
        if (newPage) {
          navigate(`/pages/${newPage._id}`);
        }
      } else if (mode === "edit" && pageId) {
        const requestData: UpdatePageRequest = {
          title: values.title,
          content: values.content,
          parent: {
            type: values.parentType,
            id: values.parentId,
          },
          visibility: values.visibility,
          tags: values.tags || [],
        };
        
        const updatedPage = await updatePage(pageId, requestData);
        if (updatedPage) {
          navigate(`/pages/${updatedPage._id}`);
        }
      }
    } catch (error) {
      console.error("Error saving page:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add breadcrumb navigation
  const determineBackUrl = () => {
    if (contextParentType === "project" && contextParentId) {
      return `/projects/${contextParentId}`;
    }
    // Add other entity types as needed
    return -1; // Default to browser history back
  };

  return (
    <div className="container py-10 animate-fade-in">
      <div className="mb-8">
        <Button 
          variant="ghost" 
          onClick={() => {
            const backUrl = determineBackUrl();
            if (typeof backUrl === "string") {
              navigate(backUrl);
            } else {
              navigate(-1);
            }
          }}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <PageFormHeader mode={mode} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PageDetailsCard 
            form={form} 
            onSubmit={onSubmit} 
            loading={loading} 
          />
        </div>

        <div className="space-y-6">
          <PageSettingsCard 
            form={form} 
            tags={tags}
            setTags={setTags}
            initialParentType={contextParentType}
            initialParentId={contextParentId}
          />

          <PageInfoCard createdBy={user?._id || "anonymous"} />
        </div>
      </div>
    </div>
  );
};
