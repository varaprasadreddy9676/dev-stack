
import { useState, useEffect } from "react";
import { services } from "@/services/serviceFactory";
import { PageParentType } from "@/types";

export interface ParentOption {
  id: string;
  name: string;
  description?: string;
}

export const useParentOptions = (
  parentType: PageParentType,
  initialParentId?: string | null
) => {
  const [availableParents, setAvailableParents] = useState<ParentOption[]>([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch available parents based on the selected type
  const fetchAvailableParents = async (type: PageParentType) => {
    if (type === "root") {
      setAvailableParents([]);
      return;
    }
    
    setLoading(true);
    try {
      let parentOptions: ParentOption[] = [];
      
      switch (type) {
        case "project":
          const projects = await services.projects.getProjects();
          parentOptions = projects.map((project: any) => ({
            id: project._id,
            name: project.name,
            description: project.description
          }));
          break;
          
        // Add other entity types as needed (module, component, etc.)
        default:
          parentOptions = [];
      }
      
      setAvailableParents(parentOptions);
    } catch (error) {
      console.error("Error fetching parent options:", error);
      setAvailableParents([]);
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch parents when parent type changes
  useEffect(() => {
    fetchAvailableParents(parentType);
  }, [parentType]);

  return { availableParents, loading };
};
